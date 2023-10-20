import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CharacterModel } from '../models/character.model';


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

}
