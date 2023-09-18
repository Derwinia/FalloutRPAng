import { Component } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RuleModel } from 'src/app/models/rule.model';
import { RuleService } from 'src/app/services/rule.service';

@Component({
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent {

  rules! : RuleModel[];

  constructor(private _ruleService : RuleService) { }

  ngOnInit(): void {
    this._ruleService.getRules().subscribe(x => this.rules = x)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
  }
}
