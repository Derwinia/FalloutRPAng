import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLogged: boolean = false;
  fg!: FormGroup;
  user: any = {};

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
      next: user => {
        this.isLogged = !!user.token;
        this.user = user
      }
    });
  }

  submit() {
    if(this.fg.invalid)
      return;
    this._loginService.login(this.fg.value).subscribe({
      next: () => this._router.navigate(['/character'])
    });
  }

  logout() {
    this._loginService.logout();
  }
}
