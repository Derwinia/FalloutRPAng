import { Component } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

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
