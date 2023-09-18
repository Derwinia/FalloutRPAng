import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenModel } from 'src/app/models/token.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private defaultUser = {
    token: null,
    id : null,
    name: null,
    role: null,
  }

  user$: BehaviorSubject<any|null> = new BehaviorSubject<any|null>(this.defaultUser);

  constructor(
    private _http: HttpClient
  ) { }

  login(form: any) : Observable<TokenModel> {
    return this._http.post<TokenModel>(environment.base_url + '/player/login', form)
      .pipe(
        // effectue une operation sur le resultat
        tap(response => {

          const decodedToken : any = jwtDecode(response.token);
          const id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
          const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          this.user$.next({
            id,
            name,
            role,
            token: response.token
          });
        })
    );
  }

  logout() {
    this.user$.next(this.defaultUser);
  }
}
