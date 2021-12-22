const buscarPokemon = () => {
    const pegarUrlPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromises = [];
    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(pegarUrlPokemon(i)).then(response => response.json()));
    }

    Promise.all(pokemonPromises).then(pokemons => {
        //console.log(pokemons)
        const liPokemons = pokemons.reduce((acumulador, pokemon) => {
            const tipos = pokemon.types.map(tipoInfo => {
                return tipoInfo.type.name;
            });

            acumulador +=
                `<li class="card  ${tipos[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png">
                <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2>
                <p class="card-subtitle">${tipos.join(' | ')}</p>
                </li>`
            return acumulador;

        }, '');

        const ul = document.querySelector('[data-js="pokedex"]');

        ul.innerHTML = liPokemons;

        //console.log(liPokemons)
    });

}


buscarPokemon();