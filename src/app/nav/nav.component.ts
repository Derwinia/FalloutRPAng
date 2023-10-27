import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { PlayerModel } from '../models/player.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  player: PlayerModel = {token : "", pseudo : "", team : ""};

  constructor(
  private _playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });
  }
}
