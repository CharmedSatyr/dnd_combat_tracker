import React, { Component } from 'react'

import { saveLocal } from './addCreature.functions'
import { FormGroup, Button } from 'react-bootstrap'
import witchers from '../../constants/witchers'

export default class MonsterHunting5E extends Component {
  constructor(props) {
    super(props)
    this.addWitchers = this.addWitchers.bind(this)
  }
  addWitchers(e) {
    e.preventDefault()
    this.props.addCreatures(witchers)
    witchers.forEach(d => {
      saveLocal(d)
    })
  }
  render() {
    return (
      <FormGroup>
        <Button
          onClick={this.addWitchers}
          style={{ width: '100%' }}
          type="submit"
          className="btn btn-primary"
        >
          Add Witchers
        </Button>
      </FormGroup>
    )
  }
}
