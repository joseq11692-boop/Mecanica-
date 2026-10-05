#!/usr/bin/env python3
"""Gate de Josefine Mecánica: todo tiene que salir en verde antes de dar algo por hecho.

Uso:  python3 herramientas/check.py ; echo EXIT=$?
(Nunca con un pipe: el código de salida tiene que ser el de este script.)

Cada comprobación falla cerrado: si no encuentra nada que revisar, también es rojo.
"""
import json
import os
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
APP = RAIZ / "app"
sys.path.insert(0, str(RAIZ / "herramientas"))
import construir  # noqa: E402

fallos = []


def ok(nombre, n, extra=""):
    print(f"  ✔ {nombre}: {n} revisados{extra}")


def fallo(nombre, detalle):
    fallos.append(f"{nombre}: {detalle}")
    print(f"  ✘ {nombre}: {detalle}")


def exige(nombre, n):
    if n == 0:
        fallo(nombre, "no encontró nada que revisar (falla cerrado)")
        return False
    return True


# 1. Sintaxis de todos los JS
def js():
    archivos = sorted(list(APP.glob("*.js")) + list((RAIZ / "herramientas").glob("*.js")))
    if not exige("Sintaxis JS", len(archivos)):
        return
    malos = 0
    for f in archivos:
        r = subprocess.run(["node", "--check", str(f)], capture_output=True, text=True)
        if r.returncode != 0:
            malos += 1
            fallo("Sintaxis JS", f"{f.relative_to(RAIZ)}: {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else r.returncode}")
    if not malos:
        ok("Sintaxis JS", len(archivos))


# 2. JSON válidos
def jsons():
    archivos = sorted(list(APP.glob("*.webmanifest")) + list(RAIZ.glob(".claude/**/*.json")))
    if not exige("JSON", len(archivos)):
        return
    malos = 0
    for f in archivos:
        try:
            json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            malos += 1
            fallo("JSON", f"{f.relative_to(RAIZ)}: {e}")
    if not malos:
        ok("JSON", len(archivos))


# 3. Recursos locales del HTML y del manifest existen
class Refs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        for k, v in attrs:
            if k in ("src", "href") and v and not re.match(r"(https?:|data:|#|mailto:)", v):
                self.refs.append(v)


def recursos():
    p = Refs()
    p.feed((APP / "index.html").read_text(encoding="utf-8"))
    manifest = json.loads((APP / "manifest.webmanifest").read_text(encoding="utf-8"))
    refs = p.refs + [i["src"] for i in manifest.get("icons", [])]
    if not exige("Recursos locales", len(refs)):
        return
    faltan = [r for r in refs if not (APP / r).exists()]
    for r in faltan:
        fallo("Recursos locales", f"falta app/{r}")
    if not faltan:
        ok("Recursos locales", len(refs))


# 4. App sin conexión: el service worker guarda todos los archivos y su VERSION está al día
def sin_conexion():
    sw = (APP / "sw.js").read_text(encoding="utf-8")
    m = re.search(r"var ARCHIVOS = (\[[^\]]*\]);", sw)
    if not m:
        fallo("Sin conexión", "no encuentro ARCHIVOS en app/sw.js")
        return
    lista = json.loads(m.group(1))
    reales = {f.name for f in APP.iterdir() if f.is_file() and f.name != "sw.js"}
    for f in lista:
        if f != "./" and f not in reales:
            fallo("Sin conexión", f"sw.js guarda {f}, que no existe")
    for f in sorted(reales - set(lista)):
        fallo("Sin conexión", f"app/{f} no está en ARCHIVOS de sw.js: sin conexión no cargaría")
    v = re.search(r'var VERSION = "([^"]*)";', sw)
    if not v or v.group(1) != construir.version_esperada():
        fallo("Sin conexión", "VERSION de sw.js desactualizada: ejecuta python3 herramientas/construir.py")
    if not any(f.startswith("Sin conexión") for f in fallos):
        ok("Sin conexión", len(lista), f" (VERSION {construir.version_esperada()})")


# 5. Versión de un solo archivo (dist/app.html) al día con app/
def un_archivo():
    if not construir.DIST.exists() or construir.DIST.read_text(encoding="utf-8") != construir.un_solo_archivo():
        fallo("Versión un solo archivo", "dist/app.html desactualizado: ejecuta python3 herramientas/construir.py")
    else:
        ok("Versión un solo archivo", 1)


