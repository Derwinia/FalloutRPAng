import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { CharacterComponent } from './pages/character/character.component';
import { MissionComponent } from './pages/mission/mission.component';
import { DataComponent } from './pages/data/data.component';
import { MapComponent } from './pages/map/map.component';
import { RadioComponent } from './pages/radio/radio.component';
import { RuleComponent } from './pages/rule/rule.component';

const routes: Routes = [
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'home', component : HomeComponent},
  {path : 'rule', component : RuleComponent},
  {path : 'character', component : CharacterComponent},
  {path : 'mission', component : MissionComponent},
  {path : 'data', component : DataComponent},
  {path : 'map', component : MapComponent},
  {path : 'radio', component : RadioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
