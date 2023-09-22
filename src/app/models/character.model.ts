export interface CharacterModel {
  Id : number,
  Name : string,
  Xp : number,
  XpToNext : number,
  Origin : string,
  Level : number,
  MeleeBonus : number,
  Defence : number,
  Initiative : number,
  HealthPoint : number,
  HealthPointMax : number,
  PoisonResilience : number,
  Background : string,
  Caps : number,
  MaxWeight : number,
  Weight : number,


// Foreign Keys
  Skills : SkillModel,
  BodyParts : BodyPartModel[],
  Weapons : WeaponModel[],
  Perks : PerkModel[],
  Reputation : ReputationModel[],
  Inventory : InventoryModel,
}

export interface SkillModel {
  Id : number,
  RightHanded : boolean,
  LeftHanded : boolean,
  Athletics : boolean,
  Lockpicking : boolean,
  Speech : boolean,
  Stealth : boolean,
  Medecine : boolean,
  Driving : boolean,
  Repair : boolean,
  Science : boolean,
  Survival : boolean,
  Bartering : boolean,
  BareHands : boolean,
  MeleeWeapon : boolean,
  LightWeapon : boolean,
  HeavyWeapon : boolean,
  EnergieWeapon : boolean,
  ThrowingWeapon : boolean,
  Explosive : boolean,
}

export interface BodyPartModel {
  Id : number,
  Part : number,
  PhysicalResilience : number,
  RadiationResilience : number,
  EnergyResilience : number,
  HealthResilience : number,
}

export interface WeaponModel {
  Id : number,
  Name : string,
  TN : number,
  DC : number,
  PhysicalDamage : boolean,
  EnergyDamage : boolean,
  RadiationDamage : boolean,
  PoisonDamage : boolean,
  Effects : string,
  Proprieties : string,
  RateOfFire : number,
  Range : number,
  Ammo : number,
  Weigth : number,
}

export interface PerkModel {
  Id : number,
  Name : string,
  Rank : number,
  Effect : string,
}

export interface ReputationModel {
  Id : number,
  Name : string,
  Rank : number,
}

export interface InventoryModel {
  Id : number[],
  Ammos : AmmoModel[],
  Materials : MaterialModel[],
  Drinks : DrinkModel[],
  Foods : FoodModel[],
  Chemicals : ChemicalModel[],
  Equipements : EquipementModel[],
}

export interface AmmoModel {
  Id : number,
  Name : string,
  Quantity : number,
  Weight : number,
  TotalWeight : number,
}

export interface MaterialModel {
  Id : number,
  Name : string,
  Quantity : number,
  Weight : number,
  TotalWeight : number,
}

export interface DrinkModel {
  Id : number,
  Name : string,
  Quantity : number,
  Weight : number,
  TotalWeight : number,
}

export interface FoodModel {
  Id : number,
  Name : string,
  Quantity : number,
  Weight : number,
  TotalWeight : number,
}

export interface ChemicalModel {
  Id : number,
  Name : string,
  Quantity : number,
  Weight : number,
  TotalWeight : number,
}

export interface EquipementModel {
  Id : number,
  Name : string,
  Quantity : number,
  Weight : number,
  TotalWeight : number,
}
