export interface PlayerModel {
  token : string,
  pseudo : string,
  role : string,
}

export interface CreatePlayerModel{
  pseudo : string,
  password : string,
  role : string,
}

export interface TeamModel{
  name : string
}
