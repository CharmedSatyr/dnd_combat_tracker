import React from 'react'
import Initiative from './Initiative/'
import AddCreature from './AddCreature/'
import Experience from './Experience/'

import { Grid, PageHeader, Row } from 'react-bootstrap'

const App = () => (
  <Grid>
    <PageHeader>D&amp;D Combat Tracker</PageHeader>
    <Row className="show-grid">
      <AddCreature />
      <Initiative />
      <Experience />
    </Row>
  </Grid>
)

export default App
