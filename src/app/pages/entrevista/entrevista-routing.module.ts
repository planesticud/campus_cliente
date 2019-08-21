import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrevistaComponent } from './entrevista.component';
import { ListEntrevistaComponent } from './list-entrevista/list-entrevista.component';
import { CrudEntrevistaComponent } from './crud-entrevista/crud-entrevista.component';



const routes: Routes = [{
  path: '',
  component: EntrevistaComponent,
  children: [{
    path: 'list-entrevista',
    component: ListEntrevistaComponent,
  }, {
    path: 'crud-entrevista',
    component: CrudEntrevistaComponent,
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

export class EntrevistaRoutingModule { }

export const routedComponents = [
  EntrevistaComponent,
  ListEntrevistaComponent,
  CrudEntrevistaComponent,
];
