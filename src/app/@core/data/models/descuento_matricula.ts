import { TipoDescuentoMatricula } from './tipo_descuento_matricula';

export class DescuentoMatricula {
  Id: number;
  Metadatos: string;
  Enlace: number;
  Descuento: number;
  Ente: number;
  DocumentoSoporte: String;
  Tipodescuentomatricula: TipoDescuentoMatricula;
  Autorizado: boolean;
}
