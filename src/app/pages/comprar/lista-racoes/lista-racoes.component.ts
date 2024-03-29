import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FilterService } from 'src/app/shared/services/filter.service';
import { Racao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';

@Component({
  selector: 'app-lista-racoes',
  templateUrl: './lista-racoes.component.html',
  styleUrls: ['./lista-racoes.component.scss']
})
export class ListaRacoesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: Racao[] = [];
  racoes: Racao[] = [];
  selectedFilter: string = 'nome';
  searchTerm = new FormControl();
  isDropdownOpen: boolean = false;

  constructor(
    private racaoService: RacaoService,
    private filterService: FilterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.filterService.getFilter().pipe(
      switchMap(({ type, value }) => this.racaoService.getRacoes(type, value)),
      map((racoes) => {
        return racoes.map((racao) => {
          if (!racao.estoque_atual && racao.estoque_atual !== 0) {
            racao.estoque_atual = 0;
          }
          return racao;
        })
          .filter((racao) => racao.tipo_racao !== 'Produção própria')
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

  buyRacao(id: number) {
    return this.router.navigate(['../racao', id], { relativeTo: this.route });
  }
}
