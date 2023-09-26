import { Component } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { RuleModel } from 'src/app/models/rule.model';
import { RuleService } from 'src/app/services/rule.service';
import { LoginService } from 'src/app/services/login.service';
import { PlayerModel } from 'src/app/models/player.model';
import { ModifyDialogComponent } from 'src/app/tool/modifyRule-dialog/modifyRule-dialog.component';

@Component({
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent {

  rules! : RuleModel[];
  player: PlayerModel = {token : "", pseudo : "superviseur", role : "admin"};

  constructor(
    private _ruleService : RuleService,
    private _loginService: LoginService,
    private dialog : MatDialog,
    ) { }

  ngOnInit(): void {
    this._ruleService.getRules().subscribe(x => this.rules = x)

    // this._loginService.user$.subscribe({
    //   next: player => {
    //     this.player = player
    //   }
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
  }

  modify(rule : RuleModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = rule

    const dialogRef = this.dialog.open(ModifyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._ruleService.changeRule(data)
    );
  }

}
