export interface RuleCreateModel {
  name : string,
  shortDescription : string,
  description : string,
}

export interface RuleFolderCreateModel {
  name : string,
  shortDescription : string,
}

export interface RuleModel {
  id : number,
  order : number,
  name : string,
  shortDescription : string,
  description : string,
  path : string,
  isFolder : boolean
}

export interface RuleUpdateModel {
  id : number,
  name : string,
  shortDescription : string,
  description : string,
}

export interface RuleOrderModel {
  previousOrder : number,
  currentOrder : number,
}
