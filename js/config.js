/* ============================================================
   CONFIGURACIÓN — todo el contenido editable está aquí.

   - VERTICALES: cada vertical de Dropi con su isotipo y los dos
     textos que aparecen en la receta si le hace falta a la persona.
   - PREGUNTAS: las 10 preguntas en orden. Responder "No" significa
     que a esa persona le hace falta la vertical de la pregunta.
     Una vertical puede tener varias preguntas: basta con un "No"
     para que aparezca en la receta (una sola vez).
   - ESTADOS: el titular del diagnóstico según el PORCENTAJE de
     respuestas "Sí" (de mayor a menor; se toma el primero que cumpla).
     Va en porcentaje para que siga funcionando si cambia el número de
     preguntas. Con 10 preguntas: 100% = 10, 70% = 7, 40% = 4.

   En los textos, **así** se pone en negrilla.

   Archivo: js/config.js — se carga ANTES que js/app.js.
   Las rutas de imágenes son relativas a index.html.
   ============================================================ */
const VERTICALES = {
  roax: {
    nombre: 'ROAX',
    isotipo: 'media/Isotipo_Roax.webp',
    sintoma: 'No sabes con certeza qué anuncios te dejan plata ni cuánto ganas de verdad por producto.',
    tratamiento: 'ROAX conecta tu pauta con tus pedidos entregados y cobrados para que veas **tu rentabilidad real** y sepas qué escalar y qué frenar.',
  },
  confio: {
    nombre: 'Confío Pagos',
    isotipo: 'media/Isotipo_Confio.webp',
    sintoma: 'Casi todas tus ventas dependen del contra entrega, con todo el riesgo de devolución que eso trae.',
    tratamiento: 'Con Confío Pagos tu cliente **paga por anticipado** con confianza y tú recuperas el 100% si algo falla.',
  },
  chateapro: {
    nombre: 'Chatea Pro',
    isotipo: 'media/Isotipo_Chatea.webp',
    sintoma: 'Carritos abandonados y pedidos sin confirmar se te enfrían, sobre todo en horas pico.',
    tratamiento: 'Chatea Pro **automatiza tus flujos de WhatsApp**: recupera carritos y confirma pedidos sin que tu equipo colapse.',
  },
  atom: {
    nombre: 'ATOM',
    isotipo: 'media/Isotipo_ATOM.webp',
    sintoma: 'Podrías estar pagando sobrecostos y cobros indebidos en fletes sin darte cuenta.',
    tratamiento: 'ATOM **audita tus guías y fletes** de forma automática para que no pagues de más a las transportadoras.',
  },
  fenix: {
    nombre: 'Fénix Ventures',
    isotipo: 'media/Isotipo_Fenix.webp',
    sintoma: 'Las devoluciones y las novedades sin gestionar se están comiendo tu margen.',
    tratamiento: 'Fénix Ventures **baja tu tasa de devolución** y rescata los envíos con novedades antes de que regresen.',
  },
  dropipay: {
    nombre: 'DropiPay',
    isotipo: 'media/Isotipo_DropiPay.webp',
    sintoma: 'Tu flujo de caja frena tu pauta: esperas dispersiones y te falta liquidez para escalar.',
    tratamiento: 'Con DropiPay **usas el dinero de tus entregas en tiempo real** y tienes la liquidez para escalar tu pauta sin frenar anuncios.',
  },
};

const PREGUNTAS = [
  { vertical: 'roax',      area: 'Publicidad',               texto: '¿Sabes con exactitud qué anuncio específico te generó cada pedido efectivamente entregado y cobrado?' },
  { vertical: 'chateapro', area: 'WhatsApp & Ventas',        texto: '¿Cuentas con un flujo automatizado en WhatsApp que recupere carritos abandonados en menos de 10 minutos?' },
  { vertical: 'fenix',     area: 'Operación & Devoluciones', texto: '¿Tu tasa de devolución logística en pedidos contra entrega está por debajo del 12%?' },
  { vertical: 'confio',    area: 'Pagos Online',             texto: '¿Logras que al menos un 25% de tus compradores paguen por anticipado con tarjeta o transferencia en lugar de contra entrega?' },
  { vertical: 'atom',      area: 'Auditoría de Fletes',      texto: '¿Auditas de forma automática las guías y fletes para detectar sobrecostos y cobros indebidos de las transportadoras?' },
  { vertical: 'dropipay',  area: 'Flujo de Caja',            texto: '¿Dispones del dinero de tus entregas en tiempo real para recargar saldo de pauta sin esperar dispersiones bancarias?' },
  { vertical: 'roax',      area: 'Rentabilidad Neta',        texto: '¿Conoces tu margen de ganancia neto por producto descontando devoluciones, pauta y fletes en tiempo real?' },
  { vertical: 'fenix',     area: 'Rescate de Envíos',        texto: '¿Tienes un equipo o proceso dedicado que gestione y rescate paquetes con novedades antes de que sean devueltos?' },
  { vertical: 'chateapro', area: 'Capacidad de Atención',    texto: '¿Tu equipo logra confirmar pedidos y direcciones de clientes sin colapsar en horas pico o fines de semana?' },
  { vertical: 'dropipay',  area: 'Capital de Escalamiento',  texto: '¿Cuentas con tarjetas y liquidez suficiente para duplicar tu presupuesto diario de pauta sin frenar anuncios?' },
];

