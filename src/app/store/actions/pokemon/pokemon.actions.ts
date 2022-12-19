import { createAction, props } from '@ngrx/store';

enum pokemonActionsTypes {
  ADD_POKEMON = 'ADD_POKEMON',
  GET_POKEMONS = 'GET_POKEMONS',
  SET_POKEMONS = 'SET_POKEMONS',
  DELETE_POKEMON = 'DELETE_POKEMON',
  SET_TOTAL_POKEMONS = 'SET_TOTAL_POKEMONS',
}

export const setPokemons = createAction(
  pokemonActionsTypes.SET_POKEMONS,
  props<{ pokemons: any[] }>()
);

export const setTotalPokemons = createAction(
  pokemonActionsTypes.SET_TOTAL_POKEMONS,
  props<{ total: number }>()
);
