import { Component } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {

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
