import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { RacaoService } from 'src/app/shared/services/racao.service';
import { SupService } from 'src/app/shared/services/sup.service';

@Component({
  selector: 'app-cadastro-racao',
  templateUrl: './cadastro-racao.component.html',
  styleUrls: ['./cadastro-racao.component.scss'],
  providers: [MessageService]
})
export class CadastroRacaoComponent implements OnInit {
  formGroup: FormGroup;
  saved: boolean = false;
  categorias: { id: number, nome: string }[] = [];
  fases: { id: number, nome: string }[] = [];
  tipos: { id: number, nome: string }[] = [
    {
      id: 0,
      nome: 'Comprada'
    },
    {
      id: 1,
      nome: 'Produzida'
    },
    {
      id: 2,
      nome: 'Ambas'
    },
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private supService: SupService,
    private ingredienteService: IngredienteService,
    private racaoService: RacaoService,
    private messageService: MessageService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      id_categoria: ['', [Validators.required]],
      tipo_racao: ['', [Validators.required]],
      fase_utilizada: ['', [Validators.required]],
      estoque_minimo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
      this.getAllCategories();
      this.getAllFases();
  }

  getAllCategories() {
    this.supService.getAllCategorias().subscribe({
      next: (items) => {
        console.info('Grupos => ', items)
        this.categorias = items
      },
      error: erro => console.error('Erro => ', erro)
    })
  }

  getAllFases() {
    this.supService.getAllFases().subscribe({
      next: (items) => {
        console.info('Fases => ', items)
        this.fases = items
      },
      error: erro => console.error('Erro => ', erro)
    })
  }

  createRacao() {
    if (this.formGroup.valid) {
      const values = {
        nome: this.formGroup.get('nome')!.value,
        id_categoria: +this.formGroup.get('id_categoria')!.value as number,
        tipo_racao: this.formGroup.get('tipo_racao')!.value,
        fase_utilizada: +this.formGroup.get('fase_utilizada')!.value as number,
        estoque_minimo: +this.formGroup.get('estoque_minimo')!.value as number
      }
      this.racaoService.createRacao(values).subscribe({
        next: () => {
          this.saved = true
          this.formGroup.reset()
          this.messageService.add({ severity: 'success', summary: 'Ração Criada', detail: 'Ração criada com sucesso!' });
        },
        error: (erro) => {
          console.error('Erro: ', erro),
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao criar a Ração.` });
        }
      })
    }
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
