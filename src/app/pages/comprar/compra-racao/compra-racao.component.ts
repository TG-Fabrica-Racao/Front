import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { DatePipe } from '@angular/common';
import { Ingrediente } from 'src/app/shared/models/ingrediente';
import { SupService } from 'src/app/shared/services/sup.service';
import { Racao } from 'src/app/shared/models/racao';
import { RacaoService } from 'src/app/shared/services/racao.service';

@Component({
  selector: 'app-compra-racao',
  templateUrl: './compra-racao.component.html',
  styleUrls: ['./compra-racao.component.scss'],
  providers: [
    MessageService,
    DatePipe
  ]
})
export class CompraRacaoComponent implements OnInit {
  saved: boolean = false;
  formGroup: FormGroup;
  racao?: Racao

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private supService: SupService,
    private racaoService: RacaoService,
    private messageService: MessageService,
  ) {
    this.formGroup = this.formBuilder.group({
      data_compra: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      valor_unitario: ['', [Validators.required]],
      numero_nota: ['', [Validators.required]],
      fornecedor: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => this.racao = data['racao'][0]
    )
    console.log('Data', this.racao);
  }

  comprarRacao() {
    if (this.formGroup.valid && this.formGroup.value) {
      const values = {
        ...this.formGroup.value,
        id_racao: this.racao?.id
      }
      console.log('Values => ', values)
      this.racaoService.buyRacao(values).subscribe({
        next: (res) => {
          console.log('Ração Comprada => ', res);
          this.messageService.add({ severity: 'success', summary: 'Ração Comprada', detail: 'Ração comprada com sucesso!' });
          this.formGroup.reset()
          setTimeout(() => {
            this.router.navigate(['../../ingredientes'], { relativeTo: this.route });
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao comprar a ração.` });
        },
        complete: () => this.saved = true
      })
    }
  }

  sendToBack() {
    this.router.navigate(['../../racoes'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
