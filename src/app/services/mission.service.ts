import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MissionModel } from '../models/mission.model';


@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(
    private _http: HttpClient
  ) { }

  getRules(): Observable<MissionModel[]> {
    return this._http.get<MissionModel[]>(environment.base_url + '/Mission/List')
  }
}
