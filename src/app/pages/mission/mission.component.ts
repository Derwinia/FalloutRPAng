import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MissionGroupByTeamDTO} from 'src/app/models/mission.model';
import { PlayerModel } from 'src/app/models/player.model';
import { MissionService } from 'src/app/services/mission.service';
import { PlayerService } from 'src/app/services/player.service';
import { CreateMissionDialogComponent } from 'src/app/tool/create-mission-dialog/create-mission-dialog.component';
import { DetailMissionDialogComponent } from 'src/app/tool/detail-mission-dialog/detail-mission-dialog.component';

@Component({
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent {

  teams! : MissionGroupByTeamDTO[];

  player: PlayerModel = {token : "", pseudo : "", team : ""};

  constructor(
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

    if(this.player.team == "admin"){
      this.getAllMission()
    }
  }

  createMission(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateMissionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(

        data => this._missionService.createMission(data)
    );
  }

  detailMission(id : number){
    this._missionService.getMissionDetail(id)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = id;

    const dialogRef = this.dialog.open(DetailMissionDialogComponent, dialogConfig);
  }

  getAllMission(){
    this._missionService.getAllMissionsForAllTeam().subscribe(x => this.teams = x)
  }
}
