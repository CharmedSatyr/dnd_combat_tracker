import React, { Component } from 'react'

import { removeLocal } from './localStorage.functions'

import { Glyphicon } from 'react-bootstrap'

export const AdvantageIcon = () => (
  <span>
    &nbsp;
    <Glyphicon title="Advantage" glyph="text-background" style={{ color: '#5cb85c' }} />
    &nbsp;
  </span>
)

export const HourglassIcon = () => <Glyphicon glyph="hourglass" style={{ color: '#555' }} />

export const MonsterIcon = () => (
  <span>
    &nbsp;
    <Glyphicon glyph="screenshot" style={{ color: '#555' }} />
    &nbsp;
  </span>
)

export const PlayerIcon = () => (
  <span>
    &nbsp;
    <Glyphicon glyph="user" style={{ color: '#555' }} />
    &nbsp;
  </span>
)

export class RemoveIcon extends Component {
  constructor(props) {
    super(props)
    this.removeCreature = this.removeCreature.bind(this)
  }
  removeCreature() {
    this.props.removeCreature(this.props.id)
    removeLocal(this.props.id)
  }
  render() {
    return (
      <span>
        <Glyphicon
          glyph="remove"
          onClick={this.removeCreature}
          style={{ color: '#a94442' }}
          title="Remove creature"
        />
        &nbsp;
      </span>
    )
  }
}
