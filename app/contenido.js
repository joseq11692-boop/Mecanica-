/* Josefine Mecánica: todo el contenido de estudio. Para añadir o corregir algo, solo se edita este archivo.
   Cifras: cada número técnico lleva su fuente en FUENTES (al final). Nada de precios: el costo real lo da
   el presupuesto escrito del taller, que se mete en la calculadora de Josefine Auto. */

var LECCIONES = [
  {
    id: "kit",
    titulo: "Tu kit de inspección",
    sistema: "Antes de empezar",
    resumen: "Lo que llevas cuando vas a ver un carro y para qué sirve cada cosa.",
    funciona: [
      "Revisar un carro es comparar lo que te dicen con lo que ves, oyes, hueles y mide el escáner. Con pocas herramientas descubres casi todo lo que un vendedor puede esconder.",
      "Ve siempre de día, con tiempo y pide que el motor esté frío. Un carro calentado antes de que llegues puede esconder ruidos de arranque y humo."
    ],
    partes: [
      ["Escáner OBD2", "Lee los códigos de error y los monitores de la computadora del carro. Es lo más importante del kit."],
      ["Linterna", "Para mirar bajos, fugas, el interior del motor y debajo de las alfombras."],
      ["Imán envuelto en un trapo", "No se pega donde hay mucha masilla: delata golpes reparados. El trapo evita rayar."],
      ["Medidor de pintura (si lo tienes)", "Mide el grosor de la pintura panel por panel. Lo que importa es comparar: un panel mucho más grueso que los demás fue repintado."],
      ["Papel toalla blanco", "Para ver el color real del aceite, del líquido de transmisión y del refrigerante."],
      ["Guantes y ropa que se pueda manchar", "Vas a tocar aceite y a mirar debajo del carro."],
      ["Multímetro", "Mide el voltaje de la batería y si el alternador carga."],
      ["Medidor de profundidad de llanta o una moneda", "Para saber cuánto dibujo le queda a cada llanta."],
      ["Celular", "Fotos de todo: VIN, placas, defectos, tablero encendido. Te sirven para negociar y para aprender después."]
    ],
    revisar: [
      "Antes de ir: pide el VIN y fotos del tablero con el motor encendido.",
      "Al llegar: toca el capó. Si está caliente, pregunta por qué y pide volver otro día o esperar a que enfríe.",
      "Sigue siempre el mismo orden: papeles, carrocería, interior, motor en frío, escáner, prueba de manejo, bajos después de la prueba.",
      "Apunta todo en la Bitácora de esta app y compáralo después con lo que diga el taller."
    ],
    alarmas: [
      { nivel: "grave", texto: "El vendedor no te deja escanear el carro o no quiere que lo veas en frío." },
      { nivel: "atencion", texto: "Te cita de noche o bajo la lluvia: así no se ve bien la pintura ni las fugas." }
    ],
    dato: "Un orden fijo vale más que la experiencia: así nunca se te olvida un paso, aunque el vendedor te hable todo el rato.",
    preguntas: [
      { p: "¿Para qué sirve el imán envuelto en un trapo?", o: ["Para medir la batería", "Para encontrar masilla de golpes reparados", "Para revisar el aceite"], c: 1, e: "La masilla no es metálica: donde hay mucha, el imán no se pega o se pega débil." },
      { p: "Llegas y el capó está caliente. ¿Qué haces?", o: ["Nada, es normal", "Pregunto por qué y pido verlo en frío", "Lo arranco enseguida"], c: 1, e: "El arranque en frío es cuando salen ruidos y humo. Un motor calentado puede esconderlos." }
    ]
  },
  {
    id: "motor",
    titulo: "El motor",
    sistema: "Motor",
    resumen: "Cómo convierte gasolina en movimiento y cómo se nota un motor cansado.",
    funciona: [
      "Casi todos los motores de gasolina trabajan en cuatro tiempos. Admisión: el pistón baja y entra aire con combustible. Compresión: el pistón sube y aprieta la mezcla. Explosión: la bujía la enciende y empuja el pistón hacia abajo. Escape: el pistón sube y saca los gases por el escape.",
      "Los pistones mueven el cigüeñal, que gira y manda la fuerza a la transmisión. El árbol de levas abre y cierra las válvulas en el momento justo; va sincronizado con el cigüeñal por una correa o una cadena de distribución.",
      "Entre el bloque (abajo) y la culata (arriba) hay una junta, la junta de culata. Si falla, el aceite y el refrigerante se mezclan o el refrigerante se quema: es una de las averías más caras."
    ],
    partes: [
      ["Bloque", "La pieza grande donde se mueven los pistones."],
      ["Culata", "La tapa de arriba, con las válvulas y el árbol de levas."],
      ["Junta de culata", "Sella entre bloque y culata. Si se quema, se mezclan líquidos."],
      ["Pistones y bielas", "Suben y bajan; las bielas los unen al cigüeñal."],
      ["Cigüeñal", "Convierte el sube y baja en giro."],
      ["Correa o cadena de distribución", "Sincroniza válvulas y pistones. Si una correa se rompe, en muchos motores las válvulas chocan con los pistones."],
      ["Bujías y bobinas", "Hacen la chispa. Si una falla, el motor tiembla (falla de encendido)."],
      ["Soportes del motor", "Gomas que lo sujetan al chasis. Gastados, el motor vibra y da golpes al arrancar o cambiar."]
    ],
    revisar: [
      "Con el motor frío, pide que lo arranquen mientras miras el escape y escuchas el motor con el capó abierto.",
      "Escucha los primeros segundos: un tic-tac rápido que desaparece puede ser normal; un golpeteo profundo que sigue con el motor caliente no lo es.",
      "Mira el escape: un poco de vapor blanco que se va en un minuto es condensación normal. Humo azul, negro o blanco espeso que no se va, no.",
      "En ralentí, el motor debe estar estable. Si tiembla o las revoluciones suben y bajan solas, anota y busca códigos de falla de encendido con el escáner.",
      "Pide a alguien que acelere un poco con el capó abierto: si el motor salta mucho, los soportes pueden estar rotos.",
      "Busca fugas de aceite alrededor de la tapa de válvulas, el cárter y donde se une el motor con la transmisión.",
      "Pregunta cuándo se cambió la correa de distribución, si la tiene. El intervalo lo marca el manual de mantenimiento del fabricante; pide la factura."
    ],
    alarmas: [
      { nivel: "grave", texto: "Golpeteo metálico profundo que aumenta con las revoluciones: puede ser biela o cojinetes." },
      { nivel: "grave", texto: "Humo blanco espeso y dulce que no se va con el motor caliente: refrigerante quemándose (posible junta de culata)." },
      { nivel: "grave", texto: "Humo azul constante: el motor quema aceite (anillos o sellos de válvulas)." },
      { nivel: "atencion", texto: "Humo negro: mezcla demasiado rica (inyectores, sensores, filtro de aire)." },
      { nivel: "atencion", texto: "Correa de distribución sin factura y con muchos km: inclúyela en el presupuesto del taller." }
    ],
    dato: "El motor es la pieza más cara de reparar. Si dudas del motor, prueba de compresión en el taller antes de pagar.",
    preguntas: [
      { p: "¿Qué une el árbol de levas con el cigüeñal?", o: ["La junta de culata", "La correa o cadena de distribución", "El alternador"], c: 1, e: "La distribución mantiene válvulas y pistones sincronizados." },
      { p: "Humo azul constante por el escape significa normalmente…", o: ["Que quema aceite", "Que es condensación", "Que la batería está baja"], c: 0, e: "El aceite quemado da humo azulado. Suele ser anillos o sellos de válvulas gastados." },
      { p: "¿Cuál es el orden de los cuatro tiempos?", o: ["Compresión, admisión, escape, explosión", "Admisión, compresión, explosión, escape", "Explosión, admisión, compresión, escape"], c: 1, e: "Entra la mezcla, se comprime, explota y sale." },
      { p: "Vapor blanco fino al arrancar en frío que desaparece en un minuto es…", o: ["Junta de culata seguro", "Normalmente condensación", "Aceite quemado"], c: 1, e: "Es agua del escape. Lo preocupante es el humo blanco espeso que sigue con el motor caliente." }
    ]
  },
  {
    id: "aceite",
    titulo: "Aceite y lubricación",
    sistema: "Motor",
    resumen: "Leer la varilla te cuenta la vida del motor en 30 segundos.",
    funciona: [
      "El aceite evita que las piezas metálicas del motor se toquen. Una bomba lo empuja por todo el motor y un filtro lo limpia. Con el uso se ensucia y pierde propiedades: por eso se cambia según el manual.",
      "La varilla mide el nivel. Algunos carros modernos no tienen varilla y el nivel se ve en la pantalla del tablero."
    ],
    partes: [
      ["Varilla", "Muestra el nivel entre las marcas mínimo y máximo."],
      ["Tapón de llenado", "Arriba del motor. Por dentro te dice mucho del estado."],
      ["Filtro de aceite", "Se cambia con el aceite."],
      ["Cárter", "El depósito de abajo del motor."],
      ["Testigo de presión de aceite", "La lámpara roja con forma de aceitera."]
    ],
    revisar: [
      "Con el carro en plano y el motor frío, saca la varilla, límpiala, métela de nuevo y vuelve a sacarla.",
      "El nivel debe estar entre las dos marcas. Muy bajo: puede consumir o perder aceite.",
      "Pon una gota en papel blanco: marrón o negro es normal según el uso; lo importante es que no esté lechoso ni con brillos metálicos.",
      "Huele la varilla: olor fuerte a gasolina puede indicar problemas de mezcla o de inyectores.",
      "Abre el tapón de llenado y mira por dentro: una pasta color café con leche es mala señal; lodo negro espeso indica cambios de aceite olvidados.",
      "Pide las facturas de cambios de aceite: lo normal es que cuadren con los km."
    ],
    alarmas: [
      { nivel: "grave", texto: "Aceite lechoso o color café con leche en la varilla: agua o refrigerante en el aceite (posible junta de culata)." },
      { nivel: "grave", texto: "Brillos metálicos en el aceite: piezas del motor se están desgastando." },
      { nivel: "grave", texto: "Testigo de presión de aceite encendido con el motor en marcha." },
      { nivel: "atencion", texto: "Lodo negro bajo el tapón: mantenimiento descuidado." },
      { nivel: "atencion", texto: "Aceite recién cambiado y muy limpio en un carro sin facturas: pueden estar escondiendo el estado real." }
    ],
    dato: "Un poco de pasta clara bajo el tapón puede aparecer por condensación en carros que hacen trayectos muy cortos. Por eso se cruza con el refrigerante y con el humo antes de decidir.",
    preguntas: [
      { p: "Sacas la varilla y el aceite parece café con leche. ¿Qué piensas?", o: ["Aceite nuevo", "Posible mezcla con refrigerante", "Normal en Panamá"], c: 1, e: "El aspecto lechoso es agua o refrigerante mezclado. Se descarta o se manda a taller." },
      { p: "¿Cómo se mide bien el nivel?", o: ["Con el motor encendido", "En plano, motor frío, limpiando la varilla y volviendo a meterla", "Mirando el tapón"], c: 1, e: "La primera lectura puede estar sucia; la segunda es la buena." }
    ]
  },
  {
    id: "refrigeracion",
    titulo: "Refrigeración",
    sistema: "Motor",
    resumen: "Lo que mantiene el motor a temperatura. En el calor de Panamá, clave.",
    funciona: [
      "El refrigerante circula por el motor y se lleva el calor al radiador, donde el aire lo enfría. La bomba de agua lo mueve, el termostato decide cuándo pasa al radiador y el ventilador ayuda cuando el carro va lento.",
      "Si el motor se recalienta, la culata se puede deformar y la junta de culata se quema. Un carro que se ha recalentado mucho puede tener daños que no se ven."
    ],
    partes: [
      ["Radiador", "Enfría el refrigerante con el aire."],
      ["Depósito de expansión", "El envase plástico con marcas mínimo y máximo."],
      ["Bomba de agua", "Hace circular el refrigerante."],
      ["Termostato", "Válvula que abre el paso al radiador cuando el motor está caliente."],
      ["Ventilador", "Sopla aire por el radiador en el tráfico."],
      ["Mangueras", "Llevan el refrigerante. Con los años se agrietan."]
    ],
    revisar: [
      "Nunca abras la tapa del radiador con el motor caliente: el líquido sale hirviendo.",
      "En frío, mira el depósito: nivel entre mínimo y máximo, color limpio, sin aceite flotando.",
      "Busca manchas secas blancas, verdes o rosadas alrededor de mangueras, radiador y bomba de agua: son fugas antiguas.",
      "Aprieta las mangueras en frío: deben estar firmes, ni duras como piedra ni blandas.",
      "En la prueba de manejo, déjalo en ralentí en el tráfico con el aire acondicionado puesto: la aguja de temperatura no debe subir. El ventilador debe encender.",
      "Si el escáner lo permite, mira la temperatura del refrigerante en datos en vivo."
    ],
    alarmas: [
      { nivel: "grave", texto: "Aceite o una capa marrón en el refrigerante: posible junta de culata." },
      { nivel: "grave", texto: "Burbujas constantes en el depósito con el motor en marcha: gases del motor entrando al refrigerante." },
      { nivel: "grave", texto: "La temperatura sube en el tráfico o en la prueba." },
      { nivel: "atencion", texto: "Olor dulce dentro del carro o vaho en los vidrios: posible fuga en el radiador de la calefacción." },
      { nivel: "atencion", texto: "Refrigerante oxidado o solo agua en el depósito: mantenimiento descuidado." }
    ],
    dato: "Pregunta siempre: ¿se ha recalentado alguna vez? Y compara la respuesta con lo que ves.",
    preguntas: [
      { p: "¿Qué pieza decide cuándo pasa el refrigerante al radiador?", o: ["La bomba de agua", "El termostato", "El ventilador"], c: 1, e: "El termostato abre cuando el motor llega a su temperatura de trabajo." },
      { p: "¿Cuándo se puede abrir la tapa del radiador?", o: ["Siempre", "Solo con el motor frío", "Con el motor encendido"], c: 1, e: "En caliente el sistema tiene presión y el líquido sale hirviendo." },
      { p: "Ves burbujas constantes en el depósito con el motor en marcha. ¿Qué puede ser?", o: ["Gases del motor en el refrigerante", "Normal", "Falta de aceite"], c: 0, e: "Es una señal típica de junta de culata dañada." }
    ]
  },
  {
    id: "transmision",
    titulo: "Transmisión y embrague",
    sistema: "Transmisión",
    resumen: "Manual, automática y CVT: cómo probarlas y qué te dice cada golpe.",
    funciona: [
      "La transmisión cambia la relación entre las revoluciones del motor y las ruedas. Sin ella, el carro no podría arrancar con fuerza ni ir rápido.",
      "Manual: el embrague (el pedal de la izquierda) separa el motor de la caja para cambiar de marcha. El disco de embrague se gasta con el uso.",
      "Automática: cambia sola usando presión de aceite (ATF) y una computadora. Un convertidor de par hace el trabajo del embrague.",
      "CVT: no tiene marchas fijas; usa una correa o cadena entre dos poleas que cambian de tamaño. Se siente como una aceleración continua, sin saltos. Es sensible a que se le cambie el aceite a tiempo y a que no la maltraten.",
      "El diferencial reparte la fuerza entre las ruedas de un mismo eje y les deja girar a distinta velocidad en las curvas."
    ],
    partes: [
      ["Embrague", "Disco, plato y collarín. Se gasta con el uso."],
      ["Caja de cambios", "Los engranajes."],
      ["ATF / aceite de transmisión", "Lubrica y, en las automáticas, también acciona los cambios."],
      ["Convertidor de par", "En las automáticas, une motor y caja."],
      ["Diferencial", "Reparte la fuerza a las ruedas."],
      ["Juntas homocinéticas (palieres)", "Llevan la fuerza a las ruedas que giran y se mueven. Van cubiertas por guardapolvos de goma."]
    ],
    revisar: [
      "Automática: con el pie en el freno, pasa de P a R y a D. Debe entrar en un segundo, con un toque suave, no un golpe fuerte.",
      "En la prueba, acelera suave y luego fuerte: los cambios deben ser limpios, sin patinar (que suban las revoluciones sin que el carro acelere) ni dar tirones.",
      "Si la caja tiene varilla, mira el ATF en papel blanco: rojizo o marrón claro; huele: no debe oler a quemado.",
      "Manual: el pedal debe agarrar a una altura normal. Para ver si patina, en una marcha alta y a pocas revoluciones acelera a fondo un momento: si suben las revoluciones y el carro no acelera, el embrague patina.",
      "Manual: escucha ruidos al pisar y soltar el embrague, y si las marchas entran duras o rascan.",
      "CVT: un zumbido o silbido que sube con la velocidad, tirones al arrancar o sensación de que patina son malas señales.",
      "Gira el volante a tope y avanza despacio en círculo: un clic-clic repetido suele ser una junta homocinética gastada. Mira que los guardapolvos no estén rotos ni con grasa fuera.",
      "Escanea códigos de transmisión (los que empiezan por P07) y, si el escáner lo muestra, la temperatura de la transmisión."
    ],
    alarmas: [
      { nivel: "grave", texto: "La transmisión o el embrague patinan." },
      { nivel: "grave", texto: "Golpe fuerte al poner D o R, o tarda varios segundos en engranar." },
      { nivel: "grave", texto: "ATF negro y con olor a quemado." },
      { nivel: "atencion", texto: "Zumbido en una CVT o cambios bruscos de vez en cuando." },
      { nivel: "atencion", texto: "Clic-clic al girar a tope: junta homocinética." }
    ],
    dato: "Una transmisión automática o CVT dañada puede costar una parte grande del valor del carro. Si hay dudas, al taller antes de pagar.",
    preguntas: [
      { p: "En una manual, aceleras a fondo en marcha alta y suben las revoluciones pero el carro no acelera. ¿Qué pasa?", o: ["El embrague patina", "Normal", "Le falta aceite al motor"], c: 0, e: "El disco ya no transmite toda la fuerza: hay que cambiar el embrague." },
      { p: "Un clic-clic al girar a tope y avanzar despacio suele ser…", o: ["La batería", "Una junta homocinética", "El alternador"], c: 1, e: "Las juntas homocinéticas gastadas hacen ese ruido en curvas cerradas." },
      { p: "¿Qué es una CVT?", o: ["Una caja manual de 6 marchas", "Una caja sin marchas fijas, con correa y poleas", "Un tipo de freno"], c: 1, e: "Variación continua: no hay saltos entre marchas." }
    ]
  },
  {
    id: "frenos",
    titulo: "Frenos",
    sistema: "Seguridad",
    resumen: "Ruidos, vibraciones y pedal: qué te dice cada uno.",
    funciona: [
      "Al pisar el pedal, el líquido de frenos empuja unos pistones (en las pinzas) que aprietan las pastillas contra los discos. En algunos carros, atrás hay tambores en lugar de discos.",
      "El ABS evita que las ruedas se bloqueen en una frenada fuerte: notarás vibraciones en el pedal cuando actúa, y eso es normal.",
      "El líquido de frenos absorbe humedad con el tiempo y se oscurece; por eso se cambia según el manual."
    ],
    partes: [
      ["Discos", "Giran con la rueda. Con el uso se gastan y forman un escalón en el borde."],
      ["Pastillas", "Aprietan el disco. Muchas traen un aviso metálico que chilla cuando se acaban."],
      ["Pinzas (cálipers)", "Sujetan las pastillas y las empujan."],
      ["Líquido de frenos", "Transmite la fuerza del pedal."],
      ["ABS", "Evita el bloqueo de las ruedas."]
    ],
    revisar: [
      "Mira los discos entre los rayos del rin: un escalón marcado en el borde o surcos profundos indican desgaste.",
      "Mira el depósito de líquido: nivel bien y color claro; muy oscuro indica que no se ha cambiado.",
      "Con el motor encendido, el pedal debe quedar firme y alto; no debe hundirse poco a poco si lo mantienes pisado.",
      "En la prueba: frena suave y fuerte en una recta segura. Debe frenar recto, sin vibrar el volante ni el pedal (fuera de cuando actúa el ABS) y sin ruidos.",
      "Después de la prueba, acerca la mano a los rines sin tocar: si uno está mucho más caliente que los demás, ese freno puede estar pegado."
    ],
    alarmas: [
      { nivel: "grave", texto: "Pedal esponjoso o que se hunde: aire o fuga en el sistema." },
      { nivel: "grave", texto: "Ruido de metal con metal al frenar: pastillas acabadas, el disco se está dañando." },
      { nivel: "grave", texto: "Testigo rojo de frenos encendido." },
      { nivel: "atencion", texto: "Vibración en el volante al frenar: discos deformados." },
      { nivel: "atencion", texto: "El carro se va hacia un lado al frenar: pinza pegada o desgaste desigual." }
    ],
    dato: "Pastillas y discos son mantenimiento normal: no descartan un carro, pero se descuentan del precio con el presupuesto del taller.",
    preguntas: [
      { p: "Al frenar vibra el volante. Lo más probable es…", o: ["Discos deformados", "Batería baja", "Embrague gastado"], c: 0, e: "Los discos deformados hacen que la pastilla apriete de forma irregular." },
      { p: "El pedal de freno se hunde poco a poco si lo mantienes pisado. ¿Qué indica?", o: ["Normal", "Fuga o problema en el sistema hidráulico", "Que tiene ABS"], c: 1, e: "Es un problema de seguridad: se revisa antes de comprar." },
      { p: "En una frenada fuerte notas pulsos en el pedal y un ruido. ¿Puede ser normal?", o: ["Sí, es el ABS actuando", "No, siempre es avería"], c: 0, e: "El ABS suelta y aprieta muy rápido para que las ruedas no se bloqueen." }
    ]
  },
  {
    id: "suspension",
    titulo: "Suspensión y dirección",
    sistema: "Seguridad",
    resumen: "Lo que mantiene las llantas pegadas al suelo y el volante preciso.",
    funciona: [
      "Los resortes (espirales) aguantan el peso y los amortiguadores frenan el rebote. Los brazos, rótulas y bujes unen las ruedas al carro y les dejan moverse.",
      "La dirección lleva el giro del volante a las ruedas. Puede tener asistencia hidráulica (con una bomba y líquido) o eléctrica.",
      "La alineación es el ángulo de las ruedas. Si está mal o hay piezas gastadas, las llantas se gastan raro y el carro tira hacia un lado."
    ],
    partes: [
      ["Amortiguadores", "Controlan el rebote. Si fugan aceite, están dañados."],
      ["Espirales (resortes)", "Aguantan el peso."],
      ["Rótulas", "Articulaciones de la rueda. Gastadas, hacen ruido y dan holgura."],
      ["Terminales de dirección", "Unen la cremallera con las ruedas."],
      ["Bujes", "Gomas en las uniones de los brazos."],
      ["Barra estabilizadora y sus links", "Reducen la inclinación en curvas. Los links gastados suenan en baches."],
      ["Cremallera de dirección", "Convierte el giro del volante en movimiento lateral."]
    ],
    revisar: [
      "Prueba de rebote: empuja con fuerza cada esquina hacia abajo y suelta. Debe subir y quedarse; si rebota varias veces, el amortiguador está gastado.",
      "Con la linterna, mira los amortiguadores: no deben estar mojados de aceite.",
      "Mira que el carro esté nivelado: una esquina más baja puede ser un espiral roto.",
      "En la prueba: pasa por baches y muertos despacio. Golpes secos o crujidos indican piezas gastadas.",
      "En una recta y en plano, suelta un momento el volante (con seguridad): el carro no debe irse hacia un lado y el volante debe estar centrado.",
      "Con el carro parado y el motor encendido, gira el volante de tope a tope: no debe chillar ni crujir. Si es hidráulica, mira el nivel del líquido.",
      "Mira el desgaste de las llantas (lección de llantas): cuenta mucho de la suspensión."
    ],
    alarmas: [
      { nivel: "grave", texto: "Holgura en la dirección: giras un poco el volante y las ruedas no responden." },
      { nivel: "grave", texto: "Piezas de suspensión dobladas o soldadas: posible choque fuerte." },
      { nivel: "atencion", texto: "Amortiguador con fuga de aceite o que rebota." },
      { nivel: "atencion", texto: "Golpes o crujidos en baches." },
      { nivel: "atencion", texto: "Tira hacia un lado o volante torcido en recta." }
    ],
    dato: "Un volante torcido en un carro con poco uso, junto con piezas de suspensión nuevas en un solo lado, puede delatar un choque. Cruza con la carrocería.",
    preguntas: [
      { p: "Empujas una esquina y el carro rebota tres veces. ¿Qué piensas?", o: ["Amortiguador gastado", "Llanta baja", "Normal"], c: 0, e: "Un amortiguador sano para el rebote en una sola subida." },
      { p: "El carro tira hacia la derecha en una recta plana. Puede ser…", o: ["Alineación o piezas de suspensión", "El aire acondicionado", "La batería"], c: 0, e: "También puede ser presión desigual de llantas o un freno pegado." }
    ]
  },
  {
    id: "llantas",
    titulo: "Llantas y rines",
    sistema: "Seguridad",
    resumen: "La edad, el dibujo y el tipo de desgaste: tres datos que se leen en un minuto.",
    funciona: [
      "La llanta es lo único que toca el suelo. Su dibujo saca el agua para que no patine (aquaplaning) y la goma se endurece con los años aunque tenga dibujo.",
      "En el costado viene el código DOT. Sus cuatro últimos números dicen la semana y el año de fabricación: 2419 es la semana 24 de 2019.",
      "Las llantas traen testigos de desgaste en el fondo de las ranuras: cuando el dibujo llega a ellos, la llanta está acabada."
    ],
    partes: [
      ["Banda de rodadura", "La parte con dibujo que toca el suelo."],
      ["Costado", "Lateral con la medida y el código DOT. No debe tener cortes ni bultos."],
      ["Testigos de desgaste", "Barritas en las ranuras que marcan el mínimo."],
      ["Rin", "La parte metálica. Golpes o grietas causan pérdidas de aire y vibraciones."]
    ],
    revisar: [
      "Lee el DOT de las cuatro llantas y la de repuesto: anota la semana y el año.",
      "Mide el dibujo en el centro y en los dos bordes de cada llanta.",
      "Lee el tipo de desgaste: gastada en los dos bordes = poca presión; gastada en el centro = demasiada presión; gastada en un solo borde = alineación o suspensión; gastada en parches (ondas) = amortiguadores o balanceo.",
      "Mira que las cuatro sean de la misma marca y medida, o al menos iguales por eje.",
      "Busca bultos o cortes en los costados y golpes en los rines.",
      "Comprueba que hay llanta de repuesto, gata y llave de tuercas."
    ],
    alarmas: [
      { nivel: "grave", texto: "Bulto en el costado: la llanta puede reventar. No se maneja con ella." },
      { nivel: "atencion", texto: "Dibujo al nivel de los testigos de desgaste." },
      { nivel: "atencion", texto: "Llantas viejas según el DOT aunque tengan dibujo." },
      { nivel: "atencion", texto: "Desgaste en un solo borde: busca el problema de suspensión o alineación." }
    ],
    dato: "Llantas nuevas no son motivo para descartar, pero sí para descontar. Y el tipo de desgaste te cuenta cosas de la suspensión que el vendedor no dice.",
    preguntas: [
      { p: "El DOT termina en 0821. ¿Cuándo se fabricó la llanta?", o: ["Agosto de 2021", "Semana 8 de 2021", "Día 8 de 2021"], c: 1, e: "Dos números de semana y dos de año." },
      { p: "Una llanta gastada solo en el borde interior indica…", o: ["Poca presión", "Problema de alineación o suspensión", "Demasiada presión"], c: 1, e: "La poca presión gasta los dos bordes; un solo borde es ángulo de la rueda." },
      { p: "Una llanta gastada en el centro suele indicar…", o: ["Demasiada presión", "Poca presión", "Frenos malos"], c: 0, e: "Con demasiado aire, la llanta se abomba y apoya solo el centro." }
    ]
  },
  {
    id: "electrico",
    titulo: "Batería y sistema eléctrico",
    sistema: "Eléctrico",
    resumen: "Batería, alternador y arranque, y cómo medirlos con un multímetro.",
    funciona: [
      "La batería da la energía para arrancar. Una vez encendido, el alternador (movido por una correa) produce la electricidad y recarga la batería.",
      "El motor de arranque gira el motor para encenderlo. Si suena un clic y no arranca, suele ser batería descargada, bornes sucios o el arranque.",
      "Los carros modernos tienen muchas computadoras conectadas entre sí. Una batería débil puede encender testigos raros y crear fallas que parecen graves."
    ],
    partes: [
      ["Batería", "Guarda energía. Tiene fecha de fabricación en una etiqueta."],
      ["Bornes", "Los terminales. Si tienen polvo blanco o verde (sulfato), hacen mal contacto."],
      ["Alternador", "Genera electricidad con el motor en marcha."],
      ["Motor de arranque", "Gira el motor para encenderlo."],
      ["Fusibles y relés", "Protegen los circuitos."]
    ],
    revisar: [
      "Mira la batería: bornes limpios, bien sujeta, sin hinchazón ni fugas. Busca la fecha en la etiqueta.",
      "Con el motor apagado (y el carro en reposo un rato), mide con el multímetro en los bornes. Cargada, una batería en reposo da alrededor de 12,6 V; por debajo de unos 12,2 V está descargada.",
      "Arranca y mide otra vez: con el motor en marcha debe subir, más o menos entre 13,8 y 14,4 V. Si sigue igual que en reposo, el alternador no carga.",
      "Prueba todo lo eléctrico: luces, direccionales, vidrios, seguros, retrovisores, pantalla, cámara, bocina, limpiaparabrisas.",
      "Al dar contacto, todos los testigos deben encenderse un momento y luego apagarse al arrancar."
    ],
    alarmas: [
      { nivel: "grave", texto: "Testigo de batería encendido con el motor en marcha: el carro no está cargando." },
      { nivel: "grave", texto: "Cables derretidos, empalmes caseros o cinta aislante por todas partes." },
      { nivel: "atencion", texto: "Voltaje con el motor en marcha igual al de reposo: alternador." },
      { nivel: "atencion", texto: "Batería hinchada o con bornes muy sulfatados." }
    ],
    dato: "Accesorios instalados (alarma, equipo de sonido, luces) con cables mal hechos son una causa típica de fallas eléctricas raras. Mira debajo del tablero.",
    preguntas: [
      { p: "Con el motor en marcha mides 12,5 V en la batería. ¿Qué indica?", o: ["El alternador no está cargando", "Todo perfecto", "Batería nueva"], c: 0, e: "Con el motor encendido el voltaje tiene que subir por encima del de reposo." },
      { p: "Polvo blanco o verde en los bornes es…", o: ["Sulfato: mal contacto", "Normal", "Aceite"], c: 0, e: "Se limpia, pero indica descuido y puede causar arranques difíciles." }
    ]
  },
  {
    id: "aire",
    titulo: "Aire acondicionado",
    sistema: "Confort",
    resumen: "En Panamá un carro sin aire bien frío se vende peor. Se prueba siempre.",
    funciona: [
      "El compresor (movido por la correa del motor) comprime el gas refrigerante. En el condensador, delante del radiador, el gas suelta calor. Luego se expande y en el evaporador, dentro del tablero, enfría el aire que entra a la cabina.",
      "El agua que gotea debajo del carro con el aire puesto es condensación del evaporador: es normal."
    ],
    partes: [
      ["Compresor", "La bomba del aire acondicionado. Tiene un embrague que hace clic al conectarse."],
      ["Condensador", "Radiador delante del radiador del motor."],
      ["Evaporador", "Dentro del tablero; enfría el aire."],
      ["Ventilador de cabina (blower)", "Sopla el aire por las rejillas."],
      ["Filtro de cabina", "Filtra el aire que entra. Si está sucio, huele mal y sopla poco."]
    ],
    revisar: [
      "Con el motor encendido, pon el aire al máximo frío: debe salir frío pronto y mantenerse frío.",
      "Escucha el compresor: un clic al conectar es normal; chirridos o golpeteos no.",
      "Prueba todas las velocidades del ventilador y todas las salidas.",
      "Huele: olor a humedad puede ser el evaporador o el filtro sucio; olor a humedad fuerte con otras señales, piensa en inundación.",
      "En la prueba, mira que la temperatura del motor no suba con el aire puesto en el tráfico."
    ],
    alarmas: [
      { nivel: "atencion", texto: "Aire que enfría poco o deja de enfriar en ralentí." },
      { nivel: "atencion", texto: "Ruido del compresor o que no se conecta." },
      { nivel: "atencion", texto: "Ventilador que solo funciona en la velocidad máxima: suele ser la resistencia del blower." }
    ],
    dato: "Un aire que enfría poco a veces es solo falta de gas por una fuga pequeña. Pero que te lo diga el taller con presupuesto: puede ser el compresor.",
    preguntas: [
      { p: "Gotea agua clara debajo del carro con el aire puesto. ¿Es grave?", o: ["No, es condensación normal", "Sí, es refrigerante del motor"], c: 0, e: "El evaporador saca agua del aire y la tira por un tubo debajo del carro." },
      { p: "El ventilador de cabina solo funciona en la velocidad máxima. Lo típico es…", o: ["La resistencia del ventilador", "El compresor", "El motor"], c: 0, e: "La velocidad máxima no pasa por la resistencia, por eso es la única que queda." }
    ]
  },
  {
    id: "carroceria",
    titulo: "Carrocería y chasis",
    sistema: "Estructura",
    resumen: "Cómo descubrir choques reparados aunque la pintura brille.",
    funciona: [
      "El chasis es el esqueleto del carro. En la mayoría de carros modernos la carrocería y el chasis son una sola pieza (monocasco), con unos largueros delante y detrás que absorben los golpes.",
      "Un golpe en un panel (una puerta, un guardafango) se arregla. Un golpe que dobla un larguero o una torre de amortiguador afecta la seguridad y el valor del carro, aunque quede bonito.",
      "Las piezas atornilladas (capó, puertas, guardafangos) se pueden cambiar; las soldadas (largueros, piso, pilares) no deberían tener marcas de reparación."
    ],
    partes: [
      ["Largueros", "Vigas del chasis delante y detrás. Detrás del parachoques."],
      ["Torres de amortiguador", "Donde se apoya la suspensión delantera, bajo el capó."],
      ["Pilares", "Las columnas que sostienen el techo."],
      ["Piso del maletero", "Debajo de la alfombra del maletero, junto a la llanta de repuesto."],
      ["Paneles atornillados", "Capó, puertas, guardafangos delanteros, tapa del maletero."]
    ],
    revisar: [
      "Agáchate en cada esquina y mira el carro de lado con luz de día: las ondas y los cambios de tono se ven en el reflejo.",
      "Compara las separaciones entre paneles: deben ser iguales a los dos lados.",
      "Mira los tornillos del capó, las bisagras de las puertas y de los guardafangos: pintura saltada o marcas de llave indican que se desmontaron.",
      "Busca pintura en las gomas, los plásticos o las molduras (overspray): señal de repintado.",
      "Pasa el imán o el medidor de pintura y compara paneles: el que sea distinto, pregunta por qué.",
      "Abre el capó y el maletero: mira largueros, torres y el piso del maletero buscando soldaduras, dobleces, sellador distinto o pintura nueva.",
      "Mira los vidrios: todos deberían tener la misma marca. Uno distinto puede ser por golpe.",
      "Busca óxido en los bajos, en los bordes de las puertas, debajo de los parachoques y en los pasos de rueda.",
      "Comprueba que el VIN del chasis, el del parabrisas y el de los papeles coinciden."
    ],
    alarmas: [
      { nivel: "grave", texto: "Soldaduras, dobleces o reparaciones en largueros, torres o piso: choque estructural." },
      { nivel: "grave", texto: "VIN con señales de manipulación o que no coincide con los papeles." },
      { nivel: "grave", texto: "Óxido que atraviesa el metal en el piso o el chasis." },
      { nivel: "atencion", texto: "Paneles repintados: un golpe en un panel se acepta, pero se descuenta y se pregunta." },
      { nivel: "atencion", texto: "Bolsas de aire (airbags) con el testigo encendido: puede venir de un choque." }
    ],
    dato: "Repintado no es lo mismo que chocado. Lo que descarta es la estructura dañada, no un rayón arreglado.",
    preguntas: [
      { p: "¿Qué descarta un carro: un guardafango repintado o una soldadura en un larguero?", o: ["El guardafango repintado", "La soldadura en el larguero", "Ninguno"], c: 1, e: "El larguero es estructura; el guardafango es un panel atornillado." },
      { p: "Ves pintura del color del carro en las gomas de una puerta. Indica…", o: ["Repintado de esa zona", "Pintura original", "Óxido"], c: 0, e: "En fábrica no se pinta con las gomas puestas." },
      { p: "Los tornillos del capó tienen la pintura saltada. ¿Qué piensas?", o: ["Se desmontó el capó: pregunta por qué", "Es normal de fábrica"], c: 0, e: "Puede ser un golpe frontal reparado." }
    ]
  },
  {
    id: "inundacion",
    titulo: "Carros inundados",
    sistema: "Estructura",
    resumen: "El gran riesgo en Panamá. Cómo detectarlo aunque lo hayan limpiado.",
    funciona: [
      "Un carro que estuvo bajo el agua puede verse perfecto por fuera. El daño está en la electrónica, los conectores, los rodamientos y el óxido que aparece meses después.",
      "Los carros importados de EE. UU. pueden traer en su historial la marca de inundación (flood) o de pérdida total (salvage). Por eso se consulta el VIN en Carfax o AutoCheck."
    ],
    partes: [
      ["Alfombras y espuma de abajo", "Retienen el agua y el barro."],
      ["Rieles de los asientos", "Se oxidan y es difícil limpiarlos."],
      ["Conectores eléctricos", "Bajo los asientos y en el tablero. El verde es corrosión."],
      ["Cinturones de seguridad", "Sácalos del todo: si hay marcas de agua o barro al final, mala señal."],
      ["Faros y tablero", "Pueden tener marcas de agua por dentro."]
    ],
    revisar: [
      "Huele el interior y el maletero nada más abrir: humedad o moho, o mucho ambientador para tapar.",
      "Levanta las alfombras y mira la espuma y el piso: barro, arena, agua o óxido.",
      "Mira los rieles y tornillos de los asientos y del tablero: óxido en un carro sin años es mala señal.",
      "Saca el cinturón de seguridad hasta el final y mira el extremo.",
      "Mira los faros y el cuadro de instrumentos: marcas de agua o vaho por dentro.",
      "Busca barro seco en lugares raros: dentro del maletero bajo la llanta de repuesto, detrás de los paneles, en el motor.",
      "Comprueba que todo lo eléctrico funcione y que no haya testigos encendidos.",
      "Consulta el VIN en un historial si es importado."
    ],
    alarmas: [
      { nivel: "grave", texto: "Barro, arena o línea de agua bajo las alfombras o dentro de paneles." },
      { nivel: "grave", texto: "Óxido en rieles de asientos, tornillos del tablero o conectores en un carro reciente." },
      { nivel: "grave", texto: "Historial con flood o salvage (salvo que sea un proyecto propio sabiendo lo que es)." },
      { nivel: "atencion", texto: "Alfombras nuevas en un carro usado sin explicación." },
      { nivel: "atencion", texto: "Olor fuerte a ambientador." }
    ],
    dato: "Josefine Auto tiene una guía pública sobre esto: úsala para repasar y para explicar a los clientes por qué tus carros son confiables.",
    preguntas: [
      { p: "¿Dónde es muy difícil limpiar las señales de una inundación?", o: ["En la pintura", "En los rieles de los asientos y bajo las alfombras", "En los vidrios"], c: 1, e: "El barro y el óxido se quedan en lugares escondidos." },
      { p: "Un carro usado tiene alfombras nuevas y huele mucho a ambientador. ¿Qué haces?", o: ["Nada", "Levanto alfombras y busco barro y óxido", "Lo compro rápido"], c: 1, e: "Son dos señales típicas de que se quiere esconder humedad." }
    ]
  },
  {
    id: "obd2",
    titulo: "Escáner OBD2",
    sistema: "Diagnóstico",
    resumen: "Lo que la computadora del carro sabe y el vendedor no te dice.",
    funciona: [
      "Desde 1996 en EE. UU., los carros traen un conector de diagnóstico OBD2, casi siempre debajo del tablero, del lado del conductor. Con un escáner lees lo que la computadora ha detectado.",
      "Los códigos de falla (DTC) tienen cinco caracteres. La letra dice el sistema: P = motor y transmisión, B = carrocería, C = chasis, U = comunicación entre computadoras. El primer número: 0 es un código genérico (igual en todas las marcas) y 1 es propio de la marca.",
      "Los monitores de preparación (readiness) son pruebas que la computadora hace mientras se maneja. Si alguien borra los códigos o desconecta la batería, los monitores vuelven a quedar como 'no listos' hasta que el carro se maneje un tiempo. Por eso muchos monitores no listos son una señal de que se pudo borrar algo hace poco.",
      "El freeze frame es una foto de los datos del motor en el momento en que saltó un código: velocidad, temperatura, revoluciones."
    ],
    partes: [
      ["Conector OBD2", "Toma de 16 pines bajo el tablero."],
      ["Códigos activos", "Fallas actuales: suelen encender el check engine."],
      ["Códigos pendientes", "Fallas detectadas una vez, aún sin confirmar."],
      ["Monitores", "Estado de las autopruebas: listo o no listo."],
      ["Datos en vivo", "Temperatura, revoluciones, ajustes de combustible, voltaje…"]
    ],
    revisar: [
      "Conecta el escáner con el contacto puesto antes de arrancar y luego con el motor encendido.",
      "Lee códigos activos, pendientes y permanentes si tu escáner los muestra. Haz foto de la pantalla.",
      "Mira los monitores: si varios están como no listos, pregunta si desconectaron la batería o borraron códigos.",
      "En datos en vivo, mira la temperatura del refrigerante (debe subir y estabilizarse) y, si hay, la de la transmisión.",
      "Busca cada código en la sección Códigos de esta app y apunta lo que significa en la Bitácora.",
      "Recuerda: muchos escáneres básicos solo leen el motor. Códigos de airbag (B), ABS (C) o transmisión de marca pueden necesitar un escáner más completo o el taller."
    ],
    alarmas: [
      { nivel: "grave", texto: "Check engine parpadeando: falla de encendido fuerte que puede dañar el catalizador." },
      { nivel: "grave", texto: "Muchos monitores no listos y el vendedor no lo explica." },
      { nivel: "atencion", texto: "Códigos pendientes: algo empieza a fallar." },
      { nivel: "atencion", texto: "El vendedor dice que 'es solo un sensor': que lo diagnostique un taller antes de creerlo." }
    ],
    dato: "Un código dice qué detectó la computadora, no qué pieza cambiar. P0420 puede ser el catalizador, un sensor o una fuga de escape: el taller lo confirma.",
    preguntas: [
      { p: "¿Qué indica la P en un código como P0300?", o: ["Motor y transmisión", "Carrocería", "Comunicación"], c: 0, e: "P = powertrain: motor y transmisión." },
      { p: "Varios monitores salen como 'no listos'. ¿Qué puede significar?", o: ["Que borraron códigos o desconectaron la batería hace poco", "Que el carro está perfecto", "Que no tiene gasolina"], c: 0, e: "Los monitores se reinician al borrar códigos y necesitan manejo para completarse." },
      { p: "Un código P1xxx es…", o: ["Genérico, igual en todas las marcas", "Propio del fabricante"], c: 1, e: "El 0 es genérico; el 1 es específico de la marca." },
      { p: "El check engine parpadea. ¿Qué haces?", o: ["Sigo la prueba normal", "Paro la prueba: falla de encendido fuerte", "Nada, es un sensor"], c: 1, e: "Parpadeando indica una falla que puede dañar el catalizador si sigues manejando." }
    ]
  },
  {
    id: "prueba",
    titulo: "La prueba de manejo",
    sistema: "Antes de empezar",
    resumen: "20 minutos bien hechos te dicen más que una hora de charla.",
    funciona: [
      "La prueba junta todo: motor caliente, transmisión trabajando, frenos, suspensión, dirección y aire acondicionado al mismo tiempo. Muchos problemas solo aparecen con el carro en marcha y caliente.",
      "Haz siempre el mismo recorrido si puedes: un tramo de ciudad con tráfico, baches o muertos, una recta para frenar y un tramo de carretera."
    ],
    partes: [
      ["Arranque en frío", "Ruidos y humo."],
      ["Ciudad", "Cambios a baja velocidad, temperatura en el tráfico con el aire puesto."],
      ["Baches y muertos", "Suspensión."],
      ["Recta segura", "Dirección y frenos."],
      ["Carretera", "Cambios altos, ruidos de rodamientos, vibraciones a velocidad."]
    ],
    revisar: [
      "Radio apagado. Escucha.",
      "Arranca con suavidad y mira que los cambios entren limpios.",
      "Gira a tope a los dos lados en un estacionamiento: ruidos de juntas homocinéticas o de dirección.",
      "En recta: volante centrado y sin tirar. Frena suave y fuerte.",
      "A velocidad de carretera: vibraciones en volante (balanceo, llantas) o en el asiento; zumbido que cambia al girar (rodamientos).",
      "En el tráfico con el aire puesto: la temperatura del motor quieta.",
      "Al volver: deja el motor en ralentí, abre el capó, escucha y huele. Luego mira debajo del carro: ¿goteos nuevos?",
      "Vuelve a escanear: a veces aparecen códigos después de manejar."
    ],
    alarmas: [
      { nivel: "grave", texto: "La temperatura sube, salta un testigo o la transmisión patina durante la prueba." },
      { nivel: "atencion", texto: "Zumbido que cambia al girar a un lado u otro: rodamiento de rueda." },
      { nivel: "atencion", texto: "Vibración a cierta velocidad: balanceo, llantas o rines." }
    ],
    dato: "Si el vendedor no deja hacer la prueba o la quiere hacer él, apúntalo. Tú decides el recorrido.",
    preguntas: [
      { p: "Escuchas un zumbido que cambia cuando giras a un lado u otro en carretera. ¿Qué puede ser?", o: ["Un rodamiento de rueda", "El aire acondicionado", "La batería"], c: 0, e: "Al girar se carga más una rueda y el ruido del rodamiento cambia." },
      { p: "¿Por qué se vuelve a mirar debajo del carro después de la prueba?", o: ["Para ver goteos que salen con el motor caliente", "Por costumbre"], c: 0, e: "Con presión y temperatura, las fugas aparecen." }
    ]
  }
];

