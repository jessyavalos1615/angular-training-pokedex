import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: any;
  show: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private authService: AuthService,
    private pokemonService: PokemonService,
  ) {
    this.isAdmin = this.authService.checkAdmin();
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.checkAdmin();
    if (this.pokemon.name === 'ivysaur') {
      console.log(this.pokemon)
    }
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
  }*/

  async delete(id: string): Promise<void> {
    await this.pokemonService.delete(id);
    window.location.reload();
  }

  toggleShow() {
    this.show = !this.show;
  }
}
