import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Ingrediente } from 'src/app/shared/models/ingrediente';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-consultar-ingredientes',
  templateUrl: './consultar-ingredientes.component.html',
  styleUrls: ['./consultar-ingredientes.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ConsultarIngredientesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: Ingrediente[] = [];
  ingredientes: Ingrediente[] = [];
  selectedFilter: string = 'nome';
  searchTerm = new FormControl();
  isDropdownOpen: boolean = false;

  constructor(
    private ingredienteService: IngredienteService,
    private filterService: FilterService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.getAllIngredientes();
    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe((value) => {
        this.filterService.setFilter(this.selectedFilter, value)
      })
  }

  getAllIngredientes() {
    this.filterService.getFilter().pipe(
      switchMap(({ type, value }) => this.ingredienteService.getIngredientes(type, value)),
      map((ingredientes) => {
        return ingredientes.map((ingrediente) => {
          if (!ingrediente.estoque_atual && ingrediente.estoque_atual !== 0) {
            ingrediente.estoque_atual = 0;
          }
          return ingrediente;
        })
      })

    ).subscribe((ingredientes) => {
      this.ingredientes = ingredientes;
      this.totalPages = Math.ceil(this.ingredientes.length / this.itemsPerPage);
      this.updatePage();
    });
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
    const itemsToDisplay = this.ingredientes.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    const emptyItem: Ingrediente = {
      id: '',
      nome: '',
      grupo: '',
      id_grupo: '',
      estoque_minimo: '',
      estoque_atual: ''
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

  editIngrediente(id: number) {
    return this.router.navigate(['../ingrediente',id, 'editar'], { relativeTo: this.route });
  }

  deleteIngrediente(id: number, name: string) {
    this.confirmationService.confirm({
      message: `Deseja deletar o ingrediente ${name}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ingredienteService.deleteIngrediente(id).subscribe({
          next: (res) => {
            console.log('Ingrediente Deletado => ', res)
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ingredinte Deletado com sucesso!' });
            this.getAllIngredientes();
          },
          error: (erro) => {
            console.error('Erro => ', erro)
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao excluir o Ingrediente.` });
          }
        })
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Você cancelou a exclusão deste ingrediente.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a exclusão deste ingrediente.' });
            break;
        }
      }
    })
      
  }
}
