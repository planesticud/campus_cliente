import { EstadoEntrevista } from './estado_entrevista';
import { TipoEntrevista } from './tipo_entrevista';

export class Entrevista {
  Id: number;
  Admision: number;
  FechaEntrevista: string;
  Nota: number;
  EstadoEntrevista: EstadoEntrevista;
  TipoEntrevista: TipoEntrevista;
}
