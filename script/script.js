// Arquivo script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. NAVEGAÇÃO RESPONSIVA (MENU TOGGLE) - CORRIGIDO
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'active' no menu de navegação
            navMenu.classList.toggle('active');
            
            // Verifica o estado atual para atualizar o aria-expanded para acessibilidade
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

    // Fecha o menu se um link for clicado (útil para navegação de seção única)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Condição: Se o menu estiver ativo E a tela for considerada mobile (<= 768px)
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
        const hasPlus = element.parentElement.querySelector('p').textContent.includes('+');

        function step(timestamp) {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1); // Garante que o progresso não exceda 1
            const currentCount = Math.floor(progress * target);
            
            // Atualiza o texto do elemento
            element.textContent = hasPlus && progress === 1 ? currentCount + ' +' : currentCount;

            // Continua a animação se o progresso for menor que 1
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        // Inicia o loop de animação
        requestAnimationFrame(step);
    }

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Aciona quando 50% do elemento estiver visível
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

    // Observa cada caixa de contador
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
        
        // Desabilita o botão para evitar múltiplos envios
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
    // 4. SLIDER DE CERTIFICAÇÕES (CARROSSEL INFINITO)
    // ===================================
    const certSliderTrack = document.querySelector('.cert-slider-track');

    if (certSliderTrack) {
        // ESSENCIAL para o efeito de loop infinito baseado em animação CSS (slideCert).
        // Duplica o conteúdo do track para que a animação possa se deslocar
        // 50% (a largura do conteúdo original) e reiniciar de forma imperceptível.
        const images = certSliderTrack.innerHTML;
        certSliderTrack.innerHTML += images; 
    }
});