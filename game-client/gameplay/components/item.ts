export enum Weapon {
  'sword', // 0
  'ice-staff', // 1
  'fire-staff', // 2
  'club', // 3
  'bow', // 4
}

export enum Bodygear {
  'chain-mail', // 0
  'spiked', // 1
  'flame', // 2
  'frost', // 3
}

export enum Handgear {
  'ice-gauntlets', // 0
  'fire-gauntlets', // 1
  'gauntlets', // 2
}

export enum Footwear {
  'cleated-boots', // 0
  'shoes', // 1
  'heavy-boots', // 2
}

export enum Consumable {
  'boomerang', // 0
  'base-shuffle', // 1
  'duplicate', // 2
  'swap-places', // 3
}

export enum EquipmentSlot {
  'bodygear', // 0
  'handgear', // 1
  'footwear', // 2
  'weapon', // 3
  'consumable', // 4
}

export class Item {
  equipmentSlot: number
  subtype: number
  constructor(slot: EquipmentSlot, subtype: Weapon | Bodygear | Handgear | Footwear | Consumable) {
    this.equipmentSlot = slot
    this.subtype = subtype
  }
}
