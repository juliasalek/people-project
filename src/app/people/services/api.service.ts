import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { PersonResponse, Planet } from '../../shared/interfaces';

@Injectable()
export class ApiService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  public getPeopleByUrl(url?: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(url ?? `${this.baseUrl}/people`);
  }

  public getPlanetByPersonId(url: string): Observable<Planet> {
    return this.http.get<Planet>(url);
  }

  public getPeopleByName(text: string): Observable<PersonResponse> {
    const url = `${this.baseUrl}/people`;
    const queryParams = new HttpParams().append('search', text);

    return this.http.get<PersonResponse>(url, { params: queryParams });
  }
}
