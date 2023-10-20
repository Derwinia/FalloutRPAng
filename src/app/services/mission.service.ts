import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MissionCreateModel, MissionGroupByTeamDTO, MissionModel } from '../models/mission.model';


@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(
    private _http: HttpClient
  ) { }

  createMission(newMission : MissionCreateModel){
    if(newMission){
      console.log(newMission)
      //this._http.post<void>(environment.base_url + '/Mission/Mission-Create', newMission).subscribe();
    }
  }

  getMissions(): Observable<MissionGroupByTeamDTO[]> {
    return this._http.get<MissionGroupByTeamDTO[]>(environment.base_url + '/Mission/Mission-List-All')
  }
}
