import { Component } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

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
