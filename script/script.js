// Arquivo script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. NAVEGAÇÃO RESPONSIVA (MENU TOGGLE) - CORREÇÃO DE BUG
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Verifica se os elementos foram encontrados antes de adicionar o listener
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'active' para exibir/ocultar o menu via CSS
            navMenu.classList.toggle('active');
            
            // Opcional: Alternar o ícone de hambúrguer para 'X' (requer mais CSS, mas o toggle funciona)
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // 'fa-times' é o ícone de fechar (X)
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fecha o menu se um link for clicado (útil para navegação de seção única)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Fecha apenas se o menu estiver ativo E se a tela for pequena
            if (navMenu.classList.contains('active') && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                // Restaura o ícone após o fechamento
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
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