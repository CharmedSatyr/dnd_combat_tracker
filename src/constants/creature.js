export const setId = () =>
  Math.random()
    .toString()
    .slice(2)

class Creature {
  constructor(stats) {
    this.advantage = stats.advantage // Whether the creature has advantage on initiative rolls
    this.id = setId() // Unique identifier per creature, used to delete creatures
    this.initiative = null
    this.modifier = parseInt(stats.modifier) // The creature's initiative modifier
    this.name = stats.name // What the creature is called
  }
}

export class Player extends Creature {
  constructor(stats) {
    super(stats)
    this.groupID = setId() // groupID used for inc/dec order
    this.type = 'player'
  }
}

export class Monster extends Creature {
  constructor(stats) {
    super(stats)
    this.ac = parseInt(stats.ac) // Armor Class
    this.groupID = stats.groupID // initiative and order are shared by group. groupID used for inc/dec order
    this.hp = parseInt(stats.hp) // Normal Maximum Hit Points
    this.lair = parseInt(stats.lair) // Optional fixed initiative count for lair action
    this.legendary = parseInt(stats.legendary) // Optional number of legendary actions
    this.number = parseInt(stats.number) // Optional number label
    this.tag = stats.tag // Optional tag label
    this.type = 'monster'
    this.xp = parseInt(stats.xp) // Total experience gained for killing the creature
  }
}

export class LairAction extends Creature {
  constructor(stats) {
    super(stats)
    this.groupID = stats.groupID
    this.type = 'lair-action'
  }
}
