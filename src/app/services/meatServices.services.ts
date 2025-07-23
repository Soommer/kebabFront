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
  private apiUrl = 'https://localhost:7247/api/MeatType'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Meat[]> {
    return this.http.get<Meat[]>(this.apiUrl);
  }
}