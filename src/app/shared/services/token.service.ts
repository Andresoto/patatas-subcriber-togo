import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import jwt_decode, {JwtPayload} from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  existToken$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path:'/' });
    this.existToken$.next(true);
  }

  getToken() {
    const token = getCookie('token');
    return token;
  }

  removeToken() {
    removeCookie('token');
    this.existToken$.next(false);
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

}
