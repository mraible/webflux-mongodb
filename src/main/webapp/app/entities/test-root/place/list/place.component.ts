import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlace } from '../place.model';
import { PlaceService } from '../service/place.service';
import { PlaceDeleteDialogComponent } from '../delete/place-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-place',
  templateUrl: './place.component.html',
})
export class PlaceComponent implements OnInit {
  places?: IPlace[];
  isLoading = false;

  constructor(protected placeService: PlaceService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.placeService.query().subscribe(
      (res: HttpResponse<IPlace[]>) => {
        this.isLoading = false;
        this.places = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPlace): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(place: IPlace): void {
    const modalRef = this.modalService.open(PlaceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.place = place;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
