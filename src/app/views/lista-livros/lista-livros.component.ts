import { FormControl } from '@angular/forms';
import { Item, LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';

const PAUSA = 500

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl
  mensagemErro = ''
  livrosResultado: LivrosResultado

  constructor(private service: LivroService) { }

  totalDeLivros$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(PAUSA),
    filter(valorDigitado => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado),
    catchError(erro => {
      console.log(erro)
      return of()
    })
  )

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter(valorDigitado => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo inicial')),
      distinctUntilChanged(),
      switchMap(valorDigitado => this.service.buscar(valorDigitado)),
      tap(() => console.log('Requisição ao servidor')),
      map(resultado => resultado.items ?? []),
      map(items => this.livrosResultadoParaLivros(items)),
      catchError(erro => {
        // this.mensagemErro = 'Ocorreu um erro'
        // return EMPTY
        console.log(erro)
        return throwError(() => new Error(this.mensagemErro = 'Ocorreu um erro'))
      })
    )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}



