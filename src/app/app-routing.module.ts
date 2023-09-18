import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManualComponent } from './pages/manual/manual.component';
import { TeamComponent } from './pages/team/team.component';
import { MissionComponent } from './pages/mission/mission.component';
import { DataComponent } from './pages/data/data.component';
import { MapComponent } from './pages/map/map.component';
import { RadioComponent } from './pages/radio/radio.component';

const routes: Routes = [
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'home', component : HomeComponent},
  {path : 'manual', component : ManualComponent},
  {path : 'team', component : TeamComponent},
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
