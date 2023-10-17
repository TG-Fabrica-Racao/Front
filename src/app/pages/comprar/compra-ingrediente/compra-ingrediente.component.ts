import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { DatePipe } from '@angular/common';
import { Ingrediente } from 'src/app/shared/models/ingrediente';
import { SupService } from 'src/app/shared/services/sup.service';

@Component({
  selector: 'app-compra-ingrediente',
  templateUrl: './compra-ingrediente.component.html',
  styleUrls: ['./compra-ingrediente.component.scss'],
  providers: [ 
    MessageService,
    DatePipe
  ]
})
export class CompraIngredienteComponent implements OnInit {
  saved: boolean = false;
  formGroup: FormGroup;
  ingrediente?: Ingrediente

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private supService: SupService,
    private ingredienteService: IngredienteService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    this.formGroup = this.formBuilder.group({
      // data_compra: [{ value: this.getData(), disabled: true }],
      // id_ingrediente: ['', [Validators.required]],
      data_compra: ['', [Validators.required]],
      quantidade_bruta: ['', [Validators.required]],
      pre_limpeza: ['', [Validators.required]],
      valor_unitario: ['', [Validators.required]],
      numero_nota: ['', [Validators.required]],
      fornecedor: ['', [Validators.required]],
    });
  }

  //id_ingrediente já esta sendo passada pela rota, não precisa por no formulário

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => this.ingrediente = data['ingrediente'][0]
    )
    console.log('Data', this.ingrediente);
    
    this.formGroup.patchValue({
      
    });
  }

  // getData(){
  //   const data_insercao = new Date();
  //   return this.datePipe.transform(data_insercao, 'yyyy/MM/dd') || ''; 
  // }

  comprarIngrediente() {
    if (this.formGroup.valid && this.formGroup.value) {
      const values = {
        ...this.formGroup.value,
        id_ingrediente: this.ingrediente?.id
      }
      console.log('Values => ', values)
      this.ingredienteService.buyIngrediente(values).subscribe({
        next: (res) => {
          console.log('Igrediente Comprado => ', res);
          this.messageService.add({ severity: 'success', summary: 'Ingrediente Comprado', detail: 'Ingrediente comprado com sucesso!' });
          this.formGroup.reset()
          setTimeout(() => {
            this.router.navigate(['../../ingredientes'], { relativeTo: this.route });
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao criar o Ingrediente.` });
        },
        complete: () => this.saved = true
      })
    }
  }

  sendToBack() {
    this.router.navigate(['../../ingredientes'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
