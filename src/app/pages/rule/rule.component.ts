import { Component, Input } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { RuleModel, RuleOrderModel } from 'src/app/models/rule.model';
import { RuleService } from 'src/app/services/rule.service';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerModel } from 'src/app/models/player.model';
import { ModifyRuleDialogComponent } from 'src/app/tool/modify-rule-dialog/modify-rule-dialog.component';
import { CreateRuleDialogComponent } from 'src/app/tool/create-rule-dialog/create-rule-dialog.component';
import { CreateFolderRuleDialogComponent } from 'src/app/tool/create-folder-rule-dialog/create-folder-rule-dialog.component';
import { concatMap, finalize, take } from 'rxjs';
import { DisplayRuleDialogComponent } from 'src/app/tool/display-rule-dialog/display-rule-dialog.component';

@Component({
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent {

  path : boolean = false;
  isLoading: boolean = false;
  rules : RuleModel[] = [];
  rulesTemp : RuleModel[] = [];
  player: PlayerModel = {token : "", pseudo : "", team : ""};
  ruleOrder? : RuleOrderModel;

  constructor(
    private ruleService : RuleService,
    private playerService: PlayerService,
    private dialog : MatDialog,
    ) { }

    ngOnInit(): void {
      this.ruleService.data$
      .subscribe((data) => {
        this.rules = data;
      })
    this.playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });

  }

  setPath(path : string){
    this.ruleService.setPath(path);
    this.path = true;
  }

  furtherPath(path : string){
    this.ruleService.furtherPath(path);
    this.path = true;
  }

  previousPath(){
    if(!this.ruleService.previousPath()){
      this.rules = [];
      this.path = false;
    }
  }

  createRule(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.ruleService.getPath();

    const dialogRef = this.dialog.open(CreateRuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this.ruleService.createRule(data)
    );
  }

  createFolderRule(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.ruleService.getPath();

    const dialogRef = this.dialog.open(CreateFolderRuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this.ruleService.createFolderRule(data)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    this.ruleOrder = { previousOrder : event.previousIndex+1, currentOrder : event.currentIndex+1}
    console.log(this.ruleOrder)
    this.ruleService.modifyRuleOrder(this.ruleOrder)
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
  }

  modifyRule(rule : RuleModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = rule

    const dialogRef = this.dialog.open(ModifyRuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this.ruleService.modifyRule(data)
    );
  }

  displayRule(rule : RuleModel){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = rule

    const dialogRef = this.dialog.open(DisplayRuleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this.ruleService.modifyRule(data)
    );
  }

  delete(ruleToDelete: RuleModel) {
    if(confirm("Tu es sûr de ce que tu fais Mathieu ? ")) {
      this.isLoading = true;
      this.ruleService.deleteRule(ruleToDelete.id).subscribe(
        () => {
          // La suppression a réussi
          this.rulesTemp = []
          this.rules.filter((rule) => {
            // Filtre l'élément supprimé en l'excluant pour reconstruire la liste des rules
            if (rule.id != ruleToDelete.id) {
              this.rulesTemp.push(rule)
            }
          });
          this.rules = this.rulesTemp
          return;
        },
        (error) => {
          // La suppression n'a pas réussi
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  }
}
