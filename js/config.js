/* ============================================================
   CONFIGURACIÓN — todo el contenido editable está aquí.

   - VERTICALES: cada vertical de Dropi con su isotipo y los dos
     textos que aparecen en la receta si le hace falta a la persona.
   - PREGUNTAS: las 12 preguntas en orden. Responder "No" significa
     que a esa persona le hace falta la vertical de la pregunta.
     Una vertical puede tener varias preguntas: basta con un "No"
     para que aparezca en la receta (una sola vez).
   - ESTADOS: el titular del diagnóstico según el PORCENTAJE de
     respuestas "Sí" (de mayor a menor; se toma el primero que cumpla).
     Va en porcentaje para que siga funcionando si cambia el número de
     preguntas. Con 12 preguntas: 100% = 12, 70% = 9, 40% = 5.

   En los textos, **así** se pone en negrilla.

   Archivo: js/config.js — se carga ANTES que js/app.js.
   Las rutas de imágenes son relativas a index.html.
   ============================================================ */
const VERTICALES = {
  roax: {
    nombre: 'ROAX',
    isotipo: 'media/Isotipo_Roax.webp',
    sintoma: 'Estás tomando decisiones de pauta sin ver con claridad tus números.',
    tratamiento: 'ROAX es el copiloto de tus campañas: te dice cuándo **escalar, ajustar o frenar** antes de que pierdas plata.',
  },
  confio: {
    nombre: 'Confío Pagos',
    isotipo: 'media/Isotipo_Confio.webp',
    sintoma: 'Cada devolución sale directo de tu bolsillo.',
    tratamiento: 'Con Confío Pagos tu cliente paga con confianza y tú **recuperas el 100%** si algo falla.',
  },
  chateapro: {
    nombre: 'Chatea Pro',
    isotipo: 'media/Isotipo_Chatea.webp',
    sintoma: 'Los pedidos que no se confirman a tiempo son ventas que se enfrían.',
    tratamiento: 'Chatea Pro **automatiza la gestión de tus pedidos** y la atención por chat, para que ninguna venta se quede esperando.',
  },
  atom: {
    nombre: 'ATOM',
    isotipo: 'media/Isotipo_ATOM.webp',
    sintoma: 'Tu proveedor despacha, pero no impulsa tu negocio.',
    tratamiento: 'En ATOM trabajas con proveedores que **premian tus resultados**, con **productos exclusivos** e incentivos por cumplir tus metas logísticas.',
  },
  fenix: {
    nombre: 'Fénix',
    isotipo: 'media/Isotipo_Fenix.webp',
    sintoma: 'Tu operación todavía no tiene la estructura para crecer como empresa ni para salir de un país.',
    tratamiento: 'Fénix te ayuda a pasar de dropshipper a empresario, con **logística e infraestructura para operar en toda Latam**.',
  },
  dropipay: {
    nombre: 'DropiPay',
    isotipo: 'media/Isotipo_DropiPay.webp',
    sintoma: 'Pagar afuera y conseguir capital todavía frena tu crecimiento.',
    tratamiento: 'Con DropiPay importas, pagas y accedes a crédito **sin bancos y sin fronteras**.',
  },
};

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

const ESTADOS = [
  { porcentaje: 100, titulo: 'Operación Winner', codi: 'media/Codi_Academy_Gana.webp',
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
