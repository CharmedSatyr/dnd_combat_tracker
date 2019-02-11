import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions/'
import 'react-toggle/style.css'
import Toggle from 'react-toggle'
import { capitalizeFirstLetter } from '../component.functions'
import { ListGroupItem } from 'react-bootstrap'
import { updateCreaturesInLocalStorage } from '../localStorage.functions'

class ConditionStandard extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }
  async handleToggle() {
    await this.props.toggleCondition(this.props.monster, this.props.val)
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  render() {
    return (
      <ListGroupItem>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{capitalizeFirstLetter(this.props.val)}</span>
          <Toggle
            defaultChecked={this.props.monster.conditions[this.props.val]}
            onChange={this.handleToggle}
          />
        </div>
      </ListGroupItem>
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  toggleCondition: (creature, condition) => dispatch(a.toggleCondition(creature, condition)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionStandard)
