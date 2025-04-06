/* 
Questão 01- Modo noturno 

Aplique o modo noturno na página apresentada:

    • Utilize JavaScript para selecionar o link "Modo Noturno", o body e os botões de Anterior e Próximo. x
    • Adicione um event listener ao link "Modo Noturno" que detecte o evento de clique do mouse. x
    • Quando o link for clicado, ative a classe dark ao body e troque a classe is-dark para is-light nos botões. x
    • Quando o link for clicado novamente as alterações devem ser desfeitas. x
    • Atualize o texto do link para "Modo Diurno" quando o modo noturno estiver ativo e vice-versa. x
*/

const modoNoturno = document.getElementById("toggleNightMode");
const body = document.querySelector("body");
const btnAnt = document.getElementById("prevButton");
const btnProx = document.getElementById("nextButton");

modoNoturno.addEventListener("click", ()=>{
    body.classList.toggle("dark");
    if(!body.classList.contains("dark")){
        btnAnt.classList = "is-light";
        btnProx.classList = "is-light";
        modoNoturno.innerText = "Modo Noturno";
    } else {
        btnAnt.classList = "is-dark";
        btnProx.classList = "is-dark";
        modoNoturno.innerText = "Modo Diurno";
    }
});

/*
Questão 02- Galeria de Imagens

Crie um script que apresente uma galeria de imagens:

    • Adicione um array no JavaScript contendo URLs de todas as imagens presentes na pasta “./images/bagmon/” x
    • Utilize JavaScript para selecionar a área de visualização de imagem e os botões "Anterior" e "Próximo". x
    • Defina a primeira imagem do array como a imagem inicial na área de visualização. x
    • Adicione event listeners aos botões "Anterior" e "Próximo" que detectem o evento de clique do mouse. x
    • Quando o botão "Anterior" for clicado, exiba a imagem anterior do array na área de visualização. Se a imagem atual for a primeira, exiba a última imagem do array. x
    • Quando o botão "Próximo" for clicado, exiba a próxima imagem do array na área de visualização. Se a imagem atual for a última, exiba a primeira imagem do array. x

*/

const imgs = [
    "./images/bagmon/1.jpeg",
    "./images/bagmon/2.jpeg",
    "./images/bagmon/3.jpeg",
    "./images/bagmon/4.jpeg",
    "./images/bagmon/5.jpeg",
    "./images/bagmon/6.jpeg",
    "./images/bagmon/7.jpeg",
    "./images/bagmon/8.jpeg",
    "./images/bagmon/9.jpeg",
    "./images/bagmon/10.jpeg",
    "./images/bagmon/11.jpeg",
    "./images/bagmon/12.jpeg",
]
const divImg = document.querySelector("figure > img");

divImg.src = imgs[0];

let idx = 0;
btnAnt.addEventListener("click", (event)=>{
    event.preventDefault();
    --idx;
    divImg.src = imgs[idx];
    divImg.alt = bagmon[idx];

    if(idx === -1){
        idx = 11;
        divImg.src = imgs[idx];
    }
})

btnProx.addEventListener("click", (event)=>{
    event.preventDefault();
    ++idx;
    divImg.src = imgs[idx];
    divImg.alt = bagmon[idx];
    
    if(idx === 12){
        idx = 0;
        divImg.src = imgs[idx];
    }
})

/*
Questão 03 - Extra

Crie um script para mostrar no campo texto alternativo (alt) da imagem o nome do respectivo Bágmon.

*/

const bagmon = [
    "Voara",
    "Azurara",
    "Ararazul",
    "Pequemico",
    "Micorado",
    "Douraleão",
    "Capi",
    "Varacapi",
    "Capilorde",
    "Tamanduí",
    "Tamirim",
    "Lutanduá",
]

