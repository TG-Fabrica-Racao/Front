import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcertarEstoqueComponent } from './acertar-estoque.component';

describe('AcertarEstoqueComponent', () => {
  let component: AcertarEstoqueComponent;
  let fixture: ComponentFixture<AcertarEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcertarEstoqueComponent]
    });
    fixture = TestBed.createComponent(AcertarEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
