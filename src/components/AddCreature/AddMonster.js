import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AdvantageIcon } from '../Icons'
import { saveCreaturesToLocalStorage } from '../localStorage.functions'
import { setID } from '../component.functions'
import { Monster } from '../../constants/creature'

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  Label,
} from 'react-bootstrap'

class DefaultState {
  constructor() {
    this.numLow = ''
    this.numHigh = ''
    this.stats = {
      ac: '',
      advantage: false,
      hp: '',
      lair: '',
      legendary: '',
      modifier: '',
      name: '',
      tag: '',
      xp: '',
    }
    this.validation = {
      ac: null,
      hp: null,
      mod: null,
      name: null,
      num: null,
      xp: null,
    }
  }
}

export default class AddMonster extends Component {
  constructor(props) {
    super(props)
    this.getStats = this.getStats.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.state = new DefaultState()
  }
  getStats(e) {
    let { stats } = this.state
    switch (e.currentTarget.id) {
      case 'advantage':
        stats.advantage = !this.state.stats.advantage
        this.setState({ stats })
        break
      case 'armor-class':
        stats.ac = e.target.value
        this.setState({ stats })
        break
      case 'experience':
        stats.xp = e.target.value
        this.setState({ stats })
        break
      case 'hit-points':
        stats.hp = e.target.value
        this.setState({ stats })
        break
      case 'lair':
        stats.lair = e.target.value
        this.setState({ stats })
        break
      case 'legendary':
        stats.legendary = e.target.value
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
      case 'tag':
        stats.tag = e.target.value
        this.setState({ stats })
        break
      case 'numLow':
        this.setState({ numLow: e.target.value })
        break
      case 'numHigh':
        this.setState({ numHigh: e.target.value })
        break
      default:
        break
    }
  }
  getValidationState(e) {
    e.preventDefault()
    const { ac, hp, modifier, name, xp } = this.state.stats
    const { numHigh, numLow } = this.state

    // If there is no number range, OR both numbers are filled in and are valid
    let validNum = false
    if (!numHigh && !numLow) {
      validNum = true
    } else if (numHigh && numLow && numLow < numHigh && numLow > 0 && numHigh - numLow <= 10) {
      // Valid num
      validNum = true
    }

    // Required inputs
    const validation = {}
    validation.ac = ac ? 'success' : 'error'
    validation.hp = hp ? 'success' : 'error'
    validation.mod = modifier ? 'success' : 'error'
    validation.name = name ? 'success' : 'error'
    validation.num = validNum ? 'success' : 'error'
    validation.xp = xp ? 'success' : 'error'
    this.setState({ validation })

    if (name && modifier && ac && hp && xp && validNum) {
      this.addMonsters()
    }
  }
  addMonsters() {
    const { numHigh, numLow, stats } = this.state
    const creatures = []
    const groupID = setID()
    for (let i = numLow || 0; i <= (numHigh || 0); i++) {
      stats.groupID = groupID
      stats.number = i
      const monster = new Monster(stats)
      creatures.push(monster)
    }
    this.props.addCreatures(creatures)
    saveCreaturesToLocalStorage(creatures)
    this.setState(new DefaultState())
  }
  render() {
    const { stats, validation } = this.state
    return (
      <Form>
        {/* Monster Name */}
        <FormGroup controlId="name" validationState={validation.name}>
          <ControlLabel>Monster Name</ControlLabel>
          <FormControl
            onChange={this.getStats}
            placeholder="Beholder"
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
              placeholder="2"
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

        {/* Hit Points */}
        <FormGroup controlId="hit-points" validationState={validation.hp}>
          <ControlLabel>Hit Points</ControlLabel>
          <FormControl onChange={this.getStats} placeholder="180" type="number" value={stats.hp} />
        </FormGroup>

        {/* Armor Class */}
        <FormGroup controlId="armor-class" validationState={validation.ac}>
          <ControlLabel>Armor Class</ControlLabel>
          <FormControl onChange={this.getStats} placeholder="18" type="number" value={stats.ac} />
        </FormGroup>

        {/* Experience */}
        <FormGroup controlId="experience" validationState={validation.xp}>
          <ControlLabel>Experience</ControlLabel>
          <FormControl
            onChange={this.getStats}
            placeholder="10000"
            type="number"
            value={stats.xp}
          />
        </FormGroup>
        <hr />
        {/* Lair Action Initiative Count */}
        <FormGroup controlId="lair" validationState={null}>
          <ControlLabel>
            Lair Action Initiative Count&nbsp;
            <Label>Optional</Label>
          </ControlLabel>
          <FormControl onChange={this.getStats} placeholder="20" type="number" value={stats.lair} />
          <HelpBlock>Set a fixed initiative count for the creature's lair actions.</HelpBlock>
        </FormGroup>
        {/* Legendary Actions */}
        <FormGroup controlId="legendary" validationState={null}>
          <ControlLabel>
            Legendary Actions&nbsp;
            <Label>Optional</Label>
          </ControlLabel>
          <FormControl
            onChange={this.getStats}
            placeholder="3"
            type="number"
            value={stats.legendary}
          />
          <HelpBlock>Assign the creature a number of Legendary Actions.</HelpBlock>
        </FormGroup>

        <hr />
        {/* Tag */}
        <FormGroup controlId="tag" validationState={null}>
          <ControlLabel>
            Tag&nbsp;
            <Label>Optional</Label>
          </ControlLabel>
          <FormControl onChange={this.getStats} placeholder="Red" type="text" value={stats.tag} />
          <FormControl.Feedback />
          <HelpBlock>
            Creatures created together share stats and initiative. You can use the same tag for
            multiple creature groups.
          </HelpBlock>
        </FormGroup>

        {/* Number Range */}
        <FormGroup validationState={validation.num}>
          <ControlLabel>
            Number Range&nbsp;<Label>Optional</Label>
          </ControlLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl
              id="numLow"
              onChange={this.getStats}
              placeholder="1"
              style={{ width: '45%' }}
              type="number"
              value={this.state.numLow}
            />
            <div style={{ marginTop: 5 }}>
              <strong>&ndash;</strong>
            </div>
            <FormControl
              id="numHigh"
              onChange={this.getStats}
              placeholder="10"
              style={{ width: '45%' }}
              type="number"
              value={this.state.numHigh}
            />
          </div>
          <HelpBlock>Include up to 10 numbered creatures within a group.</HelpBlock>
        </FormGroup>

        {/* Button */}
        <FormGroup>
          <Button
            onClick={this.getValidationState}
            style={{ width: '100%' }}
            type="submit"
            className="btn btn-success"
          >
            Add Monster
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

AddMonster.propTypes = { addCreatures: PropTypes.func.isRequired }
