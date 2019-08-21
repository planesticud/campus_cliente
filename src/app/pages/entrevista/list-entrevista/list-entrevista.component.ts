import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-entrevista',
  templateUrl: './list-entrevista.component.html',
  styleUrls: ['./list-entrevista.component.scss'],
  })
export class ListEntrevistaComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private entrevistaService: EntrevistaService,
    private personaService: PersonaService,
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
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Admision: {
          title: this.translate.instant('GLOBAL.inscripcion_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Aspirante: {
          title: this.translate.instant('GLOBAL.aspirante'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        FechaEntrevista: {
          title: this.translate.instant('GLOBAL.fecha_entrevista'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Nota: {
          title: this.translate.instant('GLOBAL.nota'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        EstadoEntrevista: {
          title: this.translate.instant('GLOBAL.estado_entrevista'),
          // type: 'estado_entrevista;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoEntrevista: {
          title: this.translate.instant('GLOBAL.tipo_entrevista'),
          // type: 'tipo_entrevista;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.entrevistaService.get('entrevista/?limit=0').subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        const data_info = <Array<any>>[];
        data.forEach(element => {
            this.personaService.get('persona/' + element.Id).subscribe(persona => {
              if (persona !== null) {
                        const persona2 = <any>persona;
                        // element.Aspirante = JSON.stringify(persona2);
                        element.Aspirante = persona2.PrimerNombre + ' ' + persona2.PrimerApellido;
                        data_info.push(element);
                        this.source.load(data_info);

              }
            });
          });
        // this.source.load(data);
          }
    });
  }

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  onDelete(event): void {
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete Entrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.entrevistaService.delete('entrevista/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Entrevista deleted');
            }
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
