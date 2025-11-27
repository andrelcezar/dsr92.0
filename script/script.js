// Arquivo script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. NAVEGAÇÃO RESPONSIVA (MENU TOGGLE)
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Fecha o menu se um link for clicado (útil para navegação de seção única)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });


    // ===================================
    // 2. ANIMAÇÃO DE CONTADORES (CREDIBILIDADE)
    // ===================================
    
    const counterBoxes = document.querySelectorAll('.counter-box');
    
    function animateCounter(element, target) {
        let count = 0;
        const duration = 2000; 
        const step = target / (duration / 10);
        
        const timer = setInterval(() => {
            count += step;
            if (count >= target) {
                clearInterval(timer);
                count = target;
                if (element.parentElement.querySelector('p').textContent.includes('+')) {
                    element.textContent = target + ' +';
                }
            }
            if (count < target) {
                 element.textContent = Math.floor(count);
            }
        }, 10);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target.querySelector('.counter-number');
                const targetValue = parseInt(counterElement.getAttribute('data-target'));
                animateCounter(counterElement, targetValue);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counterBoxes.forEach(box => {
        counterObserver.observe(box);
    });

    // ===================================
    // 3. FORMULÁRIO DE CONTATO
    // ===================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        formMessage.style.color = 'var(--color-primary)';
        formMessage.textContent = 'Enviando solicitação...';
        
        setTimeout(() => {
            formMessage.style.color = 'var(--color-secondary)';
            formMessage.textContent = '✅ Solicitação enviada com sucesso! Um especialista DSR9 entrará em contato em breve.';
            contactForm.reset();
        }, 2000);
    });
});