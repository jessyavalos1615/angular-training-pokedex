import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from '../modal/modal.component';
import { AddPokemonComponent } from './add-pokemon.component';

describe('AddPokemonComponent', () => {
  let component: AddPokemonComponent;
  let fixture: ComponentFixture<AddPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [AddPokemonComponent, ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
