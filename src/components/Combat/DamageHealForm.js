import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'

class DamageHealForm extends Component {
  constructor(props) {
    super(props)
    this.damage = this.damage.bind(this)
    this.getNumber = this.getNumber.bind(this)
    this.heal = this.heal.bind(this)
    this.state = { number: '', validation: null }
  }
  damage() {
    const { damageCreature, monster } = this.props
    damageCreature(monster, this.state.number)
    this.setState({ number: '' })
  }
  getNumber(e) {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({ number: parseInt(e.target.value) })
    } else {
      this.setState({ validation: 'error' })
    }
  }
  heal() {
    const { healCreature, monster } = this.props
    healCreature(monster, this.state.number)
    this.setState({ number: '' })
  }
  render() {
    const { number, validation } = this.state
    return (
      <div>
        <Form>
          <Button
            bsSize="xsmall"
            className="btn btn-success"
            onClick={this.heal}
            style={{ width: '100%' }}
          >
            HEAL
          </Button>
          {/* Number to Damage or Heal*/}
          <FormControl onChange={this.getNumber} placeholder="0" type="number" value={number} />
          <Button
            bsSize="xsmall"
            className="btn btn-danger"
            id="number"
            onClick={this.damage}
            style={{ width: '100%' }}
          >
            DAMAGE
          </Button>
        </Form>
      </div>
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
