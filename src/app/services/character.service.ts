import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CharacterModel, CharacterName } from '../models/character.model';


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

  CharacterGetByPseudo(pseudo : string): Observable<CharacterModel> {
    return this._http.get<CharacterModel>(environment.base_url + '/Character/Character-Get-By-Pseudo/'+pseudo);
  }

  CharacterListForATeam(teamName : string): Observable<CharacterName[]>{
    return this._http.get<CharacterName[]>(environment.base_url + '/Character/Character-List-For-A-Team/'+teamName)
  }

  CharacterUpdate(character : CharacterModel){
    if(character){
      this._http.patch(environment.base_url + '/Character/Character-Update', character).subscribe();
    }
  }
}
