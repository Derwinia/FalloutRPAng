import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CharacterModel, CharacterName, PerkModel } from '../models/character.model';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private _http: HttpClient
  ) { }

  // getCharacterById(id : number): Observable<CharacterModel> {
  //   return this._http.get<CharacterModel>(environment.base_url + '/Character/Character'+id);
  // }

  characterGetByPseudo(pseudo : string): Observable<CharacterModel> {
    return this._http.get<CharacterModel>(environment.base_url + '/Character/Character-Get-By-Pseudo/'+pseudo);
  }

  characterListForATeam(teamName : string): Observable<CharacterName[]>{
    return this._http.get<CharacterName[]>(environment.base_url + '/Character/Character-List-For-A-Team/'+teamName);
  }

  characterUpdate(character : CharacterModel){
    if(character){
      this._http.patch(environment.base_url + '/Character/Character-Update', character).subscribe();
    }
  }

  perkCreate(concernedCharacter : number): Observable<{ perkId: number, message: string }> {
    return this._http.post<{ perkId: number, message: string }>(environment.base_url + '/Character/Character-Perk-Create/'+concernedCharacter, null);
  }

  perkDelete(perk : number){
    return this._http.delete(environment.base_url + '/Character/Character-Perk-Delete/'+perk);
  }

  ammoCreate(concernedInventory : number): Observable<{ ammoId: number, message: string }> {
    return this._http.post<{ ammoId: number, message: string }>(environment.base_url + '/Character/Character-Ammo-Create/'+concernedInventory, null);
  }

  ammoDelete(ammo : number){
    return this._http.delete(environment.base_url + '/Character/Character-Ammo-Delete/'+ammo);
  }

  chemCreate(concernedInventory : number): Observable<{ chemId: number, message: string }> {
    return this._http.post<{ chemId: number, message: string }>(environment.base_url + '/Character/Character-Chem-Create/'+concernedInventory, null);
  }

  chemDelete(chem : number){
    return this._http.delete(environment.base_url + '/Character/Character-Chem-Delete/'+chem);
  }

  drinkCreate(concernedInventory : number): Observable<{ drinkId: number, message: string }> {
    return this._http.post<{ drinkId: number, message: string }>(environment.base_url + '/Character/Character-Drink-Create/'+concernedInventory, null);
  }

  drinkDelete(drink : number){
    return this._http.delete(environment.base_url + '/Character/Character-Drink-Delete/'+drink);
  }

  equipCreate(concernedInventory : number): Observable<{ equipId: number, message: string }> {
    return this._http.post<{ equipId: number, message: string }>(environment.base_url + '/Character/Character-Equip-Create/'+concernedInventory, null);
  }

  equipDelete(equip : number){
    return this._http.delete(environment.base_url + '/Character/Character-Equip-Delete/'+equip);
  }

  foodCreate(concernedInventory : number): Observable<{ foodId: number, message: string }> {
    return this._http.post<{ foodId: number, message: string }>(environment.base_url + '/Character/Character-Food-Create/'+concernedInventory, null);
  }

  foodDelete(food : number){
    return this._http.delete(environment.base_url + '/Character/Character-Food-Delete/'+food);
  }

  matCreate(concernedInventory : number): Observable<{ matId: number, message: string }> {
    return this._http.post<{ matId: number, message: string }>(environment.base_url + '/Character/Character-Mat-Create/'+concernedInventory, null);
  }

  matDelete(mat : number){
    return this._http.delete(environment.base_url + '/Character/Character-Mat-Delete/'+mat);
  }

  reputationCreate(concernedCharacter : number): Observable<{ repId: number, message: string }> {
    return this._http.post<{ repId: number, message: string }>(environment.base_url + '/Character/Character-Reputation-Create/'+concernedCharacter, null);
  }

  reputationDelete(rep : number){
    return this._http.delete(environment.base_url + '/Character/Character-Reputation-Delete/'+rep);
  }
}
