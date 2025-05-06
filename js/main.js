// Menú móvil
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de contador (Logros)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
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

// Activa contadores al hacer scroll
window.addEventListener('scroll', function() {
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection.getBoundingClientRect().top < window.innerHeight / 1.3) {
        animateCounters();
        // Remueve el event listener después de ejecutarse
        this.removeEventListener('scroll', arguments.callee);
    }
});

// Efecto de carga
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Configura Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyDhsb_Oqy_FjFAzQdaQswjYI4uNSJaQ46Y",
        authDomain: "reservas-f4860.firebaseapp.com",
        projectId: "reservas-f4860",
        storageBucket: "reservas-f4860.appspot.com",
        messagingSenderId: "389185460545",
        appId: "1:389185460545:web:50e3c9993523f8aac5a9c0"
      };
  
      // Inicializa Firebase solo si no existe
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const db = firebase.firestore();
  
      // Verifica conexión
      const testDoc = await db.collection("reservas").doc("test").get();
      console.log("Conexión exitosa con Firestore");
  
      // Manejo del formulario
      const form = document.querySelector('.contact-form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
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
          const docRef = await db.collection("reservas").add(reserva);
          console.log("Reserva guardada con ID:", docRef.id);
          alert("¡Reserva enviada con éxito!");
          form.reset();
        } catch (error) {
          console.error("Error al guardar:", error);
          alert("Error al enviar. Intenta nuevamente.");
        }
      });
  
    } catch (error) {
      console.error("Error general:", error);
      alert("Error de conexión. Recarga la página.");
    }
  });