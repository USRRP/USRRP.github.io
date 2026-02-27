// Countdown Timer
function initCountdown() {
    const eventDate = new Date('2026-03-28T14:30:00+05:30').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div class="countdown-ended">The War Has Begun!</div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Snow Effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = Math.random() * 10 + 10 + 's';
    snowflake.style.opacity = Math.random() * 0.5 + 0.1;
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.getElementById('snowContainer').appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 20000);
}

function initSnow() {
    // Create initial snowflakes
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createSnowflake(), i * 500);
    }
    
    // Continue creating snowflakes
    setInterval(createSnowflake, 1500);
}

// Scroll Animations (Simple AOS-like)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Navigation Scroll Effect
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

function initRegisterButtons() {
    const registerBtns = document.querySelectorAll('#registerBtn, #registerBtn2');

    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {            
            const googleFormURL = "https://forms.gle/WXpCAKuS7BNV2u5n9";
            window.open(googleFormURL, '_blank', 'noopener,noreferrer');
        });
    });
}

// Smooth Scroll Enhancement
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-layer');
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });
}

// Cursor Trail Effect (Optional - adds atmosphere)
function initCursorTrail() {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Create subtle cursor glow (optional enhancement)
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(201, 169, 97, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
    `;
    document.body.appendChild(cursorGlow);
    
    function animateCursor() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorGlow.style.left = trailX - 10 + 'px';
        cursorGlow.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Card Tilt Effect on Hover
function initCardTilt() {
    const cards = document.querySelectorAll('.house-card, .objective-card, .tier-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Add loading screen
function initLoadingScreen() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Start animations after a brief delay
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    });
}

function initConfetti() {
    const contra = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let contraIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === contra[contraIndex]) {
            contraIndex++;
            if (contraIndex === contra.length) {
                activateConfetti();
                contraIndex = 0;
            }
        } else {
            contraIndex = 0;
        }
    });
}

function activateConfetti() {
    // Secret message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(10, 10, 10, 0.95);
        border: 2px solid var(--color-primary);
        padding: 3rem;
        z-index: 10000;
        text-align: center;
        font-family: var(--font-display);
        color: var(--color-primary);
        font-size: 1.5rem;
        box-shadow: 0 0 50px rgba(201, 169, 97, 0.5);
    `;
    message.innerHTML = `
        <div style="margin-bottom: 1rem; font-size: 3rem;">⚔️</div>
        <div>A TRUE WARRIOR EMERGES</div>
        <div style="margin-top: 1rem; font-size: 1rem; color: var(--color-text-secondary);">
            "Chaos isn't a pit. Chaos is a ladder."
        </div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: var(--color-primary);
            color: var(--color-bg-dark);
            border: none;
            cursor: pointer;
            font-family: var(--font-display);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        ">{3AST3R_FL@9}</button>
    `;
    document.body.appendChild(message);
    
    // Confetti effect
    createConfetti();
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: ${['#c9a961', '#8b0000', '#e5d4a8'][Math.floor(Math.random() * 3)]};
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initSnow();
    initNavigation();
    initRegisterButtons();
    initSmoothScroll();
    initParallax();
    initCursorTrail();
    initCardTilt();
    initLoadingScreen();
    initConfetti();
    
    // Add scroll reveal for elements not in viewport
    setTimeout(() => {
        const elementsToReveal = document.querySelectorAll('[data-aos]');
        elementsToReveal.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
});

let lastScrollTop = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll Down
        navbar.style.top = "-120px"; 
    } else {
        // Scroll Up
        navbar.style.top = "0";
    }

    lastScrollTop = scrollTop;
});

// Add visual feedback for interactive elements
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .cta-primary, .cta-secondary')) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: 20px;
            height: 20px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = e.target.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left - 10 + 'px';
        ripple.style.top = e.clientY - rect.top - 10 + 'px';
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);


console.log('%c⚔️ KAALCHAKRA CTF ⚔️', 'font-size: 24px; font-weight: bold; color: #c9a961; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);');
console.log('%cWinter Is Coming...', 'font-size: 16px; color: #8b0000; font-style: italic;');
console.log('%cLooking for flags? Try the Konami Code... 👀', 'font-size: 12px; color: #a8a8a8;');