/* Diagnóstico por síntoma: lo que notas → causas probables → qué significa para la compra. */
var SINTOMAS = [
  { id: "humo-azul", grupo: "Humo", sintoma: "Humo azul por el escape", causas: ["Anillos de pistón gastados", "Sellos de válvulas gastados", "Turbo con fuga de aceite (si tiene turbo)"], gravedad: "grave", compra: "El motor quema aceite. Prueba de compresión en el taller o descartar." },
  { id: "humo-blanco", grupo: "Humo", sintoma: "Humo blanco espeso que no se va", causas: ["Junta de culata dañada", "Culata deformada o fisurada por recalentamiento"], gravedad: "grave", compra: "Refrigerante quemándose. Se cruza con aceite lechoso y burbujas en el depósito. Descartar salvo proyecto." },
  { id: "humo-negro", grupo: "Humo", sintoma: "Humo negro", causas: ["Mezcla demasiado rica", "Inyectores que gotean", "Sensor de flujo de aire u oxígeno", "Filtro de aire muy sucio"], gravedad: "atencion", compra: "Suele tener arreglo. Escanea y pide diagnóstico y presupuesto." },
  { id: "vapor", grupo: "Humo", sintoma: "Vapor blanco fino al arrancar en frío", causas: ["Condensación normal del escape"], gravedad: "leve", compra: "Normal si desaparece al calentar el motor." },
  { id: "golpeteo", grupo: "Ruidos", sintoma: "Golpeteo metálico profundo en el motor", causas: ["Cojinetes de biela o de cigüeñal gastados", "Falta de presión de aceite"], gravedad: "grave", compra: "Motor muy dañado. Descartar." },
  { id: "tictac", grupo: "Ruidos", sintoma: "Tic-tac rápido arriba del motor", causas: ["Taqués o válvulas con holgura", "Nivel de aceite bajo", "Fuga en el múltiple de escape (suena como tic-tac)"], gravedad: "atencion", compra: "Si se va al calentar, suele ser menor. Si sigue, taller." },
  { id: "chirrido-motor", grupo: "Ruidos", sintoma: "Chirrido al arrancar o al poner el aire", causas: ["Correa de accesorios floja o gastada", "Tensor o polea gastada"], gravedad: "leve", compra: "Mantenimiento menor. Se descuenta." },
  { id: "chirrido-freno", grupo: "Ruidos", sintoma: "Chillido agudo al frenar", causas: ["Aviso de desgaste de las pastillas", "Pastillas cristalizadas"], gravedad: "atencion", compra: "Pastillas a cambiar pronto. Se descuenta." },
  { id: "metal-freno", grupo: "Ruidos", sintoma: "Ruido de metal con metal al frenar", causas: ["Pastillas acabadas: el metal toca el disco"], gravedad: "grave", compra: "Frenos y probablemente discos. No es seguro manejarlo así. Se descuenta con presupuesto." },
  { id: "clic-curva", grupo: "Ruidos", sintoma: "Clic-clic al girar a tope", causas: ["Junta homocinética gastada", "Guardapolvo roto que dejó entrar suciedad"], gravedad: "atencion", compra: "Reparación conocida. Se descuenta." },
  { id: "zumbido", grupo: "Ruidos", sintoma: "Zumbido que sube con la velocidad", causas: ["Rodamiento de rueda", "Llantas con desgaste en parches", "Diferencial", "CVT (si el ruido sigue a las revoluciones)"], gravedad: "atencion", compra: "Taller para saber de dónde viene: el rodamiento es menor; la CVT, no." },
  { id: "golpe-baches", grupo: "Ruidos", sintoma: "Golpes o crujidos en baches", causas: ["Links de la barra estabilizadora", "Bujes", "Rótulas", "Amortiguadores o sus bases"], gravedad: "atencion", compra: "Normalmente se repara. Pide revisión de suspensión en el elevador." },
  { id: "vibra-freno", grupo: "Vibraciones", sintoma: "Vibra el volante al frenar", causas: ["Discos deformados"], gravedad: "atencion", compra: "Discos y pastillas. Se descuenta." },
  { id: "vibra-velocidad", grupo: "Vibraciones", sintoma: "Vibra a cierta velocidad en carretera", causas: ["Llantas desbalanceadas", "Rin golpeado", "Llanta deformada", "Juntas o palier"], gravedad: "atencion", compra: "Empieza por balanceo y revisión de rines y llantas." },
  { id: "tiembla-ralenti", grupo: "Vibraciones", sintoma: "El motor tiembla en ralentí", causas: ["Falla de encendido: bujía, bobina o inyector", "Soportes del motor rotos", "Fuga de vacío"], gravedad: "atencion", compra: "Escanea: códigos P030x dicen qué cilindro falla." },
  { id: "tira-lado", grupo: "Manejo", sintoma: "Tira hacia un lado", causas: ["Alineación", "Presión distinta en las llantas", "Freno pegado", "Piezas de suspensión dañadas o chasis torcido"], gravedad: "atencion", compra: "Si con presión y alineación correctas sigue tirando, sospecha de choque." },
  { id: "patina-trans", grupo: "Manejo", sintoma: "Suben las revoluciones y el carro no acelera", causas: ["Embrague gastado (manual)", "Transmisión automática o CVT dañada", "Nivel bajo de ATF"], gravedad: "grave", compra: "Embrague: reparación conocida. Automática o CVT: descartar o taller especializado." },
  { id: "golpe-cambio", grupo: "Manejo", sintoma: "Golpe fuerte al cambiar o al poner D/R", causas: ["Problema interno de la transmisión", "ATF bajo o viejo", "Soportes del motor o de la caja"], gravedad: "grave", compra: "Taller antes de pagar." },
  { id: "pedal-esponja", grupo: "Manejo", sintoma: "Pedal de freno esponjoso o que se hunde", causas: ["Aire en el sistema", "Fuga de líquido", "Bomba de frenos"], gravedad: "grave", compra: "Seguridad: no se maneja hasta revisar. Se descuenta con presupuesto." },
  { id: "recalienta", grupo: "Temperatura", sintoma: "La temperatura sube en el tráfico", causas: ["Ventilador que no enciende", "Radiador tapado", "Termostato", "Bomba de agua", "Junta de culata"], gravedad: "grave", compra: "Puede ser barato o muy caro. Taller y prueba de gases en el refrigerante." },
  { id: "aire-caliente", grupo: "Temperatura", sintoma: "El aire acondicionado no enfría", causas: ["Falta de gas por fuga", "Compresor", "Ventilador del condensador", "Problema eléctrico"], gravedad: "atencion", compra: "En Panamá baja mucho el valor. Diagnóstico con presupuesto." },
  { id: "olor-dulce", grupo: "Olores", sintoma: "Olor dulce", causas: ["Fuga de refrigerante", "Radiador de la calefacción"], gravedad: "atencion", compra: "Busca fugas y revisa el nivel del depósito." },
  { id: "olor-quemado", grupo: "Olores", sintoma: "Olor a aceite quemado", causas: ["Aceite goteando sobre el escape", "Tapa de válvulas con fuga"], gravedad: "atencion", compra: "Localiza la fuga. Suele tener arreglo." },
  { id: "olor-humedad", grupo: "Olores", sintoma: "Olor a humedad o moho", causas: ["Filtro de cabina o evaporador sucio", "Filtración de agua por gomas", "Inundación"], gravedad: "atencion", compra: "Haz la revisión completa de inundación antes de seguir." },
  { id: "olor-gasolina", grupo: "Olores", sintoma: "Olor a gasolina", causas: ["Fuga en líneas o inyectores", "Tapón del tanque", "Sistema de vapores (EVAP)"], gravedad: "grave", compra: "Riesgo de incendio si es una fuga. Localízala antes de manejar." },
  { id: "testigo-motor", grupo: "Testigos", sintoma: "Check engine fijo", causas: ["Cualquier código del motor o emisiones: desde un tapón de gasolina mal cerrado hasta una falla seria"], gravedad: "atencion", compra: "Escanea siempre. El código decide." },
  { id: "testigo-motor-parpadea", grupo: "Testigos", sintoma: "Check engine parpadeando", causas: ["Falla de encendido fuerte"], gravedad: "grave", compra: "Para la prueba. Puede dañar el catalizador." },
  { id: "testigo-aceite", grupo: "Testigos", sintoma: "Testigo rojo de aceite", causas: ["Presión de aceite baja", "Nivel muy bajo", "Bomba de aceite o sensor"], gravedad: "grave", compra: "Apaga el motor. Riesgo de dañar el motor." },
  { id: "testigo-bateria", grupo: "Testigos", sintoma: "Testigo de batería con el motor en marcha", causas: ["Alternador", "Correa rota o floja", "Cables"], gravedad: "grave", compra: "El carro no carga y se apagará. Mide con el multímetro." },
  { id: "testigo-airbag", grupo: "Testigos", sintoma: "Testigo de airbag encendido o que nunca se enciende", causas: ["Falla del sistema", "Airbag disparado en un choque y no repuesto", "Testigo desconectado para esconderlo"], gravedad: "grave", compra: "Seguridad y posible choque. Escáner completo en el taller." },
  { id: "testigo-abs", grupo: "Testigos", sintoma: "Testigo de ABS", causas: ["Sensor de rueda", "Anillo del sensor", "Módulo ABS"], gravedad: "atencion", compra: "Los frenos normales funcionan, pero el ABS no. Diagnóstico y descuento." },
  { id: "testigo-temp", grupo: "Testigos", sintoma: "Testigo de temperatura", causas: ["Recalentamiento", "Nivel bajo de refrigerante"], gravedad: "grave", compra: "Apaga el motor. Ver Recalentamiento." }
];

