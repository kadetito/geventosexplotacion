import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaservicioafectadoComponent } from './listaservicioafectado.component';

describe('ListaservicioafectadoComponent', () => {
  let component: ListaservicioafectadoComponent;
  let fixture: ComponentFixture<ListaservicioafectadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaservicioafectadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaservicioafectadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
