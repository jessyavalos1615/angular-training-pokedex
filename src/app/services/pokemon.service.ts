import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { Error, ErrorResponse } from 'src/app/models/errors';
import { environment } from 'src/environments/environment';
import {
  ApiPokemonResponse,
  Pokemon,
  PokemonPagination,
} from '../models/pokemon';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage-tokens.service';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemons: Pokemon[] = [];
  private url = `${environment.loginUrl}api/pokemon`;
  constructor(
    private http: HttpClient,
    private error: ErrorService,
  ) {}

  async getPokemons(page: number): Promise<any> {
    try {
      const params = new HttpParams({
        fromObject: { page },
      });
      const response = (await firstValueFrom(
        this.http.get(this.url, { params })
      )) as ApiPokemonResponse;
      return response;
    } catch (err) {
      this.error.handleError(err as ErrorResponse);
      return [];
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