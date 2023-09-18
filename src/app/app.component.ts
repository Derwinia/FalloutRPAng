import { Component, OnInit } from '@angular/core';
import { authentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  localIsAuth! : boolean

  constructor(
    private authService : authentificationService
  ) {}
  ngOnInit(): void {
    this.authService.isAuthSubject.subscribe({
      next : (data : boolean) => { this.localIsAuth = data} ,
      error : () => {} ,
      complete : () => {}
    })
  }
  title = 'FalloutRP';
}
