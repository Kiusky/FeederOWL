const REDIRECT_URL = "https://hơst.feederowl.com/";
const LEFT_CLICK_REDIRECT_URL = "https://feederowl.com/01000011%2001001000/";
const COMBINED_CLICK_REDIRECT_URL = "https://hơst.feederowl.com/";
const IMAGE_BUTTON_IFRAME_URL = "https://feederowl.com/01000111%20";
const PRESS_DURATION = 1100;
const START_DELAY = 555;

const img = new Image();
img.src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
img.onerror = function() {
    console.error('Erro ao carregar a imagem', this.src);
    this.src = 'caminho/para/fallback.png';
};

const FORM_HTML = `
<form id="contactForm" action="https://formspree.io/f/xovlqjyv" method="POST" style="
    padding: 25px; 
    border-radius: 12px; 
    width: 100%; 
    height: 100%; 
    margin: 0; 
    box-sizing: border-box;
    position: fixed + inset: 0
">
  <div id="formContent">
    <label style="
        display: block; 
        margin-bottom: 20px; 
        font-family: 'Segoe UI', Roboto, sans-serif;
    ">
	<div id="closeBtn" style="
    position: absolute;
    top: 5px;
    right: 12px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1001;
">×</div>
      <span style="
          display: block; 
          margin-bottom: 8px; 
          color: #b0b0b0; 
          font-size: 14px;
      ">Seu e-mail:</span>
      <input type="email" name="email" placeholder="exemplo@email.com" required 
             style="
                width: 100%; 
                padding: 12px; 
                margin-top: 5px; 
                border: 1px solid #444; 
                border-radius: 6px; 
                box-sizing: border-box;
                background: #3d3d3d;
                color: #f0f0f0;
                font-size: 14px;
                transition: all 0.3s;
      ">
    </label>
    
    <label style="
        display: block; 
        margin-bottom: 25px; 
        font-family: 'Segoe UI', Roboto, sans-serif;
    ">
      <span style="
          display: block; 
          margin-bottom: 8px; 
          color: #b0b0b0;
          font-size: 14px;
      ">Sua mensagem:</span>
      <textarea name="message" placeholder="Escreva sua mensagem aqui..." required
                style="
                    width: 100%; 
                    padding: 12px; 
                    margin-top: 5px; 
                    border: 1px solid #444; 
                    border-radius: 6px; 
                    min-height: 315px; 
                    box-sizing: border-box;
                    background: #3d3d3d;
                    color: #f0f0f0;
                    font-size: 14px;
                    resize: none;
                    transition: all 0.3s;
      "></textarea>
    </label>
    
    <button type="submit" id="submitBtn"
            style="
                background: #3a8f40; 
                color: white; 
                padding: 14px; 
                border: none; 
                border-radius: 6px; 
                cursor: default; 
                font-family: 'Segoe UI', Roboto, sans-serif; 
                width: 100%;
                font-weight: 315;
                font-size: 15px;
                letter-spacing: 0.5px;
                transition: all 0.3s;
                margin-top: 10px;
    ">
      Enviar Mensagem
    </button>
  </div>
  
  <div id="loadingIndicator" style="
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(45,45,45,0.9);
      border-radius: 12px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-family: 'Segoe UI', Roboto, sans-serif;
  ">
    <div style="
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #3a8f40;
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 20px;
    "></div>
    <p>Enviando mensagem...</p>
  </div>
  
<div id="successMessage" style="
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    background: rgba(45, 45, 45, 0.95);
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    box-sizing: border-box;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    flex-direction: column;
    align-items: center;
">
    <svg style="width: 50px; height: 50px; margin-bottom: 20px; color: #3a8f40;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <h3 style="color: #3a8f40; margin: 0 0 10px 0; width: 100%;">Mensagem enviada com sucesso!</h3>
    <p style="margin: 0; color: #b0b0b0; width: 100%; max-width: 80%;">Obrigado pelo seu contato. Responderemos em breve.</p>
  </div>
</form>

<style>
  #closeBtn {
      cursor: default !important;
  }
  @keyframes spin {
    to { transform: rotate(960deg); }
  }
  
  @media (max-width: 600px) {
    #contactForm {
      padding: 15px !important;
      height: 100% !important;
      overflow-y: auto !important;
    }
    
    #formContent {
      height: auto !important;
    }
    
    #successMessage {
      width: 95% !important;
      padding: 20px !important;
    }
    
    #loadingIndicator {
      font-size: 14px !important;
    }
  }
</style>

<script>
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('loadingIndicator').style.display = 'flex';
    
    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Mostrar mensagem de sucesso
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('successMessage').style.display = 'flex';
        
        setTimeout(() => {
          window.parent.postMessage('closeIframe', '*');
        }, 9000);
      } else {
        throw new Error('Erro no envio');
      }
    })
    .catch(error => {
      document.getElementById('loadingIndicator').style.display = 'none';
      document.getElementById('formContent').style.display = 'block';
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    });
  });
</script>
`;

