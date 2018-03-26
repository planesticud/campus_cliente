import { PersonaService } from './../../../@core/data/persona.service';
import { AutenticationService } from './../../../@core/utils/autentication.service';
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
  persona: any = {};

  constructor(private personaService: PersonaService, private autenticacion: AutenticationService) {
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

    if (this.autenticacion.live()) {
      this.personaService.get('persona/?query=Usuario:' + this.autenticacion.getPayload().sub)
        .subscribe(datosPersona => {
          if (datosPersona !== null) {
            this.persona = datosPersona[0];
            this.consultarDiscapacidadesPersona(this.persona.Id);
          }
        });
    }
  }

  consultarDiscapacidadesPersona(persona): void {
    let discapacidades: Array<any> = [];
    const query =  'query=Persona.Id:' + persona;

    this.personaService.get('persona_tipo_discapacidad?'+query)
      .subscribe(res => {
        if (res !== null) {
            this.discapacidades= <Array<any>>res;
            this.discapacidades.forEach(element => {
              Object.defineProperty(element, 'valor',
              Object.getOwnPropertyDescriptor(element.TipoDiscapacidad, 'Nombre'));
            });
            this.formulario.campos[1].opciones = this.discapacidades;
        }
      });

  }

  ngOnInit() {

  }

  validarForm(event) {
    if (event.valid) {
      event.data.Persona={Id:this.persona.Id};
      event.data.TipoDiscapacidad={Id:event.data.TipoDiscapacidad.TipoDiscapacidad.Id};
      this.personaService.post('persona_tipo_discapacidad', event.data)
        .subscribe(res => {
          this.consultarDiscapacidadesPersona(this.persona.Id);
        });
    }
  }

}
