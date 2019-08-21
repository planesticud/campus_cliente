/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudEntrevistadorEntrevistaComponent } from './crud-entrevistador_entrevista.component';

describe('CrudEntrevistadorEntrevistaComponent', () => {
  let component: CrudEntrevistadorEntrevistaComponent;
  let fixture: ComponentFixture<CrudEntrevistadorEntrevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEntrevistadorEntrevistaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEntrevistadorEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
