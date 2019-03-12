import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { TipoDescuentoMatricula } from './../../../@core/data/models/tipo_descuento_matricula';
import { DescuentoMatricula } from './../../../@core/data/models/descuento_matricula';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentosPosgradoService } from '../../../@core/data/descuentos_posgrado.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { FORM_DESCUENTO_MATRICULA } from './form-descuento_matricula';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-descuento-matricula',
  templateUrl: './crud-descuento_matricula.component.html',
  styleUrls: ['./crud-descuento_matricula.component.scss'],
})
export class CrudDescuentoMatriculaComponent implements OnInit {
  config: ToasterConfig;
  descuento_matricula_id: number;
  filesUp: any;
  DocumentoSoporte: any;
  estado: number;
  @Input('descuento_matricula_id')
  set name(descuento_matricula_id: number) {
    this.descuento_matricula_id = descuento_matricula_id;
    this.loadDescuentoMatricula();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_descuento_matricula: any;
  formDescuentoMatricula: any;
  regDescuentoMatricula: any;
  clean: boolean;

  constructor(
    private translate: TranslateService,
    private autenticationService: ImplicitAutenticationService,
    private documentoService: DocumentoService,
    private descuentosPosgradoService: DescuentosPosgradoService,
    private nuxeoService: NuxeoService,
    private user: UserService,
    private toasterService: ToasterService) {
    this.formDescuentoMatricula = FORM_DESCUENTO_MATRICULA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipodescuentomatricula();
   }

  construirForm() {
    this.formDescuentoMatricula.titulo = this.translate.instant('GLOBAL.descuento_matricula');
    this.formDescuentoMatricula.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDescuentoMatricula.campos.length; i++) {
      this.formDescuentoMatricula.campos[i].label = this.translate.instant('GLOBAL.' + this.formDescuentoMatricula.campos[i].label_i18n);
      this.formDescuentoMatricula.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formDescuentoMatricula.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipodescuentomatricula(): void {
      let tipodescuentomatricula: Array<any> = [];
      this.descuentosPosgradoService.get('tipo_descuento_matricula/?limit=0')
        .subscribe(res => {
          console.info ('ENTRO');
          if (res !== null) {
            tipodescuentomatricula = <Array<TipoDescuentoMatricula>>res;
          }
          console.info ('Datos: ' + tipodescuentomatricula)
          this.formDescuentoMatricula.campos[ this.getIndexForm('TipoDescuentoMatricula') ].opciones = tipodescuentomatricula;
        },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + 'YYY',
            text: this.translate.instant('ERROR.' + error.message + ' URL: ' + error.headers ),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
      });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formDescuentoMatricula.campos.length; index++) {
      const element = this.formDescuentoMatricula.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadDescuentoMatricula(): void {
    if (this.descuento_matricula_id !== undefined && this.descuento_matricula_id !== 0) {
      this.descuentosPosgradoService.get('descuento_matricula/?query=id:' + this.descuento_matricula_id)
        .subscribe(res => {
          if (res !== null) {
            const temp = <DescuentoMatricula>res[0];
            const files = []
            if (temp.Enlace + '' !== '0') {
              files.push({ Id: temp.Enlace, key: 'DocumentoSoporte'});
            }
            this.nuxeoService.getDocumentoById$(files, this.documentoService)
              .subscribe(response_2 => {
                const filesResponse_2 = <any>response_2;
                if ( (Object.keys(filesResponse_2).length !== 0) && (filesResponse_2['DocumentoSoporte'] !== undefined) ) {
                  this.info_descuento_matricula = <DescuentoMatricula>res[0];
                  this.info_descuento_matricula.Tipodescuentomatricula = temp.Tipodescuentomatricula;
                  this.DocumentoSoporte = this.info_descuento_matricula.DocumentoSoporte;
                  this.info_descuento_matricula.DocumentoSoporte = filesResponse_2['DocumentoSoporte'] + '';
                }
              },
            (error_2: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error_2.status + '',
                text: this.translate.instant('ERROR.' + error_2.status),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
          }
        },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else  {
      this.info_descuento_matricula = undefined;
      this.clean = !this.clean;
    }
  }

  updateDescuentoMatricula(descuentoMatricula: any): void {

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
        this.info_descuento_matricula = <DescuentoMatricula>descuentoMatricula;
        const files = [];
        if (this.info_descuento_matricula.DocumentoSoporte !== undefined) {
          files.push({ file: this.info_descuento_matricula.DocumentoSoporte, documento: this.DocumentoSoporte, key: 'DescuentoMatricula' });
        }
        if (files.length !== 0) {
          this.nuxeoService.updateDocument$(files, this.documentoService)
            .subscribe(response => {
              if (Object.keys(response).length === files.length) {
                const documentos_actualizados = <any>response;
                this.info_descuento_matricula.DocumentoSoporte = this.DocumentoSoporte;
                this.descuentosPosgradoService.put('descuento_matricula', this.info_descuento_matricula)
                .subscribe(res => {
                  if (documentos_actualizados['DocumentoSoporte'] !== undefined) {
                    this.info_descuento_matricula.DocumentoSoporte = documentos_actualizados['DocumentoSoporte'].url + '';
                  }
                  this.loadDescuentoMatricula();
                  this.eventChange.emit(true);
                  this.showToast('info', 'updated', 'DescuentoMatricula updated');
                },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
              }
            },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
        } else {
          this.info_descuento_matricula.DocumentoSoporte = this.DocumentoSoporte;
          this.descuentosPosgradoService.put('descuentoMatricula', this.info_descuento_matricula)
                  .subscribe(res => {
                    this.eventChange.emit(true);
                    this.loadDescuentoMatricula();
                    this.showToast('info', 'updated', 'Descuento updated');
                  },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
        }
      }
    });
  }

  crearNuevoDescuentoMatricula(descuentoMatricula: any): void {
    this.info_descuento_matricula = <DescuentoMatricula>descuentoMatricula;
    const tipoDescuento = this.info_descuento_matricula.TipoDescuentoMatricula.Id;
         this.descuentosPosgradoService.get('descuento_matricula/?query=ente:' + this.user.getEnte())
           .subscribe(res => {
            if (res !== null) {
              // let count = Object.keys(res).length;
              console.info ('Cantidad Registros: ' + Object.keys(res).length);
              console.info ('DATA: ' + res.toString )
              // var obj = JSON.parse(res)
              if (Object.keys(res).length >= 2) {
                console.info ('No se pueden solicitar más descuentos');
                Swal('Descuento no válido', 'No se pueden solicitar más descuentos', 'error');
              } else if (Object.keys(res).length === 1) {
                console.info ('Que es res ' + JSON.stringify(res[0]));
                // const temp = <DescuentoMatricula>res[0];
                const temp = res[0];
                console.info ('A' + res[0].TipoDescuentoMatricula.Id);
                console.info ('B' + temp.TipoDescuentoMatricula.Id);
                if (tipoDescuento === 1 && temp.TipoDescuentoMatricula.Id !== 1) {
                  console.info ('Agregando registro...');
                  this.createDescuentoMatricula(descuentoMatricula);
                } else if (tipoDescuento !== 1 && temp.TipoDescuentoMatricula.Id === 1) {
                  console.info ('Agregando registro...');
                  this.createDescuentoMatricula(descuentoMatricula);
                } else {
                  console.info ('Descuentos incompatibles');
                  Swal('Descuento no válido', 'Incompatible con descuento solicitado anteriormente', 'error');
                  this.eventChange.emit(true);
                  this.clean = !this.clean;
            }
              }
            } else {
              this.createDescuentoMatricula(descuentoMatricula);
            }
          });
          this.eventChange.emit(true);
    }

  createDescuentoMatricula(descuentoMatricula: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.create_descuento'),
      icon: 'warning',
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        const files = []
        this.info_descuento_matricula = <DescuentoMatricula>descuentoMatricula;
        this.info_descuento_matricula.Ente = this.user.getEnte();
        const valor =  descuentoMatricula.TipoDescuentoMatricula.Id;
        if (this.info_descuento_matricula.DocumentoSoporte !== undefined) {
           files.push({
             nombre: this.autenticationService.getPayload().sub, key: 'DocumentoSoporte',
             file: this.info_descuento_matricula.DocumentoSoporte, IdDocumento: 2})
        }

        this.nuxeoService.getDocumentos$(files, this.documentoService)
          .subscribe(response => {
            if (Object.keys(response).length === files.length) {
              this.filesUp = <any>response;
              if (this.filesUp['DocumentoSoporte'] !== undefined) {
                  this.info_descuento_matricula.Enlace = this.filesUp['DocumentoSoporte'].Id;
              }
              this.descuentosPosgradoService.post('descuento_matricula', this.info_descuento_matricula)
                .subscribe(res => {
                  const r = <any>res
                  if (r !== null && r.Type !== 'error') {
                    this.info_descuento_matricula = <DescuentoMatricula>res;
                    this.eventChange.emit(true);
                    this.showToast('info', this.translate.instant('GLOBAL.crear'),
                    this.translate.instant('GLOBAL.descuentoMatricula') + ' ' + this.translate.instant('GLOBAL.confirmarCrear'));
                    this.loadDescuentoMatricula();
                  } else {
                    this.showToast('error', this.translate.instant('GLOBAL.error'),
                    this.translate.instant('GLOBAL.error'));
                  }
                },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
            }
          },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        })
      }
    });
  }

  ngOnInit() {
    this.loadDescuentoMatricula();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_descuento_matricula === undefined) {
        this.crearNuevoDescuentoMatricula(event.data.DescuentoMatricula)
        // this.createDescuentoMatricula(event.data.DescuentoMatricula);
        this.loadDescuentoMatricula();
      } else {
        this.updateDescuentoMatricula(event.data.DescuentoMatricula);
        this.loadDescuentoMatricula();
      }
    }
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

}
