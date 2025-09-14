// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Create overlay element for mobile menu
const navOverlay = document.createElement('div');
navOverlay.classList.add('nav-overlay');
body.appendChild(navOverlay);

// Toggle mobile menu
function toggleMobileMenu() {
    const isActive = hamburger.classList.contains('active');
    
    if (isActive) {
        // Close menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('nav-open');
    } else {
        // Open menu
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('nav-open');
    }
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('nav-open');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close menu when clicking overlay
navOverlay.addEventListener('click', closeMobileMenu);

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        closeMobileMenu();
        
        // Smooth scroll to section
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            setTimeout(() => {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }, 300); // Wait for menu to close
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu on window resize if screen becomes larger
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Fade-in sections
const faders = document.querySelectorAll('section');
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(section => appearOnScroll.observe(section));

// Email link handler for Gmail
document.querySelectorAll('.email-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.dataset.email;
        // Open Gmail compose in a new tab
        window.open(`https://mail.google.com/mail/?view=cm&to=${email}`, '_blank');
    });
});

// Smooth scrolling for non-nav links
document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Sections & links for active highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const navbar = document.querySelector('.navbar');

    // Update navbar background based on scroll with dark theme
    navbar.style.background = scrolled > 100 
        ? 'rgba(13, 13, 13, 0.98)' 
        : 'rgba(13, 13, 13, 0.95)';
    navbar.style.boxShadow = scrolled > 100 
        ? '0 5px 25px rgba(255, 107, 53, 0.3)' 
        : '0 5px 25px rgba(0, 0, 0, 0.8)';

    // Active nav link highlighting
    let current = '';
    sections.forEach(section => {
        if (scrolled >= (section.offsetTop - 200)) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });

    // Parallax effect - only on desktop to prevent mobile overlap issues
    if (!isMobile()) {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        if (heroContent && heroImage) {
            // Reduce parallax intensity and add bounds checking
            const maxTransform = 80;
            const contentTransform = Math.min(scrolled * 0.15, maxTransform);
            const imageTransform = Math.min(scrolled * 0.08, maxTransform);
            
            heroContent.style.transform = `translateY(${contentTransform}px)`;
            heroImage.style.transform = `translateY(${imageTransform}px)`;
        }
    }
});

