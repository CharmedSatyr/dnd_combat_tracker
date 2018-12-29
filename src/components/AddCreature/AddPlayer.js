import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AdvantageIcon } from '../Icons'
import { saveLocal, setID } from '../component.functions'
import MonsterHunting5E from './MonsterHunting5E'
import Creature from '../../constants/creature'

import { ControlLabel, Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

const defaultState = {
  name: '',
  modifier: '',
  advantage: false,
  nameValidation: null,
  modValidation: null,
}

export default class AddPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState }
    this.getStats = this.getStats.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }
  getStats(e) {
    switch (e.currentTarget.id) {
      case 'name':
        this.setState({ name: e.target.value })
        break
      case 'modifier':
        this.setState({ modifier: e.target.value })
        break
      case 'advantage':
        this.setState({ advantage: !this.state.advantage })
        break
      default:
        break
    }
  }
  getValidationState(e) {
    e.preventDefault()
    const { name, modifier } = this.state
    this.setState({
      nameValidation: name ? 'success' : 'error',
      modValidation: modifier ? 'success' : 'error',
    })

    if (name && modifier) {
      this.addPlayer()
    }
  }
  addPlayer() {
    const { advantage, modifier, name } = this.state
    const creatures = []
    const player = new Creature(name, modifier, advantage, `player-${setID()}`)
    creatures.push(player)
    this.props.addCreatures(creatures)
    saveLocal(creatures)
    this.setState(defaultState)
  }
  render() {
    return (
      <Form>
        {/* Player Name */}
        <FormGroup controlId="name" validationState={this.state.nameValidation}>
          <ControlLabel>Player Name</ControlLabel>
          <FormControl
            onChange={this.getStats}
            placeholder="Marni Moonfoot"
            type="text"
            value={this.state.name}
          />
          <FormControl.Feedback />
        </FormGroup>

        {/* Initiative Modifier */}
        <FormGroup validationState={this.state.modValidation}>
          <ControlLabel>Initiative Modifier</ControlLabel>
          <InputGroup>
            <FormControl
              id="modifier"
              onChange={this.getStats}
              placeholder="5"
              type="number"
              value={this.state.modifier}
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
                checked={this.state.advantage}
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
