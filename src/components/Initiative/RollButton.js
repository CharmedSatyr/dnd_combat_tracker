import React from 'react'

import { Button, FormGroup } from 'react-bootstrap'

const RollButton = ({ rollFunction }) => {
  return (
    <FormGroup>
      <Button className="btn btn-primary" onClick={rollFunction} style={{ width: '100%' }}>
        Roll Initiative
      </Button>
    </FormGroup>
  )
}

export default RollButton
