import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Division } from '../division.model';

import { DivisionDetailComponent } from './division-detail.component';

describe('Component Tests', () => {
  describe('Division Management Detail Component', () => {
    let comp: DivisionDetailComponent;
    let fixture: ComponentFixture<DivisionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DivisionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ division: new Division('123') }) },
          },
        ],
      })
        .overrideTemplate(DivisionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DivisionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load division on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.division).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
