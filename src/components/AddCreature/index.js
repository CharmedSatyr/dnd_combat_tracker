import React from 'react'
import { connect } from 'react-redux'
import * as ca from '../../actions'

import AddPlayer from './AddPlayer'
import AddMonster from './AddMonster'

import { Col, Tab, Tabs } from 'react-bootstrap'

const AddCreature = ({ addCreatures }) => (
  <Col xs={12} md={4} className="well">
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
  addCreatures: creatures => dispatch(ca.addCreatures(creatures)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddCreature)
