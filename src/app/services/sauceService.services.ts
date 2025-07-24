import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sauce {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SauceService {
  private apiUrl = 'https://sklep-api.wonderfulsand-657cf16a.polandcentral.azurecontainerapps.io/api/Souce'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sauce[]> {
    return this.http.get<Sauce[]>(this.apiUrl);
  }
}
