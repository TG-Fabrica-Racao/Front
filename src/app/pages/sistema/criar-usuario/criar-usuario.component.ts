import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.scss'],
  providers: [MessageService]
})
export class CriarUsuarioComponent implements OnInit {
  formGroup: FormGroup;
  saved: boolean = false;
  cargos: {nome: string}[] = [
    {
      nome: 'Administrador'
    },
    {
      nome: 'Funcionário'
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
      
  }

  createUser() {
    if (this.formGroup.valid && this.formGroup.value){
      this.usuarioService.createUsuario(this.formGroup.value).subscribe({
        next: (usuario) => {
          console.log('Usuário criado com sucesso =>', usuario)
          this.saved = true
          this.formGroup.reset()
          this.messageService.add({ severity: 'success', summary: 'Usuário Criado', detail: 'Usuário criado com sucesso!' });
          setTimeout(() => {
            return this.router.navigate(['../usuarios'], {relativeTo: this.route})
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro)
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao criar o usuário.` });
        }
      })
    }
  }

  sendToBack() {
    this.router.navigate(['../usuarios'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
