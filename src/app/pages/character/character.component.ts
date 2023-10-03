import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerModel, TeamModel } from 'src/app/models/player.model';
import { LoginService } from 'src/app/services/login.service';
import { CharacterService } from 'src/app/services/character.service';
import { CreateTeamDialogComponent } from 'src/app/tool/create-team-dialog/create-team-dialog.component';
import { CreateCharacterDialogComponent } from 'src/app/tool/create-character-dialog/create-character-dialog.component';

@Component({
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  player: PlayerModel = {token : "", pseudo : "", role : ""};
  teams! : TeamModel[];

  constructor(
    private _loginService: LoginService,
    private _characterService : CharacterService,
    private dialog : MatDialog,
    ) { }

  ngOnInit(): void {
    this._characterService.getTeams().subscribe(x => this.teams = x)

    this._loginService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });
  }

  createTeam(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateTeamDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._characterService.createTeam(data)
    );
  }

  createCharacter(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.teams;
    console.log(dialogConfig.data)
    const dialogRef = this.dialog.open(CreateCharacterDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._characterService.createCharacter(data)
    );
  }
}
