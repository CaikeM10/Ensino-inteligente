document.addEventListener('DOMContentLoaded', function() {
    // Seleção de elementos DOM, usando const para variáveis que não serão reatribuídas
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list li a');
    const body = document.body; // Referência ao body para controle de scroll

    // --- 1. Funcionalidade do Menu Hamburger (Mobile) ---
    // Verifica se os elementos essenciais do menu existem antes de adicionar event listeners
    if (hamburgerButton && navMenu && body) {
        hamburgerButton.addEventListener('click', function() {
            // Alterna a classe 'active' no menu de navegação e no body para controlar o scroll
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');

            // Altera o ícone do hambúrguer (fa-bars) para fechar (fa-times) e vice-versa
            // e atualiza o atributo aria-expanded para acessibilidade
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                this.setAttribute('aria-expanded', 'true');
                // Foca no primeiro link do menu para melhor acessibilidade
                navMenu.querySelector('a')?.focus();
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.setAttribute('aria-expanded', 'false');
            }
        });

        // Fecha o menu quando um link é clicado (útil no mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Previne o comportamento padrão de rolagem imediata se o smooth scroll for ativado
                // Não é estritamente necessário aqui, já que o smooth scroll fará isso.
                // Mas pode ser útil se o smooth scroll for removido.
                // event.preventDefault(); 

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.classList.remove('no-scroll'); // Destrava o scroll do body

                    // Restaura o ícone do hambúrguer
                    const icon = hamburgerButton.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    hamburgerButton.focus(); // Opcional: retorna o foco para o botão hambúrguer
                }
            });
        });

        // Opcional: Fechar o menu ao clicar fora dele
        // Adiciona um listener ao documento para cliques fora do menu e do botão
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburgerButton.contains(event.target);

            if (navMenu.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
                const icon = hamburgerButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                hamburgerButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Opcional: Fechar o menu ao pressionar a tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
                const icon = hamburgerButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                hamburgerButton.setAttribute('aria-expanded', 'false');
                hamburgerButton.focus(); // Retorna o foco para o botão hambúrguer
            }
        });
    }

    // --- 2. Suavizar a Rolagem para Links de Âncora ---
    // Adicionei 'a[href^="#"]' no CSS (html { scroll-behavior: smooth; })
    // Isso é o método moderno e preferível para rolagem suave.
    // O código JS abaixo é mais para ajustar o offset da barra de navegação fixa.
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    if (internalLinks.length > 0) { // Verifica se há links internos
        internalLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Previne o comportamento padrão (salto imediato)

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const header = document.querySelector('.header');
                    // Calcula o offset do cabeçalho fixo, se ele existir
                    const headerOffset = header ? header.offsetHeight : 0;
                    // Adiciona um pequeno padding extra para que o conteúdo não fique "colado" no header
                    const extraPadding = 20; 

                    // Calcula a posição final de rolagem
                    const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset - extraPadding;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }


    // --- 3. Efeito de ScrollReveal para Animar Elementos ao Rolar (Opcional) ---
    // Verifique se a biblioteca ScrollReveal está carregada antes de inicializá-la
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal(); // Inicializa ScrollReveal uma vez

        // Configurações comuns para as animações para manter a consistência
        const commonRevealOptions = {
            opacity: 0,
            duration: 1000, // Duração um pouco maior para um efeito mais suave
            easing: 'ease-out',
            mobile: false, // Pode ser alterado para 'true' se desejar animações em mobile
            // Reset: true, // Adicione se quiser que as animações se repitam ao rolar para cima/baixo
        };

        sr.reveal('.reveal-bottom', {
            ...commonRevealOptions, // Espalha as opções comuns
            distance: '60px', // Mais distância
            origin: 'bottom',
            interval: 150, // Intervalo um pouco maior para um efeito cascata mais notável
        });

        sr.reveal('.reveal-left', {
            ...commonRevealOptions,
            distance: '100px', // Mais distância
            origin: 'left',
        });

        sr.reveal('.reveal-right', {
            ...commonRevealOptions,
            distance: '100px', // Mais distância
            origin: 'right',
        });

        sr.reveal('.reveal-scale', {
            ...commonRevealOptions,
            scale: 0.85, // Escala um pouco maior
            interval: 200, // Intervalo maior para as logos
        });

        // Opcional: Revelar o header com um pequeno atraso
        // sr.reveal('.header', {
        //     distance: '20px',
        //     origin: 'top',
        //     opacity: 0,
        //     duration: 800,
        //     delay: 200,
        //     easing: 'ease-out',
        // });

    } else {
        // Alerta no console se a biblioteca ScrollReveal não for encontrada
        console.warn('ScrollReveal library not loaded. Element animations will not play.');
    }

    // --- 4. Animação de Contagem para Seção de Resultados ---
    function animateNumber(element, start, end, duration) {
        let startTime = null;
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Formatação do número com base no valor final para incluir '+' ou '%'
            let formattedValue = '';
            if (end >= 1000) {
                formattedValue = `+${value.toLocaleString('pt-BR')}`; // Formato para milhares
            } else if (end === 95) { // Para o caso específico de 95%
                formattedValue = `%${value}`;
            } else {
                formattedValue = `+${value}`; // Padrão para outros números
            }
            element.textContent = formattedValue;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Garante que o valor final seja exatamente o 'end' com o formato correto
                if (end >= 1000) {
                    element.textContent = `+${end.toLocaleString('pt-BR')}`;
                } else if (end === 95) {
                    element.textContent = `%${end}`;
                } else {
                    element.textContent = `+${end}`;
                }
            }
        };
        requestAnimationFrame(step);
    }

    const resultsSection = document.getElementById('resultados');
    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.5 // Ação quando 50% da seção está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const resultItems = entry.target.querySelectorAll('.result-item');
                resultItems.forEach(item => {
                    const numberElement = item.querySelector('.result-number');
                    // Garante que o data-target seja tratado como um número e remove '+' ou '%' para parsear
                    const targetValue = parseInt(numberElement.dataset.target.replace(/[+%]/g, ''));
                    
                    // Evita re-animar se já estiver animado
                    if (!item.classList.contains('animated')) {
                        animateNumber(numberElement, 0, targetValue, 2000); // 2000ms = 2 segundos de animação
                        item.classList.add('animated'); // Marca como animado para não repetir
                    }
                });
                // Opcional: Para animar apenas uma vez, desconecte o observer
                // observer.disconnect(); 
            }
        });
    }, observerOptions);

    // Verifica se a seção de resultados existe para observar
    if (resultsSection) {
        observer.observe(resultsSection);
    } else {
        console.warn('Seção de Resultados (#resultados) não encontrada. Animação de contagem não será ativada.');
    }
});