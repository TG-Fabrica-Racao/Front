import { Component, OnInit } from '@angular/core';

import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistoricoCompraRacao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';

@Component({
  selector: 'app-historico-racoes',
  templateUrl: './historico-racoes.component.html',
  styleUrls: ['./historico-racoes.component.scss']
})
export class HistoricoRacoesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: HistoricoCompraRacao[] = [];
  historico: HistoricoCompraRacao[] = [];
  formGroup: FormGroup;

  constructor(
    private racaoService: RacaoService,
    private formBuilder: FormBuilder
  ) {  
    this.formGroup = this.formBuilder.group({
      nome_racao: [''],
      data_inicial: [''],
      data_final: [''],
    }); 
  }

  ngOnInit(): void {
    this.getHistoricoCompraRacao();
    this.formGroup.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.getHistoricoCompraRacao();
    }) 
  }

  getHistoricoCompraRacao() {
    this.racaoService.getHistoricoCompraRacoes(this.formGroup.value).subscribe({
      next: (res) => {
        console.log('Logs => ', res)
        this.historico = res;
        this.totalPages = Math.ceil(this.historico.length / this.itemsPerPage);
        this.updatePage();
      },
      error: (erro) => {
        console.error('Erro => ', erro)
      }
    })
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToDisplay = this.historico.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    const emptyItem: HistoricoCompraRacao = {
      id: '',
      data_compra: '',
      racao: '',
      quantidade: '',
      valor_unitario: '',
      valor_total: '',
      numero_nota: '',
      fornecedor: '',
    };

    const emptyItems = Array(emptyRowCount).fill(emptyItem);
    const itemsWithEmptyRows = [...itemsToDisplay, ...emptyItems];
    this.displayItems = itemsWithEmptyRows;
  }
}
