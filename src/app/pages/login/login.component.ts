import { Component } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuService } from 'src/app/shared/menu/menu.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  submitLogin() {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.value;
      this.authService.login(formValues).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Login Efetuado', detail: 'Login Efetuado com sucesso!' });
          this.authService.saveToken(res.token);
          this.authService.setIsAuthenticated(true);
          setTimeout(() => {
            this.router.navigate(['/cadastrar/cadastro-ingrediente']);
          }, 2000)
        
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || `Ocorreu um erro ao criar o Ingrediente.` });
        }
      })
    }
  }

}
