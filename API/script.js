const res = document.getElementById('res');
const pokemon = document.getElementById("pokemon")
const form = document.getElementById("form");
const imgPokemon = document.getElementById("pokemon-img");
const pokemonType = document.getElementById("type");
const tipoMsg = document.getElementById("tipo-msg");
const habMsg = document.getElementById("hab-msg");


form.addEventListener('submit', (event)=>{
    event.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value}/`)
    .then(response => {
        if (response.status == 200){
            return response.json();
        } else if (response.status == 400){
            return "Erro de resposta";
        } else {
            return "Erro de reposta 2";
        }
    })
    .then(dados =>{
        pokemonType.innerHTML = "";
        hab.innerHTML = "";

        imgPokemon.src = dados.sprites.front_default;
        imgPokemon.classList.add("show");
        res.innerText = "Nome: " + dados.name;

        dados.abilities.forEach(ability => {
            console.log(ability);
            hab.innerHTML += `<li> ${ability.ability.name} </li>`;
        })
        
        
        dados.types.forEach(tipo => {
            console.log(tipo);
            pokemonType.innerHTML += `<li> ${tipo.type.name} </li>`;
        });
        
        tipoMsg.classList.add("show");
        habMsg.classList.add("show");

    })
    .catch(()=>{
        res.innerText = "Erro do catch";
    })
})
