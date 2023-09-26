import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { PlayerModel } from 'src/app/models/player.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  fg!: FormGroup;
  player: PlayerModel = {token : "", pseudo : "", role : ""};

  constructor(
    private _router:Router,
    private _fb: FormBuilder,
    private _loginService: LoginService,
  ) { }

  ngOnInit(): void {

    this.fg = this._fb.group({
      pseudo: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this._loginService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });

  }

  submit() {
    if(this.fg.invalid)
      return;
    this._loginService.login(this.fg.value).subscribe({
      next: () => this._router.navigate(['/home'])
    });
  }

  logout() {
    this._loginService.logout();
  }
}
