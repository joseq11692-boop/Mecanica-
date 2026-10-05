/* Prueba la app como en un celular: cada pantalla carga sin errores, sin scroll lateral,
   y lo principal funciona (examen, códigos, síntomas, bitácora que se guarda).
   Uso: NODE_PATH="$(npm root -g)" node herramientas/probar-app.js  (lo ejecuta el gate) */
const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const APP = path.join(RAIZ, "app");
const TIPOS = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json" };

function servidor() {
  return new Promise((ok) => {
    const s = http.createServer((req, res) => {
      const ruta = decodeURIComponent(req.url.split("?")[0]);
      const f = path.join(APP, ruta === "/" ? "index.html" : ruta);
      if (!f.startsWith(APP) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { "Content-Type": TIPOS[path.extname(f)] || "application/octet-stream" });
      fs.createReadStream(f).pipe(res);
    });
    s.listen(0, "127.0.0.1", () => ok(s));
  });
}

function contenido() {
  const vm = require("vm");
  const c = {};
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(APP, "contenido.js"), "utf8") + ";this.__d={LECCIONES};", c);
  return c.__d;
}

let pasos = 0;
function bien(t) { pasos++; console.log("✔ " + t); }
function exige(cond, t) { if (!cond) throw new Error("✘ " + t); bien(t); }

(async () => {
  const s = await servidor();
  const base = `http://127.0.0.1:${s.address().port}/`;
  const navegador = await chromium.launch();
  const errores = [];
  try {
    const ctx = await navegador.newContext({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    p.on("pageerror", (e) => errores.push(e.message));
    p.on("console", (m) => { if (m.type() === "error" && !/^Failed to load resource/.test(m.text())) errores.push(m.text()); });
    p.on("requestfailed", (r) => { if (!/fonts\.(googleapis|gstatic)/.test(r.url())) errores.push("falló " + r.url()); });
    await p.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());

    const { LECCIONES } = contenido();
    const rutas = ["inicio", "aprender", "diagnostico", "codigos", "practicar", "bitacora", "revision/nueva", "glosario", "fuentes"]
      .concat(LECCIONES.map((l) => "leccion/" + l.id));
    await p.goto(base + "#inicio");
    for (const r of rutas) {
      await p.evaluate((h) => { location.hash = h; }, "#" + r);
      await p.waitForFunction(() => document.getElementById("vista").children.length > 0);
      const lateral = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (lateral > 0) throw new Error(`✘ #${r}: scroll lateral de ${lateral}px en celular`);
    }
    exige(errores.length === 0, `${rutas.length} pantallas cargan sin errores ni scroll lateral` + (errores.length ? ": " + errores.join(" | ") : ""));

    // Examen de una lección
    await p.evaluate(() => { location.hash = "#practicar/motor"; });
    await p.click(".opcion >> nth=0");
    await p.waitForSelector("#explica .resultado");
    const quiz = await p.evaluate(() => JSON.parse(localStorage.getItem("josefine-mecanica-v1")).quiz.total);
    exige(quiz === 1, "responder una pregunta muestra la explicación y guarda el resultado");

    // Lector de códigos
    await p.evaluate(() => { location.hash = "#codigos"; });
    await p.fill("#cod", "p0420");
    exige(/catalizador/i.test(await p.textContent("#lectura")), "el lector de códigos explica P0420");
    await p.fill("#cod", "P1234");
    exige(/fabricante/i.test(await p.textContent("#lectura")), "el lector reconoce un código propio de la marca");

    // Síntomas
    await p.evaluate(() => { location.hash = "#diagnostico"; });
    await p.fill("#buscar", "humo");
    exige((await p.locator("#resultados details").count()) >= 3, "la búsqueda de síntomas encuentra resultados");

    // Marcar lección
    await p.evaluate(() => { location.hash = "#leccion/frenos"; });
    await p.click("#marcar");
    exige(await p.evaluate(() => !!JSON.parse(localStorage.getItem("josefine-mecanica-v1")).aprendidas.frenos), "marcar una lección como aprendida se guarda");

    // Bitácora
    await p.evaluate(() => { location.hash = "#revision/nueva"; });
    await p.fill("input[name=carro]", "Toyota Corolla 2016 de prueba");
    await p.fill("input[name=codigos]", "P0300 P0442");
    exige((await p.locator("#codigos-leidos .codigo-linea").count()) === 2, "la bitácora explica los códigos al escribirlos");
    await p.check("input[name=veredicto][value=descuento]");
    await p.click("button[type=submit]");
    await p.waitForFunction(() => location.hash === "#bitacora");
    await p.reload();
    await p.evaluate(() => { location.hash = "#bitacora"; });
    exige(/Toyota Corolla 2016 de prueba/.test(await p.textContent("#vista")), "una revisión de la bitácora se guarda y sigue tras recargar");
    // Borrar con confirmación dentro de la página
    await p.click("#vista .fila >> nth=0");
    await p.click("#borrar");
    await p.click(".confirmar [data-si]");
    await p.waitForFunction(() => location.hash === "#bitacora");
    exige(await p.evaluate(() => JSON.parse(localStorage.getItem("josefine-mecanica-v1")).bitacora.length === 0), "borrar una revisión pide confirmación en la página y la borra");
    exige(/1\/\d+/.test(await (async () => { await p.evaluate(() => { location.hash = "#inicio"; }); return p.textContent(".cifras"); })()), "el inicio cuenta el progreso");

    // Versión de un solo archivo
    const dist = path.join(RAIZ, "dist", "app.html");
    const p2 = await ctx.newPage();
    const errores2 = [];
    p2.on("pageerror", (e) => errores2.push(e.message));
    await p2.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    await p2.goto("file://" + dist + "#aprender");
    await p2.waitForSelector(".fila");
    exige(errores2.length === 0, "la versión de un solo archivo carga sin errores" + (errores2.length ? ": " + errores2.join(" | ") : ""));
  } finally {
    await navegador.close();
    s.close();
  }
  console.log(`Prueba en celular: ${pasos} pasos en verde`);
})().catch((e) => { console.error(e.message); process.exit(1); });
