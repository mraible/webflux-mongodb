import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlace, Place } from '../place.model';
import { PlaceService } from '../service/place.service';

@Injectable({ providedIn: 'root' })
export class PlaceRoutingResolveService implements Resolve<IPlace> {
  constructor(protected service: PlaceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlace> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((place: HttpResponse<Place>) => {
          if (place.body) {
            return of(place.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Place());
  }
}
