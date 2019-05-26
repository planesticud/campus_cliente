import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtraPublicacionComponent } from './otra_publicacion.component';
import { ListOtraPublicacionComponent } from './list-otra_publicacion/list-otra_publicacion.component';
import { CrudOtraPublicacionComponent } from './crud-otra_publicacion/crud-otra_publicacion.component';
import { ViewOtraPublicacionComponent } from './view-otra_publicacion/view-otra_publicacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: OtraPublicacionComponent,
  children: [{
    path: 'list-otra_publicacion',
    component: ListOtraPublicacionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'crud-otra_publicacion',
    component: CrudOtraPublicacionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'view-otra_publicacion',
    component: ViewOtraPublicacionComponent,
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

export class OtraPublicacionRoutingModule { }

export const routedComponents = [
  OtraPublicacionComponent,
  ListOtraPublicacionComponent,
  CrudOtraPublicacionComponent,
  ViewOtraPublicacionComponent,
];
