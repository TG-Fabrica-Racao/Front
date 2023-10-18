import { Component, OnInit } from '@angular/core';

import { MenuService } from './menu.service';
import { User } from '../models/user';
import { MessageService } from 'primeng/api';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit{

  isMenuOpen: boolean = false;
  isSistemaOpen: boolean = false;
  userInfo: User | null = null;
  menuToggle: boolean = false;
  visible: boolean = false;
  formGroup: FormGroup;
  isEditable: boolean = false;


  constructor(
    private menuService: MenuService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      senha_atual: ['', Validators.required],
      senha_nova: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onMenuToggle() {
    this.menuToggle = !this.menuToggle;
  }

  ngOnInit(): void {
      this.getUserInfo();
  }

  getUserInfo() {
    this.menuService.userIdentify().subscribe({
      next: (res) => {
        this.userInfo = res
      },
      error: (erro) => console.error('Erro => ', erro)
    })
  }

  openModal() {
    this.visible = true;
  }

  onEditable() {
    this.isEditable = !this.isEditable;
  }

  changePassword() {
    if (this.formGroup.valid && this.formGroup.value) {
      const values = {
        ...this.formGroup.value,
        email: this.userInfo!.email
      }

      this.authService.changePassword(values).subscribe({
        next: (changePassword) => {
          console.log('Senha Alterada => ', changePassword);
          this.messageService.add({ severity: 'success', summary: 'Senha atualizada', detail: 'A senha foi atualizada com sucesso.' });
          this.formGroup.reset();
          setTimeout(() => {
            this.visible = false;
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro.error.message || `Ocorreu um erro ao alterar a senha.` });
        }
      })
    }
  }

  logout() {
    this.visible = false;
    localStorage.clear();
    this.authService.setIsAuthenticated(false);
    this.router.navigateByUrl('/login');
  }
  
}
