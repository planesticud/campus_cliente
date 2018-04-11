import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UtilidadesService } from '../../../../@core/utils/utilidades.service';
import { AcademicaService } from '../../../../@core/data/academica.service';

@Component({
  selector: 'ngx-seleccion-programa',
  templateUrl: './seleccion-programa.component.html',
  styleUrls: ['./seleccion-programa.component.scss'],
})
export class SeleccionProgramaComponent implements OnInit {
  formPrograma: any = {
    titulo: this.translate.instant('DATOS_BASICOS.TITULO4'),
    clase: 'col-9',
    btn: this.translate.instant('DATOS_BASICOS.SIGUIENTE'),
    alertas: true,
    btnLimpiar: this.translate.instant('DATOS_BASICOS.SALIR'),
    modelo: 'ProgramaSeleccionado',
    campos: [],
  };
  percentage: any;
  percentageTab = [];
  nForms: number;

  setPercentage(number, tab) {
    console.info(number);
    this.percentageTab[tab] = (number * 100) / this.nForms;
    console.info(this.percentageTab);
    this.percentage = Math.round(UtilidadesService.getSumArray(this.percentageTab));
  }
  traerPrograma(event) {
    console.info(event);
    this.setPercentage(event.percentage, 2);
  }
  construirForm() {
    this.formPrograma.titulo = this.translate.instant('DATOS_BASICOS.TITULO4');
    this.formPrograma.btn = this.translate.instant('DATOS_BASICOS.SIGUIENTE');
    this.formPrograma.btnLimpiar = this.translate.instant('DATOS_BASICOS.SALIR');

    this.formPrograma.campos = [
      {
        etiqueta: 'select',
        nombre: 'Programa',
        label: '* ' + this.translate.instant('DATOS_BASICOS.PROGRAMA'),
        requerido: true,
        valor: { Id: 0 },
        opciones: [
          { Id: 0, valor: 'Seleccione el programa ...' },
        ],
      },
      /**
      <div class="seguir">
        <div class="col-xs-6 col-xs-offset-3">
          <label class="progreso">
            <progress max="100" value="0"></progress> 0%
          </label>
        </div>
      </div>
    **/
    ];
    let carreras: any;
    let listado_carreras: Array<any> = [];
    this.academicaService.get('/academicaProxy/carreras/POSGRADO')
      .subscribe(res => {
        if (res !== null) {
          carreras = res;
          listado_carreras = carreras.carrerasCollection.carrera;
          listado_carreras.forEach(element => {
            Object.defineProperty(element, 'valor',
            Object.getOwnPropertyDescriptor(element, 'nombre'));
            Object.defineProperty(element, 'Id',
            Object.getOwnPropertyDescriptor(element, 'codigo'));
          });

        }
        listado_carreras.unshift(this.formPrograma.campos[0].opciones[0]);
        this.formPrograma.campos[0].opciones = listado_carreras;
      });

  }
  constructor(private translate: TranslateService, private academicaService: AcademicaService) {
    this.nForms = 10;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
  }
}
