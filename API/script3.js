const form = document.forms[0];
const inputCEP  = form["cep"];
const respLogradouro = document.getElementById("logradouro");
const bntJoke = document.getElementById("joke");
const txtJoke = document.getElementById("joke-text")

bntJoke.onclick = async function (event) {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    if(response.ok) {
        const piada = await response.json();
        txtJoke.innerText = piada.value;
    }
}


form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const cep = inputCEP.value;

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        console.log(response.ok);
        if (response.status == 200){
            const dados = await response.json();
        }if (response.status == 404){
            dados = "CEP não encontrado";
        }
        else{
            dados = "CEP inválido";
        }    
        respLogradouro.innerText = resposta;
        const resposta = dados.street?`Logradouro: ${dados.street}`:dados;
    } catch (error){
        console.log(error);
    }
})