/* Portadas de historias destacadas (1080x1080) con el mismo formato que las de Josefine Auto
   (JosefineAuto/herramientas/build/generar-posts.js): círculo claro sobre fondo oscuro, ícono de línea y las 4 rayas de la marca.
   Uso: NODE_PATH="$(npm root -g)" node herramientas/generar-destacadas.js   Salida: instagram/destacada-*.png */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "instagram");
fs.mkdirSync(OUT, { recursive: true });

// Mismo CSS que el original (solo la parte de las destacadas y las rayas)
const CSS = `
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1080px;overflow:hidden}
.f{display:grid;gap:9px;width:300px}.f span{display:block;height:7px;border-radius:7px}
.f span:nth-child(1){background:#3438b8;width:100%}.f span:nth-child(2){background:#14161a;width:88%;margin-left:12%}
.f span:nth-child(3){background:#c8202b;width:62%;margin-left:30%}.f span:nth-child(4){background:#d9a62a;width:40%;margin-left:42%}
.hl{width:1080px;height:1080px;display:grid;place-items:center;background:#14161a}
.hl>div{width:760px;height:760px;border-radius:50%;background:#f6f7f8;display:grid;place-items:center;align-content:center;gap:40px}
.hl svg{width:300px;height:300px}
.hl .f{width:260px}
`;
const F = `<div class="f"><span></span><span></span><span></span><span></span></div>`;

// Íconos en rejilla de 64, trazo 3,5 como los demás
const cuadros = [];
for (let fila = 0; fila < 3; fila++) for (let col = 0; col < 4; col++)
  if ((fila + col) % 2 === 0) cuadros.push(`<rect x="${14 + col * 9}" y="${10 + fila * 8}" width="9" height="8" fill="#14161a" stroke="none"/>`);
const DESTACADAS = [
  // Racing: bandera a cuadros
  ["racing", `<path d="M14 56V8"/><rect x="14" y="10" width="36" height="24" rx="1"/>${cuadros.join("")}`],
  // Mecánica: llave (misma forma que la de Proyectos, a tamaño completo)
  ["mecanica", `<g transform="translate(5 5) scale(2.25)" stroke-width="1.56"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></g>`],
];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const [id, icono] of DESTACADAS) {
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="hl"><div><svg viewBox="0 0 64 64"><g fill="none" stroke="#14161a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${icono}</g></svg>${F}</div></div></body></html>`);
    await p.screenshot({ path: path.join(OUT, `destacada-${id}.png`) });
  }
  await b.close();
  console.log("Portadas:", DESTACADAS.length, "→", OUT);
})();