// Animate on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Add some random glow effects to cards
            if (entry.target.classList.contains('tech-card') || 
                entry.target.classList.contains('project-card')) {
                setTimeout(() => {
                    entry.target.style.boxShadow = 
                        '0 25px 50px rgba(255, 107, 53, 0.3), inset 0 0 30px rgba(255, 107, 53, 0.1)';
                }, Math.random() * 1000);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.tech-card, .project-card, .education-card').forEach(el => observer.observe(el));

// Progress bar animation with glowing effect
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                const width = progressFill.dataset.level + '%';
                progressFill.style.width = '0%';
                setTimeout(() => { 
                    progressFill.style.width = width;
                    progressFill.style.boxShadow = `0 0 15px rgba(255, 107, 53, 0.8)`;
                }, 200);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.tech-card').forEach(card => progressObserver.observe(card));

// Scary Smoke Particle System
class SmokeParticle {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'smoke-particle';
        this.reset();
        document.body.appendChild(this.element);
    }

    reset() {
        // Random starting position
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight + 50;
        
        // Random properties
        this.vx = (Math.random() - 0.5) * 4; // horizontal drift
        this.vy = -Math.random() * 3 - 1; // upward speed
        this.life = 0;
        this.maxLife = 300 + Math.random() * 200;
        this.size = Math.random() * 8 + 4;
        
        // Random colors for spooky effect
        const colors = [
            'rgba(255, 107, 53, 0.4)',
            'rgba(139, 0, 0, 0.3)',
            'rgba(255, 71, 87, 0.4)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 140, 0, 0.3)'
        ];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        this.element.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            background: radial-gradient(circle, ${color} 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 0 ${this.size * 2}px ${color};
        `;
    }

    update() {
        this.life++;
        
        // Physics
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99; // air resistance
        this.vy *= 0.98;
        
        // Fade effect
        const opacity = 1 - (this.life / this.maxLife);
        const scale = 0.5 + (this.life / this.maxLife) * 1.5;
        
        // Update position and appearance
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.opacity = opacity;
        this.element.style.transform = `scale(${scale})`;
        
        // Reset if particle is dead or off screen
        if (this.life >= this.maxLife || this.y < -100) {
            this.reset();
        }
    }

    destroy() {
        this.element.remove();
    }
}

// Create smoke particle system (only on desktop for performance)
let smokeParticles = [];
const maxSmokeParticles = isMobile() ? 0 : 25;

function createSmokeParticles() {
    if (isMobile()) return;
    
    for (let i = 0; i < maxSmokeParticles; i++) {
        smokeParticles.push(new SmokeParticle());
    }
}

function updateSmokeParticles() {
    if (isMobile()) return;
    
    smokeParticles.forEach(particle => particle.update());
    requestAnimationFrame(updateSmokeParticles);
}

// Initialize smoke particles
if (!isMobile()) {
    createSmokeParticles();
    updateSmokeParticles();
}

// Profile image fallback with dark theme
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.onerror = function () {
            // Dark theme fallback avatar
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmY2YjM1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOGIwMDAwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxYTFhMWEiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9InVybCgjZ3JhZCkiLz48cGF0aCBkPSJNNjAgMTQwQzYwIDEyMC4xIDc2LjEgMTA0IDk2IDEwNEgxMDRDMTIzLjkgMTA0IDE0MCAxMjAuMSAxNDAgMTQwVjE2MEg2MFYxNDBaIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PC9zdmc+';
            this.alt = 'Dark Profile Picture Placeholder';
        };
    }
});

// Social links hover effects with dark theme
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (!isMobile()) {
            this.style.transform = 'translateY(-8px) scale(1.2)';
            this.style.boxShadow = '0 15px 30px rgba(255, 107, 53, 0.6)';
        }
    });
    link.addEventListener('mouseleave', function() {
        if (!isMobile()) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.5)';
        }
    });
});

// Loading animation with dark theme
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add some spooky entrance effects
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.animation = 'none';
        }, 1500);
    }
});

// Handle orientation changes for mobile devices
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (isMobile()) {
            const heroContent = document.querySelector('.hero-content');
            const heroImage = document.querySelector('.hero-image');
            if (heroContent) heroContent.style.transform = 'none';
            if (heroImage) heroImage.style.transform = 'none';
            
            // Destroy smoke particles on mobile
            smokeParticles.forEach(particle => particle.destroy());
            smokeParticles = [];
        }
    }, 100);
});

// Resize event handler
window.addEventListener('resize', () => {
    if (isMobile()) {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        if (heroContent) heroContent.style.transform = 'none';
        if (heroImage) heroImage.style.transform = 'none';
        
        // Clean up smoke particles on mobile
        if (smokeParticles.length > 0) {
            smokeParticles.forEach(particle => particle.destroy());
            smokeParticles = [];
        }
    } else if (smokeParticles.length === 0) {
        // Re-create smoke particles when switching back to desktop
        createSmokeParticles();
        updateSmokeParticles();
    }
});

// Prevent scroll when mobile menu is open
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.nav-menu') && !body.classList.contains('nav-open')) {
        return;
    }
    
    if (body.classList.contains('nav-open')) {
        e.preventDefault();
        return false;
    }
}, { passive: false });

// Track touch start position
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    e.touches[0].startY = touchStartY;
}, { passive: false });

// Add some random spooky effects
function addSpookyEffects() {
    if (isMobile()) return;
    
    setInterval(() => {
        // Random glow effects on cards
        const cards = document.querySelectorAll('.tech-card, .project-card, .education-card');
        if (cards.length > 0) {
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const originalShadow = randomCard.style.boxShadow;
            
            randomCard.style.transition = 'box-shadow 0.5s ease';
            randomCard.style.boxShadow = '0 0 40px rgba(255, 107, 53, 0.6)';
            
            setTimeout(() => {
                randomCard.style.boxShadow = originalShadow;
            }, 1000);
        }
    }, 5000 + Math.random() * 10000);
}

// Initialize spooky effects
addSpookyEffects();
