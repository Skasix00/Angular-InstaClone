import * as firebase from 'firebase'
import { Injectable } from '@angular/core'
import { Progresso } from './progresso.service'

@Injectable()
export class Bd {

    constructor(
        private progresso: Progresso
    ) { }

    public publicar(publicacao: any): void {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            this.progresso.status = 'Em andamento'
                            this.progresso.estado = snapshot
                        },
                        (error) => {
                            this.progresso.status = 'Erro!!'
                        },
                        () => {
                            this.progresso.status = 'Concluido'
                        }
                    )

            })
    }

    public consultaPublicacoes(emailUtilizador: string): Promise<any> {

        return new Promise((resolve, reject) => {



            firebase.database().ref(`publicacoes/${btoa(emailUtilizador)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {

                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key
                        publicacoes.push(publicacao)

                    })
                    //resolve(publicacoes)

                    return publicacoes.reverse()
                })
                .then((publicacoes: any) => {

                    publicacoes.forEach((publicacao) => {

                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.url_imagem = url

                                firebase.database().ref(`utilizador_detalhe/${btoa(emailUtilizador)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_utilizador = snapshot.val().nome_utilizador

                                        publicacoes.push(publicacao)
                                    })
                            })
                    })
                    resolve(publicacoes)
                })
        })
    }
}