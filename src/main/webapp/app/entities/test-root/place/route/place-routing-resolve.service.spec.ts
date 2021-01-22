jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPlace, Place } from '../place.model';
import { PlaceService } from '../service/place.service';

import { PlaceRoutingResolveService } from './place-routing-resolve.service';

describe('Service Tests', () => {
  describe('Place routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PlaceRoutingResolveService;
    let service: PlaceService;
    let resultPlace: IPlace | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PlaceRoutingResolveService);
      service = TestBed.inject(PlaceService);
      resultPlace = undefined;
    });

    describe('resolve', () => {
      it('should return existing IPlace for existing id', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: new Place(id) })));
        mockActivatedRouteSnapshot.params = { id: '123' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPlace = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('123');
        expect(resultPlace).toEqual(new Place('123'));
      });

      it('should return new IPlace if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPlace = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPlace).toEqual(new Place());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: '123' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPlace = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('123');
        expect(resultPlace).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
