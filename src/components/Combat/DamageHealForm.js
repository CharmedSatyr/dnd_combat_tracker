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
    this.setState({ number: parseInt(e.target.value) })
  }
  heal() {
    const { healCreature, monster } = this.props
    healCreature(monster, this.state.number)
    this.setState({ number: '' })
  }
  render() {
    const { number, validation } = this.state
    return (
      <Form>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <FormGroup>
            <Button bsSize="xsmall" className="btn btn-success" onClick={this.heal}>
              Heal
            </Button>
          </FormGroup>
          {/* Number to Damage or Heal*/}
          <FormGroup controlId="number" validationState={validation}>
            <FormControl onChange={this.getNumber} placeholder="0" type="number" value={number} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <Button bsSize="xsmall" className="btn btn-danger" onClick={this.damage}>
              Damage
            </Button>
          </FormGroup>
        </div>
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
