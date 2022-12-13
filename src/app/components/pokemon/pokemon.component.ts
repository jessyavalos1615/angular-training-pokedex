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
  }

  async delete(id: string): Promise<void> {
    await this.pokemonService.delete(id);
    window.location.reload();
  }

  toggleShow() {
    this.show = !this.show;
  }
}
