import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  pwd1 : string = "test";
  pwd2 : string = "test2";
  pwd3 : string = "test3";
  pwd4 : string = "test4";

  constructor(private _router:Router) { }

  chooseTeam(choice : number) {

    let pwd = prompt("Un intrus ! donnez le mot de passe ou vous resterez dehors !");
    if (pwd == null || pwd == "") {
      pwd = "";
    } else {
      switch (choice){
        case 1:
          if(pwd == this.pwd1){
            alert("bienvenu joueur de l'équipe 1")
            this._router.navigate(['/manuel'])
          }
          else
            alert("Je crois pas non ! Dégage !")
          break;
        case 2:
          if(pwd == this.pwd2){
            alert("bienvenu joueur de l'équipe 2")
            this._router.navigate(['/manuel'])
          }
          else
            alert("Je crois pas non ! Dégage !")
          break;
        case 3:
          if(pwd == this.pwd3){
            alert("bienvenu joueur de l'équipe 3")
            this._router.navigate(['/manuel'])
          }
          else
            alert("Je crois pas non ! Dégage !")
          break;
        case 4:
          if(pwd == this.pwd4){
            alert("bienvenu joueur de l'équipe 4")
            this._router.navigate(['/manuel'])
          }
          else
            alert("Je crois pas non ! Dégage !")
          break;
        default:
            console.log("erreur")
      }
    }
  }
}
