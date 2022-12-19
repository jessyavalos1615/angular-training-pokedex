import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PokemonService } from 'src/app/services/pokemon.service';
import { ShowModalService } from 'src/app/services/show-modal.service';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss'],
})
export class AddPokemonComponent implements OnInit {
  show: boolean = false;
  addPokemonForm: FormGroup;
  isSameType: boolean = false;
  pokemonTypes = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dark',
    'Dragon',
    'Steel',
    'Fairy',
  ];

  constructor(
    private showModal: ShowModalService,
    private pokemonService: PokemonService,
  ) {
    this.addPokemonForm = new FormGroup({
      name: new FormControl('', Validators.required),
      height: new FormControl(0, [Validators.required, Validators.min(1)]),
      weight: new FormControl(0, [Validators.required, Validators.min(1)]),
      experience: new FormControl(0, [Validators.required, Validators.min(1)]),
      type: new FormControl('Normal', Validators.required),
      secondaryType: new FormControl(''),
    });
    this.showModal.showModalObservable.subscribe((state: boolean) => {
      this.show = state;
    });
  }

  ngOnInit(): void {}

  get name() {
    return this.addPokemonForm.get('name');
  }

  get height() {
    return this.addPokemonForm.get('height');
  }

  get weight() {
    return this.addPokemonForm.get('weight');
  }

  get experience() {
    return this.addPokemonForm.get('experience');
  }

  get type() {
    return this.addPokemonForm.get('type');
  }

  get secondaryType() {
    return this.addPokemonForm.get('secondaryType');
  }

  async addPokemon() {
    if (this.addPokemonForm.valid && this.validateSameType()) {
      const name = this.name?.value.toLowerCase();
      const weight = this.name?.value;
      const height = this.name?.value;
      const base_experience = this.name?.value;
      const type = this.name?.value;
      const secondaryType = this.name?.value;
      const pokemon = {
        name,
        weight,
        height,
        base_experience,
        types: [
          { slot: '1', type: { name: type } },
          { slot: '2', type: { name: secondaryType } },
        ],
      };
      if (secondaryType && secondaryType !== 'none') {
        pokemon.types.push({ slot: '2', type: { name: secondaryType } });
      }
      const res = await this.pokemonService.add(pokemon);
      if (res?.ok) {
        window.location.reload();
      }
    }
  }

  validateSameType(): boolean {
    if (this.type?.value === this.secondaryType?.value) {
      this.isSameType = true;
    } else {
      this.isSameType = false;
    }
    return !this.isSameType;
  }
}
