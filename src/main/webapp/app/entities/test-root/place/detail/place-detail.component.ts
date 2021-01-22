import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlace } from '../place.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-place-detail',
  templateUrl: './place-detail.component.html',
})
export class PlaceDetailComponent implements OnInit {
  place: IPlace | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ place }) => {
      this.place = place;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