/* Códigos genéricos frecuentes (definición estándar SAE J2012, ver FUENTES). */
var CODIGOS = [
  { c: "P0101", t: "Sensor de flujo de aire (MAF): rango o rendimiento", d: "Lectura del sensor de aire fuera de lo esperado. A veces es solo suciedad en el sensor o una fuga de aire.", g: "atencion" },
  { c: "P0113", t: "Sensor de temperatura del aire de admisión: señal alta", d: "Sensor o su cable. Suele ser menor.", g: "leve" },
  { c: "P0128", t: "Refrigerante por debajo de la temperatura de regulación del termostato", d: "El motor tarda en calentar: casi siempre el termostato se quedó abierto.", g: "leve" },
  { c: "P0135", t: "Sensor de oxígeno (banco 1, sensor 1): circuito del calentador", d: "Falla el calentador del sensor de oxígeno antes del catalizador.", g: "leve" },
  { c: "P0171", t: "Sistema demasiado pobre (banco 1)", d: "Entra más aire o menos combustible del debido: fuga de vacío, sensor MAF, bomba o inyectores.", g: "atencion" },
  { c: "P0172", t: "Sistema demasiado rico (banco 1)", d: "Demasiado combustible: inyectores, presión de combustible o sensores.", g: "atencion" },
  { c: "P0300", t: "Falla de encendido aleatoria o en varios cilindros", d: "Bujías, bobinas, inyectores, fugas de vacío o, en el peor caso, compresión baja.", g: "atencion" },
  { c: "P0301", t: "Falla de encendido en el cilindro 1", d: "Del P0301 al P0308, el último número dice el cilindro. Bujía, bobina, inyector o compresión.", g: "atencion" },
  { c: "P0335", t: "Sensor de posición del cigüeñal A: circuito", d: "Puede hacer que el motor se apague o no arranque.", g: "atencion" },
  { c: "P0340", t: "Sensor de posición del árbol de levas: circuito", d: "Sensor o cable. Si viene con otros códigos de distribución, revisar cadena o correa.", g: "atencion" },
  { c: "P0401", t: "Flujo insuficiente de la recirculación de gases (EGR)", d: "Conductos de la EGR tapados con carbón o válvula EGR.", g: "atencion" },
  { c: "P0420", t: "Eficiencia del catalizador por debajo del umbral (banco 1)", d: "El catalizador no limpia lo suficiente. Puede ser el catalizador, un sensor de oxígeno o una fuga de escape.", g: "atencion" },
  { c: "P0442", t: "Fuga pequeña en el sistema de vapores de combustible (EVAP)", d: "Muchas veces el tapón de la gasolina o una manguera.", g: "leve" },
  { c: "P0455", t: "Fuga grande en el sistema de vapores de combustible (EVAP)", d: "Tapón suelto o ausente, manguera rota, válvula de purga.", g: "leve" },
  { c: "P0500", t: "Sensor de velocidad del vehículo", d: "Puede afectar al velocímetro y a los cambios de una automática.", g: "atencion" },
  { c: "P0505", t: "Sistema de control de ralentí", d: "Ralentí inestable: cuerpo de aceleración sucio o válvula de ralentí.", g: "leve" },
  { c: "P0700", t: "Falla en el sistema de control de la transmisión", d: "La computadora de la transmisión guardó un código propio. Hace falta un escáner que lea la transmisión.", g: "grave" }
];

