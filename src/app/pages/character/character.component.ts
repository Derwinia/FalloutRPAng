import { Component, numberAttribute } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerModel, TeamModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { CharacterService } from 'src/app/services/character.service';
import { CreateTeamDialogComponent } from 'src/app/tool/create-team-dialog/create-team-dialog.component';
import { CreateCharacterDialogComponent } from 'src/app/tool/create-character-dialog/create-character-dialog.component';
import { concatMap, finalize } from 'rxjs';
import { AmmoModel, CharacterModel, ChemicalModel, DrinkModel, EquipementModel, FoodModel, MaterialModel, PerkModel, ReputationModel, SkillModel } from 'src/app/models/character.model';

@Component({
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  activePanel : number = 4;
  isLoading : boolean = false;
  player: PlayerModel = {token : "", pseudo : "", team : ""};
  teams! : TeamModel[];
  players! : PlayerModel[];
  character! : CharacterModel;

  constructor(
    private _playerService: PlayerService,
    private _characterService : CharacterService,
    private dialog : MatDialog,
    ) {

    }

  ngOnInit(): void {
    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    })

    if(this.player.team){
      if(this.player.team != "admin"){
        this._characterService.characterGetByPseudo(this.player.pseudo).subscribe({
          next: character => {
            this.character = character
          }
        })
      }
      else{
        this._playerService.getTeams().subscribe(x => this.teams = x)
        this._playerService.getPlayers().subscribe(x => this.players = x)
      }
    }

  }
//#region admin function
  createTeam(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreateTeamDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(

        data => this._playerService.createTeam(data)
    );
  }

  deleteTeam(team : string){
    if(confirm("Tu es sûr de ce que tu fais Mathieu ? ")) {
      this.isLoading = true;
      this._playerService.deleteTeam(team).pipe(
        concatMap(() => this._playerService.getTeams()),
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: response => this.teams = response
      });
    }
  }

  createPlayer(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.teams;
    const dialogRef = this.dialog.open(CreateCharacterDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => this._playerService.createPlayer(data)
    );
  }
//#endregion

  save(){
    this._characterService.characterUpdate(this.character)
  }

//#region inventory page
  totalWeigth() : number{
    let total : number = 0;

    this.character.inventories.ammos.forEach(element => {
      total += element.weight*element.quantity
    });

    this.character.inventories.chemicals.forEach(element => {
      total += element.weight*element.quantity
    });

    this.character.inventories.drinks.forEach(element => {
      total += element.weight*element.quantity
    });

    this.character.inventories.equipements.forEach(element => {
      total += element.weight*element.quantity
    });

    this.character.inventories.foods.forEach(element => {
      total += element.weight*element.quantity
    });

    this.character.inventories.materials.forEach(element => {
      total += element.weight*element.quantity
    });

    return total;
  }
//#endregion

