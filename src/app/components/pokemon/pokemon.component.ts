import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';

import { PokemonService } from 'src/app/services/pokemon.service';
import { loginStateTypes } from 'src/app/store/initialState/login/login.state';

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
    private pokemonService: PokemonService,
    private store: Store<{ loginState: loginStateTypes }>
  ) {
    this.store.select('loginState').subscribe((state) => {
      this.isAdmin = state.isAdmin;
    });
  }

  ngOnInit(): void {}

  async delete(id: string): Promise<void> {
    await this.pokemonService.delete(id);
    window.location.reload();
  }

  toggleShow() {
    this.show = !this.show;
  }
}
