import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './nav/nav.component';

import { DataComponent } from './pages/data/data.component';
import { TeamComponent } from './pages/team/team.component';
import { ManualComponent } from './pages/manual/manual.component';
import { MapComponent } from './pages/map/map.component';
import { MissionComponent } from './pages/mission/mission.component';
import { RadioComponent } from './pages/radio/radio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    TeamComponent,
    HomeComponent,
    ManualComponent,
    MapComponent,
    MissionComponent,
    RadioComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
