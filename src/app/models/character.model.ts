export interface CharacterModel {
  id : number,
  name : string,
  xp : number,
  xpToNext : number,
  origin : string,
  level : number,
  meleeBonus : number,
  defence : number,
  initiative : number,
  healthPoint : number,
  healthPointMax : number,
  mentalHealthPoint : number,
  mentalHealthPointMax : number,
  poisonResilience : number,
  background : string,
  caps : number,
  maxWeight : number,

// Foreign Keys
  attributes : AttributeModel,
  skills : SkillModel,
  bodyParts : BodyPartModel[],
  reputation : ReputationModel[],
  weapons : WeaponModel[],
  perks : PerkModel[],
  inventory : InventoryModel,
}

export interface AttributeModel{
  id : number,
  strength : number,
  perception : number,
  endurance : number,
  charisme : number,
  intelligence : number,
  agility : number,
  luck : number,
  luckPoints : number
}

export interface SkillModel {
  id : number,
  rightHanded : boolean,
  leftHanded : boolean,
  athletics : boolean,
  athleticslvl : boolean,
  lockpicking : boolean,
  lockpickinglvl : boolean,
  speech : boolean,
  speechlvl : boolean,
  stealth : boolean,
  stealthlvl : boolean,
  medecine : boolean,
  medecinelvl : boolean,
  driving : boolean,
  drivinglvl : boolean,
  repair : boolean,
  repairlvl : boolean,
  science : boolean,
  sciencelvl : boolean,
  survival : boolean,
  survivallvl : boolean,
  bartering : boolean,
  barteringlvl : boolean,
  bareHands : boolean,
  bareHandslvl : boolean,
  meleeWeapon : boolean,
  meleeWeaponlvl : boolean,
  lightWeapon : boolean,
  lightWeaponlvl : boolean,
  heavyWeapon : boolean,
  heavyWeaponlvl : boolean,
  energieWeapon : boolean,
  energieWeaponlvl : boolean,
  throwingWeapon : boolean,
  throwingWeaponlvl : boolean,
  explosive : boolean,
  explosivelvl : boolean,
  game : boolean,
  gamelvl : boolean,
}

export interface BodyPartModel {
  id : number,
  part : number,
  physicalResilience : number,
  radiationResilience : number,
  energyResilience : number,
  healthResilience : number,
}

export interface ReputationModel {
  id : number,
  name : string,
  rank : number,
}

export interface WeaponModel {
  id : number,
  name : string,
  tN : number,
  dC : number,
  physicalDamage : boolean,
  energyDamage : boolean,
  radiationDamage : boolean,
  poisonDamage : boolean,
  effects : string,
  proprieties : string,
  rateOfFire : number,
  range : number,
  ammo : number,
  weigth : number,
}

export interface PerkModel {
  id : number,
  name : string,
  rank : number,
  effect : string,
}

export interface InventoryModel {
  id : number,
  ammos : AmmoModel[],
  chemicals : ChemicalModel[],
  drinks : DrinkModel[],
  equipements : EquipementModel[],
  foods : FoodModel[],
  materials : MaterialModel[],
}

export interface AmmoModel {
  id : number,
  name : string,
  quantity : number,
  weight : number,
}

export interface ChemicalModel {
  id : number,
  name : string,
  quantity : number,
  weight : number,
}

export interface DrinkModel {
  id : number,
  name : string,
  quantity : number,
  weight : number,
}

export interface EquipementModel {
  id : number,
  name : string,
  quantity : number,
  weight : number,
}

export interface FoodModel {
  id : number,
  name : string,
  quantity : number,
  weight : number,
}

export interface MaterialModel {
  id : number,
  name : string,
  quantity : number,
  weight : number,
}

export interface CharacterName{
  id : number,
  name : string
}
