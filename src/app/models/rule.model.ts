export interface RuleCreateModel {
  name : string,
  shortDescription : string,
  description : string,
}

export interface RuleModel {
  id : number,
  order : number,
  name : string,
  shortDescription : string,
  description : string,
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
