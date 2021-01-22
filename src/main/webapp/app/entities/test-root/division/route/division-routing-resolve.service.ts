import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDivision, Division } from '../division.model';
import { DivisionService } from '../service/division.service';

@Injectable({ providedIn: 'root' })
export class DivisionRoutingResolveService implements Resolve<IDivision> {
  constructor(protected service: DivisionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDivision> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((division: HttpResponse<Division>) => {
          if (division.body) {
            return of(division.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Division());
  }
}
