import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Col } from 'react-bootstrap'

const Experience = ({ creatures, playerCount, totalXP }) => (
  <span>
    {creatures.length > 0 && (
      <Col xs={12} md={4} className="well">
        <strong>Players:</strong> {parseInt(playerCount)}
        <br />
        <strong>Total Experience:</strong> {parseInt(totalXP)}
        <br />
        <strong>Experience/Player:</strong>{' '}
        {parseInt(playerCount) > 0 ? Math.floor(parseInt(totalXP) / parseInt(playerCount)) : 0}
      </Col>
    )}
  </span>
)

const mapStateToProps = (state, props) => ({
  creatures: state.creatures,
  playerCount: state.experience.playerCount,
  totalXP: state.experience.totalXP,
  xpPerPlayer: state.experience.xpPerPlayer,
})

export default connect(
  mapStateToProps,
  null
)(Experience)

Experience.propTypes = {
  creatures: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      modifier: PropTypes.number.isRequired,
      advantage: PropTypes.bool.isRequired,
      ac: PropTypes.number,
      hp: PropTypes.number,
      xp: PropTypes.number,
      initiative: PropTypes.number,
      order: PropTypes.number,
    })
  ),
  playerCount: PropTypes.number.isRequired,
  totalXP: PropTypes.number.isRequired,
  xpPerPlayer: PropTypes.number.isRequired,
}
