import { Component, OnInit} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Racao, RacaoIngrediente } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { Ingrediente } from 'src/app/shared/models/ingrediente';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ingredientes-racao',
  templateUrl: './ingredientes-racao.component.html',
  styleUrls: ['./ingredientes-racao.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class IngredientesRacaoComponent implements OnInit {


  racao: any;
  ingredientes: Ingrediente[] = [];
  ingredientesRacao: RacaoIngrediente[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: RacaoIngrediente[] = [];
  visible: boolean = false;
  formGroup: FormGroup;
  selectedIngrediente: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private racaoService: RacaoService,
    private ingredienteService: IngredienteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { 
    this.formGroup = this.formBuilder.group({
      quantidade: ['', [Validators.required]],

    });
  }

  ngOnInit() {

    this.route.data.subscribe({
      next: (data) => {
        this.racao = data['racao'][0];
        this.ingredientesRacao = this.racao?.ingredientes as RacaoIngrediente[]
        if (this.ingredientesRacao) { 
          this.totalPages = Math.ceil(this.ingredientesRacao.length / this.itemsPerPage);
          this.updatePage();
        }
      }
    })
    
    this.getIngredientes();
  }

  getRacoes(id: number) {
    this.racaoService.getRacaoById(id).subscribe({
      next: (res: any) => {
        this.ingredientesRacao = res[0].ingredientes as RacaoIngrediente[];
        if (this.ingredientesRacao) { 
          this.totalPages = Math.ceil(this.ingredientesRacao.length / this.itemsPerPage);
          this.updatePage();
          this.cdr.detectChanges();
        }
      },
      error: (erro) => console.error('Erro => ', erro)
    })
  }

  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe({
      next: (res) => {
        this.ingredientes = res;
      },
      error: (erro) => {
        console.error('Erro => ', erro);
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
    const itemsToDisplay = this.ingredientesRacao.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    const emptyItem: RacaoIngrediente = {
      id: '',
      nome: '',
      quantidade: ''
    };

    const emptyItems = Array(emptyRowCount).fill(emptyItem);
    const itemsWithEmptyRows = [...itemsToDisplay, ...emptyItems];
    this.displayItems = itemsWithEmptyRows;
  }


  sendToBack() {
    this.router.navigate(['/consultar/racoes']);
  }

  deleteIngrediente(id: number, name: string) {
    this.confirmationService.confirm({
      message: `Deseja deletar o ingrediente ${name}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.racaoService.deleteIngredienteRacao(id, +this.racao!.id).subscribe({
          next: (res) => {
            console.log('Ingrediente Deletado => ', res)
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ingredinte Deletado com sucesso!' });
            this.updateTable();
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

  updateTable() {
    this.getRacoes(this.racao.id);
    this.cdr.detectChanges();
  }

  openModalRacao() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  adicionarIngrediente(){
    if (this.selectedIngrediente && this.formGroup.valid && this.formGroup.value) {
      this.racaoService.InsertIngredienteInRacao(+this.racao!.id, this.selectedIngrediente.id, +this.formGroup.get('quantidade')?.value).subscribe({
        next: (res) => {
          console.log('Ingrediente Adicionado => ', res)
          this.visible = false;
          this.updateTable();
        },
        error: (erro) => console.error('Erro => ', erro)
      })
    } 
  }

}
