import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerModel, TeamModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { CharacterService } from 'src/app/services/character.service';
import { CreateTeamDialogComponent } from 'src/app/tool/create-team-dialog/create-team-dialog.component';
import { CreateCharacterDialogComponent } from 'src/app/tool/create-character-dialog/create-character-dialog.component';
import { concatMap, finalize } from 'rxjs';
import { CharacterModel } from 'src/app/models/character.model';

@Component({
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  activePanel : number = 1;
  isLoading : boolean = false;
  player: PlayerModel = {token : "", pseudo : "", team : ""};
  teams! : TeamModel[];
  players! : PlayerModel[];
  character! : CharacterModel;

  constructor(
    private _playerService: PlayerService,
    private _characterService : CharacterService,
    private dialog : MatDialog,
    ) {

    }

  ngOnInit(): void {
    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    })

    if(this.player.team){
      if(this.player.team != "admin"){
        this._characterService.CharacterGetByPseudo(this.player.pseudo).subscribe({
          next: character => {
            this.character = character
            console.log(character.bodyParts)
          }
        })
      }
      else{
        this._playerService.getTeams().subscribe(x => this.teams = x)
        this._playerService.getPlayers().subscribe(x => this.players = x)
      }
    }

  }

  createTeam(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateTeamDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(

        data => this._playerService.createTeam(data)
    );
  }

  deleteTeam(team : string){
    if(confirm("Tu es sûr de ce que tu fais Mathieu ? ")) {
      this.isLoading = true;
      this._playerService.deleteTeam(team).pipe(
        concatMap(() => this._playerService.getTeams()),
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: response => this.teams = response
      });
    }
  }

  createPlayer(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.teams;
    const dialogRef = this.dialog.open(CreateCharacterDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._playerService.createPlayer(data)
    );
  }
}
