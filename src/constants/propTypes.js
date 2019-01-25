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
