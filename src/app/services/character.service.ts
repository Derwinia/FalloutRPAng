import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PlayerModel, TeamModel } from '../models/player.model';
import { CharacterModel } from '../models/character.model';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private _http: HttpClient
  ) { }

  createTeam(newTeam : TeamModel){
    if(newTeam){
      this._http.post<void>(environment.base_url + '/Player/Create-Team', newTeam).subscribe();
    }
  }

  getTeams(): Observable<TeamModel[]> {
    return this._http.get<TeamModel[]>(environment.base_url + '/Player/List-Team');
  }

  deleteTeam(team : string): Observable<void>{
    return this._http.delete<void>(environment.base_url + '/player/Delete-Team/'+team);
  }

  createCharacter(newCharacter : PlayerModel){
    console.log(newCharacter)
    // if(newCharacter){
    //   this._http.post<void>(environment.base_url + '/Character/Create-Character', newCharacter).subscribe();
    // }
  }

  getTeam(): Observable<TeamModel[]> {
    return this._http.get<TeamModel[]>(environment.base_url + '/Character/List-Team');
  }

  getCharacters(): Observable<PlayerModel[]> {
    return this._http.get<PlayerModel[]>(environment.base_url + '/Character/List-Character');
  }

  // modifyRule(rule : RuleUpdateModel){
  //   this._http.patch(environment.base_url + '/Rule/Update-Rule', rule).subscribe();
  // }

  // modifyRuleOrder(rules : RuleOrderModel){
  //   this._http.patch(environment.base_url + '/Rule/Update-Rule-Order', rules).subscribe();
  // }

  // deleteRule(id : string): Observable<void>{
  //   return this._http.delete<void>(environment.base_url + '/Rule/Delete-Rule/'+id);
  // }
}
