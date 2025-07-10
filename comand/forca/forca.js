var imagens = [
    "img/forca/forca.png",
    "img/forca/forca01.png",
    "img/forca/forca02.png",
    "img/forca/forca03.png",
    "img/forca/forca04.png",
    "img/forca/forca05.png",
    "img/forca/forca06.png"
];

for (var i = 0; i < imagens.length; i++) {
    var img = new Image();
    img.src = imagens[i];
}

let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

document.addEventListener("DOMContentLoaded", function() {
    carregaImagemForca();
    carregaListaAutomatica();
    criarPalavraSecreta();
    montarPalavraNaTela();
});

document.addEventListener("DOMContentLoaded", function() {
    preloadForcaImages();

    var btnReiniciar = document.getElementById("btnReiniciar");
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", function() {
            jogarNovamente = false;
            location.reload();
        });
    }

    carregaImagemForca();
    carregaListaAutomatica();
    criarPalavraSecreta();
    montarPalavraNaTela();
});

function carregaImagemForca(){
    const imgElement = document.getElementById("imagem");
    if (!imgElement) return;

    imgElement.style.width = "300px";
    imgElement.style.height = "300px";
    imgElement.style.backgroundSize = "contain";
    imgElement.style.backgroundRepeat = "no-repeat";
    imgElement.style.backgroundPosition = "center";

    switch(tentativas){
        case 6:  
            imgElement.style.backgroundImage = "url('img/forca/forca.png')";
            break;
        case 5:
            imgElement.style.backgroundImage = "url('img/forca/forca01.png')";
            break;
        case 4:
            imgElement.style.backgroundImage = "url('img/forca/forca02.png')";
            break;
        case 3:
            imgElement.style.backgroundImage = "url('img/forca/forca03.png')";
            break;
        case 2:
            imgElement.style.backgroundImage = "url('img/forca/forca04.png')";
            break;
        case 1:
            imgElement.style.backgroundImage = "url('img/forca/forca05.png')";
            break;
        case 0:
            imgElement.style.backgroundImage = "url('img/forca/forca06.png')";
            break;
        default:
            imgElement.style.backgroundImage = "url('img/forca/forca.png')";
            break;
    }
}

function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
}

function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#8B0000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Acertou mizeravi...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}


