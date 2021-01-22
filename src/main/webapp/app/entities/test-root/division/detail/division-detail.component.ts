import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDivision } from '../division.model';

@Component({
  selector: 'jhi-division-detail',
  templateUrl: './division-detail.component.html',
})
export class DivisionDetailComponent implements OnInit {
  division: IDivision | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ division }) => {
      this.division = division;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