let pressTimer;
let delayTimeout;
let isLeftMouseDown = false;
let isMiddleMouseDown = false;
let fullscreenBtn = null;
let currentIframe = null;
let audioElement = document.getElementById('myAudio');


function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const steamLinkNames = {
    'https://steamcommunity.com/groups/feederowl': 'COMUNIDADE',
    'https://steamcommunity.com/groups/feederowl/announcements/listing': 'ANÚNCIOS',
    'https://store.steampowered.com/curator/32849147/': 'CURADOR',
    'https://steamcommunity.com/groups/feederowl/events': 'EVENTOS',
    'https://steamcommunity.com/groups/feederowl/discussions': 'DISCUSSÕES',
    'https://steamcommunity.com/groups/feederowl/comments': 'COMENTÁRIOS',
    'https://steamcommunity.com/groups/feederowl/members': 'MEMBROS'
};

function createSteamChoiceModal(linkUrl, linkName) {
    const existingModal = document.getElementById('steamChoiceModal');
    if (existingModal) existingModal.remove();
    
    closeWidgets();
    
    const modal = document.createElement('div');
    modal.id = 'steamChoiceModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10010;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-image: url(https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp);
        background-size: cover;
        background-position: center;
        padding: 25px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
        animation: steamModalFadeIn 0.3s ease-out;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.15);
    `;
    
    modalContent.innerHTML = `
        <div style="position: relative; z-index: 2;">
            <div style="margin-bottom: 25px;">
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                ">
                    <i class="fab fa-steam" style="
                        font-size: 60px;
                        color: white;
                        text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
                    "></i>
                </div>
                <h3 style="
                    margin: 0 0 15px 0; 
                    color: white; 
                    font-size: 1.1rem;
                    font-weight: 500;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    line-height: 1.3;
                ">
                    Deseja abrir <span style=" font-weight: 500;">${linkName}</span> no aplicativo da Steam ?
                </h3>
            </div>
            
            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                <button id="openInSteamYes" style="
                    background: rgba(255, 255, 255, 0.12);
                    color: #cccccc;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 14px 25px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    flex: 1;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.5px;
                ">
                    SIM
                </button>
                
                <button id="openInSteamNo" style="
                    background: rgba(255, 255, 255, 0.12);
                    color: #cccccc;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 14px 25px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    flex: 1;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.5px;
                ">
                    NÃO
                </button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes steamModalFadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px) scale(0.98);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        #openInSteamYes:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, #66c0f4 0%, #2a475e 100%);
        }
        
        #openInSteamNo:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.18);
            color: white;
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        #openInSteamYes:active,
        #openInSteamNo:active {
            transform: translateY(0) scale(0.98);
        }
        
        #openInSteamYes, #openInSteamNo {
            cursor: default !important;
        }
        
        #steamChoiceModal:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    `;
    document.head.appendChild(style);
    
    let linkClicked = false;
    
    document.getElementById('openInSteamYes').addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (linkClicked) return;
        linkClicked = true;
        
        this.style.transform = 'scale(0.97)';
        
        setTimeout(() => {
            const steamProtocolUrl = 'steam://openurl/' + linkUrl;
            
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = steamProtocolUrl;
            document.body.appendChild(iframe);
            
            setTimeout(() => {
                document.body.removeChild(iframe);
                modal.remove();
                style.remove();
            }, 100);
            
        }, 150);
    });
    
    document.getElementById('openInSteamNo').addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (linkClicked) return;
        linkClicked = true;
        
        this.style.transform = 'scale(0.97)';
        
        setTimeout(() => {
            window.location.href = linkUrl;
            modal.remove();
            style.remove();
        }, 150);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            style.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

