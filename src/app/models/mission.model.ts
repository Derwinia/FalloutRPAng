export interface MissionModel {
  name : string,
  shortDescription : string,
  Description : string,
}

export interface MissionGroupByTeamDTO
{
    team : string,
    missions : MissionModel[]
}

export interface MissionCreateModel {
  name : string,
  shortDescription : string,
  fullDescription : string,
}
