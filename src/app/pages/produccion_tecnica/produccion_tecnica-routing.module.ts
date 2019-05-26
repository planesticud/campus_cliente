import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduccionTecnicaComponent } from './produccion_tecnica.component';
import { ListProduccionTecnicaComponent } from './list-produccion_tecnica/list-produccion_tecnica.component';
import { CrudProduccionTecnicaComponent } from './crud-produccion_tecnica/crud-produccion_tecnica.component';
import { ViewProduccionTecnicaComponent } from './view-produccion_tecnica/view-produccion_tecnica.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ProduccionTecnicaComponent,
  children: [{
    path: 'list-produccion_tecnica',
    component: ListProduccionTecnicaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'crud-produccion_tecnica',
    component: CrudProduccionTecnicaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'view-produccion_tecnica',
    component: ViewProduccionTecnicaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
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

export class ProduccionTecnicaRoutingModule { }

export const routedComponents = [
  ProduccionTecnicaComponent,
  ListProduccionTecnicaComponent,
  CrudProduccionTecnicaComponent,
  ViewProduccionTecnicaComponent,
];
