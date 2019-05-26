import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduccionArtesArquDisenoComponent } from './produccion_artes_arqu_diseno.component';
import { ListProduccionArtesArquDisenoComponent } from './list-produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno.component';
import { CrudProduccionArtesArquDisenoComponent } from './crud-produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno.component';
import { ViewProduccionArtesArquDisenoComponent } from './view-produccion_artes_arqu_diseno/view-produccion_artes_arqu_diseno.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ProduccionArtesArquDisenoComponent,
  children: [{
    path: 'list-produccion_artes_arqu_diseno',
    component: ListProduccionArtesArquDisenoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'crud-produccion_artes_arqu_diseno',
    component: CrudProduccionArtesArquDisenoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'view-produccion_artes_arqu_diseno',
    component: ViewProduccionArtesArquDisenoComponent,
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

export class ProduccionArtesArquDisenoRoutingModule { }

export const routedComponents = [
  ProduccionArtesArquDisenoComponent,
  ListProduccionArtesArquDisenoComponent,
  CrudProduccionArtesArquDisenoComponent,
  ViewProduccionArtesArquDisenoComponent,
];
