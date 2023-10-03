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

  private defaultPlayer = {
    token: "null",
    pseudo: "superviseur",
    role: "admin",
  }

  user$: BehaviorSubject<any|null> = new BehaviorSubject<any|null>(this.defaultPlayer);

  constructor(
    private _http: HttpClient
  ) { }

  login(form: any) : Observable<TokenModel> {
    return this._http.post<TokenModel>(environment.base_url + '/player/login', form)
      .pipe(
        // effectue une operation sur le resultat
        tap(response => {

          const decodedToken : any = jwtDecode(response.token);
          const pseudo = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
          const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          this.user$.next({
            token: response.token,
            pseudo,
            role,
          });
        })
    );
  }

  logout() {
    this.user$.next(this.defaultPlayer);
  }
}
