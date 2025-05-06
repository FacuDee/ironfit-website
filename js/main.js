// =============================================
// Configuración Global y Variables
// =============================================
const firebaseConfig = {
  apiKey: "AIzaSyDhsb_Oqy_FjFAzQdaQswjYI4uNSJaQ46Y",
  authDomain: "reservas-f4860.firebaseapp.com",
  projectId: "reservas-f4860",
  storageBucket: "reservas-f4860.appspot.com",
  messagingSenderId: "389185460545",
  appId: "1:389185460545:web:50e3c9993523f8aac5a9c0"
};

let db; // Variable global para Firestore

// =============================================
// Funciones Principales
// =============================================

// 1. Menú Hamburguesa
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Cerrar al hacer clic en enlace
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
    });
  });
}

// 2. Smooth Scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}

// 3. Animación de Contadores
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const speed = 200;

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// 4. Botón "Volver Arriba"
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 500);
  });
}

// 5. Firebase y Formulario
async function setupFirebase() {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();

    // Test de conexión
    await db.collection("reservas").doc("test").get();
    console.log("Conexión exitosa con Firestore");

    // Formulario
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await handleFormSubmit(form);
    });

  } catch (error) {
    console.error("Error en Firebase:", error);
  }
}

async function handleFormSubmit(form) {
  const reserva = {
    nombre: form.querySelector('[name="nombre"]').value,
    email: form.querySelector('[name="email"]').value,
    telefono: form.querySelector('[name="telefono"]').value || null,
    servicio: form.querySelector('[name="servicio"]').value,
    fecha: form.querySelector('[name="fecha"]').value,
    hora: form.querySelector('[name="hora"]').value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection("reservas").add(reserva);
    alert("¡Reserva enviada con éxito!");
    form.reset();
  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Error al enviar. Intenta nuevamente.");
  }
}

// =============================================
// Inicialización (Cuando el DOM está listo)
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupSmoothScroll();
  setupBackToTop();
  setupFirebase();

  // Efecto de carga
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});

// Contadores cuando se hace scroll
window.addEventListener("scroll", () => {
  const section = document.querySelector(".achievements");
  if (section.getBoundingClientRect().top < window.innerHeight / 1.3) {
    animateCounters();
    window.removeEventListener("scroll", arguments.callee);
  }
});