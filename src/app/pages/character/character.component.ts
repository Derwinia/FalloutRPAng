import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerModel, TeamModel } from 'src/app/models/player.model';
import { LoginService } from 'src/app/services/login.service';
import { CharacterService } from 'src/app/services/character.service';
import { CreateTeamDialogComponent } from 'src/app/tool/create-team-dialog/create-team-dialog.component';
import { CreateCharacterDialogComponent } from 'src/app/tool/create-character-dialog/create-character-dialog.component';
import { concatMap, finalize } from 'rxjs';

@Component({
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  isLoading : boolean = false;
  player: PlayerModel = {token : "", pseudo : "", role : ""};
  teams! : TeamModel[];

  constructor(
    private _loginService: LoginService,
    private _characterService : CharacterService,
    private dialog : MatDialog,
    ) { }

  ngOnInit(): void {
    this.getTeams();
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

  getTeams(){
    this._characterService.getTeams().subscribe(x => this.teams = x)

    this._loginService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });
  }

  deleteTeam(team : string){
    if(confirm("Tu es sûr de ce que tu fais Mathieu ? ")) {
      this.isLoading = true;
      this._characterService.deleteTeam(team).pipe(
        concatMap(() => this._characterService.getTeams()),
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: response => this.teams = response
      });
    }
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
