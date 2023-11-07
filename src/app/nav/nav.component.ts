import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlayerModel } from '../models/player.model';
import { RuleService } from '../services/rule.service';
import { RuleComponent } from '../pages/rule/rule.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  player: PlayerModel = {token : "", pseudo : "", team : ""};

  constructor(
    private _ruleService : RuleService,
    private _playerService: PlayerService,
  ) { }

  ngOnInit(){
    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });
  }

  setPath(path : string){
    this._ruleService.setPath(path);
  }


}
