import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Col, Tab, Tabs } from 'react-bootstrap'

import * as a from '../../actions'

import AddPlayer from './AddPlayer'
import AddMonster from './AddMonster'

const AddCreature = ({ addCreatures }) => (
  <Col xs={12} md={4} mdOffset={1} className="well">
    <Tabs defaultActiveKey={2} id="add-creature-tabs">
      <Tab eventKey={1} title="Add Player">
        <AddPlayer addCreatures={addCreatures} />
      </Tab>
      <Tab eventKey={2} title="Add Monster">
        <AddMonster addCreatures={addCreatures} />
      </Tab>
    </Tabs>
  </Col>
)

const mapDispatchToProps = dispatch => ({
  addCreatures: creatures => dispatch(a.addCreatures(creatures)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddCreature)

AddCreature.propTypes = {
  addCreatures: PropTypes.func.isRequired,
}
