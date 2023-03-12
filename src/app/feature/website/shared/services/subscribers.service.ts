import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from 'src/app/core/interceptors/token.interceptor';
import { environment } from 'src/environments/environment';
import { DataCountries } from '../models/countries.model';
import { DataSubscriber, Subscribers } from '../models/subscribers.model';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllSubscribers(parameter?: any) {
    return this.http.get<DataSubscriber>(`${this.apiUrl}/subscribers`, { context: checkToken(), params: parameter });
  }

  getSubscriber(id: number) {
    return this.http.get<Subscribers>(`${this.apiUrl}/subscribers/${id}`, { context: checkToken() });
  }

  createSubscriber(data: any) {
    return this.http.post(`${this.apiUrl}/subscribers`, data, { context: checkToken() });
  }

  updateSubscriber(id: number, data: any){
    return this.http.put(`${this.apiUrl}/subscribers/${id}`, data, { context: checkToken() });
  }

  deleteSubscriber(id: number) {
    return this.http.delete(`${this.apiUrl}/subscribers/${id}`, { context: checkToken() });
  }

  getCountries() {
    return this.http.get<DataCountries>(`${this.apiUrl}/countries`, { context: checkToken(), params: {count: 255, sortType: 0, sortOrder: "Name"} });
  }

}