var GLOSARIO = [
  ["ABS", "Sistema que evita que las ruedas se bloqueen al frenar fuerte."],
  ["ATF", "Aceite de la transmisión automática."],
  ["Banco 1 / banco 2", "En motores en V, cada fila de cilindros. El banco 1 es el que tiene el cilindro 1."],
  ["Bujía", "Pieza que hace la chispa que enciende la mezcla."],
  ["Catalizador", "Pieza del escape que reduce los gases contaminantes."],
  ["Compresión (prueba de)", "Mide la presión que hace cada cilindro. Dice cómo están anillos, válvulas y junta de culata."],
  ["Convertidor de par", "Une el motor con la transmisión automática."],
  ["CVT", "Transmisión de variación continua: sin marchas fijas."],
  ["DOT", "Código en el costado de la llanta. Los 4 últimos números: semana y año de fabricación."],
  ["DTC", "Código de falla de la computadora (Diagnostic Trouble Code)."],
  ["EGR", "Sistema que devuelve parte de los gases de escape al motor para reducir emisiones."],
  ["EVAP", "Sistema que recoge los vapores de la gasolina."],
  ["Freeze frame", "Foto de los datos del motor en el momento en que saltó un código."],
  ["Junta de culata", "Sello entre el bloque y la culata."],
  ["Junta homocinética", "Articulación que lleva la fuerza a una rueda que gira y sube y baja."],
  ["Larguero", "Viga del chasis. Si está doblada o soldada, el carro tuvo un choque estructural."],
  ["MAF", "Sensor que mide el aire que entra al motor."],
  ["Monitores (readiness)", "Autopruebas de la computadora. 'No listos' puede indicar códigos borrados hace poco."],
  ["Overspray", "Pintura que cayó donde no debía: señal de repintado."],
  ["Ralentí", "El motor encendido sin acelerar."],
  ["Rótula", "Articulación de la suspensión."],
  ["Salvage / flood", "Marcas de historial en EE. UU.: pérdida total / inundado."],
  ["Sensor de oxígeno", "Mide el oxígeno en el escape para ajustar la mezcla."],
  ["Soportes del motor", "Gomas que sujetan el motor al chasis."],
  ["Taqués", "Piezas que empujan las válvulas. Con holgura hacen tic-tac."],
  ["Termostato", "Válvula que regula la temperatura del motor."],
  ["Torre de amortiguador", "Zona de la carrocería donde se apoya la suspensión delantera."],
  ["VIN", "Número de identificación del carro, de 17 caracteres."]
];

