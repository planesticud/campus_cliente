import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtroDocumentoComponent } from './otro_documento.component';
import { ListOtroDocumentoComponent } from './list-otro_documento/list-otro_documento.component';
import { CrudOtroDocumentoComponent } from './crud-otro_documento/crud-otro_documento.component';
import { ViewOtroDocumentoComponent } from './view-otro_documento/view-otro_documento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: OtroDocumentoComponent,
  children: [{
    path: 'list-otro_documento',
    component: ListOtroDocumentoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'crud-otro_documento',
    component: CrudOtroDocumentoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'view-otro_documento',
    component: ViewOtroDocumentoComponent,
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

export class OtroDocumentoRoutingModule { }

export const routedComponents = [
  OtroDocumentoComponent,
  ListOtroDocumentoComponent,
  CrudOtroDocumentoComponent,
  ViewOtroDocumentoComponent,
];
