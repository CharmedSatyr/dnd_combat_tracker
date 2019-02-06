import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions'
import { Button, Form, FormControl } from 'react-bootstrap'

class DamageHealForm extends Component {
  constructor(props) {
    super(props)
    this.damage = this.damage.bind(this)
    this.getNumber = this.getNumber.bind(this)
    this.heal = this.heal.bind(this)
    this.state = { number: '' }
  }
  damage() {
    const { damageCreature, monster } = this.props
    damageCreature(monster, this.state.number)
    this.setState({ number: '' })
  }
  getNumber(e) {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({ number: parseInt(e.target.value) })
    }
  }
  heal() {
    const { healCreature, monster } = this.props
    healCreature(monster, this.state.number)
    this.setState({ number: '' })
  }
  render() {
    const { number } = this.state
    return (
      <Form>
        <Button
          bsSize="xsmall"
          className="btn btn-success"
          onClick={this.heal}
          style={{ fontVariant: 'small-caps', width: '100%' }}
        >
          heal
        </Button>
        {/* Number to Damage or Heal*/}
        <FormControl
          bsSize="small"
          onChange={this.getNumber}
          placeholder="0"
          type="number"
          value={number}
        />
        <Button
          bsSize="xsmall"
          className="btn btn-danger"
          id="number"
          onClick={this.damage}
          style={{ fontVariant: 'small-caps', width: '100%' }}
        >
          damage
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  damageCreature: (creature, damage) => dispatch(a.damageCreature(creature, damage)),
  healCreature: (creature, healing) => dispatch(a.healCreature(creature, healing)),
})

export default connect(
  null,
  mapDispatchToProps
)(DamageHealForm)