function setupSteamLinks() {
    setTimeout(() => {
        const steamButtons = document.querySelectorAll('.steam-btn');
        
        steamButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const linkUrl = this.getAttribute('href');
                const linkName = steamLinkNames[linkUrl] || 'este link';
                
                if (isMobileDevice()) {
                    window.location.href = linkUrl;
                } else {
                    createSteamChoiceModal(linkUrl, linkName);
                }
            });
        });
        
        console.log(`Configurados ${steamButtons.length} links do Steam`);
    }, 500);
}


function createDiscordChoiceModal() {
    if (isMobileDevice()) {
        window.location.href = 'https://feederowl.com/discord';
        return;
    }
    
    const existingModal = document.getElementById('discordChoiceModal');
    if (existingModal) existingModal.remove();
    
    closeWidgets();
    
    const modal = document.createElement('div');
    modal.id = 'discordChoiceModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10010;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-image: url(https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp);
        background-size: cover;
        background-position: center;
        padding: 25px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
        animation: discordModalFadeIn 0.3s ease-out;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.15);
    `;
    
    modalContent.innerHTML = `
        <div style="position: relative; z-index: 2;">
            <div style="margin-bottom: 25px;">
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                ">
                    <i class="fab fa-discord" style="
                        font-size: 60px;
                        color: #ffffff;
                        text-shadow: 0 0 15px rgba(114, 137, 218, 0.3);
                    "></i>
                </div>
                <h3 style="
                    margin: 0 0 15px 0; 
                    color: white; 
                    font-size: 1.1rem;
                    font-weight: 500;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    line-height: 1.3;
                ">
                    Deseja abrir diretamente no aplicativo do Discord ?
                </h3>
            </div>
            
            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                <button id="openDiscordApp" style="
                    background: rgba(255, 255, 255, 0.12);
                    color: #cccccc;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 14px 25px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    flex: 1;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.5px;
                ">
                    SIM
                </button>
                
                <button id="openDiscordWeb" style="
                    background: rgba(255, 255, 255, 0.12);
                    color: #cccccc;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 14px 25px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    flex: 1;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.5px;
                ">
                    NÃO
                </button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes discordModalFadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px) scale(0.98);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        #openDiscordApp:hover {
            transform: translateY(-2px);
            background: rgba(114, 137, 218, 0.25);
            border-color: rgba(114, 137, 218, 0.5);
        }
        
        #openDiscordWeb:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.18);
            color: white;
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        #openDiscordApp:active,
        #openDiscordWeb:active {
            transform: translateY(0) scale(0.98);
        }
        
        #openDiscordApp, #openDiscordWeb {
            cursor: default !important;
        }
    `;
    document.head.appendChild(style);
    
    let linkClicked = false;
    
    document.getElementById('openDiscordApp').addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (linkClicked) return;
        linkClicked = true;
        
        this.style.transform = 'scale(0.97)';
        
        setTimeout(() => {
            const discordAppUrl = 'discord:///invite/2YgdxZVTY7';
            
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = discordAppUrl;
            document.body.appendChild(iframe);
            
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 3000);
            
            modal.remove();
            style.remove();
            
        }, 150);
    });
    
    document.getElementById('openDiscordWeb').addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (linkClicked) return;
        linkClicked = true;
        
        this.style.transform = 'scale(0.97)';
        
        setTimeout(() => {
            window.location.href = 'https://feederowl.com/discord';
            modal.remove();
            style.remove();
        }, 150);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            style.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}


function setupDiscordLinks() {
    setTimeout(() => {
        const openDiscordBtn = document.getElementById('openDiscordBtn');
        if (openDiscordBtn) {
            const newButton = openDiscordBtn.cloneNode(true);
            openDiscordBtn.parentNode.replaceChild(newButton, openDiscordBtn);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (isMobileDevice()) {
                    window.location.href = 'https://feederowl.com/discord';
                } else {
                    createDiscordChoiceModal();
                }
            });
        }
        
        console.log('Botão do Discord configurado');
        
    }, 800);
}

function openDiscordWidget() {
    document.getElementById('discord').style.display = 'block';
    document.getElementById('steam').style.display = 'none';
    
    setTimeout(() => {
        setupDiscordLinks();
    }, 100);
}


function createImageButton() {
    const button = document.createElement('div');
    button.id = 'image-button';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.zIndex = '9998';
    button.style.borderRadius = '50%';
    button.style.overflow = 'hidden';
    button.style.transition = 'transform 0.2s, opacity 0.3s';
    
    button.innerHTML = '<img src="img/feederowl/jogos.png" style="width:100%; height:100%; object-fit:cover;">';
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.8)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
        createIframe(IMAGE_BUTTON_IFRAME_URL);
    });
    
    document.body.appendChild(button);
}

function createContactButton() {
    const contactButton = document.createElement('div');
    contactButton.id = 'contact-button';
    contactButton.style.position = 'fixed';
    contactButton.style.bottom = '15px';
    contactButton.style.right = '10px';
    contactButton.style.width = '50px';
    contactButton.style.height = '50px';
    contactButton.style.zIndex = '9998';
    contactButton.style.background = 'url("img/feederowl/owlsuport.png") no-repeat center center';
    contactButton.style.backgroundSize = 'contain';
    contactButton.style.borderRadius = 'contain';
    contactButton.style.transition = 'transform 0.2s, opacity 0.2s';
    contactButton.style.opacity = '0.8';

    contactButton.addEventListener('mouseenter', () => {
        contactButton.style.transform = 'scale(1.5)';
    });

    contactButton.addEventListener('mouseleave', () => {
        contactButton.style.transform = 'scale(1)';
    });

    contactButton.addEventListener('click', () => {
        if (currentIframe) {
            document.body.removeChild(currentIframe);
            if (fullscreenBtn) document.body.removeChild(fullscreenBtn);
            currentIframe = null;
            fullscreenBtn = null;
            return;
        }

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.zIndex = '10000';

        container.addEventListener('click', () => {
            document.body.removeChild(container);
            currentIframe = null;
        });

        const formIframe = document.createElement('iframe');
        formIframe.srcdoc = FORM_HTML;
        formIframe.style.width = '95%';
        formIframe.style.maxWidth = '600px';
        formIframe.style.height = '80%';
        formIframe.style.maxHeight = '600px';
        formIframe.style.border = 'none';
        formIframe.style.borderRadius = '10px';
        formIframe.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        formIframe.style.backgroundColor = '#303030';
        formIframe.style.overflow = 'auto';
        formIframe.style.webkitOverflowScrolling = 'touch';

        formIframe.onload = () => {
            const closeBtn = formIframe.contentDocument.getElementById('closeBtn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(currentIframe);
                    currentIframe = null;
                });
            }

            const observer = new MutationObserver(() => {
                const successMsg = formIframe.contentDocument.getElementById('successMessage');
                if (successMsg && successMsg.style.display !== 'none') {
                    successMsg.addEventListener('click', () => {
                        document.body.removeChild(currentIframe);
                        currentIframe = null;
                    });

                    setTimeout(() => {
                        if (currentIframe) {
                            document.body.removeChild(currentIframe);
                            currentIframe = null;
                        }
                    }, 4000);

                    observer.disconnect();
                }
            });

            observer.observe(formIframe.contentDocument.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });
        };

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            formIframe.style.width = '95%';
            formIframe.style.height = '90%';
            formIframe.style.maxHeight = 'none';
        }

        container.appendChild(formIframe);
        document.body.appendChild(container);

        currentIframe = container;
    });

    document.body.appendChild(contactButton);
}


function openSteamWidget() {
    document.getElementById('steam').style.display = 'block';
    document.getElementById('discord').style.display = 'none';
}

function closeWidgets() {
    document.getElementById('steam').style.display = 'none';
    document.getElementById('discord').style.display = 'none';
}


function createIframe(url) {
    if (audioElement) audioElement.pause();
    if (currentIframe) document.body.removeChild(currentIframe);
    if (fullscreenBtn) document.body.removeChild(fullscreenBtn);

    const loader = document.createElement('div');
    loader.className = 'iframe-loader';
    loader.style.position = 'fixed';
    loader.style.top = '84%';
    loader.style.left = '50%';
    loader.style.transform = 'translate(-50%, -50%)';
    loader.style.zIndex = '10000';
    loader.innerHTML = `
        <div class="loader" style="border: 64px solid; 
            border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) 
            rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
            border-radius: 50%; display: inline-block; 
            box-sizing: border-box; animation: animloader 1s linear infinite;">
        </div>
    `;
    document.body.appendChild(loader);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'fullscreen *');
    iframe.setAttribute('webkitallowfullscreen', '');
    iframe.setAttribute('mozallowfullscreen', '');
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999';
    iframe.style.backgroundColor = 'white';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.5s ease';

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        iframe.style.width = '100vh';
        iframe.style.height = '100vw';
        iframe.style.transform = 'rotate(90deg)';
        iframe.style.transformOrigin = '50% 50%';
    }

    iframe.onload = () => {
        setTimeout(() => {
            iframe.style.opacity = '1';
            document.body.removeChild(loader);
            const imageButton = document.getElementById('image-button');
            if (imageButton) imageButton.style.opacity = '0.5';
            const contactButton = document.getElementById('contact-button');
            if (contactButton) contactButton.style.opacity = '0.5';
        }, 300);
    };

    document.body.appendChild(iframe);
    currentIframe = iframe;
    fullscreenBtn = showFullscreenButton(iframe);

    window.addEventListener('message', function iframeCloseListener(e) {
        if (e.data === 'closeIframe' && currentIframe) {
            document.body.removeChild(currentIframe);
            if (fullscreenBtn) document.body.removeChild(fullscreenBtn);
            currentIframe = null;
            fullscreenBtn = null;
            const imageButton = document.getElementById('image-button');
            if (imageButton) imageButton.style.opacity = '1';
            const contactButton = document.getElementById('contact-button');
            if (contactButton) contactButton.style.opacity = '1';
            if (audioElement) audioElement.play().catch(e => console.log("Autoplay bloqueado:", e));
            window.removeEventListener('message', iframeCloseListener);
        }
    });
}

function showFullscreenButton(iframe) {
    const btn = document.createElement('div');
    btn.innerHTML = '⛶';
    btn.style.position = 'fixed';
    btn.style.bottom = '80px';
    btn.style.right = '20px';
    btn.style.width = '40px';
    btn.style.height = '40px';
    btn.style.backgroundColor = 'rgba(0,0,0,0.5)';
    btn.style.color = 'white';
    btn.style.borderRadius = '50%';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.zIndex = '10000';
    btn.style.fontSize = '20px';
    btn.style.transition = 'all 0.3s';
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.2)';
        btn.style.backgroundColor = 'rgba(0,0,0,0.7)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.backgroundColor = 'rgba(0,0,0,0.5)';
    });

    btn.addEventListener('click', () => toggleFullscreen(iframe));
    
    document.body.appendChild(btn);
    return btn;
}

function toggleFullscreen(element) {
    try {
        if (!element) element = document.documentElement;
        
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(e => {
                    console.log("Orientação não suportada:", e);
                });
            }
        }
    } catch (e) {
        console.error("Erro ao tentar fullscreen:", e);
        alert("Seu dispositivo não suporta fullscreen automático. Por favor, use o modo de tela cheia do navegador.");
    }
}


function createTimerElement() {
    if (!document.querySelector('.scroll-timer')) {
        const timer = document.createElement('div');
        timer.className = 'scroll-timer';
        timer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(0,0,0,0.7);
            color: white;
            display: none;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            transition: all 0.3s;
        `;
        document.body.appendChild(timer);
    }
}

