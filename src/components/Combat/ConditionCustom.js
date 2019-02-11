import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions/'
import { Button, Glyphicon, FormControl, InputGroup, ListGroupItem } from 'react-bootstrap'
import { updateCreaturesInLocalStorage } from '../localStorage.functions'

class ConditionCustom extends Component {
  constructor(props) {
    super(props)
    this.state = { custom: 'No custom conditions.', input: '' }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleAdd() {
    if (this.state.input) {
      this.props.addCustomCondition(this.props.monster, this.state.input)
      this.setState({ input: '' })
      this.updateConditions()
    }
  }
  handleRemove(condition) {
    this.props.removeCustomCondition(this.props.monster, condition)
    this.updateConditions()
  }
  handleInput(e) {
    this.setState({ input: e.target.value })
  }
  async updateConditions() {
    const custom = await this.props.monster.conditions.custom.map(c => {
      return (
        <Button bsSize="xsmall" key={c} onClick={() => this.handleRemove(c)}>
          <Glyphicon glyph="remove" style={{ color: '#a94442' }} title="Remove custom condition" />
          &nbsp;
          {c}
        </Button>
      )
    })
    if (custom.length > 0) {
      this.setState({ custom })
    } else {
      this.setState({ custom: 'No custom conditions.' })
    }
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  componentWillMount() {
    this.updateConditions()
  }
  render() {
    return (
      <ListGroupItem>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          {/* Label */}
          <div>Custom Conditions</div>
          {/* Input to add new custom condition */}
          <div style={{ width: '43%' }}>
            <InputGroup>
              <FormControl
                onChange={this.handleInput}
                placeholder="Takes 1d6 fire damage/turn"
                style={{ fontSize: 11 }}
                type="text"
                value={this.state.input}
              />
              <InputGroup.Button>
                <Button onClick={this.handleAdd}>Submit</Button>
              </InputGroup.Button>
            </InputGroup>
          </div>
          {/* List of custom conditions */}
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              width: '32%',
            }}
          >
            {this.state.custom}
          </div>
        </div>
      </ListGroupItem>
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  addCustomCondition: (creature, condition) => dispatch(a.addCustomCondition(creature, condition)),
  removeCustomCondition: (creature, condition) =>
    dispatch(a.removeCustomCondition(creature, condition)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionCustom)
