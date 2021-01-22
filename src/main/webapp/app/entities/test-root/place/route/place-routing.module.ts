import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlaceComponent } from '../list/place.component';
import { PlaceDetailComponent } from '../detail/place-detail.component';
import { PlaceUpdateComponent } from '../update/place-update.component';
import { PlaceRoutingResolveService } from './place-routing-resolve.service';

const placeRoute: Routes = [
  {
    path: '',
    component: PlaceComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlaceDetailComponent,
    resolve: {
      place: PlaceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlaceUpdateComponent,
    resolve: {
      place: PlaceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlaceUpdateComponent,
    resolve: {
      place: PlaceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(placeRoute)],
  exports: [RouterModule],
})
export class PlaceRoutingModule {}
