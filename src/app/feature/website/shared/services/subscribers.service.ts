import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from 'src/app/core/interceptors/token.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getSubcribers() {
    return this.http.get(`${this.apiUrl}/subscribers`, { context: checkToken() });
  }

  getCountries() {
    return this.http.get(`${this.apiUrl}/countries`, { context: checkToken() })
  }

}
