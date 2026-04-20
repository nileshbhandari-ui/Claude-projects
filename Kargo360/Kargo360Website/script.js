// ─── Scroll Reveal ───
const revealEls = document.querySelectorAll('.reveal, .reveal-delay');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObserver.observe(el));

// ─── Navbar Scroll Effect ───
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 60
        ? 'rgba(6,6,10,0.96)'
        : 'rgba(6,6,10,0.75)';
});

// ─── Mobile Menu ───
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// ─── FAQ Accordion ───
function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ─── Smooth nav link active state ───
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => {
                a.style.color = '';
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.style.color = 'var(--white)';
                }
            });
        }
    });
}, { threshold: 0.5 });
sections.forEach(s => observer.observe(s));

// ─── Animated Counter ───
function animateCount(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + (suffix || '');
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const num = parseInt(text.replace(/\D/g, ''));
            const accent = el.querySelector('.stat-accent');
            const suffix = accent ? accent.textContent : '';
            const numEl = document.createTextNode('');
            el.innerHTML = '';
            el.appendChild(numEl);
            if (accent) el.appendChild(accent);
            animateCount({ set textContent(v) { numEl.nodeValue = v; } }, num, '');
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));
