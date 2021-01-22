import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DivisionComponent } from './list/division.component';
import { DivisionDetailComponent } from './detail/division-detail.component';
import { DivisionUpdateComponent } from './update/division-update.component';
import { DivisionDeleteDialogComponent } from './delete/division-delete-dialog.component';
import { DivisionRoutingModule } from './route/division-routing.module';

@NgModule({
  imports: [SharedModule, DivisionRoutingModule],
  declarations: [DivisionComponent, DivisionDetailComponent, DivisionUpdateComponent, DivisionDeleteDialogComponent],
  entryComponents: [DivisionDeleteDialogComponent],
})
export class DivisionModule {}
