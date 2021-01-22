import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPlace, Place } from '../place.model';
import { PlaceService } from '../service/place.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDivision } from 'app/entities/test-root/division/division.model';
import { DivisionService } from 'app/entities/test-root/division/service/division.service';

@Component({
  selector: 'jhi-place-update',
  templateUrl: './place-update.component.html',
})
export class PlaceUpdateComponent implements OnInit {
  isSaving = false;

  divisionsSharedCollection: IDivision[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    numberOfSeats: [],
    shortName: [],
    colorBackground: [],
    colorText: [],
    description: [],
    preferredDivisions: [],
    owner: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected placeService: PlaceService,
    protected divisionService: DivisionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ place }) => {
      this.updateForm(place);

      this.loadRelationshipsOptions();
    });
  }

  updateForm(place: IPlace): void {
    this.editForm.patchValue({
      id: place.id,
      name: place.name,
      numberOfSeats: place.numberOfSeats,
      shortName: place.shortName,
      colorBackground: place.colorBackground,
      colorText: place.colorText,
      description: place.description,
      preferredDivisions: place.preferredDivisions,
      owner: place.owner,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('sampleWebfluxMongodbApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const place = this.createFromForm();
    if (place.id !== undefined) {
      this.subscribeToSaveResponse(this.placeService.update(place));
    } else {
      this.subscribeToSaveResponse(this.placeService.create(place));
    }
  }

  trackDivisionById(index: number, item: IDivision): string {
    return item.id!;
  }

  getSelectedDivision(option: IDivision, selectedVals?: IDivision[]): IDivision {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlace>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  protected loadRelationshipsOptions(): void {
    this.divisionService.query().subscribe((res: HttpResponse<IDivision[]>) => (this.divisionsSharedCollection = res.body ?? []));
  }

  protected createFromForm(): IPlace {
    return {
      ...new Place(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      numberOfSeats: this.editForm.get(['numberOfSeats'])!.value,
      shortName: this.editForm.get(['shortName'])!.value,
      colorBackground: this.editForm.get(['colorBackground'])!.value,
      colorText: this.editForm.get(['colorText'])!.value,
      description: this.editForm.get(['description'])!.value,
      preferredDivisions: this.editForm.get(['preferredDivisions'])!.value,
      owner: this.editForm.get(['owner'])!.value,
    };
  }
}
