import { RouterModule } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeadersInterceptor } from './interceptors/headers.interceptors';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      declarations: [AppComponent, HeaderComponent],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeadersInterceptor,
          multi: true,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pokedex'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pokedex');
  });
});
