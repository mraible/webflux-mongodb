import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DivisionService } from '../service/division.service';
import { Division } from '../division.model';

import { DivisionComponent } from './division.component';

describe('Component Tests', () => {
  describe('Division Management Component', () => {
    let comp: DivisionComponent;
    let fixture: ComponentFixture<DivisionComponent>;
    let service: DivisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DivisionComponent],
      })
        .overrideTemplate(DivisionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DivisionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DivisionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Division('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.divisions?.[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
