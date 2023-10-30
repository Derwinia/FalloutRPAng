export interface MissionModel {
  id : number,
  name : string,
  shortDescription : string,
  description : string,
  status : string,
  concernedPlayer : number[];
}

export interface MissionCreateModel {
  name : string,
  shortDescription : string,
  description : string,
  concernedPlayer : number[];
}

export interface MissionGroupByTeamDTO
{
  team : string,
  missions : MissionSimpleDTO[]
}

export interface MissionSimpleDTO{
  id : number,
  name : string,
  shortDescription : string,
  status : string,
}

export interface MissionDetailDTO{
  id : number,
  name : string,
  shortDescription : string,
  description : string,
  status : string,
}


