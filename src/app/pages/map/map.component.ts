import { Component } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  player: PlayerModel = {token : "", pseudo : "", role : ""};

  constructor(
    private _loginService: LoginService,
    ) { }

    ngOnInit(): void {
      this._loginService.user$.subscribe({
        next: player => {
          this.player = player
        }
      });
    }
}
