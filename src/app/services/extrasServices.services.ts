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
  private apiUrl = 'https://localhost:7247/api/ExtraIngredient'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Extras[]> {
    return this.http.get<Extras[]>(this.apiUrl);
  }
}