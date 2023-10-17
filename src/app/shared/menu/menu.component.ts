import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { User } from '../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  isMenuOpen: boolean = false;
  isSistemaOpen: boolean = false;
  userInfo: User | null = null;
  menuToggle: boolean = false;
  sistemaSubcategorias: { display: string, route: string }[] = [
    { display: 'Histórico', route: 'historico' },
    { display: 'Gerenciar Usuários', route: 'gerenciar-usuarios' }
  ];

  constructor(private menuService: MenuService) {

  }

  onMenuToggle() {
    this.menuToggle = !this.menuToggle;
  }

  ngOnInit(): void {
      this.getUserInfo();
  }
  toggleSistemaDropdown() {
    this.isSistemaOpen = !this.isSistemaOpen;
  }
  toggleMenu() {
    setTimeout(() => {
      this.isMenuOpen = !this.isMenuOpen;
    }, 10);
  }

  getUserInfo() {
    this.menuService.userIdentify().subscribe({
      next: (res) => {
        this.userInfo = res
      },
      error: (erro) => console.error('Erro => ', erro)
    })
  }
  
}
