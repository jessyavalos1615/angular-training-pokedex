import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Get Pokemos
  getPokemons(limit: number, offset: number) {
    return this.http.get(
      `${environment.POKEMON_BASE_URL}/pokemon?limit=${limit}&offset=${
        (offset - 1) * 10
      }`
    );
  }

  // Get More Pokemons Data
  getMoreData(name: string) {
    return this.http.get(`${environment.POKEMON_BASE_URL}/pokemon/${name}`);
  }
}
