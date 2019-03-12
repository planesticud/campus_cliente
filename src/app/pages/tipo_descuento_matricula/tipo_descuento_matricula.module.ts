import { TipoDescuentoMatriculaRoutingModule, routedComponents } from './tipo_descuento_matricula-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DescuentosPosgradoService } from '../../@core/data/descuentos_posgrado.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDescuentoMatriculaComponent } from './crud-tipo_descuento_matricula/crud-tipo_descuento_matricula.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDescuentoMatriculaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DescuentosPosgradoService,
  ],
  exports: [
    CrudTipoDescuentoMatriculaComponent,
  ],
})
export class TipoDescuentoMatriculaModule { }
