import { EntrevistaRoutingModule, routedComponents } from './entrevista-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EntrevistaService } from '../../@core/data/entrevista.service';
import { PersonaService } from '../../@core/data/persona.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEntrevistaComponent } from './crud-entrevista/crud-entrevista.component';

@NgModule({
  imports: [
    ThemeModule,
    EntrevistaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EntrevistaService,
    PersonaService,
  ],
  exports: [
    CrudEntrevistaComponent,
  ],
})
export class EntrevistaModule { }
