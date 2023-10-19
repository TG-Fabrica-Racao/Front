import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FilterService } from 'src/app/shared/services/filter.service';
import { User } from 'src/app/shared/models/user';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: User[] = [];
  usuarios: User[] = [];
  selectedFilter: string = 'nome';
  searchTerm = new FormControl();
  isDropdownOpen: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private filterService: FilterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.filterService.getFilter().pipe(
      switchMap(({ type, value }) => this.usuarioService.getUsuarios(type, value)),
    ).subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
      this.updatePage();
    });

    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe((value) => {
        this.filterService.setFilter(this.selectedFilter, value)
      })
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToDisplay = this.usuarios.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    const emptyItem: User = {
      id: '',
      nome: '',
      email: '',
      telefone: '',
      status_usuario: '',
      cargo: ''
    };

    const emptyItems = Array(emptyRowCount).fill(emptyItem);
    const itemsWithEmptyRows = [...itemsToDisplay, ...emptyItems];
    this.displayItems = itemsWithEmptyRows;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterService.setFilter(filter, this.searchTerm.value);
    this.isDropdownOpen = false;
    console.log('Filtro => ', this.selectedFilter);
  }

  createUser() {
    return this.router.navigate(['../criar-usuario'], { relativeTo: this.route });
  }

  editUser(id: number) {
    return this.router.navigate(['../editar-usuario', id], { relativeTo: this.route });
  }


}
