import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col, Input, Row, Card, Chip } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { requestGetUser, requestSetSortingMethod, sortingMethods } from '../../UserActions'
import { getCurrentSortingMethod } from '../../UserReducer'

import styles from './Settings.css'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shown: [
        'POLITICS',
        'STARTUP',
        'EXPLICIT LANGUAGE'
      ],
      hidden: [
        '18+',
        'INAPPRORRIATE'
      ]
    }

    this.onSortingChange = this.onSortingChange.bind(this)
  }


  componentDidMount() {
    this.props.requestGetUser()
  }


  onSortingChange({ target: { value: sortingMethod } }) {
    this.props.requestSetSortingMethod(sortingMethod)
  }


  onTagClicked(tag) {
    let shown
    let hidden

    if (this.state.hidden.indexOf(tag) === -1) {
      shown = this.state.shown.filter(t => t !== tag)
      hidden = [...this.state.hidden, tag]
    } else {
      hidden = this.state.hidden.filter(t => t !== tag)
      shown = [...this.state.shown, tag]
    }
    this.setState({ shown })
    this.setState({ hidden })
  }


  render() {
    return (
      <div className={`container ${styles.settings}`}>
        <Row>
          <Col s={12}>
            <Input
              s={12}
              type="select"
              label="Sort Comments By"
              value={this.props.sortingMethod}
              onChange={this.onSortingChange}
            >
              {sortingMethods.map(
                method => <option value={method} key={method}>{method}</option>
              )}
            </Input>
          </Col>
          <Col s={12}>
            <Card
              className="blue-grey darken-3 z-depth-3"
              textClassName="white-text"
              title="Filter Options"
            >
              <Card
                className="cyan darken-4 black-text z-depth-0"
                title="Shown"
              >
                {this.state.shown.map(
                  tag => <span onClick={this.onTagClicked.bind(this, tag)} key={tag}><Chip>{tag}</Chip></span>
                )}
              </Card>
              <Card
                className="red darken-3 black-text z-depth-0"
                title="Hidden"
              >
                {this.state.hidden.map(
                  tag => <span onClick={this.onTagClicked.bind(this, tag)} key={tag}><Chip>{tag}</Chip></span>
                )}
              </Card>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    sortingMethod: getCurrentSortingMethod(state)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    requestSetSortingMethod: bindActionCreators(requestSetSortingMethod, dispatch),
    requestGetUser: bindActionCreators(requestGetUser, dispatch)
  }
}

Settings.propTypes = {
  requestSetSortingMethod: PropTypes.func.isRequired,
  sortingMethod: PropTypes.string,
  requestGetUser: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
