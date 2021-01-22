import { IPlace } from 'app/entities/test-root/place/place.model';
import { DivisionType } from 'app/entities/enumerations/division-type.model';

export interface IDivision {
  id?: string;
  name?: string;
  shortName?: string | null;
  numberOfPeople?: number | null;
  divisionType?: DivisionType;
  colorBackground?: string | null;
  colorText?: string | null;
  divisionsPlaces?: IPlace[] | null;
  preferredPlaces?: IPlace[] | null;
}

export class Division implements IDivision {
  constructor(
    public id?: string,
    public name?: string,
    public shortName?: string | null,
    public numberOfPeople?: number | null,
    public divisionType?: DivisionType,
    public colorBackground?: string | null,
    public colorText?: string | null,
    public divisionsPlaces?: IPlace[] | null,
    public preferredPlaces?: IPlace[] | null
  ) {}
}
