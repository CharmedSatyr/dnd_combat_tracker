import React from 'react'
import Initiative from './Initiative/'
import AddCreature from './AddCreature/'

import { Grid, PageHeader, Row } from 'react-bootstrap'

const App = () => (
  <Grid>
    <PageHeader>D&amp;D Initiative Tracker</PageHeader>
    <Row className="show-grid">
      <AddCreature />
      <Initiative />
    </Row>
  </Grid>
)

export default App
