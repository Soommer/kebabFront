import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Extras {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ExtrasService {
  private apiUrl = 'https://sklep-api.wonderfulsand-657cf16a.polandcentral.azurecontainerapps.io/api/ExtraIngredient';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Extras[]> {
    return this.http.get<Extras[]>(this.apiUrl);
  }
}