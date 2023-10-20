import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogged : boolean = false;
  user : any ={};

  constructor(
    private _playerService : PlayerService
  ) {}
  ngOnInit(): void {
    this._playerService.user$.subscribe({
      next: user => {
        this.isLogged = !!user.token;
        this.user = user
      }
    });
  }
  title = 'FalloutRP';
}
