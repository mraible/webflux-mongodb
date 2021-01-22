import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDivision } from '../division.model';
import { DivisionService } from '../service/division.service';
import { DivisionDeleteDialogComponent } from '../delete/division-delete-dialog.component';

@Component({
  selector: 'jhi-division',
  templateUrl: './division.component.html',
})
export class DivisionComponent implements OnInit {
  divisions?: IDivision[];
  isLoading = false;

  constructor(protected divisionService: DivisionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.divisionService.query().subscribe(
      (res: HttpResponse<IDivision[]>) => {
        this.isLoading = false;
        this.divisions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDivision): string {
    return item.id!;
  }

  delete(division: IDivision): void {
    const modalRef = this.modalService.open(DivisionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.division = division;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
