import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  providers: [MessageService]
})
export class EditarUsuarioComponent implements OnInit {
  formGroup: FormGroup;
  saved: boolean = false;
  usuario?: User
  cargos: { nome: string }[] = [
    {
      nome: 'Administrador'
    },
    {
      nome: 'Funcionário'
    }
  ]
  status: { status: string }[] = [
    {
      status: 'Ativo'
    },
    {
      status: 'Inativo'
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
      status_usuario: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => this.usuario = data['usuario'][0]
    )
    console.log('Data', this.usuario);

    this.formGroup.patchValue({
      nome: this.usuario?.nome,
      email: this.usuario?.email,
      telefone: this.usuario?.telefone,
      cargo: this.usuario?.cargo,
      status_usuario: this.usuario?.status_usuario
    }); 
  }

  updateUsuario() {
    if (this.formGroup.valid && this.formGroup.value) {
      this.usuarioService.updateUsuario(this.formGroup.value, +this.usuario!.id).subscribe({
        next: (usuario) => {
          console.log('Usuário atualizado com sucesso =>', usuario)
          this.saved = true
          this.formGroup.reset()
          this.messageService.add({ severity: 'success', summary: 'Usuário Atualizado', detail: 'Usuário atualizado com sucesso!' });
          setTimeout(() => {
            return this.router.navigate(['../../usuarios'], { relativeTo: this.route })
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro)
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao atualizar o usuário.` });
        }
      })
    }
  }

  sendToBack() {
    this.router.navigate(['../../usuarios'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ((this.formGroup.dirty) && !this.saved) {
      return confirm('Você gostaria de descartar as mudanças?');
    }
    return true;
  }
}
