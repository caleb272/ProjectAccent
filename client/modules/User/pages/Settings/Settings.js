import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col, Input, Row } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { requestGetUser, requestSetSortingMethod, sortingMethods } from '../../UserActions'
import { getCurrentSortingMethod } from '../../UserReducer'

// Import Style
import styles from './Settings.css'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.onSortingChange = this.onSortingChange.bind(this)
  }


  componentDidMount() {
    this.props.requestGetUser()
  }


  onSortingChange({ target: { value: sortingMethod } }) {
    this.props.requestSetSortingMethod(sortingMethod)
  }


  render() {
    return (
      <div className={`container ${styles.settings}`}>
        <Col s={12}>
          <Row>
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
          </Row>
        </Col>
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
