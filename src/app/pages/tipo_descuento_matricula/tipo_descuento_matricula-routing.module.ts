import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDescuentoMatriculaComponent } from './tipo_descuento_matricula.component';
import { ListTipoDescuentoMatriculaComponent } from './list-tipo_descuento_matricula/list-tipo_descuento_matricula.component';
import { CrudTipoDescuentoMatriculaComponent } from './crud-tipo_descuento_matricula/crud-tipo_descuento_matricula.component';



const routes: Routes = [{
  path: '',
  component: TipoDescuentoMatriculaComponent,
  children: [{
    path: 'list-tipo_descuento_matricula',
    component: ListTipoDescuentoMatriculaComponent,
  }, {
    path: 'crud-tipo_descuento_matricula',
    component: CrudTipoDescuentoMatriculaComponent,
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

export class TipoDescuentoMatriculaRoutingModule { }

export const routedComponents = [
  TipoDescuentoMatriculaComponent,
  ListTipoDescuentoMatriculaComponent,
  CrudTipoDescuentoMatriculaComponent,
];