//#region Perk
  perkCreate(){
    this._characterService.perkCreate(this.character.id).subscribe(
      (response) => {
        const newPerkId = response.perkId;
        const newPerk: PerkModel = {
          id: newPerkId,
          name: "X",
          rank : 0,
          effect : "X"
        };

        this.character.perks.push(newPerk)
      },
      (error) => {
        console.error('Erreur lors de la création de la perk', error);
      }
    )
  }

  perkDelete(perkToDelete : PerkModel){
    if(confirm("Es tu sûr ? ")) {
      this.isLoading = true;
      this._characterService.perkDelete(perkToDelete.id).subscribe(
        () => {
          // La suppression a réussi
          const perksTemp : PerkModel[] = []
          this.character.perks.filter((perk) => {
            // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
            if (perk.id != perkToDelete.id) {
              perksTemp.push(perk)
            }
          });
          this.character.perks = perksTemp
          return;
        },
        (error) => {
          // La suppression n'a pas réussi
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  }
//#endregion

//#region inventory
ammoCreate(){
  this._characterService.ammoCreate(this.character.inventories.id).subscribe(
    (response) => {
      const newAmmoId = response.ammoId;
      const newAmmo: AmmoModel = {
        id: newAmmoId,
        name: "X",
        quantity : 0,
        weight : 0
      };

      this.character.inventories.ammos.push(newAmmo)
    },
    (error) => {
      console.error('Erreur lors de la création des munitions', error);
    }
  )
}

ammoDelete(ammoToDelete : AmmoModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.ammoDelete(ammoToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const ammosTemp : AmmoModel[] = []
        this.character.inventories.ammos.filter((ammo) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (ammo.id != ammoToDelete.id) {
            ammosTemp.push(ammo)
          }
        });
        this.character.inventories.ammos = ammosTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}

chemCreate(){
  this._characterService.chemCreate(this.character.inventories.id).subscribe(
    (response) => {
      const newChemId = response.chemId;
      const newChem: ChemicalModel = {
        id: newChemId,
        name: "X",
        quantity : 0,
        weight : 0
      };

      this.character.inventories.chemicals.push(newChem)
    },
    (error) => {
      console.error('Erreur lors de la création des munitions', error);
    }
  )
}

chemDelete(chemToDelete : ChemicalModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.chemDelete(chemToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const chemsTemp : ChemicalModel[] = []
        this.character.inventories.chemicals.filter((chem) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (chem.id != chemToDelete.id) {
            chemsTemp.push(chem)
          }
        });
        this.character.inventories.chemicals = chemsTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}

drinkCreate(){
  this._characterService.drinkCreate(this.character.inventories.id).subscribe(
    (response) => {
      const newDrinkId = response.drinkId;
      const newDrink: AmmoModel = {
        id: newDrinkId,
        name: "X",
        quantity : 0,
        weight : 0
      };

      this.character.inventories.drinks.push(newDrink)
    },
    (error) => {
      console.error('Erreur lors de la création des munitions', error);
    }
  )
}

drinkDelete(drinkToDelete : DrinkModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.drinkDelete(drinkToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const drinksTemp : DrinkModel[] = []
        this.character.inventories.drinks.filter((drink) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (drink.id != drinkToDelete.id) {
            drinksTemp.push(drink)
          }
        });
        this.character.inventories.drinks = drinksTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}

equipCreate(){
  this._characterService.equipCreate(this.character.inventories.id).subscribe(
    (response) => {
      const newEquipId = response.equipId;
      const newEquip: EquipementModel = {
        id: newEquipId,
        name: "X",
        quantity : 0,
        weight : 0
      };

      this.character.inventories.equipements.push(newEquip)
    },
    (error) => {
      console.error('Erreur lors de la création des munitions', error);
    }
  )
}

equipDelete(equipToDelete : EquipementModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.equipDelete(equipToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const equipsTemp : EquipementModel[] = []
        this.character.inventories.equipements.filter((equip) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (equip.id != equipToDelete.id) {
            equipsTemp.push(equip)
          }
        });
        this.character.inventories.equipements = equipsTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}

foodCreate(){
  this._characterService.foodCreate(this.character.inventories.id).subscribe(
    (response) => {
      const newFoodId = response.foodId;
      const newFood: FoodModel = {
        id: newFoodId,
        name: "X",
        quantity : 0,
        weight : 0
      };

      this.character.inventories.foods.push(newFood)
    },
    (error) => {
      console.error('Erreur lors de la création des munitions', error);
    }
  )
}

foodDelete(foodToDelete : FoodModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.foodDelete(foodToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const foodsTemp : FoodModel[] = []
        this.character.inventories.foods.filter((food) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (food.id != foodToDelete.id) {
            foodsTemp.push(food)
          }
        });
        this.character.inventories.foods = foodsTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}

matCreate(){
  this._characterService.matCreate(this.character.inventories.id).subscribe(
    (response) => {
      const newMatId = response.matId;
      const newMat: MaterialModel = {
        id: newMatId,
        name: "X",
        quantity : 0,
        weight : 0
      };

      this.character.inventories.materials.push(newMat)
    },
    (error) => {
      console.error('Erreur lors de la création des munitions', error);
    }
  )
}

matDelete(matToDelete : MaterialModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.matDelete(matToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const matsTemp : MaterialModel[] = []
        this.character.inventories.materials.filter((mat) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (mat.id != matToDelete.id) {
            matsTemp.push(mat)
          }
        });
        this.character.inventories.materials = matsTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}

//#endregion

//#region story/reputation
reputationCreate(){
  this._characterService.reputationCreate(this.character.id).subscribe(
    (response) => {
      const newRepId = response.repId;
      const newRep: ReputationModel = {
        id: newRepId,
        name: "X",
        rank : 0,
      };

      this.character.reputations.push(newRep)
    },
    (error) => {
      console.error('Erreur lors de la création de la ligne de reputation', error);
    }
  )
}

reputationDelete(repToDelete : ReputationModel){
  if(confirm("Es tu sûr ? ")) {
    this.isLoading = true;
    this._characterService.reputationDelete(repToDelete.id).subscribe(
      () => {
        // La suppression a réussi
        const repsTemp : ReputationModel[] = []
        this.character.reputations.filter((rep) => {
          // Filtre l'élément supprimé en l'excluant pour reconstruire la liste
          if (rep.id != repToDelete.id) {
            repsTemp.push(rep)
          }
        });
        this.character.reputations = repsTemp
        return;
      },
      (error) => {
        // La suppression n'a pas réussi
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}
//#endregion
}
