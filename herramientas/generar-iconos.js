/* Genera icono-192.png e icono-512.png a partir de app/icono.svg.
   Uso: NODE_PATH="$(npm root -g)" node herramientas/generar-iconos.js */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const app = path.join(__dirname, "..", "app");
  const svg = fs.readFileSync(path.join(app, "icono.svg"), "utf8");
  const navegador = await chromium.launch();
  for (const lado of [192, 512]) {
    const p = await navegador.newPage({ viewport: { width: lado, height: lado } });
    await p.setContent(`<style>html,body{margin:0}svg{display:block;width:${lado}px;height:${lado}px}</style>${svg}`);
    await p.screenshot({ path: path.join(app, `icono-${lado}.png`), omitBackground: true });
    await p.close();
  }
  await navegador.close();
  console.log("Iconos generados");
})();
