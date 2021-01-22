import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PlaceComponent } from './list/place.component';
import { PlaceDetailComponent } from './detail/place-detail.component';
import { PlaceUpdateComponent } from './update/place-update.component';
import { PlaceDeleteDialogComponent } from './delete/place-delete-dialog.component';
import { PlaceRoutingModule } from './route/place-routing.module';

@NgModule({
  imports: [SharedModule, PlaceRoutingModule],
  declarations: [PlaceComponent, PlaceDetailComponent, PlaceUpdateComponent, PlaceDeleteDialogComponent],
  entryComponents: [PlaceDeleteDialogComponent],
})
export class PlaceModule {}
