import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './nav/nav.component';

import { RuleComponent } from './pages/rule/rule.component';
import { CreateRuleDialogComponent } from './tool/create-rule-dialog/create-rule-dialog.component';
import { ModifyRuleDialogComponent } from './tool/modify-rule-dialog/modify-rule-dialog.component';

import { CharacterComponent } from './pages/character/character.component';
import { CreateTeamDialogComponent } from './tool/create-team-dialog/create-team-dialog.component';
import { CreateCharacterDialogComponent } from './tool/create-character-dialog/create-character-dialog.component';

import { MissionComponent } from './pages/mission/mission.component';
import { DataComponent } from './pages/data/data.component';
import { MapComponent } from './pages/map/map.component';
import { RadioComponent } from './pages/radio/radio.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CreateMissionDialogComponent } from './tool/create-mission-dialog/create-mission-dialog.component';
import { DetailMissionDialogComponent } from './tool/detail-mission-dialog/detail-mission-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RuleComponent,
    CharacterComponent,
    MissionComponent,
    DataComponent,
    MapComponent,
    RadioComponent,
    ModifyRuleDialogComponent,
    CreateRuleDialogComponent,
    CreateTeamDialogComponent,
    CreateCharacterDialogComponent,
    CreateMissionDialogComponent,
    DetailMissionDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkDropList,
    CdkDrag,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
