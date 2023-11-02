import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MissionCreateModel, MissionForPlayerModel, MissionGroupByTeamModel, MissionModel} from '../models/mission.model';


@Injectable({
  providedIn: 'root'
})
export class MissionService {

  newMissionFormat! : MissionCreateModel;
  listConcernedPlayer! : number[]

  constructor(
    private _http: HttpClient
  ) { }

  createMission(newMission : MissionCreateModel){
    if(newMission){
      this._http.post<void>(environment.base_url + '/Mission/Mission-Create', newMission).subscribe();
    }
  }

  getAllMissionsForAllTeam(): Observable<MissionGroupByTeamModel[]> {
    return this._http.get<MissionGroupByTeamModel[]>(environment.base_url + '/Mission/Mission-List-All')
  }

  getMissionForOnePlayer(pseudo : string): Observable<MissionForPlayerModel[]> {
    return this._http.get<MissionForPlayerModel[]>(environment.base_url + '/Mission/Mission-List-All')
  }

  getMissionDetail(id : number):Observable<MissionModel>{
    return this._http.get<MissionModel>(environment.base_url + '/Mission/Mission-Detail')
  }
}
