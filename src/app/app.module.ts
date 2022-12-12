import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routes.module';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeadersInterceptor } from './interceptors/headers.interceptors';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AddPokemonComponent } from './components/add-pokemon/add-pokemon.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    HeaderComponent,
    LoginComponent,
    PokemonListComponent,
    SignupComponent,
    AddPokemonComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
