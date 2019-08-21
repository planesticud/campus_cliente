import { Entrevistador } from './../../../@core/data/models/entrevistador';
import { Entrevista } from './../../../@core/data/models/entrevista';

import { EntrevistadorEntrevista } from './../../../@core/data/models/entrevistador_entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { FORM_ENTREVISTADOR_ENTREVISTA } from './form-entrevistador_entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-entrevistador-entrevista',
  templateUrl: './crud-entrevistador_entrevista.component.html',
  styleUrls: ['./crud-entrevistador_entrevista.component.scss'],
})
export class CrudEntrevistadorEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  entrevistador_entrevista_id: number;

  @Input('entrevistador_entrevista_id')
  set name(entrevistador_entrevista_id: number) {
    this.entrevistador_entrevista_id = entrevistador_entrevista_id;
    this.loadEntrevistadorEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_entrevistador_entrevista: EntrevistadorEntrevista;
  formEntrevistadorEntrevista: any;
  regEntrevistadorEntrevista: any;
  clean: boolean;

  constructor(private translate: TranslateService, private entrevistaService: EntrevistaService, private toasterService: ToasterService) {
    this.formEntrevistadorEntrevista = FORM_ENTREVISTADOR_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsEntrevistador();
    this.loadOptionsEsntrevista();
   }

  construirForm() {
    this.formEntrevistadorEntrevista.titulo = this.translate.instant('GLOBAL.entrevistador_entrevista');
    this.formEntrevistadorEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEntrevistadorEntrevista.campos.length; i++) {
      this.formEntrevistadorEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formEntrevistadorEntrevista.campos[i].label_i18n);
      this.formEntrevistadorEntrevista.campos[i].placeholder = this.translate.
        instant('GLOBAL.placeholder_' + this.formEntrevistadorEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsEntrevistador(): void {
    let entrevistador: Array<any> = [];
      this.entrevistaService.get('entrevistador/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            entrevistador = <Array<Entrevistador>>res;
          }
          this.formEntrevistadorEntrevista.campos[ this.getIndexForm('Entrevistador') ].opciones = entrevistador;
        });
  }
  loadOptionsEsntrevista(): void {
    let esntrevista: Array<any> = [];
      this.entrevistaService.get('entrevista/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            esntrevista = <Array<Entrevista>>res;
          }
          this.formEntrevistadorEntrevista.campos[ this.getIndexForm('Esntrevista') ].opciones = esntrevista;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEntrevistadorEntrevista.campos.length; index++) {
      const element = this.formEntrevistadorEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadEntrevistadorEntrevista(): void {
    if (this.entrevistador_entrevista_id !== undefined && this.entrevistador_entrevista_id !== 0) {
      this.entrevistaService.get('entrevistador_entrevista/?query=id:' + this.entrevistador_entrevista_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_entrevistador_entrevista = <EntrevistadorEntrevista>res[0];
          }
        });
    } else  {
      this.info_entrevistador_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  updateEntrevistadorEntrevista(entrevistadorEntrevista: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update EntrevistadorEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevistador_entrevista = <EntrevistadorEntrevista>entrevistadorEntrevista;
        this.entrevistaService.put('entrevistador_entrevista', this.info_entrevistador_entrevista)
          .subscribe(res => {
            this.loadEntrevistadorEntrevista();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'EntrevistadorEntrevista updated');
          });
      }
    });
  }

  createEntrevistadorEntrevista(entrevistadorEntrevista: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create EntrevistadorEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevistador_entrevista = <EntrevistadorEntrevista>entrevistadorEntrevista;
        this.entrevistaService.post('entrevistador_entrevista', this.info_entrevistador_entrevista)
          .subscribe(res => {
            this.info_entrevistador_entrevista = <EntrevistadorEntrevista>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'EntrevistadorEntrevista created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadEntrevistadorEntrevista();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_entrevistador_entrevista === undefined) {
        this.createEntrevistadorEntrevista(event.data.EntrevistadorEntrevista);
      } else {
        this.updateEntrevistadorEntrevista(event.data.EntrevistadorEntrevista);
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
