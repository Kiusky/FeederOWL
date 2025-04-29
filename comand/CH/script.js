    let embedAberto = false;

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
        }
        if (e.keyCode === 123) {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('botao-imagem') || e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    document.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    document.addEventListener('drop', function(e) {
        e.preventDefault();
    });

    function shuffleButtons() {
        const container = document.getElementById('container-botoes');
        const buttons = Array.from(container.querySelectorAll('.botao-imagem'));
        
        for (let i = buttons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            container.insertBefore(buttons[j], buttons[i]);
        }
    }

    function installAdGuard() {
        window.open('https://adguard.com/pt_br/adguard-browser-extension/overview.html', '_blank');
        closeAdGuardPopup();
    }

    function closeAdGuardPopup() {
        document.getElementById('adguardPopup').style.display = 'none';
    }

    function dontShowAgain() {
        localStorage.setItem('hideAdGuardPopup', 'true');
        closeAdGuardPopup();
    }

    function desativarElementos(desativar) {
        // Desativa/ativa botões
        const botoes = document.querySelectorAll('.botao-imagem');
        botoes.forEach(botao => {
            if (desativar) {
                botao.classList.add('desativado');
            } else {
                botao.classList.remove('desativado');
            }
        });

        // Desativa/ativa barra de busca
        const searchContainer = document.getElementById('search-container');
        if (desativar) {
            searchContainer.classList.add('desativado');
            // Fecha a busca se estiver aberta
            document.getElementById('campo-busca').classList.remove('active');
        } else {
            searchContainer.classList.remove('desativado');
        }
    }

    function mostrarEmbed(tipo) {
        if (embedAberto) return;
        
        embedAberto = true;
        desativarElementos(true);
        
        document.getElementById('overlay').classList.add('active-overlay');
        const embed = document.getElementById(`embed-${tipo}`);
        const iframe = document.getElementById(`iframe-${tipo}`);
        
        if (embed && iframe) {
            iframe.src = `https://embedcanaistv.com/${tipo}/`;
            embed.classList.add('active-embed');
        }
    }

    function fecharEmbed(tipo) {
        embedAberto = false;
        desativarElementos(false);
        
        document.getElementById('overlay').classList.remove('active-overlay');
        const embed = document.getElementById(`embed-${tipo}`);
        const iframe = document.getElementById(`iframe-${tipo}`);
        
        if (embed && iframe) {
            iframe.src = 'about:blank';
            embed.classList.remove('active-embed');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        shuffleButtons();
        
        if (localStorage.getItem('hideAdGuardPopup') !== 'true') {
            setTimeout(function() {
                document.getElementById('adguardPopup').style.display = 'block';
            }, 2000);
        }
        
        const campoBusca = document.getElementById('campo-busca');
        const searchButton = document.getElementById('search-button');
        const botoes = document.querySelectorAll('.botao-imagem');
        const mensagemSemResultado = document.querySelector('.sem-resultado');
        
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.src = 'about:blank';
        });

        botoes.forEach(btn => {
            btn.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
            
            const img = btn.querySelector('img');
            if (img) {
                img.addEventListener('dragstart', function(e) {
                    e.preventDefault();
                });
            }
        });

        searchButton.addEventListener('click', function() {
            if (!embedAberto) {
                campoBusca.classList.toggle('active');
                if (campoBusca.classList.contains('active')) {
                    campoBusca.focus();
                }
            }
        });

        document.addEventListener('click', function(e) {
            if (!campoBusca.contains(e.target) && !searchButton.contains(e.target)) {
                campoBusca.classList.remove('active');
            }
        });

        campoBusca.addEventListener('input', function() {
            if (embedAberto) return;
            
            const termo = this.value.toLowerCase();
            let resultadosEncontrados = 0;

            botoes.forEach(botao => {
                const nomeImagem = botao.getAttribute('data-nome').toLowerCase();
                const altImagem = botao.querySelector('img').alt.toLowerCase();

                if (nomeImagem.includes(termo) || altImagem.includes(termo)) {
                    botao.style.display = 'flex';
                    resultadosEncontrados++;
                } else {
                    botao.style.display = 'none';
                }
            });

            if (resultadosEncontrados === 0 && termo !== '') {
                mensagemSemResultado.style.display = 'block';
            } else {
                mensagemSemResultado.style.display = 'none';
            }
        });
    });

    window.addEventListener('load', function() {
        if (window.performance) {
            console.log("Performance monitoring enabled");
            var timeSincePageLoad = Math.round(performance.now());
            console.log("Tempo desde o carregamento: " + timeSincePageLoad + " ms");
        }
    });