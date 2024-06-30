import {Injectable} from '@angular/core';
import {BaseHttpService} from "../base/base-http.service";
import {Observable} from "rxjs";
import {StorageService} from "../../storage.service";
import {User} from "../../../models/http/user.model";

type AuthToken = {
  access_token: string,
  expires_in: number,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService<User> {

  protected override suffix: string = 'auth';

  get isAuthenticated(): boolean {
    return AuthService.authToken !== null;
  }

  static get authToken(): AuthToken | undefined {
    return StorageService.getItemFromLocalStorage('authToken') || StorageService.getItemFromSessionStorage('authToken');
  }

  static seAuthToken(token: AuthToken, rememberMe: boolean = false) {
    if (rememberMe) {
      StorageService.setItemInLocalStorage('authToken', token);
    } else {
      StorageService.setItemInSessionStorage('authToken', token);
    }
  }

  get authenticatedUser(): User | undefined {
    return StorageService.getItemFromLocalStorage('authenticatedUser');
  }

  seTAuthenticatedUser(user: User, rememberMe: boolean = false) {
    if (rememberMe) {
      StorageService.setItemInLocalStorage('authenticatedUser', user);
    } else {
      StorageService.setItemInSessionStorage('authenticatedUser', user);
    }
  }

  populateAuthenticatedUser() {
    window.loggedUser = this.authenticatedUser;
  }

  public requestTokenFromRestoApi(credentials: { username: string, password: string }): Observable<AuthToken> {
    const c = {...credentials};
    return this.http.post<AuthToken>(`${this.endpointUrl}/login`, c, this.httpOptions).pipe();
  }

  public fetchAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(`${this.endpointUrl}/auth-user`, this.httpOptions).pipe();
  }

  public logout(): any {
    return this.http.post(`${this.endpointUrl}/logout`, {}, this.httpOptions).pipe();
  }

  public register(data: any): any {
    return this.http.post(`${this.endpointUrl}/register`, data, this.httpOptions).pipe();
  }

  public changePassword(data: any): any {
    return this.http.post(`${this.endpointUrl}/change-password`, data, this.httpOptions).pipe();
  }

  public forgotPassword(data: any): any {
    return this.http.post(`${this.endpointUrl}/forgot-password`, data, this.httpOptions).pipe();
  }

  public verifyForgotPassword(data: any): any {
    return this.http.post(`${this.endpointUrl}/verify-forgot-password`, data, this.httpOptions).pipe();
  }

  public verifyEmail(data: any): any {
    return this.http.post(`${this.endpointUrl}/verify-email`, data, this.httpOptions).pipe();
  }

  public resendVerificationEmail(data: any): any {
    return this.http.post(`${this.endpointUrl}/resend-verification-email`, data, this.httpOptions).pipe();
  }
}

@Injectable({
  providedIn: 'root',
  useValue: loggedUser
})
export class LoggedUser implements User {
}
