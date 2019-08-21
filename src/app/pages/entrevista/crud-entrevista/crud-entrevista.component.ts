import { EstadoEntrevista } from './../../../@core/data/models/estado_entrevista';
import { TipoEntrevista } from './../../../@core/data/models/tipo_entrevista';

import { Entrevista } from './../../../@core/data/models/entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { FORM_ENTREVISTA } from './form-entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-entrevista',
  templateUrl: './crud-entrevista.component.html',
  styleUrls: ['./crud-entrevista.component.scss'],
})
export class CrudEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  entrevista_id: number;

  @Input('entrevista_id')
  set name(entrevista_id: number) {
    this.entrevista_id = entrevista_id;
    this.loadEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_entrevista: Entrevista;
  formEntrevista: any;
  regEntrevista: any;
  clean: boolean;

  constructor(private translate: TranslateService, private entrevistaService: EntrevistaService, private toasterService: ToasterService) {
    this.formEntrevista = FORM_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsEstadoEntrevista();
    this.loadOptionsTipoEntrevista();
   }

  construirForm() {
    this.formEntrevista.titulo = this.translate.instant('GLOBAL.entrevista');
    this.formEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEntrevista.campos.length; i++) {
      this.formEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formEntrevista.campos[i].label_i18n);
      this.formEntrevista.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsEstadoEntrevista(): void {
    let estadoEntrevista: Array<any> = [];
      this.entrevistaService.get('estado_entrevista/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            estadoEntrevista = <Array<EstadoEntrevista>>res;
          }
          this.formEntrevista.campos[ this.getIndexForm('EstadoEntrevista') ].opciones = estadoEntrevista;
        });
  }
  loadOptionsTipoEntrevista(): void {
    let tipoEntrevista: Array<any> = [];
      this.entrevistaService.get('tipo_entrevista/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            tipoEntrevista = <Array<TipoEntrevista>>res;
          }
          this.formEntrevista.campos[ this.getIndexForm('TipoEntrevista') ].opciones = tipoEntrevista;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEntrevista.campos.length; index++) {
      const element = this.formEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadEntrevista(): void {
    if (this.entrevista_id !== undefined && this.entrevista_id !== 0) {
      this.entrevistaService.get('entrevista/?query=id:' + this.entrevista_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_entrevista = <Entrevista>res[0];
          }
        });
    } else  {
      this.info_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  updateEntrevista(entrevista: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Entrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevista = <Entrevista>entrevista;
        this.entrevistaService.put('entrevista', this.info_entrevista)
          .subscribe(res => {
            this.loadEntrevista();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Entrevista updated');
          });
      }
    });
  }

  createEntrevista(entrevista: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Entrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevista = <Entrevista>entrevista;
        this.entrevistaService.post('entrevista', this.info_entrevista)
          .subscribe(res => {
            this.info_entrevista = <Entrevista>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Entrevista created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadEntrevista();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_entrevista === undefined) {
        this.createEntrevista(event.data.Entrevista);
      } else {
        this.updateEntrevista(event.data.Entrevista);
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
