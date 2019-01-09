class Creature {
  constructor(name, modifier, advantage, id, ac, hp, xp, tag, number, groupID) {
    this.name = name
    this.modifier = parseInt(modifier)
    this.advantage = advantage
    this.ac = parseInt(ac)
    this.hp = parseInt(hp)
    this.xp = parseInt(xp)
    this.tag = tag
    this.number = parseInt(number)
    this.id = id
    this.groupID = groupID || id.split('-')[1]
  }
}

export default Creature
