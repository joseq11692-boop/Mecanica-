# Josefine Mecánica

Escuela de mecánica de [Josefine Auto](https://github.com/joseq11692-boop/JosefineAuto): una app para el celular con la que el dueño aprende a revisar los carros que compra.

## Qué tiene

| Sección | Para qué |
|---|---|
| **Aprender** | 14 lecciones por sistema (motor, aceite, refrigeración, transmisión, frenos, suspensión, llantas, eléctrico, aire, carrocería, inundación, escáner OBD2, prueba de manejo y kit). Cada una: cómo funciona, piezas, qué revisar al comprar, señales de alarma y mini examen. |
| **Diagnóstico** | 32 síntomas (humo, ruidos, vibraciones, olores, testigos del tablero) con causas probables y qué significan para la compra. Lector de códigos OBD2: explica cualquier código y detalla los 17 genéricos más frecuentes. |
| **Practicar** | Preguntas de todas las lecciones. Las falladas quedan en *Repasar fallos* hasta acertarlas. |
| **Bitácora** | Cada carro que revisas: lo que tú viste, tus códigos, tu veredicto y lo que dijo el taller. Así se compara y se aprende. |

Complementa a **Josefine Gestión** (`JosefineAuto/web/panel/`): allí se evalúa el negocio y se usa el checklist de compra; aquí se aprende a hacer bien esa inspección.

Todo se guarda en el propio celular. No da precios: el costo real lo da el presupuesto escrito del taller. Las cifras técnicas citan su fuente (pantalla *Fuentes*).

## Uso

- Página privada (uso inmediato): ver `CONTINUAR.md`.
- App instalable: carpeta `app/` (pendiente de decidir dónde se publica, ver `PENDIENTE-DUENO.md`).

## Cómo se trabaja

- Reglas: [CLAUDE.md](CLAUDE.md). Normas del dueño: [docs/normas.md](docs/normas.md).
- Para cambiar el contenido solo se edita `app/contenido.js`.
- Después de cambiar `app/`: `python3 herramientas/construir.py` (actualiza la versión sin conexión y `dist/app.html`).
- Gate: `python3 herramientas/check.py; echo EXIT=$?` (lo ejecutan el hook Stop de Claude y el pre-push de `.githooks/`).
- [PENDIENTE-DUENO.md](PENDIENTE-DUENO.md) · [CONTINUAR.md](CONTINUAR.md) · [IDEAS.md](IDEAS.md)
