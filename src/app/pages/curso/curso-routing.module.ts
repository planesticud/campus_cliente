import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';

const routes: Routes = [{
  path: '',
  component: CursoComponent,
  children: [{
    path: 'inscripcion',
    component: InscripcionComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class CursoRoutingModule { }

export const routedComponents = [
  CursoComponent,
  InscripcionComponent,
];