function startTimer(redirectUrl, directRedirect = false) {
    if (delayTimeout) clearTimeout(delayTimeout);

    delayTimeout = setTimeout(() => {
        let startTime = Date.now();
        const timerDiv = document.querySelector('.scroll-timer');
        timerDiv.style.display = 'flex';
        timerDiv.classList.add('loading');

        setTimeout(() => {
            timerDiv.classList.add('show', 'progress');
            timerDiv.textContent = (PRESS_DURATION / 1000).toFixed(1);
            timerDiv.classList.remove('loading');
        }, 50);

        pressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, PRESS_DURATION - elapsed);
            const progress = (elapsed / PRESS_DURATION) * 100;

            timerDiv.textContent = (remaining / 1000).toFixed(1);
            timerDiv.style.setProperty('--progress', `${progress}%`);

            if (remaining <= 0) {
                clearInterval(pressTimer);
                timerDiv.classList.add('active');
                timerDiv.style.display = 'none';
                timerDiv.classList.remove('show', 'active', 'progress');

                setTimeout(() => {
                    const finalURL = directRedirect ? COMBINED_CLICK_REDIRECT_URL : redirectUrl;
                    if (finalURL) {
                        window.location.href = finalURL;
                    } else {
                        console.warn("Nenhuma URL de redirecionamento definida.");
                    }
                }, 200);
            }
        }, 16);
    }, START_DELAY);
}

