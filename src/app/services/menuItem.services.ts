import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {menuItem} from "../models/menuItem"

@Injectable({
    providedIn: 'root'
})
export class MenuItemService {
    private apiUrl = 'https://sklep-api.wonderfulsand-657cf16a.polandcentral.azurecontainerapps.io/api/MenuItem';
    
    constructor(private http: HttpClient){}

    getMenuItems(): Observable<menuItem[]> {
        return this.http.get<menuItem[]>(this.apiUrl);
    }
}