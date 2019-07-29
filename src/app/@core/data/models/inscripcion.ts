import { EstadoInscripcion } from './estado_inscripcion';
import { TipoInscripcion } from './tipo_inscripcion';

export class Inscripcion {
  Id: number;
  PersonaId: number;
  ProgramaAcademicoId: number;
  ReciboMatriculaId: number;
  ReciboInscripcionId: number;
  PeriodoId: number;
  AceptaTerminos: boolean;
  TipoInscripcionId: TipoInscripcion;
  EstadoInscripcionId: EstadoInscripcion;
  FechaAceptaTerminos: Date;
  EnfasisId: number;
}
