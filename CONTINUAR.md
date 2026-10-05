# Continuar aquí

Para retomar el trabajo en una sesión nueva. Se actualiza al cerrar cada sesión.

## Estado (2026-10-05)
- Proyecto creado como complemento de Josefine Auto (norma M01): app de estudio de mecánica.
- App en `app/`: 14 lecciones, 32 síntomas, lector de códigos OBD2 (17 genéricos frecuentes), práctica con repaso de fallos y bitácora de carros revisados. Modo claro y oscuro.
- Página privada para uso inmediato: https://claude.ai/artifact/GRmVBZW88CrdZbwdJtRv6U (fuente `dist/app.html`, generada con `python3 herramientas/construir.py`; se republica con la misma ruta).
- La app instalable aún no está publicada en ninguna dirección: espera decisión del dueño (MEC-02).
- Gate verde con prueba real en navegador de celular (Playwright, `herramientas/probar-app.js`).

## Siguiente paso
1. Leer `PENDIENTE-DUENO.md` y actuar según lo marcado.
2. Si el dueño dice "sí" a MEC-02: copiar `app/` a `JosefineAuto/web/mecanica/` (o la ruta que elija) y enlazarla desde Josefine Gestión.
3. Añadir contenido según lo que el dueño vaya estudiando o según lo que anote en la Bitácora.

## Lecciones
- **gotcha_pagina-privada** (2026-10-05): en la página privada no funcionan `confirm()` ni las descargas. Causa: el visor las bloquea. Prevención: confirmaciones dentro de la página (`confirmarAqui`) con prueba en `probar-app.js`; en modo página (`window.MODO_PAGINA`) no se ofrece descargar copia.
- **patron_version-sin-conexion** (2026-10-05): si se cambia la app sin subir la VERSION del service worker, los celulares con la app instalada no reciben el cambio. Prevención: `construir.py` pone la huella de los archivos en la VERSION y el gate falla si no está al día.
