// Arquivo script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. NAVEGAÇÃO RESPONSIVA (MENU TOGGLE)
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'active' e o aria-expanded para acessibilidade
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Alterna o ícone de hambúrguer (fa-bars) para 'X' (fa-times)
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); 
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fecha o menu se um link for clicado (para navegação de seção única)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active') && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false'); // Atualiza acessibilidade
                
                // Restaura o ícone após o fechamento
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });


    // ===================================
    // 2. ANIMAÇÃO DE CONTADORES (CREDIBILIDADE) - OTIMIZADA COM requestAnimationFrame
    // ===================================
    
    const counterBoxes = document.querySelectorAll('.counter-box');
    
    /**
     * Anima o contador usando requestAnimationFrame para melhor performance.
     * @param {HTMLElement} element O elemento span que exibe o número.
     * @param {number} target O valor final do contador.
     */
    function animateCounter(element, target) {
        const startTimestamp = performance.now();
        const duration = 2000; // 2 segundos
        // Verifica se a descrição do contador tem '+' para adicionar no final
        const hasPlus = element.parentElement.querySelector('p').textContent.includes('+');

        function step(timestamp) {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * target);
            
            // Atualiza o texto, adicionando o '+' se for o final
            element.textContent = hasPlus && progress === 1 ? currentCount + ' +' : currentCount;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
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
                // Para de observar depois de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counterBoxes.forEach(box => {
        counterObserver.observe(box);
    });

    // ===================================
    // 3. FORMULÁRIO DE CONTATO (SIMULAÇÃO DE ENVIO)
    // ===================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Desabilita o botão para evitar múltiplos envios e dar feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formMessage.style.color = 'var(--color-primary)';
        formMessage.textContent = 'Enviando solicitação...';
        
        setTimeout(() => {
            // Simula o sucesso do envio
            formMessage.style.color = 'var(--color-secondary)';
            formMessage.textContent = '✅ Solicitação enviada com sucesso! Um especialista DSR9 entrará em contato em breve.';
            contactForm.reset();
            
            // Restaura o botão
            submitButton.disabled = false;
            submitButton.textContent = 'ENVIAR SOLICITAÇÃO';
        }, 2000);
    });

    // ===================================
    // 4. SLIDERS DE CARROSSEL INFINITO (CERTIFICAÇÕES E PARCEIROS)
    // ===================================
    
    // Slider de Certificações (DNA Técnico)
    const certSliderTrack = document.querySelector('.cert-slider-track');
    if (certSliderTrack) {
        // Duplica o conteúdo do track. ESSENCIAL para o loop CSS (@keyframes slideCert)
        const certImages = certSliderTrack.innerHTML;
        certSliderTrack.innerHTML += certImages; 
    }

    // Slider de Parceiros
    // Ajuste: Duplica o conteúdo do track de parceiros para funcionar com a animação CSS (@keyframes slide)
    const partnerSliderTrack = document.querySelector('.partners-section .carousel-track');
    if (partnerSliderTrack) {
        const partnerLogos = partnerSliderTrack.innerHTML;
        partnerSliderTrack.innerHTML += partnerLogos; 
    }
});