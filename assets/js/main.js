const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const listItem = document.getElementById('list-item')
const pokeDetail = document.getElementById('poke-info')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <div class="pokemon ${pokemon.type}" id="poke-${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </div>
    `
}

function convertPokemonDetail(p) {
    return `
    <div class="info-container">
        <div class="info-header">
            <div class="row row-center">
                <h1> ${p.name} </h1>
                <h2> #${p.number} </h2>
            </div>
            <div class="row">
                <ol class="info-types">
                    ${p.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
        </div>
        <div class="info-body">
            <div class="row">
                <div class="info-icon">
                    <img src="${p.photo}" alt="${p.name}">
                </div>
            </div>
        </div>
        <div class="info-fotter">
            <button id="backBtn" type="button">
                Voltar
            </button>
        </div>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml  
        
        for (p of pokemons) {
            let pokemon = p
            let el = document.getElementById('poke-'+ p.number)
            el.addEventListener('click', () => {
                listItem.style.display = 'none'
                let detailHtml = convertPokemonDetail(pokemon)
                pokeDetail.innerHTML = detailHtml

                document.getElementById('backBtn').addEventListener('click', () => {
                    listItem.style.display = 'unset'
                    pokeDetail.innerHTML = ''
                })
            })
        }
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})