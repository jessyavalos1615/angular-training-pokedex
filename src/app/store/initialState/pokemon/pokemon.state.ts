export const initialState: pokemonStateTypes = {
    pokemons: [],
    total: 0,
}

export interface pokemonStateTypes {
    pokemons: any[],
    total: number,
}