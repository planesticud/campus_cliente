
import { TipoDescuentoMatricula } from './../../../@core/data/models/tipo_descuento_matricula';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentosPosgradoService } from '../../../@core/data/descuentos_posgrado.service';
import { FORM_TIPO_DESCUENTO_MATRICULA } from './form-tipo_descuento_matricula';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-descuento-matricula',
  templateUrl: './crud-tipo_descuento_matricula.component.html',
  styleUrls: ['./crud-tipo_descuento_matricula.component.scss'],
})
export class CrudTipoDescuentoMatriculaComponent implements OnInit {
  config: ToasterConfig;
  tipo_descuento_matricula_id: number;

  @Input('tipo_descuento_matricula_id')
  set name(tipo_descuento_matricula_id: number) {
    this.tipo_descuento_matricula_id = tipo_descuento_matricula_id;
    this.loadTipoDescuentoMatricula();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_tipo_descuento_matricula: TipoDescuentoMatricula;
  formTipoDescuentoMatricula: any;
  regTipoDescuentoMatricula: any;
  clean: boolean;

  constructor(private translate: TranslateService, private descuentosPosgradoService: DescuentosPosgradoService, private toasterService: ToasterService) {
    this.formTipoDescuentoMatricula = FORM_TIPO_DESCUENTO_MATRICULA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formTipoDescuentoMatricula.titulo = this.translate.instant('GLOBAL.tipo_descuento_matricula');
    this.formTipoDescuentoMatricula.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDescuentoMatricula.campos.length; i++) {
      this.formTipoDescuentoMatricula.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDescuentoMatricula.campos[i].label_i18n);
this.formTipoDescuentoMatricula.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDescuentoMatricula.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDescuentoMatricula.campos.length; index++) {
      const element = this.formTipoDescuentoMatricula.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadTipoDescuentoMatricula(): void {
    if (this.tipo_descuento_matricula_id !== undefined && this.tipo_descuento_matricula_id !== 0) {
      this.descuentosPosgradoService.get('tipo_descuento_matricula/?query=id:' + this.tipo_descuento_matricula_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_tipo_descuento_matricula = <TipoDescuentoMatricula>res[0];
          }
        });
    } else  {
      this.info_tipo_descuento_matricula = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDescuentoMatricula(tipoDescuentoMatricula: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update TipoDescuentoMatricula!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_descuento_matricula = <TipoDescuentoMatricula>tipoDescuentoMatricula;
        this.descuentosPosgradoService.put('tipo_descuento_matricula', this.info_tipo_descuento_matricula)
          .subscribe(res => {
            this.loadTipoDescuentoMatricula();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'TipoDescuentoMatricula updated');
          });
      }
    });
  }

  createTipoDescuentoMatricula(tipoDescuentoMatricula: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create TipoDescuentoMatricula!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_descuento_matricula = <TipoDescuentoMatricula>tipoDescuentoMatricula;
        this.descuentosPosgradoService.post('tipo_descuento_matricula', this.info_tipo_descuento_matricula)
          .subscribe(res => {
            this.info_tipo_descuento_matricula = <TipoDescuentoMatricula>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'TipoDescuentoMatricula created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDescuentoMatricula();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_descuento_matricula === undefined) {
        this.createTipoDescuentoMatricula(event.data.TipoDescuentoMatricula);
      } else {
        this.updateTipoDescuentoMatricula(event.data.TipoDescuentoMatricula);
      }
    }
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

}
