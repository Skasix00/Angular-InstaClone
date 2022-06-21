import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Utilizador } from '../utilizador.model';
import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css'],
})
export class RegistoComponent implements OnInit {

 @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_utilizador': new FormControl(null),
    'password': new FormControl(null)
  })

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }
  public exibirPainelLogin():void {
    this.exibirPainel.emit('login')

  }
  public registarUtilizador():void{
    console.log(this.formulario)
    let utilizador: Utilizador = new Utilizador(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_utilizador,
      this.formulario.value.password
      
    ) 
    this.autenticacao.registarUtilizador(utilizador)
    .then(() => this.exibirPainelLogin())
  }
}
