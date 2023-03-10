import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(userName: string, password: string){
    return this.http.post(`${this.apiUrl}/account/login`, {userName, password})
    .pipe(
      tap((reps: any) => {
        this.tokenService.saveToken(reps.Token);
      })
    );
  }
}
