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
  discapacidades:any;

  constructor(private personaService: PersonaService) {
    this.formulario = FORM_PERSONA_TIPO_DISCAPACIDAD;
    let tipos_discapacidad: Array<any> = [];
    this.personaService.get("tipo_discapacidad")
    .subscribe(res => {
        if (res !== null) {
          tipos_discapacidad = <Array<Object>>res;
          tipos_discapacidad.forEach(element => {
            Object.defineProperty(element, 'valor',
            Object.getOwnPropertyDescriptor(element, 'Nombre'));
          });
        }
        tipos_discapacidad.unshift(this.formulario.campos[0].opciones[0]);
        this.formulario.campos[0].opciones = tipos_discapacidad;
    });
  }

  consultarDiscapacidadesPersona(persona): void {
    let discapacidades: Array<any> = [];
    const query =  'query=Persona.Id:' + persona;

    this.personaService.get('persona_tipo_discapacidad?'+query)
      .subscribe(res => {
        if (res !== null) {
          console.info(res);
            this.discapacidades== <Array<Object>>res;
        }
      });

  }

  ngOnInit() {
    this.consultarDiscapacidadesPersona(1);
  }

  validarForm(event) {
    if (event.valid) {
      event.data.Persona={Id:1};
      event.data.TipoDiscapacidad={Id:event.data.TipoDiscapacidad.TipoDiscapacidad.Id};
      console.info(event.data);
      this.personaService.post('persona_tipo_discapacidad', event.data)
        .subscribe(res => {
          console.info(res);
          //this.usuario = res;
        });
    }
  }

}
