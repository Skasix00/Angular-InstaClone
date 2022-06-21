import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { Autenticacao } from './autenticacao.service';
import { AutenticacaoGuard } from './auteticacao-guard.service';

import { RouterModule } from '@angular/router';
import {ROUTES} from './app.routes';
import { Bd } from './bd.service';
import { Progresso } from './progresso.service';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { RegistoComponent } from './acesso/registo/registo.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    RegistoComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    Autenticacao,
    AutenticacaoGuard,
    Bd,
    Progresso
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
