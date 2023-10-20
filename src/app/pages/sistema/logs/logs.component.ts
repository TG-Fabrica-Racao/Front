import { Component, OnInit } from '@angular/core';

import { debounceTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLogs } from 'src/app/shared/models/user';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  displayItems: UserLogs[] = [];
  logs: UserLogs[] = [];
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {  
    this.formGroup = this.formBuilder.group({
      nome: [''],
      data_inicial: [''],
      data_final: [''],
    }); 
  }

  ngOnInit() {
    this.getLogs();
    this.formGroup.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((changes) => {
      console.log('changes => ', changes)
      this.getLogs();
    })
  }

  getLogs() {
    console.log('teste')
    this.usuarioService.getUsuarioLogs(this.formGroup.value).subscribe({
      next: (res) => {
        this.logs = res;
        this.totalPages = Math.ceil(this.logs.length / this.itemsPerPage);
        this.updatePage();
      },
      error: (erro) => {
        console.error('Erro => ', erro)
      }
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
    const itemsToDisplay = this.logs.slice(startIndex, endIndex);
    const emptyRowCount = this.itemsPerPage - itemsToDisplay.length;

    type LogsTable = Pick<UserLogs, 'id' | 'data_registro' | 'usuario' | 'descricao'>;

    const emptyItem: LogsTable = {
      id: '',
      data_registro: '',
      usuario: '',
      descricao: '',
    };

    const emptyItems = Array(emptyRowCount).fill(emptyItem);
    const itemsWithEmptyRows = [...itemsToDisplay, ...emptyItems];
    this.displayItems = itemsWithEmptyRows;
  }
}
