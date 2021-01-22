import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDivision, Division } from '../division.model';
import { DivisionService } from '../service/division.service';

@Component({
  selector: 'jhi-division-update',
  templateUrl: './division-update.component.html',
})
export class DivisionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    shortName: [null, []],
    numberOfPeople: [],
    divisionType: [null, [Validators.required]],
    colorBackground: [],
    colorText: [],
  });

  constructor(protected divisionService: DivisionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ division }) => {
      this.updateForm(division);
    });
  }

  updateForm(division: IDivision): void {
    this.editForm.patchValue({
      id: division.id,
      name: division.name,
      shortName: division.shortName,
      numberOfPeople: division.numberOfPeople,
      divisionType: division.divisionType,
      colorBackground: division.colorBackground,
      colorText: division.colorText,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const division = this.createFromForm();
    if (division.id !== undefined) {
      this.subscribeToSaveResponse(this.divisionService.update(division));
    } else {
      this.subscribeToSaveResponse(this.divisionService.create(division));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDivision>>): void {
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

  protected createFromForm(): IDivision {
    return {
      ...new Division(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      shortName: this.editForm.get(['shortName'])!.value,
      numberOfPeople: this.editForm.get(['numberOfPeople'])!.value,
      divisionType: this.editForm.get(['divisionType'])!.value,
      colorBackground: this.editForm.get(['colorBackground'])!.value,
      colorText: this.editForm.get(['colorText'])!.value,
    };
  }
}
