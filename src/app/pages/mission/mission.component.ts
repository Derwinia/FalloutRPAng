import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CharacterName } from 'src/app/models/character.model';
import { MissionModel, MissionForPlayerModel, MissionGroupByTeamModel} from 'src/app/models/mission.model';
import { PlayerModel } from 'src/app/models/player.model';
import { CharacterService } from 'src/app/services/character.service';
import { MissionService } from 'src/app/services/mission.service';
import { PlayerService } from 'src/app/services/player.service';
import { CreateMissionDialogComponent } from 'src/app/tool/create-mission-dialog/create-mission-dialog.component';
import { ModifyMissionDialogComponent } from 'src/app/tool/modify-mission-dialog/modify-mission-dialog.component';

@Component({
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent {

  missions! : MissionForPlayerModel[];
  teams! : MissionGroupByTeamModel[];
  characters! : CharacterName[];

  player: PlayerModel = {token : "", pseudo : "", team : ""};

  constructor(
    private _characterService : CharacterService,
    private _playerService: PlayerService,
    private _missionService : MissionService,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });

    if(this.player.token){
      if(this.player.team == "admin"){
        this.getAllMission()
      }
      else{
        this.getMissionForOnePlayer(this.player.pseudo)
      }
    }

  }

  createMission(team : string){

    this._characterService.characterListForATeam(team).subscribe(x => {
      this.characters = x

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.characters;

      const dialogRef = this.dialog.open(CreateMissionDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        this._missionService.createMission(data)
      });
    });
  }

  getAllMission(){
    this._missionService.getAllMissionsForAllTeam().subscribe(x => this.teams = x)
  }

  getMissionForOnePlayer(pseudo : string){
    this._missionService.getMissionForOnePlayer(pseudo).subscribe(x => this.missions = x)
  }

  modifyMission(mission : MissionModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = mission;

    const dialogRef = this.dialog.open(ModifyMissionDialogComponent, dialogConfig);
  }
}