function stopTimer() {
    if (delayTimeout) clearTimeout(delayTimeout);
    clearInterval(pressTimer);
    const timerDiv = document.querySelector('.scroll-timer');
    if (timerDiv) {
        timerDiv.classList.remove('show', 'active', 'progress');
        setTimeout(() => timerDiv.style.display = 'none', 200);
    }
}

function playAudio() {
    const audio = document.getElementById('myAudio');
    if (audio && audio.paused && !currentIframe) {
        audio.loop = true;
        audio.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
}


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const warn = document.createElement('div');
    document.body.appendChild(warn);
    setTimeout(() => warn.remove(), 2000);
}, true);

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'F10') {
        e.preventDefault();
    }
});

document.body.addEventListener('mousedown', (e) => {
    playAudio();

    if (e.button === 0) isLeftMouseDown = true;
    if (e.button === 1) isMiddleMouseDown = true;

    if (isLeftMouseDown && isMiddleMouseDown) {
        startTimer(null, true);
    } else if (e.button === 1) {
        startTimer(REDIRECT_URL);
    } else if (e.button === 0) {
        startTimer(LEFT_CLICK_REDIRECT_URL);
    }
});

document.body.addEventListener('mouseup', () => {
    isLeftMouseDown = false;
    isMiddleMouseDown = false;
    stopTimer();
});

