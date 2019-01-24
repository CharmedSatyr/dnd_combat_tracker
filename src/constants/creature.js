class Creature {
  constructor(name, modifier, advantage, id, ac, hp, xp, lair, legendary, tag, number, groupID) {
    this.ac = parseInt(ac) // Armor Class
    this.advantage = advantage // Whether the creature has advantage on initiative rolls
    this.groupID = groupID || id.split('-')[1] // initiative and order are shared by group. groupID used for inc/dec order
    this.hp = parseInt(hp) // Normal Maximum Hit Points
    this.id = id // Unique identifier per creature, used to delete creatures
    this.lair = parseInt(lair) // Optional fixed initiative count for lair action
    this.legendary = parseInt(legendary) // Optional number of legendary actions
    this.modifier = parseInt(modifier) // The creature's initiative modifier
    this.name = name // What the creature is called
    this.number = parseInt(number) // Optional number label
    this.tag = tag // Optional tag label
    this.type = id.split('-')[0] // Monster, Player, Lair Action, etc.
    this.xp = parseInt(xp) // Total experience gained for killing the creature
  }
}

export default Creature
