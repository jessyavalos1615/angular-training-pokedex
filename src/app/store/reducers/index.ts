import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { loginStateTypes } from '../initialState/login/login.state';
import { pokemonStateTypes } from '../initialState/pokemon/pokemon.state';

import { loginReducers } from './login/login.reducers';
import { pokemonReducer } from './pokemon/pokemon.reducers';
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export interface RootState {
  loginState: loginStateTypes;
  pokemonState: pokemonStateTypes;
}

export const reducers: ActionReducerMap<RootState> = {
  loginState: loginReducers,
  pokemonState: pokemonReducer,
};

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]
