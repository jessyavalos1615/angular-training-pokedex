import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { ErrorResponse } from 'src/app/models/errors';
import { ApiPokemonResponse } from '../models/pokemon';
import { environment } from 'src/environments/environment';
import { pokemonStateTypes } from '../store/initialState/pokemon/pokemon.state';
import {
  setPokemons,
  setTotalPokemons,
} from '../store/actions/pokemon/pokemon.actions';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonsData: any[] = [];
  private url = `${environment.loginUrl}api/pokemon`;

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private dataService: DataService,
    private store: Store<{ pokemonState: pokemonStateTypes }>
  ) {}

  async getPokemons(page: number) {
    try {
      const params = new HttpParams({
        fromObject: { page },
      });

      const { totalPages, pokemons } = (await firstValueFrom(
        this.http.get(this.url, { params })
      )) as ApiPokemonResponse;

      pokemons.forEach((pokemon: any) => {
        const idService = pokemon.id;
        this.dataService.getMoreData(pokemon.name).subscribe((pokemon: any) => {
          this.pokemonsData = [...this.pokemonsData, { idService, ...pokemon }];
          if (this.pokemonsData.length === 10) {
            this.store.dispatch(setPokemons({ pokemons: this.pokemonsData }));
          }
        });
      });

      this.store.dispatch(setTotalPokemons({ total: totalPages }));
    } catch (err) {
      this.error.handleError(err as ErrorResponse);
    }
  }

  async add(pokemon: any): Promise<Response | undefined> {
    try {
      const response = (await firstValueFrom(
        this.http.post(this.url, { ...pokemon })
      )) as Response;

      return response;
    } catch (err) {
      console.log(err);
      this.error.handleError(err as ErrorResponse);
      return undefined;
    }
  }

  async delete(id: string): Promise<Response | undefined> {
    try {
      const response = (await firstValueFrom(
        this.http.delete(`${this.url}/${id}`)
      )) as Response;

      return response;
    } catch (err) {
      console.log(err);
      this.error.handleError(err as ErrorResponse);
      return undefined;
    }
  }
}
