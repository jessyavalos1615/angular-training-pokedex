import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { PokemonService } from 'src/app/services/pokemon.service';
import { pokemonStateTypes } from '../../store/initialState/pokemon/pokemon.state';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  page: number = 1;
  pokemons: any[] = [];
  totalPokemons: number = 0;
  hasPokemons: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private store: Store<{ pokemonState: pokemonStateTypes }>
  ) {
    this.store.select('pokemonState').subscribe((state) => {
      this.pokemons = state.pokemons;
      this.totalPokemons = state.total;
      this.hasPokemons = state.pokemons.length > 0;
    });
  }

  ngOnInit(): void {
    this.getPokemons();
    console.log(this.totalPokemons);
  }

  // Get Pokemons
  async getPokemons() {
    await this.pokemonService.getPokemons(this.page);
  }
}
