const res = document.getElementById('res');
const pokemon = document.getElementById("pokemon")
const form = document.getElementById("form");
const imgPokemon = document.getElementById("pokemon-img");
const hab = document.getElementById("hab");
const abDescription = document.getElementById("ab-description");
const pokemonType = document.getElementById("type");

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
        imgPokemon.src = dados.sprites.front_default;
        imgPokemon.style = "display: show";
        res.innerText = "Nome: " + dados.name;
        hab.innerText = "Ability 1: " + dados.abilities[0].ability.name;
        abDescription.innerText = "Ability 2: " + dados.abilities[1].ability.name;
        pokemonType.innerHTML = "Type: " + dados.types[0].type.name;
    })
    .catch(()=>{
        res.innerText = "Erro do catch";
    })
})

