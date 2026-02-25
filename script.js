/* =========================================
   KAALCHAKRA – Sacred Timeline Protocol
   Premium Interactive Script
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    initCountdown();
    initScrollReveal();
    initTiltEffect();
    initSmoothScroll();
    initNavbarEffect();
    initMagneticButtons();
    initParticles();
    initGlitch();

});

console.log("⏳ KAALCHAKRA – Sacred Timeline Protocol");
console.log("The TVA is watching.");

/* =========================================
   COUNTDOWN
========================================= */

function initCountdown() {
    const eventDate = new Date('2026-03-28T10:30:00+05:30').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML =
                '<div class="countdown-ended">⚠ TIMELINE RESET INITIATED ⚠</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* =========================================
   SCROLL REVEAL (AOS-like without library)
========================================= */

function initScrollReveal() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}

/* =========================================
   3D TILT EFFECT FOR CARDS
========================================= */

function initTiltEffect() {
    const cards = document.querySelectorAll('.about-card, .objective-card, .battle-card, .house-card, .tier-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / 20);
            const rotateY = ((centerX - x) / 20);

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* =========================================
   SMOOTH NAVIGATION SCROLL
========================================= */

function initSmoothScroll() {
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
	    if (target) {
    	    target.scrollIntoView({ behavior: 'smooth' });
	    }
        });
    });
}

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

function initNavbarEffect() {
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .sponsor-contact-btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0,0)';
        });
    });
}

/* =========================================
   FLOATING PARTICLES (Optimized)
========================================= */

function initParticles() {

    let particleCount = 0;

    function createParticle() {
        if (particleCount > 80) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');

        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.bottom = '0px';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';

        document.body.appendChild(particle);
        particleCount++;

        setTimeout(() => {
            particle.remove();
            particleCount--;
        }, 10000);
    }

    setInterval(createParticle, 700);
}


/* =========================================
   RANDOM TVA GLITCH EFFECT
========================================= */

function initGlitch() {
    setInterval(() => {
        document.body.classList.add('glitch');
        setTimeout(() => {
            document.body.classList.remove('glitch');
        }, 250);
    }, 15000);
}
