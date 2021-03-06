import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FormGroup, Button } from 'react-bootstrap'

import witchers from '../../constants/witchers'
import { saveCreaturesToLocalStorage } from '../localStorage.functions'

export default class MonsterHunting5E extends Component {
  constructor(props) {
    super(props)
    this.addWitchers = this.addWitchers.bind(this)
  }
  addWitchers(e) {
    e.preventDefault()
    this.props.addCreatures(witchers)
    saveCreaturesToLocalStorage(witchers)
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

MonsterHunting5E.propTypes = {
  addCreatures: PropTypes.func.isRequired,
}