# 6. Contenido: estructura completa, preguntas bien formadas, códigos válidos, fuentes con https
def contenido():
    script = (
        "const vm=require('vm');const fs=require('fs');const c={};vm.createContext(c);"
        "vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+"
        "';this.__d={LECCIONES,SINTOMAS,CODIGOS,GLOSARIO,FUENTES}',c);"
        "process.stdout.write(JSON.stringify(c.__d));"
    )
    r = subprocess.run(["node", "-e", script, str(APP / "contenido.js")], capture_output=True, text=True)
    if r.returncode != 0:
        fallo("Contenido", r.stderr.strip()[-300:])
        return
    d = json.loads(r.stdout)
    n = 0
    ids = set()
    niveles = {"grave", "atencion", "leve"}
    for l in d["LECCIONES"]:
        n += 1
        donde = f"lección {l.get('id')}"
        if l.get("id") in ids:
            fallo("Contenido", f"{donde}: id repetido")
        ids.add(l.get("id"))
        for campo in ("titulo", "sistema", "resumen", "funciona", "partes", "revisar", "alarmas", "dato", "preguntas"):
            if not l.get(campo):
                fallo("Contenido", f"{donde}: falta {campo}")
        if len(l.get("preguntas", [])) < 2:
            fallo("Contenido", f"{donde}: necesita al menos 2 preguntas")
        for i, q in enumerate(l.get("preguntas", [])):
            if not (isinstance(q.get("c"), int) and 0 <= q["c"] < len(q.get("o", [])) and len(q["o"]) >= 2 and q.get("p") and q.get("e")):
                fallo("Contenido", f"{donde}, pregunta {i + 1}: mal formada (p, o, c, e)")
        for a in l.get("alarmas", []):
            if a.get("nivel") not in niveles:
                fallo("Contenido", f"{donde}: nivel de alarma desconocido {a.get('nivel')}")
    sids = set()
    for s in d["SINTOMAS"]:
        n += 1
        if s.get("id") in sids:
            fallo("Contenido", f"síntoma {s.get('id')}: id repetido")
        sids.add(s.get("id"))
        if s.get("gravedad") not in niveles or not s.get("causas") or not s.get("compra"):
            fallo("Contenido", f"síntoma {s.get('id')}: incompleto")
    cods = set()
    for k in d["CODIGOS"]:
        n += 1
        if not re.fullmatch(r"[PBCU][0-3][0-9A-F]{3}", k.get("c", "")) or k["c"] in cods or k.get("g") not in niveles:
            fallo("Contenido", f"código {k.get('c')}: formato, repetido o gravedad inválida")
        cods.add(k.get("c"))
    for f in d["FUENTES"]:
        n += 1
        if not str(f.get("url", "")).startswith("https://"):
            fallo("Contenido", f"fuente sin https: {f.get('nombre')}")
    n += len(d["GLOSARIO"])
    if exige("Contenido", n) and not any(x.startswith("Contenido") for x in fallos):
        ok("Contenido", n, f" ({len(d['LECCIONES'])} lecciones, {len(d['SINTOMAS'])} síntomas, {len(d['CODIGOS'])} códigos)")


# 7. Guardián de idioma: en Panamá se dice "carro" o "auto"
def idioma():
    archivos = [f for f in list(APP.glob("*")) + list(RAIZ.glob("*.md")) + list((RAIZ / "docs").rglob("*.md"))
                if f.is_file() and f.suffix in (".js", ".html", ".css", ".md", ".webmanifest")]
    if not exige("Idioma", len(archivos)):
        return
    malos = 0
    for f in archivos:
        for i, linea in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            if "guardián-idioma: permitido" in linea:
                continue
            if re.search(r"\bcoches?\b", linea, re.IGNORECASE):
                malos += 1
                fallo("Idioma", f"{f.relative_to(RAIZ)}:{i} usa «coche»: en Panamá es «carro» o «auto»")
    if not malos:
        ok("Idioma", len(archivos))


# 8. La app funciona de verdad en un navegador de celular
def navegador():
    r = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True)
    env = dict(os.environ, NODE_PATH=r.stdout.strip())
    r = subprocess.run(["node", str(RAIZ / "herramientas/probar-app.js")], capture_output=True, text=True, env=env, timeout=240)
    salida = (r.stdout + r.stderr).strip()
    if r.returncode != 0:
        fallo("Navegador", salida.splitlines()[-1] if salida else f"exit {r.returncode}")
        for linea in salida.splitlines()[-15:]:
            print("      " + linea)
    else:
        print(f"  ✔ Navegador: {salida.count(chr(10004))} pasos de la prueba en celular")


def main():
    print("Gate Josefine Mecánica")
    for paso in (js, jsons, recursos, sin_conexion, un_archivo, contenido, idioma, navegador):
        try:
            paso()
        except Exception as e:  # noqa: BLE001
            fallo(paso.__name__, f"error inesperado: {e}")
    if fallos:
        print(f"\nROJO: {len(fallos)} fallo(s)")
        sys.exit(1)
    print("\nVERDE")


if __name__ == "__main__":
    main()
