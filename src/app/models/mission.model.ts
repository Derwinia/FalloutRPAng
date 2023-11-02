import { CharacterName } from "./character.model";

export interface MissionModel {
  id : number,
  name : string,
  shortDescription : string,
  description : string,
  status : string,
  concernedPlayer : CharacterName[];
}

export interface MissionCreateModel {
  name : string,
  shortDescription : string,
  description : string,
  concernedPlayer : number[];
}

export interface MissionForPlayerModel{
  id : number,
  name : string,
  shortDescription : string,
  description : string,
  status : string,
}

export interface MissionGroupByTeamModel
{
  team : string,
  missions : MissionModel[]
}


