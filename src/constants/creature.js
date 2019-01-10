class Creature {
  constructor(name, modifier, advantage, id, ac, hp, xp, lair, legendary, tag, number, groupID) {
    this.name = name
    this.modifier = parseInt(modifier)
    this.advantage = advantage
    this.ac = parseInt(ac)
    this.hp = parseInt(hp)
    this.xp = parseInt(xp)
    this.lair = parseInt(lair)
    this.legendary = parseInt(legendary)
    this.tag = tag
    this.number = parseInt(number)
    this.id = id
    this.groupID = groupID || id.split('-')[1]
  }
}

export default Creature
