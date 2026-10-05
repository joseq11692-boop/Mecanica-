#!/usr/bin/env python3
"""Prepara la app para publicar. Ejecutar después de cambiar cualquier archivo de app/.

Uso:  python3 herramientas/construir.py

1. Pone en app/sw.js una VERSION con la huella de los archivos de la app, para que los
   celulares que ya la tienen instalada reciban los cambios (el gate comprueba que está al día).
2. Genera dist/app.html: la app entera en un solo archivo, para publicarla como página privada.
"""
import base64
import hashlib
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
APP = RAIZ / "app"
DIST = RAIZ / "dist" / "app.html"
PREFIJO = "josefine-mecanica-"


def huella():
    """Huella de todos los archivos de la app menos sw.js (que la contiene)."""
    h = hashlib.sha256()
    for f in sorted(APP.iterdir()):
        if f.is_file() and f.name != "sw.js":
            h.update(f.name.encode())
            h.update(f.read_bytes())
    return h.hexdigest()[:10]


def version_esperada():
    return PREFIJO + huella()


def sw_con_version(texto):
    return re.sub(r'var VERSION = "[^"]*";', f'var VERSION = "{version_esperada()}";', texto, count=1)


def un_solo_archivo():
    """index.html con CSS, JS e icono incrustados. Sin service worker ni manifest (no aplican fuera de la PWA)."""
    html = (APP / "index.html").read_text(encoding="utf-8")
    css = (APP / "estilos.css").read_text(encoding="utf-8")
    icono = base64.b64encode((APP / "icono.svg").read_bytes()).decode()
    html = html.replace('<link rel="manifest" href="manifest.webmanifest">\n', "")
    html = html.replace('<link rel="apple-touch-icon" href="icono-192.png">\n', "")
    html = html.replace('href="icono.svg"', f'href="data:image/svg+xml;base64,{icono}"')
    # Como página publicada: la cabecera respeta el margen del sistema y no se ofrecen descargas (el visor las bloquea).
    pagina = ".cabecera { top: env(safe-area-inset-top, 0px); padding-top: 12px; }\n"
    html = html.replace('<link rel="stylesheet" href="estilos.css">', "<style>\n" + css + pagina + "</style>\n<script>window.MODO_PAGINA = true;</script>")
    scripts = ("contenido.js", "app.js")
    restos = [r for r in re.findall(r'(?:src|href)="(?!https?:|data:|#)([^"]+)"', html) if r not in scripts]
    if restos:
        sys.exit(f"construir: quedan referencias locales sin incrustar: {restos}")
    for nombre in scripts:
        js = (APP / nombre).read_text(encoding="utf-8")
        html = html.replace(f'<script src="{nombre}"></script>', "<script>\n" + js.replace("</script", "<\\/script") + "</script>")
    return html


def main():
    sw = APP / "sw.js"
    sw.write_text(sw_con_version(sw.read_text(encoding="utf-8")), encoding="utf-8")
    DIST.parent.mkdir(exist_ok=True)
    DIST.write_text(un_solo_archivo(), encoding="utf-8")
    print(f"VERSION = {version_esperada()}")
    print(f"Generado {DIST.relative_to(RAIZ)} ({DIST.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
