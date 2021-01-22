jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDivision, Division } from '../division.model';
import { DivisionService } from '../service/division.service';

import { DivisionRoutingResolveService } from './division-routing-resolve.service';

describe('Service Tests', () => {
  describe('Division routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DivisionRoutingResolveService;
    let service: DivisionService;
    let resultDivision: IDivision | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DivisionRoutingResolveService);
      service = TestBed.inject(DivisionService);
      resultDivision = undefined;
    });

    describe('resolve', () => {
      it('should return existing IDivision for existing id', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: new Division(id) })));
        mockActivatedRouteSnapshot.params = { id: '123' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDivision = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('123');
        expect(resultDivision).toEqual(new Division('123'));
      });

      it('should return new IDivision if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDivision = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDivision).toEqual(new Division());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: '123' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDivision = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('123');
        expect(resultDivision).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
