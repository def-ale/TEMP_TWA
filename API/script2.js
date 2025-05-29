async function carregarCaderneta() {
    try {
        const resposta = await fetch('./caderneta.json');
        const dadosCaderneta = await resposta.json();
        console.log(dadosCaderneta);
    } catch (error) {
        console.log(error);
    }
}

carregarCaderneta();