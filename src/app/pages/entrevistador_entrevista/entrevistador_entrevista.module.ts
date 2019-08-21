import { EntrevistadorEntrevistaRoutingModule, routedComponents } from './entrevistador_entrevista-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EntrevistaService } from '../../@core/data/entrevista.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEntrevistadorEntrevistaComponent } from './crud-entrevistador_entrevista/crud-entrevistador_entrevista.component';

@NgModule({
  imports: [
    ThemeModule,
    EntrevistadorEntrevistaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EntrevistaService,
  ],
  exports: [
    CrudEntrevistadorEntrevistaComponent,
  ],
})
export class EntrevistadorEntrevistaModule { }
