import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DivisionType } from 'app/entities/enumerations/division-type.model';
import { IDivision, Division } from '../division.model';

import { DivisionService } from './division.service';

describe('Service Tests', () => {
  describe('Division Service', () => {
    let service: DivisionService;
    let httpMock: HttpTestingController;
    let elemDefault: IDivision;
    let expectedResult: IDivision | IDivision[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DivisionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = new Division('AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, DivisionType.SCHOOL, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Division', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Division()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Division', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            shortName: 'BBBBBB',
            numberOfPeople: 1,
            divisionType: 'BBBBBB',
            colorBackground: 'BBBBBB',
            colorText: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Division', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            shortName: 'BBBBBB',
            numberOfPeople: 1,
            divisionType: 'BBBBBB',
            colorBackground: 'BBBBBB',
            colorText: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Division', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
