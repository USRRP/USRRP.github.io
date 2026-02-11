// ==================== NAVIGATION ==================== 
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll(
    '.about-card, .objective-item, .timeline-item, .house-card, .prize-card, .tier-card, .infra-item, .role-card'
);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ==================== FORM HANDLING ====================
const updatesForm = document.getElementById('updatesForm');

if (updatesForm) {
    updatesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = updatesForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to a backend
        // For now, we'll just show an alert
        alert(`Thank you for joining! We'll send updates to ${email}`);
        updatesForm.reset();
    });
}

// ==================== CURSOR EFFECT (Optional Enhancement) ====================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Only enable custom cursor on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #c9a961;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.2s ease;
    `;
    animateCursor();
    
    // Scale cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#d4af37';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#c9a961';
        });
    });
} else {
    cursor.style.display = 'none';
}

// ==================== COUNTDOWN TIMER (Optional) ====================
function createCountdown(targetDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = "Event has started!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-timer">
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            </div>
        `;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Example: To add countdown, uncomment and set your target date
 const eventDate = new Date('March 28, 2026 14:00:00').getTime();
createCountdown(eventDate, 'countdown');

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== CONSOLE MESSAGE ====================
console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              TH3_RANG3RS - National CTF                  ║
║                                                           ║
║         "Only the sharpest minds survive"                ║
║                                                           ║
║      Interested in the code? We like your style.         ║
║      This could be your arena. Register now!             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Press 'R' to scroll to registration
    if (e.key === 'r' || e.key === 'R') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'S' to scroll to sponsors
    if (e.key === 's' || e.key === 'S') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ==================== DYNAMIC YEAR ====================
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ==================== EASTER EGG (Optional Fun) ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        alert('🎮 Secret unlocked! You found the Konami Code! The realm colors have shifted...');
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }
});
