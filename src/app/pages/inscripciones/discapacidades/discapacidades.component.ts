import { PersonaService } from './../../../@core/data/persona.service';
import { FORM_PERSONA_TIPO_DISCAPACIDAD } from './form-persona-tipo-discapacidad';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'discapacidades',
  templateUrl: './discapacidades.component.html',
  styleUrls: ['./discapacidades.component.scss']
})
export class DiscapacidadesComponent implements OnInit {

  formulario:any;
  discapacidad:any;
  constructor(private personaService: PersonaService) {
    this.formulario = FORM_PERSONA_TIPO_DISCAPACIDAD;
    this.personaService.get("tipo_discapacidad")
    .subscribe(res => {
      let campo= {
        claseGrid: 'col-12',
        etiqueta: 'select',
        nombre: 'TipoDiscapacidad',
        label: 'tipo discapacidad:',
        requerido: true,
        relacion: true,
        valor: { Id: 0 },
        opciones: <Array<Object>>res,
      };
      campo.opciones.forEach(element => {
        Object.defineProperty(element, "valor",
        Object.getOwnPropertyDescriptor(element, "Nombre"));
      });
      this.formulario.campos.push(campo);
      console.info(res);

    });
  }

  ngOnInit() {

  }

  validarForm(event) {
    if (event.valid) {
      console.info(event);
    }
  }

}
