import { Component } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {

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
