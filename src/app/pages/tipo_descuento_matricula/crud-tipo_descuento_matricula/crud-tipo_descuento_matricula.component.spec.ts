/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudTipoDescuentoMatriculaComponent } from './crud-tipo_descuento_matricula.component';

describe('CrudTipoDescuentoMatriculaComponent', () => {
  let component: CrudTipoDescuentoMatriculaComponent;
  let fixture: ComponentFixture<CrudTipoDescuentoMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTipoDescuentoMatriculaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTipoDescuentoMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
