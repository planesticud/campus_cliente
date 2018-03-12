import { UbicacionService } from './../../../@core/data/ubicacion.service';
import { FORM_PERSONA } from './form-persona';
import { AutenticationService } from './../../../@core/utils/autentication.service';
import { PersonaService } from './../../../@core/data/persona.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-info-basica-persona',
  templateUrl: './info-basica.component.html',
  styleUrls: ['./info-basica.component.scss'],
})
export class InfoBasicaComponent implements OnInit {

  public formulario: any;
  public usuario: any;
  ejemplo:Array<Object>=[];
  constructor(private personaService: PersonaService, private autenticacion: AutenticationService, private ubicacionService: UbicacionService) {
    this.formulario = FORM_PERSONA;
    this.ubicacionService.get('lugar/?query=TipoLugar.Id:1')
    .then(res => {
      console.info("asadadW",res);
      this.ejemplo=<Array<Object>>res;
      this.ejemplo.forEach(element => {
        Object.defineProperty(element, "valor",
        Object.getOwnPropertyDescriptor(element, "Nombre"));
      });
      this.ejemplo.push({ Id: 0, valor: 'Seleccione su ciudad de nacimiento ...' });

      let algo={
        claseGrid: 'col-4',
        etiqueta: 'select',
        nombre: 'PaisNacimiento',
        label: 'Pais de nacimiento*:',
        requerido: true,
        relacion: false,
        valor: { Id: 0 },
        opciones: this.ejemplo,
    };
      this.formulario.campos.push(algo);

    });



  }

  renameKeys(obj, newKeys):Object {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  cargarInfoPersona(): void {
    this.personaService.get('persona/?query=Usuario:' + this.autenticacion.getPayload().sub)
        .subscribe(res => {
          if (res !== null) {
            this.usuario = res[0];
            this.usuario.CiudadNacimiento = { Id : this.usuario.CiudadNacimiento };
          }
      });
  }

  actualizarInfoPersona(persona: any): void {
    persona.Id = this.usuario.Id;
    persona.usuario = this.usuario.Usuario;
    this.personaService.put('persona', persona)
    .subscribe(res => {
      this.cargarInfoPersona();
    });
  }

  registrarPersona(persona: any): void {
    persona.Usuario = this.autenticacion.getPayload().sub;
    this.personaService.post('persona', persona)
        .subscribe(res => {
        this.usuario = res;
        // this.cargarInfoPersona();
        });
  }

  ngOnInit() {
    this.cargarInfoPersona();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.usuario === undefined) {
        this.registrarPersona(event.data.Persona);
      }else {
        this.actualizarInfoPersona(event.data.Persona);
      }
    }
  }

}


