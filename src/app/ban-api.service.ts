import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanApiService {
  constructor(private http: HttpClient) {}
  adressRequest: string = 'https://api-adresse.data.gouv.fr/search/?q=';
  data: any;

  getAdress(adress: string): Observable<any> {
    return this.http.get<any>(`${this.adressRequest}${adress}&limit=4`);
  }
}
