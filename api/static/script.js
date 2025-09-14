// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(n =>
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    })
);

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


// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Sections & links for active highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const navbar = document.querySelector('.navbar');

    navbar.style.background = scrolled > 100 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = scrolled > 100 ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none';

    let current = '';
    sections.forEach(section => {
        if (scrolled >= (section.offsetTop - 200)) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });

    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Animate on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
    });
}, observerOptions);

document.querySelectorAll('.tech-card, .project-card, .education-card').forEach(el => observer.observe(el));

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                const width = progressFill.dataset.level + '%';
                progressFill.style.width = '0%';
                setTimeout(() => { progressFill.style.width = width; }, 100);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.tech-card').forEach(card => progressObserver.observe(card));

// Particle effect (limit 30)
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px; height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 8s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
    `;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 8000);
    }
}
setInterval(() => {
    const hero = document.querySelector('.hero');
    if (hero && hero.querySelectorAll('.particle').length < 30) createParticle();
}, 2000);

// Profile image fallback
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.onerror = function () {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjdGQUZDIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0EwQUVDMCIvPgo8cGF0aCBkPSJNNjAgMTQwQzYwIDEyMC4xIDc2LjEgMTA0IDk2IDEwNEgxMDRDMTIzLjkgMTA0IDE0MCAxMjAuMSAxNDAgMTQwVjE2MEg2MFYxNDBaIiBmaWxsPSIjQTBBRUMwIi8+Cjwvc3ZnPg==';
            this.alt = 'Profile Picture Placeholder';
        };
    }
});

// Social links hover
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
