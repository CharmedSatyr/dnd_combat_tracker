class Creature {
  constructor(name, modifier, advantage, id, ac, hp, xp, lair, legendary, tag, number, groupID) {
    this.name = name // What the creature is called
    this.modifier = parseInt(modifier) // The creature's initiative modifier
    this.advantage = advantage // Whether the creature has advantage on initiative rolls
    this.ac = parseInt(ac) // Armor Class
    this.hp = parseInt(hp) // Normal Maximum Hit Points
    this.xp = parseInt(xp) // Total experience gained for killing the creature
    this.lair = parseInt(lair) // Optional fixed initiative count for lair action
    this.legendary = parseInt(legendary) // Optional number of legendary actions
    this.tag = tag // Optional tag label
    this.number = parseInt(number) // Optional number label
    this.id = id // Unique identifier per creature, used to delete creatures
    this.groupID = groupID || id.split('-')[1] // initiative and order are shared by group. groupID used for inc/dec order
  }
}

export default Creature
