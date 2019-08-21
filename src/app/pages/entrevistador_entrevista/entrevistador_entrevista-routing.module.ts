import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrevistadorEntrevistaComponent } from './entrevistador_entrevista.component';
import { ListEntrevistadorEntrevistaComponent } from './list-entrevistador_entrevista/list-entrevistador_entrevista.component';
import { CrudEntrevistadorEntrevistaComponent } from './crud-entrevistador_entrevista/crud-entrevistador_entrevista.component';



const routes: Routes = [{
  path: '',
  component: EntrevistadorEntrevistaComponent,
  children: [{
    path: 'list-entrevistador_entrevista',
    component: ListEntrevistadorEntrevistaComponent,
  }, {
    path: 'crud-entrevistador_entrevista',
    component: CrudEntrevistadorEntrevistaComponent,
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

export class EntrevistadorEntrevistaRoutingModule { }

export const routedComponents = [
  EntrevistadorEntrevistaComponent,
  ListEntrevistadorEntrevistaComponent,
  CrudEntrevistadorEntrevistaComponent,
];
