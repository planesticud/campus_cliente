/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListTipoDescuentoMatriculaComponent } from './list-tipo_descuento_matricula.component';

describe('ListTipoDescuentoMatriculaComponent', () => {
  let component: ListTipoDescuentoMatriculaComponent;
  let fixture: ComponentFixture<ListTipoDescuentoMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoDescuentoMatriculaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoDescuentoMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
