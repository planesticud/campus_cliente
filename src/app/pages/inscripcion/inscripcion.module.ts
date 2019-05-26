import { InscripcionRoutingModule, routedComponents } from './inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { NuxeoService } from './../../@core/utils/nuxeo.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { UtilidadesService } from '../../@core/utils/utilidades.service';
import { ImplicitAutenticationService } from './../../@core/utils/implicit_autentication.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { PersonaService } from '../../@core/data/persona.service';
import { UbicacionesService } from '../../@core/data/ubicaciones.service';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { DescuentosPosgradoService } from '../../@core/data/descuentos_posgrado.service';
import { DocumentoProgramaService } from '../../@core/data/documentos_programa.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { InfoPersonaModule } from '../info_persona/info_persona.module';
import { CrudInfoPersonaComponent } from '../info_persona/crud-info_persona/crud-info_persona.component';
import { InfoCaracteristicaModule } from '../info_caracteristica/info_caracteristica.module';
import { CrudInfoCaracteristicaComponent } from '../info_caracteristica/crud-info_caracteristica/crud-info_caracteristica.component';
import { InformacionContactoModule } from '../informacion_contacto/informacion_contacto.module';
import { CrudInformacionContactoComponent } from '../informacion_contacto/crud-informacion_contacto/crud-informacion_contacto.component';
import { FormacionAcademicaModule } from '../formacion_academica/formacion_academica.module';
import { ListFormacionAcademicaComponent } from '../formacion_academica/list-formacion_academica/list-formacion_academica.component';
import { CrudFormacionAcademicaComponent } from '../formacion_academica/crud-formacion_academica/crud-formacion_academica.component';
import { IdiomasModule } from '../idiomas/idiomas.module';
import { ListIdiomasComponent } from '../idiomas/list-idiomas/list-idiomas.component';
import { CrudIdiomasComponent } from '../idiomas/crud-idiomas/crud-idiomas.component';
import { ExperienciaLaboralModule } from '../experiencia_laboral/experiencia_laboral.module';
import { ListExperienciaLaboralComponent } from '../experiencia_laboral/list-experiencia_laboral/list-experiencia_laboral.component';
import { CrudExperienciaLaboralComponent } from '../experiencia_laboral/crud-experiencia_laboral/crud-experiencia_laboral.component';
import { LibroModule } from '../libro/libro.module';
import { ListLibroComponent } from '../libro/list-libro/list-libro.component';
import { CrudLibroComponent } from '../libro/crud-libro/crud-libro.component';
import { ArticuloModule } from '../articulo/articulo.module';
import { ListArticuloComponent } from '../articulo/list-articulo/list-articulo.component';
import { CrudArticuloComponent } from '../articulo/crud-articulo/crud-articulo.component';
import { TraduccionModule } from '../traduccion/traduccion.module';
import { ListTraduccionComponent } from '../traduccion/list-traduccion/list-traduccion.component';
import { CrudTraduccionComponent } from '../traduccion/crud-traduccion/crud-traduccion.component';
import { OtroDocumentoModule } from '../otro_documento/otro_documento.module';
import { ListOtroDocumentoComponent } from '../otro_documento/list-otro_documento/list-otro_documento.component';
import { CrudOtroDocumentoComponent } from '../otro_documento/crud-otro_documento/crud-otro_documento.component';
import { OtraPublicacionModule } from '../otra_publicacion/otra_publicacion.module';
import { ListOtraPublicacionComponent } from '../otra_publicacion/list-otra_publicacion/list-otra_publicacion.component';
import { CrudOtraPublicacionComponent } from '../otra_publicacion/crud-otra_publicacion/crud-otra_publicacion.component';
import { ProduccionTecnicaModule } from '../produccion_tecnica/produccion_tecnica.module';
import { ListProduccionTecnicaComponent } from '../produccion_tecnica/list-produccion_tecnica/list-produccion_tecnica.component';
import { CrudProduccionTecnicaComponent } from '../produccion_tecnica/crud-produccion_tecnica/crud-produccion_tecnica.component';
import { ProduccionArtesArquDisenoModule } from '../produccion_artes_arqu_diseno/produccion_artes_arqu_diseno.module';
// tslint:disable-next-line:max-line-length
import { ListProduccionArtesArquDisenoComponent } from '../produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno.component';
import { CrudProduccionArtesArquDisenoComponent } from '../produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno.component';
import { DocumentoProgramaModule } from '../documento_programa/documento_programa.module';
// tslint:enable:max-line-length
import { ListDocumentoProgramaComponent } from '../documento_programa/list-documento_programa/list-documento_programa.component';
import { CrudDocumentoProgramaComponent } from '../documento_programa/crud-documento_programa/crud-documento_programa.component';
import { DescuentoMatriculaModule } from '../descuento_matricula/descuento_matricula.module';
import { ListDescuentoMatriculaComponent } from '../descuento_matricula/list-descuento_matricula/list-descuento_matricula.component';
import { CrudDescuentoMatriculaComponent } from '../descuento_matricula/crud-descuento_matricula/crud-descuento_matricula.component';
import { PropuestaGradoModule } from '../propuesta_grado/propuesta_grado.module';
import { CrudPropuestaGradoComponent } from '../propuesta_grado/crud-propuesta_grado/crud-propuesta_grado.component';

@NgModule({
  imports: [
    ThemeModule,
    InscripcionRoutingModule,
    MatExpansionModule,
    SharedModule,
    ToasterModule,
    InfoPersonaModule,
    InfoCaracteristicaModule,
    InformacionContactoModule,
    FormacionAcademicaModule,
    IdiomasModule,
    ExperienciaLaboralModule,
    LibroModule,
    ArticuloModule,
    TraduccionModule,
    OtroDocumentoModule,
    OtraPublicacionModule,
    ProduccionTecnicaModule,
    ProduccionArtesArquDisenoModule,
    DocumentoProgramaModule,
    DescuentoMatriculaModule,
    PropuestaGradoModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ImplicitAutenticationService,
    NuxeoService,
    UtilidadesService,
    ProgramaAcademicoService,
    PersonaService,
    UbicacionesService,
    CampusMidService,
    ProduccionAcademicaService,
    DocumentoProgramaService,
    DescuentosPosgradoService,
  ],
  entryComponents: [
    CrudInfoPersonaComponent,
    CrudInfoCaracteristicaComponent,
    CrudInformacionContactoComponent,
    ListFormacionAcademicaComponent,
    CrudFormacionAcademicaComponent,
    ListIdiomasComponent,
    CrudIdiomasComponent,
    ListExperienciaLaboralComponent,
    CrudExperienciaLaboralComponent,
    ListLibroComponent,
    CrudLibroComponent,
    ListArticuloComponent,
    CrudArticuloComponent,
    ListTraduccionComponent,
    CrudTraduccionComponent,
    ListOtraPublicacionComponent,
    CrudOtraPublicacionComponent,
    ListOtroDocumentoComponent,
    CrudOtroDocumentoComponent,
    ListProduccionTecnicaComponent,
    CrudProduccionTecnicaComponent,
    ListProduccionArtesArquDisenoComponent,
    CrudProduccionArtesArquDisenoComponent,
    ListDocumentoProgramaComponent,
    CrudDocumentoProgramaComponent,
    ListDescuentoMatriculaComponent,
    CrudDescuentoMatriculaComponent,
    CrudPropuestaGradoComponent,
  ],
})
export class InscripcionModule { }
