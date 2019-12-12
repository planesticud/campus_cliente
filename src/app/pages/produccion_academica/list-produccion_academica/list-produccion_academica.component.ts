import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { UserService } from '../../../@core/data/users.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
// import { UserService } from '../../../@core/data/users.service';
import { ProduccionAcademicaPost } from './../../../@core/data/models/produccion_academica';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-produccion-academica',
  templateUrl: './list-produccion_academica.component.html',
  styleUrls: ['./list-produccion_academica.component.scss'],
  })
export class ListProduccionAcademicaComponent implements OnInit {
  prod_selected: ProduccionAcademicaPost;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private campusMidService: CampusMidService,
    private user: UserService,
    private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        // Persona: {
        //   title: this.translate.instant('GLOBAL.persona'),
        //   // type: 'number;',
        //   valuePrepareFunction: (value) => {
        //     return value;
        //   },
        // },
        Titulo: {
          title: this.translate.instant('GLOBAL.titulo_produccion_academica'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
          width: '20%',
        },
        SubtipoProduccionId: {
          title: this.translate.instant('GLOBAL.tipo_produccion_academica'),
          // type: 'tipo_produccion_academica;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
          width: '15%',
        },
        Resumen: {
          title: this.translate.instant('GLOBAL.resumen'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
          width: '30%',
        },
        // EstadoEnteAutorId: {
        //   title: this.translate.instant('GLOBAL.estado_autor'),
        //   // type: 'string',
        //   valuePrepareFunction: (value) => {
        //     return value.EstadoAutorProduccionId.Nombre;
        //   },
        //   width: '15%',
        // },
        Fecha: {
          title: this.translate.instant('GLOBAL.fecha_publicacion'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return ((value) + '').substring(0, 10);
          },
          width: '10%',
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.campusMidService.get('produccion_academica/' + this.user.getEnte()).subscribe((res: any) => {
    // this.campusMidService.get('produccion_academica/' + 21).subscribe((res: any) => {
    console.info('usUARIO: ', JSON.stringify(this.user.getEnte()));
      if (res !== null) {
        // if (Object.keys(res.Body[0]).length > 0 && res.Type !== 'error') {
        if (Object.keys(res > 0)) {
          // const data = <Array<ProduccionAcademicaPost>>res.Body;
          const data = <Array<ProduccionAcademicaPost>>res;
          console.info('RES: ', JSON.stringify(res));
          console.info('PRODUCCION: ', JSON.stringify(data));
          this.source.load(data);
        } else {
           Swal({
            type: 'error',
            title: '404',
            text: this.translate.instant('ERROR.404'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        }
      }
    }, (error: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error.status + '',
        text: this.translate.instant('ERROR.' + error.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
  }

  ngOnInit() {
  }

  onEdit(event): void {
    if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 1 || event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 2) {
      this.prod_selected = event.data;
      this.activetab();
    } else if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 3) {
      this.updateEstadoAutor(event.data);
    } else {
      this.showToast('error', 'Error', this.translate.instant('GLOBAL.accion_no_permitida'));
    }
  }

  onCreate(event): void {
    this.prod_selected = undefined;
    this.activetab();
  }

  onDelete(event): void {
    if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 1) {
      const opt: any = {
        title: this.translate.instant('GLOBAL.eliminar'),
        text: this.translate.instant('GLOBAL.seguro_continuar_eliminar_produccion'),
        icon: 'warning',
        buttons: true,
        dangerMode: true,
        showCancelButton: true,
      };
      Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.campusMidService.delete('produccion_academica', event.data).subscribe((res: any) => {
            if (res !== null) {
              if (res.Body.Id !== undefined) {
                this.source.load([]);
                this.loadData();
                this.showToast('info', 'Ok', this.translate.instant('GLOBAL.produccion_eliminada'));
              } else {
                this.showToast('info', 'Error', this.translate.instant('GLOBAL.produccion_no_eliminada'));
              }
            }
           }, (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
        }
      });
    } else if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 2) {
      const opt: any = {
        title: 'Error',
        text: this.translate.instant('GLOBAL.autor_no_puede_borrar'),
        icon: 'warning',
        buttons: false,
      };
      Swal(opt);
    } else if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 3) {
      this.updateEstadoAutor(event.data);
    } else {
      this.showToast('error', 'Error', this.translate.instant('GLOBAL.accion_no_permitida'));
    }
  }

  updateEstadoAutor(data: any): void {
    const opt: any = {
      title: 'Error',
      text: this.translate.instant('GLOBAL.autor_no_ha_confirmado'),
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willConfirm) => {
      if (willConfirm.value) {
        const optConfirmar: any = {
          title: this.translate.instant('GLOBAL.confirmar'),
          text: this.translate.instant('GLOBAL.confirma_participar_produccion'),
          icon: 'warning',
          buttons: true,
          dangerMode: true,
          showCancelButton: true,
          confirmButtonText: this.translate.instant('GLOBAL.si'),
          cancelButtonText: this.translate.instant('GLOBAL.no'),
        };
         Swal(optConfirmar)
        .then((isAuthor) => {
          const dataPut = {
            acepta: isAuthor.value ? true : false,
            AutorProduccionAcademica: data.EstadoEnteAutorId,
          }
          this.campusMidService.put('produccion_academica/estado_autor_produccion/' + dataPut.AutorProduccionAcademica.Id, dataPut)
          .subscribe((res: any) => {
            if (res.Type === 'error') {
              Swal({
                type: 'error',
                title: res.Code,
                text: this.translate.instant('ERROR.' + res.Code),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
              this.showToast('error', 'Error', this.translate.instant('GLOBAL.estado_autor_no_actualizado'));
            } else {
              this.loadData();
              this.showToast('success', this.translate.instant('GLOBAL.actualizar'), this.translate.instant('GLOBAL.estado_autor_actualizado'));
            }
          }, (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
        });
      }
    });
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
    // console.log("afssaf");
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
