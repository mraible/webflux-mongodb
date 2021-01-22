jest.mock('@angular/router');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaceService } from '../service/place.service';
import { Place } from '../place.model';
import { Division } from 'app/entities/test-root/division/division.model';

import { PlaceUpdateComponent } from './place-update.component';

describe('Component Tests', () => {
  describe('Place Management Update Component', () => {
    let comp: PlaceUpdateComponent;
    let fixture: ComponentFixture<PlaceUpdateComponent>;
    let service: PlaceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PlaceUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PlaceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PlaceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Place('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Place();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDivisionById', () => {
        it('Should return tracked Division primary key', () => {
          const entity = new Division('123');
          const trackResult = comp.trackDivisionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedDivision', () => {
        it('Should return option if no Division is selected', () => {
          const option = new Division('123');
          const result = comp.getSelectedDivision(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Division for according option', () => {
          const option = new Division('123');
          const selected = new Division('123');
          const selected2 = new Division('456');
          const result = comp.getSelectedDivision(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Division is not selected', () => {
          const option = new Division('123');
          const selected = new Division('456');
          const result = comp.getSelectedDivision(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});
