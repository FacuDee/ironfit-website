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
    const counters = document.querySelectorAll('.stat-card h3');
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

// Activar contadores al hacer scroll
window.addEventListener('scroll', function() {
    const achievementsSection = document.querySelector('.achievements');
    const sectionPosition = achievementsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        animateCounters();
    }
});

// Efecto de carga
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Configura Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyDhsb_Oqy_FjFAzQdaQswjYI4uNSJaQ46Y",
    authDomain: "reservas-f4860.firebaseapp.com",
    projectId: "reservas-f4860",
    storageBucket: "reservas-f4860.firebasestorage.app",
    messagingSenderId: "389185460545",
    appId: "1:389185460545:web:50e3c9993523f8aac5a9c0",
    measurementId: "G-5D2LD2GTGZ"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar reserva
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reserva = {
        nombre: document.querySelector('input[name="Nombre"]').value,
        email: document.querySelector('input[name="Email"]').value,
        servicio: document.querySelector('select[name="Servicio"]').value,
        fecha: document.querySelector('input[name="Fecha"]').value,
        hora: document.querySelector('input[name="Hora"]').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("reservas").add(reserva)
        .then(() => {
            alert("¡Reserva enviada!");
            window.location.href = "/gracias.html";
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
});