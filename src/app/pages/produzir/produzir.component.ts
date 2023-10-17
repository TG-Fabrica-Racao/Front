import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FilterService } from 'src/app/shared/services/filter.service';
import { Racao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produzir',
  templateUrl: './produzir.component.html',
  styleUrls: ['./produzir.component.scss'],
  providers: [MessageService]
})
export class ProduzirComponent implements OnInit{
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: Racao[] = [];
  racoes: Racao[] = [];
  selectedFilter: string = 'nome';
  searchTerm = new FormControl();
  isDropdownOpen: boolean = false;
  visible: boolean = false;
  idRacao: number = 0;
  nomeRacao: string = '';
  formGroup: FormGroup;

  constructor(
    private racaoService: RacaoService,
    private filterService: FilterService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { 
    this.formGroup = this.formBuilder.group({
      quantidade: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRacoes();
  }

  getRacoes() {
    this.filterService.getFilter().pipe(
      switchMap(({ type, value }) => this.racaoService.getRacoes(type, value)),
      map((racoes) => {
        return racoes.map((racao) => {
          if (!racao.estoque_atual && racao.estoque_atual !== 0) {
            racao.estoque_atual = 0;
          }
          return racao;
        })
          .filter((racao) => racao.tipo_racao !== 'Comprada');
      })

    ).subscribe((racoes) => {
      this.racoes = racoes;
      this.totalPages = Math.ceil(this.racoes.length / this.itemsPerPage);
      this.updatePage();
    });

    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe((value) => {
        this.filterService.setFilter(this.selectedFilter, value)
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
    const itemsToDisplay = this.racoes.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    const emptyItem: Racao = {
      id: '',
      nome: '',
      id_categoria: '',
      categoria: '',
      tipo_racao: '',
      fase_utilizada: '',
      batida: '',
      estoque_minimo: '',
      estoque_atual: '',
      ingredientes: []
    };

    const emptyItems = Array(emptyRowCount).fill(emptyItem);
    const itemsWithEmptyRows = [...itemsToDisplay, ...emptyItems];
    this.displayItems = itemsWithEmptyRows;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterService.setFilter(filter, this.searchTerm.value);
    this.isDropdownOpen = false;
    console.log('Filtro => ', this.selectedFilter);
  }

  openModalRacao(id: number, name: string) {
    this.idRacao = id;
    this.nomeRacao = name;
    this.visible = true;
  }

  produzirRacao() {
    if (this.formGroup.valid && this.formGroup.value){
      this.racaoService.produzirRacao(this.idRacao, this.formGroup.get('quantidade')?.value).subscribe({
        next: (res) => {
          console.log('Produzir ração => ', res);
          this.formGroup.reset();
          this.messageService.add({ severity: 'success', summary: 'Produção Realizada', detail: 'Produção realizada com sucesso!' });
          this.getRacoes();
          setTimeout(() => {
            this.visible = false;
          }, 2000)
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || `Ocorreu um erro ao realizar a produção` });
          console.error('Erro => ', err)
        }
      })
    }

  }

}