/* Preguntas anteriores (12), reemplazadas por las oficiales:
const PREGUNTAS = [
  { vertical: 'roax',      area: 'Publicidad',   texto: '¿Revisas a diario las métricas de tus campañas, como el CPA y el ROAS?' },
  { vertical: 'roax',      area: 'Publicidad',   texto: '¿Decides cuándo escalar o pausar una campaña con datos y no por intuición?' },
  { vertical: 'confio',    area: 'Devoluciones', texto: '¿Sabes cuánto te cuesta hoy cada devolución?' },
  { vertical: 'confio',    area: 'Devoluciones', texto: '¿Recuperas tu dinero cuando un pedido se devuelve?' },
  { vertical: 'chateapro', area: 'Pedidos',      texto: '¿Tus pedidos se confirman de forma automática?' },
  { vertical: 'chateapro', area: 'Atención',     texto: '¿Tus clientes reciben respuesta en minutos, incluso fuera de tu horario?' },
  { vertical: 'atom',      area: 'Proveedores',  texto: '¿Tu proveedor te da beneficios cuando vendes bien y tienes pocas devoluciones?' },
  { vertical: 'atom',      area: 'Productos',    texto: '¿Tienes productos exclusivos que tu competencia no puede vender?' },
  { vertical: 'fenix',     area: 'Expansión',    texto: '¿Tienes la logística lista para vender en más de un país?' },
  { vertical: 'fenix',     area: 'Crecimiento',  texto: '¿Cuentas con acompañamiento o asesoría para hacer crecer tu negocio como empresa?' },
  { vertical: 'dropipay',  area: 'Pagos',        texto: '¿Pagas a tus proveedores internacionales sin depender de un banco?' },
  { vertical: 'dropipay',  area: 'Capital',      texto: '¿Tienes acceso a crédito para invertir en tu negocio cuando lo necesitas?' },
];
*/

const ESTADOS = [
  { porcentaje: 100, titulo: 'Operación Winner', codi: 'media/Codi_Perfecto.webp', // antes: Codi_Academy_Gana.webp
    texto: 'Tu operación está en plena forma. Tienes cubiertas todas las áreas que revisamos.' },
  { porcentaje: 70, titulo: 'Buena salud', codi: 'media/Codi_Bien.webp', // antes: Codi_Academy_Celebra.webp
    texto: 'Vas por buen camino. Con unos ajustes puntuales tu negocio puede escalar con más fuerza.' },
  { porcentaje: 40, titulo: 'Necesita tratamiento', codi: 'media/Codi_Tratamiento.webp', // antes: Codi_Academy_Busca.webp
    texto: 'Tu operación funciona, pero hay áreas que te están quitando ventas y rentabilidad.' },
  { porcentaje: 0, titulo: 'Atención prioritaria', codi: 'media/Codi_Preocupado.webp', // antes: Codi_Academy_Triste.webp
    texto: 'Hay varias áreas sin cubrir. La buena noticia: cada una tiene solución dentro de Dropi.' },
];

const TEXTOS = {
  cierre: 'Habla con nuestro equipo para activar cualquiera de estas soluciones en tu negocio.',
};

const IMG = {
  logo: 'media/Logo-Dropi.svg',
  codiNombre: 'media/Codi_Examinando.webp',
  // codiInicio: 'media/Codi_Academy_Quimica.webp',
  codiInicio: 'media/Codi_Doctor.webp',
  // codiPregunta: 'media/Codi_Academy_Busca.webp',
  codiPregunta: 'media/Codi_Diagnostico.webp',
  codiAnalizando: 'media/Codi_Academy_Quimica.webp',
  atras: 'media/Atras.svg',
};
