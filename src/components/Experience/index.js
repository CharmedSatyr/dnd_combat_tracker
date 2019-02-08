import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Experience = ({ playerCount, totalXP, xpPerPlayer }) => (
  <div style={{ fontSize: 13 }}>
    {totalXP > 0 && (
      <span>
        Players:&nbsp;<strong>{playerCount}</strong>
        <br />
        Total Experience:&nbsp;<strong>{totalXP}</strong>
        <br />
        Experience/Player:&nbsp;<strong>{xpPerPlayer}</strong>
      </span>
    )}
  </div>
)

const mapStateToProps = (state, props) => ({
  playerCount: state.experience.playerCount,
  totalXP: state.experience.totalXP,
  xpPerPlayer: state.experience.xpPerPlayer,
})

export default connect(
  mapStateToProps,
  null
)(Experience)

Experience.propTypes = {
  playerCount: PropTypes.number.isRequired,
  totalXP: PropTypes.number.isRequired,
  xpPerPlayer: PropTypes.number.isRequired,
}
