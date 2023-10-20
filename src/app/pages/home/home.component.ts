import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  fg!: FormGroup;
  player: PlayerModel = {token : "", pseudo : "", team : ""};

  constructor(
    private _router:Router,
    private _fb: FormBuilder,
    private _playerService: PlayerService,
  ) { }

  ngOnInit(): void {

    this.fg = this._fb.group({
      pseudo: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });

  }

  submit() {
    if(this.fg.invalid)
      return;
    this._playerService.login(this.fg.value).subscribe({
      next: () => this._router.navigate(['/home'])
    });
  }

  logout() {
    this._playerService.logout();
  }
}
