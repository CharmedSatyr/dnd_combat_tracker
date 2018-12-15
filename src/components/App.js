import React from 'react'
import Initiative from './Initiative'
import AddCreatures from './AddCreatures'

import { Grid, PageHeader, Row } from 'react-bootstrap'

const App = () => (
  <Grid>
    <PageHeader>D&amp;D Initiative Tracker</PageHeader>
    <Row className="show-grid">
      <AddCreatures />
      <Initiative />
    </Row>
  </Grid>
)

export default App
