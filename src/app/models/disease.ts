import { Image } from './image';

export interface Disease {
  id?: number;
  nom?: string;
  nomScientifique?: string;
  contenu?: string;
  langue?: string;
  images?: Image[];
}
