// Arquivo script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. ANIMAÇÃO DE CONTADORES (CREDIBILIDADE)
    // ===================================
    
    const counterBoxes = document.querySelectorAll('.counter-box');
    
    // Função para iniciar a animação de um contador
    function animateCounter(element, target) {
        let count = 0;
        const duration = 2000; // 2 segundos
        const step = target / (duration / 10);
        
        const timer = setInterval(() => {
            count += step;
            if (count >= target) {
                clearInterval(timer);
                count = target;
                // Adiciona o '+' para os contadores que precisam
                if (element.parentElement.querySelector('p').textContent.includes('+')) {
                    element.textContent = target + ' +';
                }
            }
            // Aqui, apenas arredondamos durante a animação.
            if (count < target) {
                 element.textContent = Math.floor(count);
            }
        }, 10);
    }

    // Usando Intersection Observer para acionar a animação ao entrar na tela
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% do elemento visível
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target.querySelector('.counter-number');
                // O target será a parte numérica do atributo (ex: '30 +')
                const targetValue = parseInt(counterElement.getAttribute('data-target'));
                animateCounter(counterElement, targetValue);
                observer.unobserve(entry.target); // Para rodar a animação apenas uma vez
            }
        });
    }, observerOptions);

    counterBoxes.forEach(box => {
        counterObserver.observe(box);
    });

    // ===================================
    // 2. FORMULÁRIO DE CONTATO
    // ===================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio
        formMessage.style.color = 'var(--color-primary)';
        formMessage.textContent = 'Enviando solicitação...';
        
        setTimeout(() => {
            formMessage.style.color = 'var(--color-secondary)';
            formMessage.textContent = '✅ Solicitação enviada com sucesso! Um especialista DSR9 entrará em contato em breve.';
            contactForm.reset();
        }, 2000); // Simula 2 segundos de carregamento
    });
});