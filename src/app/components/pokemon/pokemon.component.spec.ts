import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { PokemonComponent } from './pokemon.component';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      declarations: [PokemonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sholud toggle show value', () => {
    expect(component.show).withContext('false at first').toBe(false);
    component.toggleShow();
    expect(component.show).withContext('on after click').toBe(true);
    component.toggleShow();
    expect(component.show).withContext('on after second click').toBe(false);
  });

  it('should trigger click event from element', () => {
    const box = fixture.debugElement.query(By.css('div.box'));
    box.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.show).toBeTrue();
  });

  it('delete button should be not visible in user rol', () => {
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeNull();
  });

  it('delete button should be visible in admin rol', () => {
    component.isAdmin = true;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).not.toBeNull();
  });
});
