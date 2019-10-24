import { Lugar } from './../../../@core/data/models/lugar';
import { InformacionContacto } from './../../../@core/data/models/informacion_contacto';
import { InfoContactoGet } from './../../../@core/data/models/info_contacto_get';
import { InfoContactoPut } from './../../../@core/data/models/info_contacto_put';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { FORM_INFORMACION_CONTACTO } from './form-informacion_contacto';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { IAppState } from '../../../@core/store/app.state';
import { ListService } from '../../../@core/store/services/list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-crud-informacion-contacto',
  templateUrl: './crud-informacion_contacto.component.html',
  styleUrls: ['./crud-informacion_contacto.component.scss'],
})
export class CrudInformacionContactoComponent implements OnInit {
  config: ToasterConfig;
  informacion_contacto_id: number;

  @Input('informacion_contacto_id')
  set name(informacion_contacto_id: number) {
    this.informacion_contacto_id = informacion_contacto_id;
    if (this.informacion_contacto_id !== undefined && this.informacion_contacto_id !== 0 &&
      this.informacion_contacto_id.toString() !== '') {
      this.loadInformacionContacto();
    }
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_informacion_contacto: InformacionContacto;
  formInformacionContacto: any;
  regInformacionContacto: any;
  clean: boolean;
  denied_acces: boolean = false;
  paisSeleccionado: any;
  departamentoSeleccionado: any;
  datosPost: any;
  datosGet: any;
  datosPut: any;
  loading: boolean;

  constructor(
    private translate: TranslateService,
    private campusMidService: CampusMidService,
    private ubicacionesService: UbicacionService,
    private store: Store<IAppState>,
    private listService: ListService,
    private toasterService: ToasterService) {
    this.formInformacionContacto = FORM_INFORMACION_CONTACTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.listService.findPais();
    this.loadLists();
    this.loading = false;
  }

  construirForm() {
    // this.formInformacionContacto.titulo = this.translate.instant('GLOBAL.informacion_contacto');
    this.formInformacionContacto.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInformacionContacto.campos.length; i++) {
      this.formInformacionContacto.campos[i].label = this.translate.instant('GLOBAL.' + this.formInformacionContacto.campos[i].label_i18n);
      this.formInformacionContacto.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formInformacionContacto.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getSeleccion(event) {
    if (event.nombre === 'PaisResidencia') {
      this.paisSeleccionado = event.valor;
      this.loadOptionsDepartamentoResidencia();
    } else if (event.nombre === 'DepartamentoResidencia') {
      this.departamentoSeleccionado = event.valor;
      this.loadOptionsCiudadResidencia();
    }
  }

  loadOptionsDepartamentoResidencia(): void {
    let consultaHijos: Array<any> = [];
    const departamentoResidencia: Array<any> = [];
    if (this.paisSeleccionado) {
      this.ubicacionesService.get('relacion_lugares/?query=LugarPadre.Id:' + this.paisSeleccionado.Id + ',LugarHijo.Activo:true&limit=0')
        .subscribe(res => {
          if (res !== null) {
            consultaHijos = <Array<Lugar>>res;
            for (let i = 0; i < consultaHijos.length; i++) {
              departamentoResidencia.push(consultaHijos[i].LugarHijo);
            }
          }
          this.formInformacionContacto.campos[this.getIndexForm('DepartamentoResidencia')].opciones = departamentoResidencia;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.informacion_contacto') + '|' +
                this.translate.instant('GLOBAL.departamento_residencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  loadOptionsCiudadResidencia(): void {
    let consultaHijos: Array<any> = [];
    const ciudadResidencia: Array<any> = [];
    if (this.departamentoSeleccionado) {
      this.ubicacionesService.get('relacion_lugares/?query=LugarPadre.Id:' + this.departamentoSeleccionado.Id + ',LugarHijo.Activo:true&limit=0')
        .subscribe(res => {
          if (res !== null) {
            consultaHijos = <Array<Lugar>>res;
            for (let i = 0; i < consultaHijos.length; i++) {
              ciudadResidencia.push(consultaHijos[i].LugarHijo);
            }
          }
          this.formInformacionContacto.campos[this.getIndexForm('CiudadResidencia')].opciones = ciudadResidencia;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.informacion_contacto') + '|' +
                this.translate.instant('GLOBAL.ciudad_residencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formInformacionContacto.campos.length; index++) {
      const element = this.formInformacionContacto.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadInformacionContacto(): void {
    this.loading = true;
    if (this.informacion_contacto_id !== undefined && this.informacion_contacto_id !== 0 &&
      this.informacion_contacto_id.toString() !== '') {
      this.denied_acces = false;
      this.campusMidService.get('persona/consultar_contacto/' + this.informacion_contacto_id)
        .subscribe(res => {
          if (res !== null) {
            this.datosGet = <InfoContactoGet>res;
            this.info_informacion_contacto = {
              Ente: (1 * this.informacion_contacto_id),
              PaisResidencia: this.datosGet.UbicacionEnte.Lugar.PAIS,
              DepartamentoResidencia: this.datosGet.UbicacionEnte.Lugar.DEPARTAMENTO,
              CiudadResidencia: this.datosGet.UbicacionEnte.Lugar.CIUDAD,
              IdLugarEnte: this.datosGet.UbicacionEnte.Id,
              IdDireccionEnte: this.datosGet.UbicacionEnte.Atributos[1].Id,
              DireccionResidencia: this.datosGet.UbicacionEnte.Atributos[1].Valor,
              IdEstratoEnte: this.datosGet.UbicacionEnte.Atributos[0].Id,
              EstratoResidencia: this.datosGet.UbicacionEnte.Atributos[0].Valor,
              IdCodigoEnte: this.datosGet.UbicacionEnte.Atributos[2].Id,
              CodigoPostal: '' + this.datosGet.UbicacionEnte.Atributos[2].Valor,
              IdTelefonoEnte: this.datosGet.ContactoEnte[0].Id,
              Telefono: '' + this.datosGet.ContactoEnte[0].Valor,
              IdTelefonoAlternoEnte: this.datosGet.ContactoEnte[1].Id,
              TelefonoAlterno: '' + this.datosGet.ContactoEnte[1].Valor,
            };
            for (let i = 0; i < this.datosGet.UbicacionEnte.Atributos.length; i++) {
              if (this.datosGet.UbicacionEnte.Atributos[i].AtributoUbicacion.Nombre === 'Dirección') {
                this.info_informacion_contacto.IdDireccionEnte = this.datosGet.UbicacionEnte.Atributos[i].Id;
                this.info_informacion_contacto.DireccionResidencia = this.datosGet.UbicacionEnte.Atributos[i].Valor;
              } else if (this.datosGet.UbicacionEnte.Atributos[i].AtributoUbicacion.Nombre === 'Estrato') {
                this.info_informacion_contacto.IdEstratoEnte = this.datosGet.UbicacionEnte.Atributos[i].Id;
                this.info_informacion_contacto.EstratoResidencia = this.datosGet.UbicacionEnte.Atributos[i].Valor;
              } else if (this.datosGet.UbicacionEnte.Atributos[i].AtributoUbicacion.Nombre === 'Código postal') {
                this.info_informacion_contacto.IdCodigoEnte = this.datosGet.UbicacionEnte.Atributos[i].Id;
                this.info_informacion_contacto.CodigoPostal = this.datosGet.UbicacionEnte.Atributos[i].Valor;
              }
            }

            this.formInformacionContacto.campos[this.getIndexForm('DepartamentoResidencia')].opciones[0] = this.datosGet.UbicacionEnte.Lugar.DEPARTAMENTO;
            this.formInformacionContacto.campos[this.getIndexForm('CiudadResidencia')].opciones[0] = this.info_informacion_contacto.CiudadResidencia;
            this.loading = false;
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.informacion_contacto'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_informacion_contacto = undefined;
      this.clean = !this.clean;
      this.denied_acces = false; //  no muestra el formulario a menos que se le pase un id del ente info_caracteristica_id
      this.loading = false;
    }
  }

  updateInformacionContacto(informacionContacto: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.actualizar'),
      text: this.translate.instant('GLOBAL.actualizar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.loading = true;
          this.info_informacion_contacto = <InformacionContacto>informacionContacto;
          this.datosPut = <InfoContactoPut>{
            Ente: (1 * this.info_informacion_contacto.Ente),
            Persona: (1 * this.info_informacion_contacto.Ente),
            ContactoEnte: [
              {
                Id: this.info_informacion_contacto.IdTelefonoEnte,
                TipoContacto: {Id: 1},
                Valor: '' + this.info_informacion_contacto.Telefono,
              },
              {
                Id: this.info_informacion_contacto.IdTelefonoAlternoEnte,
                TipoContacto: {Id: 2},
                Valor: '' + this.info_informacion_contacto.TelefonoAlterno,
              },
            ],
            UbicacionEnte: {
              Id: this.info_informacion_contacto.IdLugarEnte,
              Lugar: {
                Id: this.info_informacion_contacto.CiudadResidencia.Id,
              },
              Atributos: [
                {
                  Id: this.info_informacion_contacto.IdDireccionEnte,
                  AtributoUbicacion: {Id: 1},
                  Valor: this.info_informacion_contacto.DireccionResidencia,
                },
                {
                  Id: this.info_informacion_contacto.IdEstratoEnte,
                  AtributoUbicacion: {Id: 2},
                  Valor: '' + this.info_informacion_contacto.EstratoResidencia,
                }, {
                  Id: this.info_informacion_contacto.IdCodigoEnte,
                  AtributoUbicacion: {Id: 3},
                  Valor: this.info_informacion_contacto.CodigoPostal,
                },
              ],
            },
          };
          this.campusMidService.put('persona/actualizar_contacto', this.datosPut)
            .subscribe(res => {
              this.loadInformacionContacto();
              this.loading = false;
              this.eventChange.emit(true);
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.informacion_contacto') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
            },
              (error: HttpErrorResponse) => {
                this.loading = false;
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.informacion_contacto'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createInformacionContacto(informacionContacto: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.crear') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        this.loading = true;
        if (willDelete.value) {
          this.info_informacion_contacto = <InformacionContacto>informacionContacto;
          this.info_informacion_contacto.Ente = this.informacion_contacto_id;
          this.datosPost = {
            'Ente': (1 * this.info_informacion_contacto.Ente.valueOf()),
            'Persona': (1 * this.info_informacion_contacto.Ente.valueOf()),
            'ContactoEnte': [
              {
                'TipoContacto': {'Id': 1},
                'Valor': '' + this.info_informacion_contacto.Telefono,
              },
              {
                'TipoContacto': {'Id': 2},
                'Valor': '' + this.info_informacion_contacto.TelefonoAlterno,
              },
            ],
            'UbicacionEnte': {
              'Lugar': this.info_informacion_contacto.CiudadResidencia,
              'TipoRelacionUbicacionEnte': 2,
              'Atributos': [
                {
                  'AtributoUbicacion': {'Id': 1},
                  'Valor': this.info_informacion_contacto.DireccionResidencia,
                },
                {
                  'AtributoUbicacion': {'Id': 2},
                  'Valor': '' + this.info_informacion_contacto.EstratoResidencia,
                },
                {
                  'AtributoUbicacion': {'Id': 3},
                  'Valor': this.info_informacion_contacto.CodigoPostal,
                },
              ],
            },
          };
          this.campusMidService.post('persona/guardar_contacto/', this.datosPost)
            .subscribe(res => {
              this.info_informacion_contacto = <InformacionContacto>res;
              this.loading = false;
              this.eventChange.emit(true);
              this.showToast('info', this.translate.instant('GLOBAL.crear'),
                this.translate.instant('GLOBAL.informacion_contacto') + ' ' +
                this.translate.instant('GLOBAL.confirmarCrear'));
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.crear') + '-' +
                    this.translate.instant('GLOBAL.informacion_contacto'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadInformacionContacto();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_informacion_contacto === undefined) {
        this.createInformacionContacto(event.data.InformacionContacto);
      } else {
        this.updateInformacionContacto(event.data.InformacionContacto);
      }
    }
  }

  setPercentage(event) {
    this.result.emit(event);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.formInformacionContacto.campos[this.getIndexForm('PaisResidencia')].opciones = list.listPais[0];
      },
    );
  }

}
