export interface PlayerModel {
  token : string,
  pseudo : string,
  team : string,
}

export interface CreatePlayerModel{
  pseudo : string,
  password : string,
  team : string,
}

export interface TeamModel{
  name : string
}