function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica() {
    if (jogoAutomatico === true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>";
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("status").innerHTML = "";

        document.getElementById("modal-alerta").style.display = "block";
    } else {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>";
        jogoAutomatico = true;

        document.getElementById("status").innerHTML = "";

        document.getElementById("modal-alerta").style.display = "none";
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "IRLANDA",
            categoria:"LUGARES"
        },
        palavra002 = {
            nome: "EQUADOR",
            categoria:"LUGARES"
        },
        palavra003 = {
            nome: "CHILE",
            categoria:"LUGARES"
        },
        palavra004 = {
            nome: "INDONESIA",
            categoria:"LUGARES"
        },
        palavra005 = {
            nome: "MALDIVAS",
            categoria:"LUGARES"
        },
        palavra006 = {
            nome: "INGLATERRA",
            categoria:"LUGARES"
        },
        palavra007 = {
            nome: "GROELANDIA",
            categoria:"LUGARES"
        },
        palavra008 = {
            nome: "UZBEQUISTAO",
            categoria:"LUGARES"
        },
        palavra009 = {
            nome: "INDONESIA",
            categoria:"LUGARES"
        },
        palavra010 = {
            nome: "CREGUENHEM",
            categoria:"LUGARES"
        },
        palavra011 = {
            nome: "BICICLETA",
            categoria:"TRANSPORTE"
        },
        palavra012 = {
            nome: "LANCHA",
            categoria:"TRANSPORTE"
        },
        palavra013 = {
            nome: "NAVIO",
            categoria:"TRANSPORTE"
        },
        palavra014 = {
            nome: "TELEFERICO",
            categoria:"TRANSPORTE"
        },
        palavra015 = {
            nome: "MOTOCICLETA",
            categoria:"TRANSPORTE"
        },
        palavra016 = {
            nome: "BARCO",
            categoria:"TRANSPORTE"
        },
        palavra017 = {
            nome: "AERONAVE",
            categoria:"TRANSPORTE"
        },
        palavra018 = {
            nome: "TREM",
            categoria:"TRANSPORTE"
        },
        palavra019 = {
            nome: "CAIAQUE",
            categoria:"TRANSPORTE"
        },
        palavra020 = {
            nome: "FUNICULAR",
            categoria:"TRANSPORTE"
        },
        palavra021 = {
            nome: "XICARA",
            categoria:"OBJETOS"
        },
        palavra022 = {
            nome: "MOEDA",
            categoria:"OBJETOS"
        },
        palavra023 = {
            nome: "ESPARADRAPO",
            categoria:"OBJETOS"
        },
        palavra024 = {
            nome: "SINO",
            categoria:"OBJETOS"
        },
        palavra025 = {
            nome: "CHUVEIRO",
            categoria:"OBJETOS"
        },
        palavra026 = {
            nome: "TAMBORETE",
            categoria:"OBJETOS"
        },
        palavra027 = {
            nome: "LAMPADA",
            categoria:"OBJETOS"
        },
        palavra028 = {
            nome: "BOCAL",
            categoria:"OBJETOS"
        },
        palavra029 = {
            nome: "CORTINA",
            categoria:"OBJETOS"
        },
        palavra030 = {
            nome: "LAPIS",
            categoria:"OBJETOS"
        },
        palavra031 = {
            nome: "MELANCIA",
            categoria:"ALIMENTOS"
        },
        palavra032 = {
            nome: "AMENDOIM",
            categoria:"ALIMENTOS"
        },
        palavra033 = {
            nome: "ESFIRRA",
            categoria:"ALIMENTOS"
        },
        palavra034 = {
            nome: "GOROROBA",
            categoria:"ALIMENTOS"
        },
        palavra035 = {
            nome: "JANTAR",
            categoria:"ALIMENTOS"
        },
        palavra036 = {
            nome: "SABOROSO",
            categoria:"ALIMENTOS"
        },
        palavra037 = {
            nome: "DESJEJUM",
            categoria:"ALIMENTOS"
        },
        palavra038 = {
            nome: "MASTIGAR",
            categoria:"ALIMENTOS"
        },
        palavra039 = {
            nome: "ENGOLIR",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "DOCERIA",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "DRAGAO",
            categoria:"ANIMAIS"
        },
        palavra041 = {
            nome: "GALINHA",
            categoria:"ANIMAIS"
        },
        palavra042 = {
            nome: "PAVAO",
            categoria:"ANIMAIS"
        },
        palavra043 = {
            nome: "CAMELO",
            categoria:"ANIMAIS"
        },
        palavra044 = {
            nome: "PERU",
            categoria:"ANIMAIS"
        },
        palavra045 = {
            nome: "ZEBRA",
            categoria:"ANIMAIS"
        },
        palavra046 = {
            nome: "DROMEDARIO",
            categoria:"ANIMAIS"
        },
        palavra047 = {
            nome: "CALANGO",
            categoria:"ANIMAIS"
        },
        palavra048 = {
            nome: "SAGUI",
            categoria:"ANIMAIS"
        },
        palavra049 = {
            nome: "LAGARTIXA",
            categoria:"ANIMAIS"
        },
        palavra050 = {
            nome: "HIPOPOTAMO",
            categoria:"ANIMAIS"
        },
        palavra051 = {
            nome: "A ERA DO GELO",
            categoria:"TV E CINEMA"
        },
        palavra052 = {
            nome: "HOMEM ARANHA",
            categoria:"TV E CINEMA"
        },
        palavra053 = {
            nome: "CASA MONSTRO",
            categoria:"TV E CINEMA"
        },
        palavra054 = {
            nome: "TELA QUENTE",
            categoria:"TV E CINEMA"
        },
        palavra055 = {
            nome: "STRANGER THINGS",
            categoria:"TV E CINEMA"
        },
        palavra056 = {
            nome: "O REI DO GADO",
            categoria:"TV E CINEMA"
        },
        palavra057 = {
            nome: "MULHER MARAVILHA",
            categoria:"TV E CINEMA"
        },
        palavra058 = {
            nome: "O INCRIVEL HULK",
            categoria:"TV E CINEMA"
        },
        palavra059 = {
            nome: "BOB ESPONJA",
            categoria:"TV E CINEMA"
        },
        palavra060 = {
            nome: "PANICO NA TV",
            categoria:"TV E CINEMA"
        }
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO", "Palavra chave ou dica inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();

    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";

    document.getElementById("modal-alerta").style.display = "none";
}


function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            carregaImagemForca();
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#fff";
        x.style.color = "#4F4F4F";
        x.disabled = false;
    });
}

async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}
