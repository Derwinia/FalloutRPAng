import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogged : boolean = false;
  user : any ={};

  constructor(
    private _loginService : LoginService
  ) {}
  ngOnInit(): void {
    this._loginService.user$.subscribe({
      next: user => {
        this.isLogged = !!user.token;
        this.user = user
      }
    });
  }
  title = 'FalloutRP';
}
