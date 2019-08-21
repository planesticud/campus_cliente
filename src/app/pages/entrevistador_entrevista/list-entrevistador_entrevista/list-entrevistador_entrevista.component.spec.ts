/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListEntrevistadorEntrevistaComponent } from './list-entrevistador_entrevista.component';

describe('ListEntrevistadorEntrevistaComponent', () => {
  let component: ListEntrevistadorEntrevistaComponent;
  let fixture: ComponentFixture<ListEntrevistadorEntrevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntrevistadorEntrevistaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntrevistadorEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
