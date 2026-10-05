/* Josefine Mecánica: app de estudio. Sin servidor: todo se guarda en el propio celular (localStorage). */
(function () {
  "use strict";

  var CLAVE = "josefine-mecanica-v1";
  var vista = document.getElementById("vista");
  var titulo = document.getElementById("titulo");
  var aviso = document.getElementById("aviso");

  /* ---------- Datos guardados ---------- */
  function vacio() { return { aprendidas: {}, quiz: { total: 0, aciertos: 0, fallos: {} }, bitacora: [] }; }
  function cargar() {
    try {
      var d = JSON.parse(localStorage.getItem(CLAVE) || "null");
      if (d && typeof d === "object") {
        var base = vacio();
        return {
          aprendidas: d.aprendidas || base.aprendidas,
          quiz: { total: (d.quiz && d.quiz.total) || 0, aciertos: (d.quiz && d.quiz.aciertos) || 0, fallos: (d.quiz && d.quiz.fallos) || {} },
          bitacora: Array.isArray(d.bitacora) ? d.bitacora : []
        };
      }
    } catch (e) { /* sin almacenamiento: se trabaja en memoria */ }
    return vacio();
  }
  var datos = cargar();
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(datos)); return true; }
    catch (e) { avisar("No se pudo guardar en este navegador."); return false; }
  }

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function avisar(t) {
    aviso.textContent = t; aviso.hidden = false;
    clearTimeout(avisar.t); avisar.t = setTimeout(function () { aviso.hidden = true; }, 2600);
  }
  function leccion(id) { for (var i = 0; i < LECCIONES.length; i++) if (LECCIONES[i].id === id) return LECCIONES[i]; return null; }
  function codigo(c) { for (var i = 0; i < CODIGOS.length; i++) if (CODIGOS[i].c === c) return CODIGOS[i]; return null; }
  var ETIQUETA = { grave: "Grave", atencion: "Atención", leve: "Leve" };
  function chip(nivel) { return '<span class="chip chip--' + nivel + '">' + ETIQUETA[nivel] + "</span>"; }
  function hoy() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function nAprendidas() { return LECCIONES.filter(function (l) { return datos.aprendidas[l.id]; }).length; }
  function todasLasPreguntas() {
    var out = [];
    LECCIONES.forEach(function (l) { l.preguntas.forEach(function (q, i) { out.push({ clave: l.id + ":" + i, leccion: l, q: q }); }); });
    return out;
  }
  function nFallos() { return Object.keys(datos.quiz.fallos).filter(function (k) { return datos.quiz.fallos[k] > 0; }).length; }

  /* ---------- Decodificador de códigos OBD2 (estructura SAE J2012) ---------- */
  var SISTEMA_LETRA = { P: "Motor y transmisión (powertrain)", B: "Carrocería (airbags, cierre, confort)", C: "Chasis (ABS, suspensión, dirección)", U: "Comunicación entre computadoras" };
  var SUBSISTEMA_P = {
    "1": "Mezcla de aire y combustible (medición)", "2": "Mezcla de aire y combustible (inyectores)",
    "3": "Encendido y fallas de encendido", "4": "Control de emisiones", "5": "Velocidad, ralentí y entradas auxiliares",
    "6": "Computadora y salidas", "7": "Transmisión", "8": "Transmisión", "9": "Transmisión"
  };
  function decodificar(txt) {
    var c = String(txt || "").trim().toUpperCase().replace(/\s+/g, "");
    if (!/^[PBCU][0-3][0-9A-F]{3}$/.test(c)) return null;
    var r = { codigo: c, sistema: SISTEMA_LETRA[c[0]] };
    r.tipo = c[1] === "0" ? "Genérico: significa lo mismo en todas las marcas" :
      c[1] === "1" ? "Propio del fabricante: búscalo para tu marca" :
      c[1] === "2" && c[0] === "P" ? "Genérico (rango ampliado)" : "Mixto: genérico o del fabricante según el rango";
    if (c[0] === "P" && (c[1] === "0" || c[1] === "1" || c[1] === "2")) r.sub = SUBSISTEMA_P[c[2]] || "";
    r.conocido = codigo(c);
    return r;
  }

  /* ---------- Vistas ---------- */
  var rutas = {
    inicio: vInicio, aprender: vAprender, leccion: vLeccion, diagnostico: vDiagnostico,
    codigos: vCodigos, practicar: vPracticar, bitacora: vBitacora, revision: vRevision,
    glosario: vGlosario, fuentes: vFuentes
  };
  var NAV = { inicio: "inicio", aprender: "aprender", leccion: "aprender", diagnostico: "diagnostico", codigos: "diagnostico", practicar: "practicar", bitacora: "bitacora", revision: "bitacora", glosario: "inicio", fuentes: "inicio" };

  function render() {
    var h = (location.hash || "#inicio").slice(1).split("/");
    var ruta = rutas[h[0]] ? h[0] : "inicio";
    var arg = h.slice(1).map(decodeURIComponent);
    vista.innerHTML = "";
    rutas[ruta].apply(null, arg);
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.classList.toggle("activo", a.getAttribute("href") === "#" + NAV[ruta]);
    });
    window.scrollTo(0, 0);
  }

  function poner(t, html) { titulo.textContent = t; document.title = t + " · Josefine Mecánica"; vista.innerHTML = html; }

  function vInicio() {
    var n = nAprendidas(), total = LECCIONES.length;
    var pct = datos.quiz.total ? Math.round(100 * datos.quiz.aciertos / datos.quiz.total) : 0;
    var siguiente = LECCIONES.filter(function (l) { return !datos.aprendidas[l.id]; })[0];
    poner("Inicio",
      '<section class="tarjeta tarjeta--hero">' +
        "<p class=\"etiqueta\">Escuela de mecánica de Josefine Auto</p>" +
        "<h2>Aprende a revisar los carros que compras</h2>" +
        "<p>Lecciones cortas por sistema, diagnóstico por síntoma, códigos del escáner, práctica y una bitácora para comparar lo que tú viste con lo que dice el taller.</p>" +
      "</section>" +
      '<section class="cifras">' +
        '<div class="cifra"><b>' + n + "/" + total + "</b><span>lecciones aprendidas</span></div>" +
        '<div class="cifra"><b>' + (datos.quiz.total ? pct + " %" : "—") + "</b><span>aciertos en práctica</span></div>" +
        '<div class="cifra"><b>' + datos.bitacora.length + "</b><span>carros revisados</span></div>" +
      "</section>" +
      '<div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + n + '"><span style="width:' + Math.round(100 * n / total) + '%"></span></div>' +
      (siguiente ?
        '<a class="tarjeta tarjeta--enlace" href="#leccion/' + siguiente.id + '"><p class="etiqueta">Sigue por aquí</p><h3>' + esc(siguiente.titulo) + "</h3><p>" + esc(siguiente.resumen) + "</p></a>" :
        '<section class="tarjeta"><h3>Todas las lecciones aprendidas</h3><p>Ahora practica con carros reales y apúntalos en la Bitácora.</p></section>') +
      (nFallos() ? '<a class="tarjeta tarjeta--enlace" href="#practicar/fallos"><p class="etiqueta">Repaso</p><h3>' + nFallos() + " preguntas por repasar</h3><p>Las que fallaste. Repásalas hasta acertarlas.</p></a>" : "") +
      '<section class="lista-enlaces">' +
        '<a href="#diagnostico">Diagnóstico por síntoma<span>›</span></a>' +
        '<a href="#codigos">Códigos del escáner OBD2<span>›</span></a>' +
        '<a href="#glosario">Glosario<span>›</span></a>' +
        '<a href="#fuentes">Fuentes de las cifras<span>›</span></a>' +
      "</section>" +
      (window.MODO_PAGINA ? '<section class="tarjeta"><h3>Copia de seguridad</h3><p class="suave">Tus avances viven solo en este navegador. Para descargar copias, usa la app instalable.</p></section>' :
      '<section class="tarjeta" id="copia"><h3>Copia de seguridad</h3><p class="suave">Tus avances viven solo en este celular. Guarda una copia de vez en cuando.</p>' +
        '<div class="botones"><button class="boton boton--sec" id="exportar">Descargar copia</button><label class="boton boton--sec">Cargar copia<input type="file" id="importar" accept="application/json,.json" hidden></label></div></section>')
    );
    if (!window.MODO_PAGINA) {
      document.getElementById("exportar").onclick = exportar;
      document.getElementById("importar").onchange = importar;
    }
  }

  function vAprender() {
    var grupos = {};
    LECCIONES.forEach(function (l) { (grupos[l.sistema] = grupos[l.sistema] || []).push(l); });
    var html = '<p class="suave">' + nAprendidas() + " de " + LECCIONES.length + " aprendidas. Marca cada lección al terminarla y haz su mini examen.</p>";
    Object.keys(grupos).forEach(function (g) {
      html += "<h2>" + esc(g) + '</h2><div class="lista">';
      grupos[g].forEach(function (l) {
        html += '<a class="fila" href="#leccion/' + l.id + '"><span class="fila__marca' + (datos.aprendidas[l.id] ? " hecha" : "") + '" aria-hidden="true"></span><span><b>' + esc(l.titulo) + "</b><small>" + esc(l.resumen) + "</small></span><span class=\"fila__flecha\">›</span></a>";
      });
      html += "</div>";
    });
    poner("Aprender", html);
  }

  function vLeccion(id) {
    var l = leccion(id);
    if (!l) { location.hash = "#aprender"; return; }
    var i = LECCIONES.indexOf(l), sig = LECCIONES[i + 1];
    var html =
      '<a class="volver" href="#aprender">‹ Lecciones</a>' +
      '<section class="tarjeta tarjeta--hero"><p class="etiqueta">' + esc(l.sistema) + "</p><h2>" + esc(l.titulo) + "</h2><p>" + esc(l.resumen) + "</p></section>" +
      '<section class="tarjeta"><h3>Cómo funciona</h3>' + l.funciona.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>" +
      '<section class="tarjeta"><h3>Las piezas</h3><dl class="piezas">' + l.partes.map(function (p) { return "<dt>" + esc(p[0]) + "</dt><dd>" + esc(p[1]) + "</dd>"; }).join("") + "</dl></section>" +
      '<section class="tarjeta"><h3>Qué revisar al comprar</h3><ol class="pasos">' + l.revisar.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol></section>" +
      '<section class="tarjeta"><h3>Señales de alarma</h3><ul class="alarmas">' + l.alarmas.map(function (a) { return "<li>" + chip(a.nivel) + "<span>" + esc(a.texto) + "</span></li>"; }).join("") + "</ul></section>" +
      '<section class="tarjeta tarjeta--dato"><h3>Para la compra</h3><p>' + esc(l.dato) + "</p></section>" +
      '<div class="botones">' +
        '<a class="boton" href="#practicar/' + l.id + '">Mini examen (' + l.preguntas.length + ")</a>" +
        '<button class="boton boton--sec" id="marcar">' + (datos.aprendidas[l.id] ? "✓ Aprendida" : "Marcar como aprendida") + "</button>" +
      "</div>" +
      (sig ? '<a class="tarjeta tarjeta--enlace" href="#leccion/' + sig.id + '"><p class="etiqueta">Siguiente</p><h3>' + esc(sig.titulo) + "</h3></a>" : "");
    poner(l.titulo, html);
    document.getElementById("marcar").onclick = function () {
      if (datos.aprendidas[l.id]) delete datos.aprendidas[l.id]; else datos.aprendidas[l.id] = hoy();
      guardar(); avisar(datos.aprendidas[l.id] ? "Lección marcada como aprendida" : "Marca quitada"); render();
    };
  }

  function vDiagnostico() {
    var grupos = [];
    SINTOMAS.forEach(function (s) { if (grupos.indexOf(s.grupo) < 0) grupos.push(s.grupo); });
    poner("Diagnóstico",
      '<div class="pestanas"><a class="activa" href="#diagnostico">Síntomas</a><a href="#codigos">Códigos OBD2</a></div>' +
      '<p class="suave">¿Qué notas en el carro? Busca el síntoma y mira las causas probables y qué significa para la compra.</p>' +
      '<input class="campo" id="buscar" type="search" placeholder="Busca: humo, golpe, frenar, olor…" autocomplete="off">' +
      '<div class="filtros" id="filtros"><button class="activo" data-g="">Todos</button>' + grupos.map(function (g) { return '<button data-g="' + esc(g) + '">' + esc(g) + "</button>"; }).join("") + "</div>" +
      '<div id="resultados" class="lista-sintomas"></div>'
    );
    var grupo = "", q = document.getElementById("buscar");
    function pintar() {
      var t = q.value.trim().toLowerCase();
      var lista = SINTOMAS.filter(function (s) {
        if (grupo && s.grupo !== grupo) return false;
        if (!t) return true;
        return (s.sintoma + " " + s.causas.join(" ") + " " + s.compra).toLowerCase().indexOf(t) >= 0;
      });
      document.getElementById("resultados").innerHTML = lista.length ? lista.map(function (s) {
        return '<details class="tarjeta sintoma"><summary>' + chip(s.gravedad) + "<b>" + esc(s.sintoma) + "</b></summary>" +
          "<h4>Causas probables</h4><ul>" + s.causas.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
          "<h4>Para la compra</h4><p>" + esc(s.compra) + "</p></details>";
      }).join("") : '<p class="suave">Nada con esa búsqueda. Prueba con otra palabra.</p>';
    }
    q.oninput = pintar;
    document.getElementById("filtros").onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      grupo = b.getAttribute("data-g");
      this.querySelectorAll("button").forEach(function (x) { x.classList.toggle("activo", x === b); });
      pintar();
    };
    pintar();
  }

  function vCodigos(inicial) {
    poner("Códigos OBD2",
      '<div class="pestanas"><a href="#diagnostico">Síntomas</a><a class="activa" href="#codigos">Códigos OBD2</a></div>' +
      '<section class="tarjeta"><h3>Lee un código</h3><p class="suave">Escribe el código que te dio el escáner, por ejemplo P0420.</p>' +
        '<input class="campo campo--codigo" id="cod" maxlength="5" placeholder="P0420" autocomplete="off" autocapitalize="characters" value="' + esc(inicial || "") + '">' +
        '<div id="lectura" aria-live="polite"></div></section>' +
      "<h2>Cómo se lee</h2>" +
      '<section class="tarjeta"><div class="anatomia" aria-label="Partes de un código"><span><b>P</b>sistema</span><span><b>0</b>genérico o de marca</span><span><b>3</b>subsistema</span><span><b>00</b>falla concreta</span></div>' +
        '<p class="suave">Un código dice qué detectó la computadora, no qué pieza cambiar. El taller lo confirma.</p></section>' +
      "<h2>Códigos frecuentes</h2>" +
      '<div class="lista">' + CODIGOS.map(function (k) {
        return '<button class="fila fila--boton" data-c="' + k.c + '"><span class="codigo">' + k.c + "</span><span><b>" + esc(k.t) + "</b></span>" + chip(k.g) + "</button>";
      }).join("") + "</div>"
    );
    var campo = document.getElementById("cod");
    function leer() {
      var r = decodificar(campo.value), out = document.getElementById("lectura");
      if (!campo.value.trim()) { out.innerHTML = ""; return; }
      if (!r) { out.innerHTML = '<p class="suave">Un código tiene una letra (P, B, C o U) y cuatro caracteres. Ejemplo: P0300.</p>'; return; }
      out.innerHTML = '<dl class="piezas">' +
        "<dt>Sistema</dt><dd>" + esc(r.sistema) + "</dd>" +
        "<dt>Tipo</dt><dd>" + esc(r.tipo) + "</dd>" +
        (r.sub ? "<dt>Zona</dt><dd>" + esc(r.sub) + "</dd>" : "") + "</dl>" +
        (r.conocido ? '<div class="tarjeta tarjeta--dato">' + chip(r.conocido.g) + "<h3>" + esc(r.conocido.t) + "</h3><p>" + esc(r.conocido.d) + "</p></div>" :
          '<p class="suave">No está en la lista de frecuentes. Búscalo con la marca y el modelo, o pregúntalo en el taller.</p>');
    }
    campo.oninput = leer;
    vista.querySelectorAll("[data-c]").forEach(function (b) {
      b.onclick = function () { campo.value = b.getAttribute("data-c"); leer(); campo.scrollIntoView({ behavior: "smooth", block: "center" }); };
    });
    leer();
  }

  /* Práctica: preguntas de una lección, de todas o solo las falladas. */
  function vPracticar(modo) {
    var pool = todasLasPreguntas();
    var nombre = "Todas las lecciones";
    if (modo === "fallos") { pool = pool.filter(function (x) { return datos.quiz.fallos[x.clave] > 0; }); nombre = "Repaso de fallos"; }
    else if (modo && leccion(modo)) { pool = pool.filter(function (x) { return x.leccion.id === modo; }); nombre = leccion(modo).titulo; }
    else modo = "";

    if (!pool.length) {
      poner("Practicar", menuPractica() + '<section class="tarjeta"><h3>Nada que repasar</h3><p>No tienes preguntas falladas pendientes. ¡Bien!</p></section>');
      return;
    }
    pool = barajar(pool.slice());
    var i = 0, bien = 0;

    function pregunta() {
      if (i >= pool.length) return fin();
      var x = pool[i];
      var orden = barajar(x.q.o.map(function (t, k) { return k; }));
      poner("Practicar", menuPractica(modo) +
        '<p class="suave">' + esc(nombre) + " · pregunta " + (i + 1) + " de " + pool.length + "</p>" +
        '<section class="tarjeta"><p class="etiqueta">' + esc(x.leccion.titulo) + "</p><h3>" + esc(x.q.p) + "</h3>" +
        '<div class="opciones">' + orden.map(function (k) { return '<button class="opcion" data-k="' + k + '">' + esc(x.q.o[k]) + "</button>"; }).join("") + "</div>" +
        '<div id="explica" aria-live="polite"></div></section>');
      vista.querySelectorAll(".opcion").forEach(function (b) {
        b.onclick = function () {
          var k = +b.getAttribute("data-k"), ok = k === x.q.c;
          vista.querySelectorAll(".opcion").forEach(function (o) {
            o.disabled = true;
            if (+o.getAttribute("data-k") === x.q.c) o.classList.add("correcta");
          });
          if (!ok) b.classList.add("mala");
          datos.quiz.total++;
          if (ok) { datos.quiz.aciertos++; bien++; if (datos.quiz.fallos[x.clave]) datos.quiz.fallos[x.clave]--; }
          else datos.quiz.fallos[x.clave] = (datos.quiz.fallos[x.clave] || 0) + 1;
          if (datos.quiz.fallos[x.clave] === 0) delete datos.quiz.fallos[x.clave];
          guardar();
          document.getElementById("explica").innerHTML = '<p class="resultado ' + (ok ? "resultado--ok" : "resultado--mal") + '">' + (ok ? "¡Correcto!" : "No es esa.") + "</p><p>" + esc(x.q.e) + "</p>" +
            '<button class="boton" id="siguiente">' + (i + 1 < pool.length ? "Siguiente" : "Ver resultado") + "</button>";
          document.getElementById("siguiente").onclick = function () { i++; pregunta(); };
        };
      });
    }
    function fin() {
      var l = leccion(modo), todo = bien === pool.length;
      poner("Practicar", menuPractica(modo) +
        '<section class="tarjeta tarjeta--hero"><p class="etiqueta">' + esc(nombre) + "</p><h2>" + bien + " de " + pool.length + "</h2><p>" +
        (todo ? "Perfecto." : "Las falladas quedan en Repaso para la próxima.") + "</p></section>" +
        '<div class="botones"><a class="boton" href="#practicar/' + (modo || "todas") + '" id="otra">Otra vez</a>' +
        (l && todo && !datos.aprendidas[l.id] ? '<button class="boton boton--sec" id="marcar">Marcar lección como aprendida</button>' : "") + "</div>");
      document.getElementById("otra").onclick = function (e) { e.preventDefault(); vPracticar(modo); };
      var m = document.getElementById("marcar");
      if (m) m.onclick = function () { datos.aprendidas[l.id] = hoy(); guardar(); avisar("Lección marcada como aprendida"); location.hash = "#leccion/" + l.id; };
    }
    pregunta();
  }
  function menuPractica(modo) {
    return '<div class="filtros"><a class="' + (!modo || modo === "todas" ? "activo" : "") + '" href="#practicar">Todo</a>' +
      '<a class="' + (modo === "fallos" ? "activo" : "") + '" href="#practicar/fallos">Repasar fallos (' + nFallos() + ")</a>" +
      '<a href="#aprender">Por lección</a></div>';
  }
  function barajar(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* Bitácora: cada carro que revisas, lo que tú viste y lo que dijo el taller. */
  var AREAS = [
    ["papeles", "Papeles y VIN"], ["carroceria", "Carrocería y chasis"], ["inundacion", "Interior e inundación"],
    ["motor", "Motor, aceite y refrigerante"], ["obd", "Escáner (códigos y monitores)"], ["manejo", "Prueba de manejo"],
    ["llantas", "Llantas, frenos y suspensión"]
  ];
  var VEREDICTOS = { comprar: "Lo compraría", descuento: "Con descuento", descartar: "Lo descartaría" };

  function vBitacora() {
    var lista = datos.bitacora.slice().sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
    poner("Bitácora",
      '<p class="suave">Apunta cada carro que revises. Después compara tu diagnóstico con el del taller: así se aprende de verdad.</p>' +
      '<a class="boton" href="#revision/nueva">+ Nueva revisión</a>' +
      (lista.length ? '<div class="lista">' + lista.map(function (r) {
        return '<a class="fila" href="#revision/' + esc(r.id) + '"><span><b>' + esc(r.carro || "Sin nombre") + "</b><small>" + esc(r.fecha || "") + (r.veredicto ? " · " + esc(VEREDICTOS[r.veredicto]) : "") + (r.taller ? " · con informe del taller" : "") + "</small></span><span class=\"fila__flecha\">›</span></a>";
      }).join("") + "</div>" : '<section class="tarjeta"><h3>Aún no hay carros</h3><p>Cuando vayas a ver uno (aunque no lo compres), apúntalo aquí.</p></section>')
    );
  }

  function vRevision(id) {
    var nueva = id === "nueva";
    var r = nueva ? { id: "r" + Date.now(), fecha: hoy(), carro: "", km: "", notas: {}, codigos: "", veredicto: "", taller: "", aprendi: "" } :
      datos.bitacora.filter(function (x) { return x.id === id; })[0];
    if (!r) { location.hash = "#bitacora"; return; }
    var notas = r.notas || {};
    poner(nueva ? "Nueva revisión" : "Revisión",
      '<a class="volver" href="#bitacora">‹ Bitácora</a>' +
      '<form id="form" class="formulario" autocomplete="off">' +
        '<label>Carro (marca, modelo y año)<input class="campo" name="carro" required value="' + esc(r.carro) + '" placeholder="Toyota Corolla 2016"></label>' +
        '<div class="dos"><label>Fecha<input class="campo" type="date" name="fecha" value="' + esc(r.fecha) + '"></label>' +
        '<label>Km<input class="campo" name="km" inputmode="numeric" value="' + esc(r.km) + '"></label></div>' +
        "<h2>Lo que yo vi</h2>" +
        AREAS.map(function (a) { return "<label>" + a[1] + '<textarea class="campo" name="n-' + a[0] + '" rows="2">' + esc(notas[a[0]] || "") + "</textarea></label>"; }).join("") +
        '<label>Códigos del escáner (separados por espacios)<input class="campo" name="codigos" value="' + esc(r.codigos) + '" placeholder="P0420 P0171" autocapitalize="characters"></label>' +
        '<div id="codigos-leidos"></div>' +
        "<fieldset><legend>Mi veredicto</legend>" + Object.keys(VEREDICTOS).map(function (k) {
          return '<label class="radio"><input type="radio" name="veredicto" value="' + k + '"' + (r.veredicto === k ? " checked" : "") + "> " + VEREDICTOS[k] + "</label>";
        }).join("") + "</fieldset>" +
        "<h2>Lo que dijo el taller</h2>" +
        '<label>Informe o presupuesto del mecánico<textarea class="campo" name="taller" rows="3">' + esc(r.taller) + "</textarea></label>" +
        '<label>¿Qué aprendí? (lo que se me pasó o acerté)<textarea class="campo" name="aprendi" rows="3">' + esc(r.aprendi) + "</textarea></label>" +
        '<div class="botones"><button class="boton" type="submit">Guardar</button>' + (nueva ? "" : '<button class="boton boton--peligro" type="button" id="borrar">Borrar</button>') + "</div>" +
      "</form>"
    );
    var form = document.getElementById("form");
    function leerCodigos() {
      var cods = form.codigos.value.toUpperCase().split(/[\s,;]+/).filter(Boolean);
      document.getElementById("codigos-leidos").innerHTML = cods.map(function (c) {
        var d = decodificar(c);
        if (!d) return '<p class="suave">' + esc(c) + ": no parece un código válido.</p>";
        return '<p class="codigo-linea"><span class="codigo">' + esc(d.codigo) + "</span> " + esc(d.conocido ? d.conocido.t : d.sistema + (d.sub ? " · " + d.sub : "")) + "</p>";
      }).join("");
    }
    form.codigos.oninput = leerCodigos; leerCodigos();
    form.onsubmit = function (e) {
      e.preventDefault();
      r.carro = form.carro.value.trim(); r.fecha = form.fecha.value; r.km = form.km.value.trim();
      r.codigos = form.codigos.value.trim().toUpperCase(); r.taller = form.taller.value.trim(); r.aprendi = form.aprendi.value.trim();
      var v = form.querySelector("input[name=veredicto]:checked"); r.veredicto = v ? v.value : "";
      r.notas = {}; AREAS.forEach(function (a) { var t = form["n-" + a[0]].value.trim(); if (t) r.notas[a[0]] = t; });
      if (nueva) datos.bitacora.push(r);
      if (guardar()) avisar("Revisión guardada");
      location.hash = "#bitacora";
    };
    var b = document.getElementById("borrar");
    if (b) b.onclick = function () {
      confirmarAqui(b.parentNode, "¿Borrar esta revisión? No se puede deshacer.", "Sí, borrar", function () {
        datos.bitacora = datos.bitacora.filter(function (x) { return x.id !== r.id; });
        guardar(); avisar("Revisión borrada"); location.hash = "#bitacora";
      });
    };
  }

  function vGlosario() {
    poner("Glosario",
      '<a class="volver" href="#inicio">‹ Inicio</a><input class="campo" id="buscar" type="search" placeholder="Busca una palabra" autocomplete="off">' +
      '<section class="tarjeta"><dl class="piezas" id="terminos"></dl></section>');
    var q = document.getElementById("buscar");
    function pintar() {
      var t = q.value.trim().toLowerCase();
      document.getElementById("terminos").innerHTML = GLOSARIO.filter(function (g) { return !t || (g[0] + " " + g[1]).toLowerCase().indexOf(t) >= 0; })
        .map(function (g) { return "<dt>" + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd>"; }).join("");
    }
    q.oninput = pintar; pintar();
  }

  function vFuentes() {
    poner("Fuentes",
      '<a class="volver" href="#inicio">‹ Inicio</a><p class="suave">De dónde salen las cifras y definiciones técnicas de esta app. La app no da precios: el costo real lo da el presupuesto escrito del taller.</p>' +
      '<div class="lista">' + FUENTES.map(function (f) {
        return '<a class="fila" href="' + esc(f.url) + '" target="_blank" rel="noopener"><span><b>' + esc(f.nombre) + "</b><small>" + esc(f.tema) + "</small></span><span class=\"fila__flecha\">↗</span></a>";
      }).join("") + "</div>");
  }

  /* Confirmación dentro de la página: los avisos del navegador (confirm) no funcionan en todas partes. */
  function confirmarAqui(donde, texto, boton, alAceptar) {
    var viejo = donde.querySelector(".confirmar"); if (viejo) viejo.remove();
    var caja = document.createElement("div");
    caja.className = "confirmar"; caja.setAttribute("role", "alert");
    caja.innerHTML = "<p>" + esc(texto) + '</p><div class="botones"><button type="button" class="boton boton--peligro" data-si>' + esc(boton) + '</button><button type="button" class="boton boton--sec" data-no>Cancelar</button></div>';
    donde.appendChild(caja);
    caja.querySelector("[data-si]").onclick = alAceptar;
    caja.querySelector("[data-no]").onclick = function () { caja.remove(); };
    caja.querySelector("[data-no]").focus();
  }

  /* ---------- Copia de seguridad ---------- */
  function exportar() {
    var blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "josefine-mecanica-" + hoy() + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function importar(e) {
    var f = e.target.files[0]; if (!f) return;
    var lector = new FileReader();
    lector.onload = function () {
      try {
        var d = JSON.parse(lector.result);
        if (!d || typeof d !== "object" || !d.quiz || !Array.isArray(d.bitacora)) throw new Error("formato");
        confirmarAqui(document.getElementById("copia"), "Esto reemplaza tus avances actuales por los de la copia.", "Sí, cargar la copia", function () {
          datos = { aprendidas: d.aprendidas || {}, quiz: { total: d.quiz.total || 0, aciertos: d.quiz.aciertos || 0, fallos: d.quiz.fallos || {} }, bitacora: d.bitacora };
          guardar(); avisar("Copia cargada"); render();
        });
      } catch (err) { avisar("Ese archivo no es una copia de Josefine Mecánica."); }
    };
    lector.readAsText(f);
  }

  window.addEventListener("hashchange", render);
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(function () { /* sin conexión offline: la app sigue funcionando */ });
  }
})();
