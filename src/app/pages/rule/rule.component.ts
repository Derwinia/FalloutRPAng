import { Component } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { RuleModel, RuleOrderModel } from 'src/app/models/rule.model';
import { RuleService } from 'src/app/services/rule.service';
import { PlayerModel } from 'src/app/models/player.model';
import { ModifyRuleDialogComponent } from 'src/app/tool/modify-rule-dialog/modify-rule-dialog.component';
import { CreateRuleDialogComponent } from 'src/app/tool/create-rule-dialog/create-rule-dialog.component';
import { concatMap, finalize } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent {

  isLoading: boolean = false;
  rules! : RuleModel[];
  player: PlayerModel = {token : "", pseudo : "", team : ""};
  ruleOrder? : RuleOrderModel;

  constructor(
    private _ruleService : RuleService,
    private _playerService: PlayerService,
    private dialog : MatDialog,
    ) { }

  ngOnInit(): void {
    this._ruleService.getRules().subscribe(x => this.rules = x)

    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });
  }

  create(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateRuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._ruleService.createRule(data)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    this.ruleOrder = { previousOrder : event.previousIndex+1, currentOrder : event.currentIndex+1}
    console.log(this.ruleOrder)
    this._ruleService.modifyRuleOrder(this.ruleOrder)
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
  }

  modify(rule : RuleModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = rule

    const dialogRef = this.dialog.open(ModifyRuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._ruleService.modifyRule(data)
    );
  }

  delete(id: number) {
    if(confirm("Tu es sûr de ce que tu fais Mathieu ? ")) {
      this.isLoading = true;
      this._ruleService.deleteRule(id.toString()).pipe(
        concatMap(() => this._ruleService.getRules()),
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: response => this.rules = response
      });
    }
  }
}
