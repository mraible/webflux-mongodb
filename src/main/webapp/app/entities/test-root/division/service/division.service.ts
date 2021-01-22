import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/core/request/request-util';
import { IDivision } from '../division.model';

export type EntityResponseType = HttpResponse<IDivision>;
export type EntityArrayResponseType = HttpResponse<IDivision[]>;

@Injectable({ providedIn: 'root' })
export class DivisionService {
  public resourceUrl = SERVER_API_URL + 'api/divisions';

  constructor(protected http: HttpClient) {}

  create(division: IDivision): Observable<EntityResponseType> {
    return this.http.post<IDivision>(this.resourceUrl, division, { observe: 'response' });
  }

  update(division: IDivision): Observable<EntityResponseType> {
    return this.http.put<IDivision>(this.resourceUrl, division, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDivision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDivision[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
