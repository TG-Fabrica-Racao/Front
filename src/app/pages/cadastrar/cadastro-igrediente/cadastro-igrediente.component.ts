import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { SupService } from 'src/app/shared/services/sup.service';

@Component({
  selector: 'app-cadastro-igrediente',
  templateUrl: './cadastro-igrediente.component.html',
  styleUrls: ['./cadastro-igrediente.component.scss'],
  providers: [MessageService]
})
export class CadastroIgredienteComponent implements OnInit {
  formGroup: FormGroup;
  saved: boolean = false;
  grupos: { id: number, nome: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private supService: SupService,
    private ingredienteService: IngredienteService,
    private messageService: MessageService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      id_grupo: ['', [Validators.required]],
      estoque_minimo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllGrupos();
  }

  getAllGrupos() {
    this.supService.getAllGrupos().subscribe({
      next: (items) => {
        console.info('Grupos: ', items)
        this.grupos = items
      },
      error: erro => console.error('Erro: ', erro)
    })
  }

  createIngrediente() {
    if (this.formGroup.valid) {
      this.ingredienteService.createIngrediente(this.formGroup.value).subscribe({
        next: () => {
          this.saved = true
          this.formGroup.reset()
          this.messageService.add({ severity: 'success', summary: 'Ingrediente Criado', detail: 'Ingrediente criado com sucesso!' });
        },
        error: (erro) => {
          console.error('Erro: ', erro),
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao criar o Ingrediente.` });
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
