import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlaceService } from '../service/place.service';
import { Place } from '../place.model';

import { PlaceComponent } from './place.component';

describe('Component Tests', () => {
  describe('Place Management Component', () => {
    let comp: PlaceComponent;
    let fixture: ComponentFixture<PlaceComponent>;
    let service: PlaceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PlaceComponent],
      })
        .overrideTemplate(PlaceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PlaceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Place('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.places?.[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
