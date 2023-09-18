import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authentificationService {

  isAuth! : boolean

  isAuthSubject : Subject<boolean> = new Subject<boolean>()
  constructor() { }

  login() {
    this.isAuth = true;
    sessionStorage.setItem("isAuth", this.isAuth.toString())
    localStorage.setItem("isAuth", this.isAuth.toString())
    this.emitSubject()
  }

  logout() {
    this.isAuth = false;
    sessionStorage.removeItem("isAuth")
    localStorage.removeItem("isAuth")
    sessionStorage.clear()
    this.emitSubject()
  }

  emitSubject() {
    this.isAuthSubject.next(this.isAuth)
  }
}
