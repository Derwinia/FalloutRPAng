import { Component } from '@angular/core';
import { MissionModel } from 'src/app/models/mission.model';

@Component({
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent {

  Missions : MissionModel[]=[{
    id : 1,
    name : 'mission1',
    shortDescription : 'short1',
    fullDescription : 'long1'
  },
{
  id : 2,
    name : 'mission2',
    shortDescription : 'short2',
    fullDescription : 'long2'
}];



}
