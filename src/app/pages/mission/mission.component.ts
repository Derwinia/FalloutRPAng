import { Component } from '@angular/core';
import { MissionModel } from 'src/app/models/mission.model';
import { PlayerModel } from 'src/app/models/player.model';
import { LoginService } from 'src/app/services/login.service';

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

  player: PlayerModel = {token : "", pseudo : "", role : ""};

  constructor(
    private _loginService: LoginService,
    ) { }

    ngOnInit(): void {
      this._loginService.user$.subscribe({
        next: player => {
          this.player = player
        }
      });
    }




}
