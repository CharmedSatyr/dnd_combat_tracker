class Creature {
  constructor(name, modifier, advantage, id, ac, hp, xp, tag, number, groupID) {
    this.name = name
    this.modifier = modifier
    this.advantage = advantage
    this.ac = ac
    this.hp = hp
    this.xp = xp
    this.tag = tag
    this.number = number
    this.id = id
    this.groupID = groupID
  }
}

export default Creature