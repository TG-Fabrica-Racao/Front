import { Component, OnInit } from '@angular/core';

import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistoricoCompraIngrediente } from 'src/app/shared/models/ingrediente';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
@Component({
  selector: 'app-historico-ingredientes',
  templateUrl: './historico-ingredientes.component.html',
  styleUrls: ['./historico-ingredientes.component.scss']
})
export class HistoricoIngredientesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: HistoricoCompraIngrediente[] = [];
  historico: HistoricoCompraIngrediente[] = [];
  formGroup: FormGroup;

  constructor(
    private ingredienteService: IngredienteService,
    private formBuilder: FormBuilder
  ) {  
    this.formGroup = this.formBuilder.group({
      nome_ingrediente: [''],
      data_inicial: [''],
      data_final: [''],
    }); 
  }

  ngOnInit(): void {
    this.getHistoricoCompraIngrediente();
    this.formGroup.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.getHistoricoCompraIngrediente();
    }) 
  }

  getHistoricoCompraIngrediente() {
    this.ingredienteService.getHistoricoCompraIngredientes(this.formGroup.value).subscribe({
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

    const emptyItem: HistoricoCompraIngrediente = {
      id: '',
      data_compra: '',
      ingrediente: '',
      quantidade_bruta: '',
      quantidade_liquida: '',
      pre_limpeza: '',
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
