import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDivision } from '../division.model';
import { DivisionService } from '../service/division.service';

@Component({
  templateUrl: './division-delete-dialog.component.html',
})
export class DivisionDeleteDialogComponent {
  division?: IDivision;

  constructor(protected divisionService: DivisionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.divisionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
