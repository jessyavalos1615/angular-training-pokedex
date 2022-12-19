import { createReducer, on } from '@ngrx/store';

import { initialState } from '../../initialState/pokemon/pokemon.state';
import { setPokemons, setTotalPokemons } from '../../actions/pokemon/pokemon.actions';

const _pokemonReducer = createReducer(
  initialState,
  on(setPokemons, (state, { pokemons }) => {
    return {
      ...state,
      pokemons,
    };
  }),
  on(setTotalPokemons, (state, {total}) => {
    return {
      ...state,
      total,
    }
  }),
);

export const pokemonReducer = (state: any, action: any) => {
  return _pokemonReducer(state, action);
};
