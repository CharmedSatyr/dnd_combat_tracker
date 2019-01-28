export default class Conditions {
  constructor() {
    this.blinded = false
    this.charmed = false
    this.concentrating = false
    this.custom = []
    this.deafened = false
    this.exhaustion = {
      level: 0,
    }
    this.frightened = false
    this.grappled = false
    this.incapacitated = false
    this.invisible = false
    this.paralyzed = false
    this.petrified = false
    this.poisoned = false
    this.prone = false
    this.restrained = false
    this.stunned = false
    this.unconscious = false
  }
}
