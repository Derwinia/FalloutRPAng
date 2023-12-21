import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CharacterModel, CharacterName, PerkModel } from '../models/character.model';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private _http: HttpClient
  ) { }

  // getCharacterById(id : number): Observable<CharacterModel> {
  //   return this._http.get<CharacterModel>(environment.base_url + '/Character/Character'+id);
  // }

  characterGetByPseudo(pseudo : string): Observable<CharacterModel> {
    return this._http.get<CharacterModel>(environment.base_url + '/Character/Character-Get-By-Pseudo/'+pseudo);
  }

  characterListForATeam(teamName : string): Observable<CharacterName[]>{
    return this._http.get<CharacterName[]>(environment.base_url + '/Character/Character-List-For-A-Team/'+teamName);
  }

  characterUpdate(character : CharacterModel){
    if(character){
      this._http.patch(environment.base_url + '/Character/Character-Update', character).subscribe();
    }
  }

  perkCreate(concernedCharacter : number): Observable<{ perkId: number, message: string }> {
    return this._http.post<{ perkId: number, message: string }>(environment.base_url + '/Character/Character-Perk-Create/'+concernedCharacter, null);
  }

  perkDelete(perk : number){
    return this._http.delete(environment.base_url + '/Character/Character-Perk-Delete/'+perk);
  }
}
