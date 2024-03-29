import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Racao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';
import { SupService } from 'src/app/shared/services/sup.service';

@Component({
  selector: 'app-editar-racao',
  templateUrl: './editar-racao.component.html',
  styleUrls: ['./editar-racao.component.scss'],
  providers: [MessageService]
})
export class EditarRacaoComponent implements OnInit {
  racao?: Racao;
  racaoId?: number;
  saved: boolean = false;
  formGroup: FormGroup;
  categorias: { id: number, nome: string }[] = [];
  fases: { id: number, nome: string }[] = [];
  tipos: { id: number, nome: string }[] = [
    {
      id: 0,
      nome: 'Produção própria'
    },
    {
      id: 1,
      nome: 'Comprada'
    },
    {
      id: 2,
      nome: 'Ambos'
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private supService: SupService,
    private messageService: MessageService,
    private racaoService: RacaoService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
      tipo_racao: ['', [Validators.required]],

      fase_utilizada: ['', [Validators.required]],
      estoque_minimo: ['', [Validators.required]],
      batida: [{ value: this.racao?.batida, disabled: true }],

    });
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.racao = data['racao'][0];
        console.log('Ração => ', this.racao)
        this.patchForm();
      }
    })

    this.getAllCategories();
    this.getAllFases();
  }

  editRacao() {
    if (this.formGroup.valid && this.formGroup.value) {
      const faseSelecionada = this.fases.find(fase => fase.nome === this.formGroup.value.fase_utilizada);

      if (faseSelecionada) {
        const values = { ...this.formGroup.value, fase_utilizada: faseSelecionada.id };
        
        this.racaoService.updateRacao(this.racao?.id!, values).subscribe({
          next: (items) => {
            console.info('Items: ', items);
            this.messageService.add({ severity: 'success', summary: 'Ração Atualizado', detail: 'Ração atualizado com sucesso!' });
            
            setTimeout(() => {
              this.router.navigate(['/consultar/racoes']);
            }, 2000)
          },
          error: erro => {
            console.error('Erro: ', erro)
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao atualizar a Ração.` });
          },
          complete: () => this.saved = true
        })
      }
    }
  }
  getAllCategories() {
    this.supService.getAllCategorias().subscribe({
      next: (items) => {
        console.info('Categorias => ', items)
        this.categorias = items
      },
      error: erro => console.error('Erro => ', erro)
    })
  }

  getAllFases() {
    this.supService.getAllFases().subscribe({
      next: (items) => {
        this.fases = items
        console.info('Fases => ', this.fases)
      },
      error: erro => console.error('Erro => ', erro)
    })
  }

  patchForm() {
    this.formGroup.patchValue({
      nome: this.racao?.nome,
      id_categoria: this.racao?.id_categoria,
      tipo_racao: this.racao?.tipo_racao,
      fase_utilizada: this.racao?.fase_utilizada,
      estoque_minimo: this.racao?.estoque_minimo,
      batida: this.racao?.batida,
    });
  }

  sendToBack() {
    this.router.navigate(['/consultar/racoes']);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
