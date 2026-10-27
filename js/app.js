/* ============================================================
   LÓGICA — no hace falta tocar nada de aquí para cambiar textos.
   Archivo: js/app.js — usa VERTICALES, PREGUNTAS, ESTADOS, TEXTOS e
   IMG, que vienen de js/config.js.
   ============================================================ */
const app = document.getElementById('app');
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Estado de la sesión. No se guarda en ningún lado.
const estado = {
  nombre: '',
  indice: 0,
  respuestas: [], // true = Sí, false = No
};

// Escapa lo que escribe la persona antes de meterlo en el HTML.
function escapar(t) {
  return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// **texto** -> <strong>texto</strong> (solo para los textos de la configuración).
function conNegrillas(t) {
  return t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
// Primera palabra del nombre, con mayúscula inicial, para los saludos.
function primerNombre() {
  const p = estado.nombre.trim().split(/\s+/)[0] || '';
  return p.charAt(0).toLocaleUpperCase('es') + p.slice(1);
}

function mostrar(html) {
  app.innerHTML = html;
  app.scrollTop = 0;
  window.scrollTo(0, 0);
}

/* ---- Pantalla 1: nombre ---- */
function pantallaNombre() {
  mostrar(`
    <section class="pantalla">
      <img class="badge" src="${IMG.logo}" alt="Dropi">
      <h1 class="nombre-titulo">Diagnóstico<br>de tu operación</h1>
      <img class="nombre-codi" src="${IMG.codiNombre}" alt="">
      <form class="nombre-form" novalidate>
        <label class="nombre-label" for="nombre">Antes de empezar, ¿cómo te llamas?</label>
        <input class="nombre-input" id="nombre" name="nombre" type="text" maxlength="40"
          autocomplete="given-name" placeholder="Tu nombre" value="${escapar(estado.nombre)}">
        <p class="nombre-error" id="nombre-error" role="alert"></p>
        <button class="btn-pildora" type="submit">Continuar</button>
      </form>
    </section>`);

  const form = app.querySelector('form');
  const input = app.querySelector('#nombre');
  const error = app.querySelector('#nombre-error');
  input.addEventListener('input', () => { error.textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const valor = input.value.trim();
    if (!valor) {
      error.textContent = 'Escribe tu nombre para continuar.';
      input.focus();
      return;
    }
    estado.nombre = valor;
    pantallaInicio();
  });
}

/* ---- Pantalla 2: bienvenida ---- */
function pantallaInicio() {
  mostrar(`
    <section class="pantalla">
      <div class="barra">
        <img class="barra-logo" src="${IMG.logo}" alt="Dropi">
        <button class="btn-circulo" type="button" id="cambiar-nombre" aria-label="Cambiar nombre">
          <img src="${IMG.atras}" alt="">
        </button>
      </div>
      <h1 class="inicio-saludo">Hola, ${escapar(primerNombre())}</h1>
      <p class="inicio-texto">
        Vamos a hacerle un chequeo a tu negocio. Responde <strong>${PREGUNTAS.length} preguntas con Sí o No</strong>
        y al final te entregamos tu diagnóstico: lo que ya tienes cubierto y <strong>lo que le falta a tu operación para escalar.</strong>
      </p>
      <img class="inicio-codi" src="${IMG.codiInicio}" alt="">
      <p class="inicio-nota">Te toma menos de 2 minutos.</p>
      <button class="btn-pildora" type="button" id="comenzar">Comenzar diagnóstico</button>
    </section>`);

  app.querySelector('#cambiar-nombre').addEventListener('click', pantallaNombre);
  app.querySelector('#comenzar').addEventListener('click', () => {
    estado.indice = 0;
    estado.respuestas = [];
    pantallaPregunta();
  });
}

/* ---- Pantalla 3: preguntas ---- */
let avanzando = false; // evita doble toque mientras pasa a la siguiente

function pantallaPregunta() {
  const total = PREGUNTAS.length;
  const i = estado.indice;
  const p = PREGUNTAS[i];
  const previa = estado.respuestas[i]; // si se devolvió, se marca lo que había elegido
  const avance = (i / total) * 100;

  mostrar(`
    <section class="pantalla pantalla--pregunta">
      <div class="barra">
        <img class="barra-logo" src="${IMG.logo}" alt="Dropi">
        <button class="btn-circulo" type="button" id="atras"
          aria-label="${i === 0 ? 'Volver al inicio' : 'Volver a la pregunta anterior'}">
          <img src="${IMG.atras}" alt="">
        </button>
      </div>

      <div class="progreso">
        <div class="progreso-carril" role="progressbar" aria-label="Avance del diagnóstico"
          aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${i}">
          <div class="progreso-barra" id="barra" style="width:${avance}%"></div>
        </div>
        <span class="progreso-medalla" aria-hidden="true"><span></span></span>
      </div>
      <p class="pregunta-contador">Pregunta ${i + 1} de ${total}</p>

      <img class="pregunta-codi" src="${IMG.codiPregunta}" alt="">

      <div class="hoja hoja-pregunta">
        <div class="anima-entrada">
          <p class="pregunta-area">${escapar(p.area)}</p>
          <h1 class="pregunta-texto">${escapar(p.texto)}</h1>
        </div>
        <div class="respuestas">
          <button class="btn-respuesta" type="button" data-valor="si" aria-pressed="${previa === true}">Sí</button>
          <button class="btn-respuesta" type="button" data-valor="no" aria-pressed="${previa === false}">No</button>
        </div>
        <p class="respuestas-ayuda">Responde según cómo funciona tu negocio hoy.</p>
      </div>
    </section>`);

  avanzando = false;
  app.querySelector('#atras').addEventListener('click', () => {
    if (avanzando) return;
    if (i === 0) pantallaInicio();
    else { estado.indice = i - 1; pantallaPregunta(); }
  });

  app.querySelectorAll('.btn-respuesta').forEach(btn => {
    btn.addEventListener('click', () => {
      if (avanzando) return;
      avanzando = true;
      const valor = btn.dataset.valor === 'si';
      estado.respuestas[i] = valor;
      app.querySelectorAll('.btn-respuesta').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      // La barra avanza antes de cambiar de pantalla, para que se vea el progreso.
      app.querySelector('#barra').style.width = `${((i + 1) / total) * 100}%`;
      setTimeout(() => {
        if (i + 1 < total) { estado.indice = i + 1; pantallaPregunta(); }
        else pantallaAnalizando();
      }, reducirMovimiento ? 120 : 380);
    });
  });
}

/* ---- Pantalla 4: analizando ---- */
function pantallaAnalizando() {
  mostrar(`
    <section class="pantalla pantalla--analizando">
      <img class="analizando-codi" src="${IMG.codiAnalizando}" alt="">
      <svg class="analizando-pulso" viewBox="0 0 220 56" aria-hidden="true">
        <path d="M2 30 H62 L74 30 L84 8 L98 50 L110 18 L120 30 H218"/>
      </svg>
      <p class="analizando-texto">Analizando tus respuestas,<br>${escapar(primerNombre())}…</p>
    </section>`);
  setTimeout(pantallaDiagnostico, reducirMovimiento ? 600 : 1900);
}

/* ---- Pantalla 5: diagnóstico ---- */
function calcularDiagnostico() {
  const faltan = [];
  const tiene = [];
  PREGUNTAS.forEach((p, i) => {
    if (estado.respuestas[i] === false && !faltan.includes(p.vertical)) faltan.push(p.vertical);
  });
  PREGUNTAS.forEach(p => {
    if (!faltan.includes(p.vertical) && !tiene.includes(p.vertical)) tiene.push(p.vertical);
  });
  const sanas = estado.respuestas.filter(r => r === true).length;
  const porcentaje = (sanas / PREGUNTAS.length) * 100;
  const nivel = ESTADOS.find(e => porcentaje >= e.porcentaje);
  return { faltan, tiene, sanas, nivel };
}

function pantallaDiagnostico() {
  const { faltan, tiene, sanas, nivel } = calcularDiagnostico();
  const total = PREGUNTAS.length;

  const segmentos = estado.respuestas
    .map((r, i) => `<li class="${r ? 'si' : ''}" title="Pregunta ${i + 1}: ${r ? 'Sí' : 'No'}"></li>`)
    .join('');

  const receta = faltan.length
    ? `<p class="receta-sub">Esto es lo que le hace falta a tu operación para escalar:</p>
       <ul class="receta-lista">
         ${faltan.map(id => {
           const v = VERTICALES[id];
           return `<li class="receta-item">
             <img class="receta-iso" src="${v.isotipo}" alt="">
             <div>
               <h3 class="receta-nombre">Te hace falta ${escapar(v.nombre)}</h3>
               <p class="receta-sintoma"><strong>Síntoma:</strong> ${conNegrillas(v.sintoma)}</p>
               <p class="receta-tratamiento">${conNegrillas(v.tratamiento)}</p>
             </div>
           </li>`;
         }).join('')}
       </ul>`
    : `<p class="receta-vacia">No encontramos nada que le haga falta a tu operación, ${escapar(primerNombre())}. Ya cuentas con todas las soluciones que revisamos.</p>`;

  const cubierto = tiene.length
    ? `<h2 class="cubierto-titulo">Lo que ya tienes cubierto</h2>
       <ul class="cubierto-lista">
         ${tiene.map(id => `<li><img src="${VERTICALES[id].isotipo}" alt="">${escapar(VERTICALES[id].nombre)}</li>`).join('')}
       </ul>`
    : '';

  mostrar(`
    <section class="pantalla pantalla--diagnostico">
      <div class="barra">
        <img class="barra-logo" src="${IMG.logo}" alt="Dropi">
      </div>
      <div class="diag-hero anima-entrada">
        <p class="diag-intro">${escapar(primerNombre())}, así está tu operación</p>
        <h1 class="diag-estado">${escapar(nivel.titulo)}</h1>
        <p class="diag-resumen">${conNegrillas(nivel.texto)}</p>
        <img class="diag-codi" src="${nivel.codi}" alt="">
        <ul class="diag-segmentos" aria-hidden="true" style="--total:${total}">${segmentos}</ul>
        <p class="diag-segmentos-texto">${sanas} de ${total} respuestas muestran una operación sana</p>
      </div>

      <div class="hoja hoja-receta">
        <div class="receta-cabecera">
          <h2 class="receta-titulo">Tu diagnóstico</h2>
        </div>
        ${receta}
        ${cubierto}
        <p class="receta-cierre">${conNegrillas(TEXTOS.cierre)}</p>
        <div class="receta-acciones">
          <button class="btn-pildora" type="button" id="repetir">Repetir diagnóstico</button>
        </div>
      </div>
    </section>`);

  app.querySelector('#repetir').addEventListener('click', pantallaInicio);
}

pantallaNombre();
