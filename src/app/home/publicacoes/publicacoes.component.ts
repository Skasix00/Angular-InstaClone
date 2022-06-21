import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Bd } from '../../bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string
  public publicacoes: any

  constructor(private Bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.atualizarTimeLine()
    })
  }
  public atualizarTimeLine(): void {
    this.Bd.consultaPublicacoes(this.email)
      .then((publicacoes:any ) => {
        this.publicacoes = publicacoes
      })
  }
}
