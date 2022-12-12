import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  page: number = 1;
  pokemons: any = [];
  totalPokemons: number = 0;

  constructor(
    private dataService: DataService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  /* ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  } */

  // Get Pokemons
  async getPokemons() {
    const response = await this.pokemonService.getPokemons(this.page);
    this.totalPokemons = response.totalPages * 10;
    response.pokemons.forEach((pokemonResponse: any) => {
      const idService = pokemonResponse.id;
      this.dataService.getMoreData(pokemonResponse.name).subscribe((pokemon: any) => {
        this.pokemons.push({idService, ...pokemon});
      });
    });
  }
}