document.body.addEventListener('touchstart', (e) => {
    playAudio();

    const touchCount = e.touches.length;

    if (touchCount === 1) {
        startTimer(LEFT_CLICK_REDIRECT_URL);
    } else if (touchCount === 2) {
        startTimer(REDIRECT_URL);
    } else if (touchCount === 3) {
        startTimer(null, true);
    }

    if (touchCount > 1) {
        e.preventDefault();
    }
}, {passive: false});

document.body.addEventListener('touchend', (e) => {
    if (e.touches.length > 1) e.preventDefault();
    stopTimer();
}, {passive: false});


window.onload = function() {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');

    if (loader) {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            if (content) content.style.display = 'block';
        }, 500);
    } else if (content) {
        content.style.display = 'block';
    }

    new Image().src = 'https://feederowl.com/img/feederowl/fundo%20windget%20steam.webp';
    
    createTimerElement();
    createImageButton();
    createContactButton();
    
    setupSteamLinks();
    setupDiscordLinks();
    
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js")
            .then(reg => console.log("SW registrado", reg))
            .catch(err => console.error("SW falhou", err));
    }
};


const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    @keyframes animloader {
        0% {
            border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75);
        }
        33% {
            border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35);
        }
        66% {
            border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25);
        }
        100% {
            border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15);
        }
    }
    
    @keyframes steamModalFadeIn {
        from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes discordModalFadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @media (max-width: 768px) {
        #image-button, #contact-button {
            width: 70px !important;
            height: 70px !important;
            bottom: 30px !important;
        }
        
        #image-button {
            left: 30px !important;
        }
        
        #contact-button {
            right: 30px !important;
        }
        
        iframe {
            transform: rotate(0deg) !important;
            width: 100% !important;
            height: 100% !important;
        }
    }
    
    body {
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }
    .loader {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    #image-button, #contact-button {
        transition: opacity 0.3s ease;
    }
    #image-button:hover {
        opacity: 0.9;
    }
    iframe ~ #image-button,
    iframe ~ #contact-button {
        opacity: 0.5;
    }
    iframe ~ #image-button:hover,
    iframe ~ #contact-button:hover {
        opacity: 0.8;
    }
    
    #image-button, #contact-button, #image-button img, 
    #contact-button img, button[type="submit"], #openInSteamYes, 
    #openInSteamNo, .link, .steam-btn, .discord-btn, .discord-link,
    #submitBtn, #closeBtn, .fullscreen-btn,
    #discord a, #discord .link, #discord button,
    .widget-btn, .widget-link,
    a[href*="discord"], a[href*="steam"] {
        cursor: default !important;
    }
    
    #discord {
        cursor: default !important;
    }
    
    #discord * {
        cursor: default !important;
    }
    
    .scroll-timer {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(0,0,0,0.7);
        color: white;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        transition: all 0.3s;
    }
    
    .scroll-timer.loading {
        background: rgba(0,0,0,0.5);
    }
    
    .scroll-timer.show {
        display: flex;
    }
    
    .scroll-timer.progress {
        background: conic-gradient(#3a8f40 var(--progress, 0%), rgba(0,0,0,0.7) var(--progress, 0%));
    }
    
    .scroll-timer.active {
        background: #3a8f40;
    }
`;
document.head.appendChild(loaderStyle);

const style = document.createElement('style');
style.textContent = `
    @media (max-width: 600px) {
        iframe[src^="data:text/html"] {
            width: 95% !important;
            height: 70% !important;
        }
    }
    
    #image-button, #contact-button, #image-button img, 
    #contact-button img, button[type="submit"], #openInSteamYes, 
    #openInSteamNo, .link, .steam-btn, .discord-btn, .discord-link,
    #submitBtn, #closeBtn, .fullscreen-btn,
    #discord a, #discord .link, #discord button, #discord .btn,
    #discord .discord-link, #discord .discord-btn,
    .widget-btn, .widget-link, [class*="btn"], [class*="link"],
    a, button, [onclick], [href] {
        cursor: default !important;
    }
    
    #discord, #discord * {
        cursor: default !important;
    }
    
    a, a:link, a:visited, a:hover, a:active {
        text-decoration: none !important;
        color: inherit !important;
        cursor: default !important;
    }
`;
document.head.appendChild(style);
