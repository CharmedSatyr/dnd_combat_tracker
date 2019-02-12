import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AdvantageIcon } from '../Icons'
import { saveCreaturesToLocalStorage } from '../localStorage.functions'
import MonsterHunting5E from './MonsterHunting5E'
import { Player } from '../../constants/creature'

import { ControlLabel, Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

class DefaultState {
  constructor() {
    this.stats = {
      advantage: false,
      modifier: '',
      name: '',
    }
    this.validation = {
      mod: null,
      name: null,
    }
  }
}

export default class AddPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = new DefaultState()
    this.getStats = this.getStats.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }
  getStats(e) {
    let { stats } = this.state
    switch (e.currentTarget.id) {
      case 'advantage':
        stats.advantage = !this.state.stats.advantage
        this.setState({ stats })
        break
      case 'modifier':
        stats.modifier = e.target.value
        this.setState({ stats })
        break
      case 'name':
        stats.name = e.target.value
        this.setState({ stats })
        break
      default:
        break
    }
  }
  getValidationState(e) {
    e.preventDefault()
    const { validation } = this.state
    const { name, modifier } = this.state.stats
    validation.name = name ? 'success' : 'error'
    validation.mod = modifier ? 'success' : 'error'
    this.setState({ validation })

    if (name && modifier) {
      this.addPlayer()
    }
  }
  addPlayer() {
    const player = new Player({ ...this.state.stats })
    this.props.addCreatures([player])
    saveCreaturesToLocalStorage([player])

    this.setState(new DefaultState())
  }
  render() {
    const { stats, validation } = this.state
    return (
      <Form>
        {/* Player Name */}
        <FormGroup controlId="name" validationState={validation.name}>
          <ControlLabel>Player Name</ControlLabel>
          <FormControl
            onChange={this.getStats}
            placeholder="Marni Moonfoot"
            type="text"
            value={stats.name}
          />
          <FormControl.Feedback />
        </FormGroup>

        {/* Initiative Modifier */}
        <FormGroup validationState={validation.mod}>
          <ControlLabel>Initiative Modifier</ControlLabel>
          <InputGroup>
            <FormControl
              id="modifier"
              onChange={this.getStats}
              placeholder="5"
              type="number"
              value={stats.modifier}
            />
            {/* Advantage */}
            <InputGroup.Addon>
              <AdvantageIcon />
              <input
                aria-label="Roll initiative with advantage"
                onChange={this.getStats}
                id="advantage"
                title="Rolls with advantage"
                type="checkbox"
                checked={stats.advantage}
              />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        {/* Add Player Button */}
        <FormGroup>
          <Button
            onClick={this.getValidationState}
            style={{ width: '100%' }}
            type="submit"
            className="btn btn-success"
          >
            Add Player
          </Button>
        </FormGroup>

        {/* Auto-Add Monster Hunting 5E Players */}
        <MonsterHunting5E addCreatures={this.props.addCreatures} />
      </Form>
    )
  }
}

AddPlayer.propTypes = {
  addCreatures: PropTypes.func.isRequired,
}
