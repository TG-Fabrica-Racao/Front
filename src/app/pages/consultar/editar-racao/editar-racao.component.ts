import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Ingrediente } from 'src/app/shared/models/ingrediente';
import { Racao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';
import { SupService } from 'src/app/shared/services/sup.service';

@Component({
  selector: 'app-editar-racao',
  templateUrl: './editar-racao.component.html',
  styleUrls: ['./editar-racao.component.scss'],
  providers: [MessageService]
})
export class EditarRacaoComponent implements OnInit{
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
    // const value = this.formGroup.get('fase_utilizada')?.value;
    // console.log('VALUE => ', value)
    // console.log('Patch Ração => ', this.racao);
    this.formGroup.patchValue({
      nome: this.racao?.nome,
      id_categoria: this.racao?.id_categoria,
      tipo_racao: this.racao?.tipo_racao,
      fase_utilizada: this.racao?.fase_utilizada,
      estoque_minimo: this.racao?.estoque_minimo,
      batida: this.racao?.batida,
    });
    // console.log('Campos => \n', this.formGroup.value)
    // const value2 = this.formGroup.get('fase_utilizada')?.value;
    // console.log('VALUE2 => ', value2)
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
