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

  getCharacters(): Observable<CharacterModel[]> {
    return this._http.get<CharacterModel[]>(environment.base_url + '/Character/Character-List');
  }

  CharacterListForATeam(teamName : string): Observable<CharacterName[]>{
    return this._http.get<CharacterName[]>(environment.base_url + '/Character/Character-List-For-A-Team/'+teamName)
  }

}