/* Fuentes de las cifras y definiciones técnicas usadas arriba. */
var FUENTES = [
  { tema: "Voltaje de batería en reposo (≈12,6 V; <12,2 V descargada) y de carga (≈13,8–14,4 V)", url: "https://haynes.com/en-us/tips-tutorials/how-test-car-battery", nombre: "Haynes: cómo probar la batería" },
  { tema: "Código DOT: semana y año de fabricación de la llanta", url: "https://www.slashgear.com/1419676/numbers-tires-date-code/", nombre: "SlashGear: el código de fecha de las llantas" },
  { tema: "Testigos de desgaste de las llantas y por qué importa el dibujo", url: "https://ford.com/support/how-tos/owner-resources/vehicle-maintenance/why-does-tread-wear-matter", nombre: "Ford: desgaste del dibujo" },
  { tema: "Monitores 'no listos' tras borrar códigos o desconectar la batería", url: "https://www.tomorrowstechnician.com/why-readiness-monitors-matter-with-obd-ii/", nombre: "Tomorrow's Technician: monitores OBD2" },
  { tema: "Estructura de los códigos (letra + 4 números) y definiciones genéricas", url: "https://www.edmunds.com/obd-dtc", nombre: "Edmunds: códigos OBD2" },
  { tema: "Códigos de falla más frecuentes", url: "https://alldata.com/diy-ca/en/diy-tips/top-diagnostic-trouble-codes", nombre: "ALLDATA: códigos más comunes" },
  { tema: "Checklist de compra de Josefine Auto (orden de inspección y casillas críticas)", url: "https://github.com/joseq11692-boop/JosefineAuto/blob/HEAD/docs/02-checklist-compra-panama.md", nombre: "Josefine Auto: checklist de compra" }
];
