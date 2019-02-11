import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions'
import { Button, Form, FormControl } from 'react-bootstrap'
import { updateCreaturesInLocalStorage } from '../localStorage.functions'

class DamageHealForm extends Component {
  constructor(props) {
    super(props)
    this.damage = this.damage.bind(this)
    this.getNumber = this.getNumber.bind(this)
    this.heal = this.heal.bind(this)
    this.state = { number: '' }
  }
  async damage() {
    const { damageCreature, monster } = this.props
    await damageCreature(monster, this.state.number)
    this.setState({ number: '' })
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  getNumber(e) {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({ number: parseInt(e.target.value) })
    }
  }
  async heal() {
    const { healCreature, monster } = this.props
    await healCreature(monster, this.state.number)
    this.setState({ number: '' })
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  render() {
    const { number } = this.state
    return (
      <Form>
        <Button
          bsSize="xsmall"
          className="btn btn-success"
          onClick={this.heal}
          style={{ borderRadius: 0, fontSize: 11, fontVariant: 'small-caps', width: '100%' }}
        >
          heal
        </Button>
        {/* Number to Damage or Heal*/}
        <FormControl
          bsSize="small"
          onChange={this.getNumber}
          placeholder="0"
          style={{ borderRadius: 0 }}
          type="number"
          value={number}
        />
        <Button
          bsSize="xsmall"
          className="btn btn-danger"
          id="number"
          onClick={this.damage}
          style={{ borderRadius: 0, fontSize: 11, fontVariant: 'small-caps', width: '100%' }}
        >
          damage
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  damageCreature: (creature, damage) => dispatch(a.damageCreature(creature, damage)),
  healCreature: (creature, healing) => dispatch(a.healCreature(creature, healing)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DamageHealForm)
