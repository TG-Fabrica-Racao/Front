import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Ingrediente } from 'src/app/shared/models/ingrediente';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { SupService } from 'src/app/shared/services/sup.service';

@Component({
  selector: 'app-editar-ingrediente',
  templateUrl: './editar-ingrediente.component.html',
  styleUrls: ['./editar-ingrediente.component.scss'],
  providers: [MessageService]
})
export class EditarIngredienteComponent implements OnInit{
  formGroup: FormGroup;
  saved: boolean = false;
  ingrediente?: Ingrediente;
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
      estoque_minimo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      this.getAllGrupos();
      this.route.data.subscribe(
        (data) => this.ingrediente = data['ingrediente'][0]
      )
      console.log('Data', this.ingrediente);

      this.formGroup.patchValue({
        nome: this.ingrediente?.nome,
        id_grupo: this.ingrediente?.id_grupo,
        estoque_minimo: this.ingrediente?.estoque_minimo
      });
  }

  editIngrediente() {
    if (this.formGroup.value && this.formGroup.valid) {
      this.ingredienteService.updateIngrediente(this.ingrediente?.id!, this.formGroup.value).subscribe({
        next: (items) => {
          console.info('Items: ', items);
          this.messageService.add({ severity: 'success', summary: 'Ingrediente Atualizado', detail: 'Ingrediente atualizado com sucesso!' });

          setTimeout(() => {
            this.router.navigate(['/consultar/ingredientes']);
          }, 2000)
        },
        error: erro => {
          console.error('Erro: ', erro)
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao criar o Ingrediente.` });
        },
        complete: () => this.saved = true
      })
    }
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

  sendToBack() {
    this.router.navigate(['/consultar/ingredientes']);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
