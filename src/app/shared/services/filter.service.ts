import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new BehaviorSubject<{ type: string, value: string | number }>({ type: 'nome', value: '' });

  constructor() { }

  setFilter(type: string, value: string | number) {
    this.filterSubject.next({ type, value });
  }

  getFilter(): Observable<{ type: string, value: string | number }> {
    return this.filterSubject.asObservable();
  }
  
}
