import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscapacidadesComponent } from './discapacidades.component';

describe('DiscapacidadesComponent', () => {
  let component: DiscapacidadesComponent;
  let fixture: ComponentFixture<DiscapacidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscapacidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscapacidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
