import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CreatePlayerModel, PlayerModel, TeamModel } from '../models/player.model';
import { TokenModel } from '../models/token.model';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private defaultPlayer = {
    token: "test",
    pseudo: "test",
    team: "team1",
  }
  private nullPlayer = {
    token: "",
    pseudo: "",
    team: "",
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
          const team = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          this.user$.next({
            token: response.token,
            pseudo,
            team,
          });
        })
    );
  }

  logout() {
    console.log(this.user$)
    this.user$.next(this.nullPlayer);
    console.log(this.user$)
  }

  createTeam(newTeam : TeamModel){
    if(newTeam){
      this._http.post<void>(environment.base_url + '/Player/Team-Create', newTeam).subscribe();
    }
  }

  getTeams(): Observable<TeamModel[]> {
    return this._http.get<TeamModel[]>(environment.base_url + '/Player/Team-List');
  }

  deleteTeam(team : string): Observable<void>{
    return this._http.delete<void>(environment.base_url + '/Player/Team-Delete/'+team);
  }

  createPlayer(newPlayer : CreatePlayerModel){
    if(newPlayer){
      this._http.post<void>(environment.base_url + '/Player/Player-Create', newPlayer).subscribe();
    }
  }

  getPlayers(): Observable<PlayerModel[]> {
    return this._http.get<PlayerModel[]>(environment.base_url + '/Player/Player-List');
  }

}
