import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getPokemons();
  }

  ngOnChanges(): void {
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
  }

  // Get Pokemons
  getPokemons() {
    this.dataService.getPokemons(10, this.page).subscribe((data: any) => {
      this.totalPokemons = data.count;

      data.results.forEach((result: any) => {
        this.dataService.getMoreData(result.name).subscribe((pokemon: any) => {
          this.pokemons.push(pokemon);
        });
      });
    });
  }
}
