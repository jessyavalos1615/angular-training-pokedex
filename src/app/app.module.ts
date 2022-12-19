import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routes.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { AddPokemonComponent } from './components/add-pokemon/add-pokemon.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

import { reducers, metaReducers } from './store/reducers';

import { HeadersInterceptor } from './interceptors/headers.interceptors';

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
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: isDevMode() }),
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
