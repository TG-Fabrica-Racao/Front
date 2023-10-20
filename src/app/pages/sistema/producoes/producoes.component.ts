import { Component, OnInit } from '@angular/core';

import { debounceTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogProducao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';

@Component({
  selector: 'app-producoes',
  templateUrl: './producoes.component.html',
  styleUrls: ['./producoes.component.scss']
})
export class ProducoesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: LogProducao[] = [];
  logs: LogProducao[] = [];
  formGroup: FormGroup;

  constructor(
    private racaoService: RacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {  
    this.formGroup = this.formBuilder.group({
      nome_racao: [''],
      data_inicial: [''],
      data_final: [''],
    }); 
  }

  ngOnInit(): void {
    this.getLogs();
    this.formGroup.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((changes) => {
      console.log('changes => ', changes)
      this.getLogs();
    })
  }

  getLogs() {
    console.log('teste')
    this.racaoService.getProducaoLogs(this.formGroup.value).subscribe({
      next: (res) => {
        this.logs = res;
        this.totalPages = Math.ceil(this.logs.length / this.itemsPerPage);
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
    const itemsToDisplay = this.logs.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    const emptyItem: LogProducao = {
      id: '',
      racao: '',
      data: '',
      usuario: '',
      quantidade: '',
    };

    const emptyItems = Array(emptyRowCount).fill(emptyItem);
    const itemsWithEmptyRows = [...itemsToDisplay, ...emptyItems];
    this.displayItems = itemsWithEmptyRows;
  }
}
