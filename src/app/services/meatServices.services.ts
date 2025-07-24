import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meat {
  id: string;
  name: string;
  extraPrice: number;
}

@Injectable({ providedIn: 'root' })
export class MeatService {
  private apiUrl = 'https://sklep-api.wonderfulsand-657cf16a.polandcentral.azurecontainerapps.io/api/MeatType'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Meat[]> {
    return this.http.get<Meat[]>(this.apiUrl);
  }
}