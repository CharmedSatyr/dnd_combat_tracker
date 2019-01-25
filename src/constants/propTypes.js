import PropTypes from 'prop-types'

// Base Creature class
export const creaturePropTypes = {
  creature: PropTypes.shape({
    groupID: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    initiative: PropTypes.number,
    name: PropTypes.string.isRequired,
    order: PropTypes.number,
  }),
}

// Array of creatures objects
export const creaturesPropTypes = {
  creatures: PropTypes.arrayOf(PropTypes.shape(creaturePropTypes)).isRequired,
}

// Player class
export const playerPropTypes = {
  player: PropTypes.shape({
    advantage: PropTypes.bool.isRequired,
    groupID: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    initiative: PropTypes.number,
    modifier: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.number,
    type: PropTypes.string.isRequired,
  }).isRequired,
}

// Monster class
export const monsterPropTypes = {
  monster: PropTypes.shape({
    ac: PropTypes.number.isRequired,
    advantage: PropTypes.bool.isRequired,
    conditions: PropTypes.shape({
      blinded: PropTypes.bool.isRequired,
      charmed: PropTypes.bool.isRequired,
      concentrating: PropTypes.bool.isRequired,
      deafened: PropTypes.bool.isRequired,
      exhaustion: PropTypes.shape({
        level: PropTypes.number.isRequired,
      }).isRequired,
      frightened: PropTypes.bool.isRequired,
      grappled: PropTypes.bool.isRequired,
      incapacitated: PropTypes.bool.isRequired,
      invisible: PropTypes.bool.isRequired,
      paralyzed: PropTypes.bool.isRequired,
      petrified: PropTypes.bool.isRequired,
      poisoned: PropTypes.bool.isRequired,
      prone: PropTypes.bool.isRequired,
      restrained: PropTypes.bool.isRequired,
      stunned: PropTypes.bool.isRequired,
      unconscious: PropTypes.bool.isRequired,
    }).isRequired,
    groupID: PropTypes.number.isRequired,
    hp: PropTypes.shape({
      current: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    initiative: PropTypes.number,
    lair: PropTypes.number,
    legendary: PropTypes.number,
    modifier: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number,
    order: PropTypes.number,
    tag: PropTypes.string,
    type: PropTypes.string.isRequired,
    xp: PropTypes.number.isRequired,
  }).isRequired,
}

// Lair Action class
export const lairActionPropTypes = {
  lairAction: PropTypes.shape({
    groupID: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    initiative: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
}
