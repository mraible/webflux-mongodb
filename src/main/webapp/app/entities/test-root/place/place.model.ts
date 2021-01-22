import { IDivision } from 'app/entities/test-root/division/division.model';

export interface IPlace {
  id?: string;
  name?: string;
  numberOfSeats?: number | null;
  shortName?: string | null;
  colorBackground?: string | null;
  colorText?: string | null;
  description?: string | null;
  preferredDivisions?: IDivision[] | null;
  owner?: IDivision | null;
}

export class Place implements IPlace {
  constructor(
    public id?: string,
    public name?: string,
    public numberOfSeats?: number | null,
    public shortName?: string | null,
    public colorBackground?: string | null,
    public colorText?: string | null,
    public description?: string | null,
    public preferredDivisions?: IDivision[] | null,
    public owner?: IDivision | null
  ) {}
}
