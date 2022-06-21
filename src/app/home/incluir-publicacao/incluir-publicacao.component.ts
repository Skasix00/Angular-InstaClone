import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms"
import * as firebase from 'firebase'
import { Bd } from '../../bd.service'

import { Progresso } from '../../progresso.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>()

  public email: string
  public imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    "titulo": new FormControl(null)
  })
  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email

    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
    })
    let acompanhamentoUpload = Observable.interval(1500)

    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {
        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes)*100) 

        if (this.progresso.status === 'Concluido') { 
          this.progressoPublicacao = 'Concluido'
          //emitir evento do componente pai(home)
          this.atualizarTimeline.emit()
          continua.next(false)
        }
      })
  }
  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }
}
