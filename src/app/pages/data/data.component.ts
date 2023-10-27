import { Component } from '@angular/core';
import { DataModel } from 'src/app/models/data.model';
import { PlayerModel } from 'src/app/models/player.model';
import { DataService } from 'src/app/services/data.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {

  dataAreDisplay : boolean = false;
  listData! : DataModel[];
  player: PlayerModel = {token : "", pseudo : "", team : ""};

  constructor(
    private _playerService : PlayerService,
    private _dataService : DataService,

  ) { }

  ngOnInit(): void {
    this._playerService.user$.subscribe({
      next: player => {
        this.player = player
      }
    });
  }

  selectCategorie(i : number){
    this._dataService.getData(i).subscribe(x => this.listData = x)
    this.dataAreDisplay = true
  }

  emptyList(){
    this.dataAreDisplay = false
  }
}
