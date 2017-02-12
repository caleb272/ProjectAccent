import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col, Input, Row, Card, Chip } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { requestGetUser, requestSetSortingMethod, requestSetUserFilters, sortingMethods } from '../../UserActions'
import { getFiltersRequest } from '../../../CommentSection/CommentSectionActions'
import { getFilters } from '../../../CommentSection/CommentSectionReducer'
import { getUser, getCurrentSortingMethod } from '../../UserReducer'

import styles from './Settings.css'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.onSortingChange = this.onSortingChange.bind(this)
  }


  componentDidMount() {
    this.props.requestGetUser()
    this.props.requestGetFilters()
  }


  onSortingChange({ target: { value: sortingMethod } }) {
    this.props.requestSetSortingMethod(sortingMethod)
  }


  onTagClicked(tag) {
    let userFilters = this.props.user.filters
    if (userFilters.indexOf(tag) === -1)
      userFilters = [...userFilters, tag]
    else
      userFilters = userFilters.filter(t => t !== tag)
    this.props.requestSetUserFilters(userFilters)
  }


  render() {
    return (
      <div className={styles.settings}>
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
                {this.props.filters.map(
                  tag => <span onClick={this.onTagClicked.bind(this, tag)} key={tag}><Chip>{tag}</Chip></span>
                )}
              </Card>
              <Card
                className="red darken-3 black-text z-depth-0"
                title="Hidden"
              >
                {this.props.user.filters.map(
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
  const user = getUser(state)
  const userFilters = user.filters
  const filters = getFilters(state).filter(cf => userFilters.indexOf(cf) === -1)
  return {
    sortingMethod: getCurrentSortingMethod(state),
    user,
    filters
  }
}


function mapDispatchToProps(dispatch) {
  return {
    requestGetUser: bindActionCreators(requestGetUser, dispatch),
    requestGetFilters: bindActionCreators(getFiltersRequest, dispatch),
    requestSetSortingMethod: bindActionCreators(requestSetSortingMethod, dispatch),
    requestSetUserFilters: bindActionCreators(requestSetUserFilters, dispatch)
  }
}

Settings.propTypes = {
  requestSetSortingMethod: PropTypes.func.isRequired,
  sortingMethod: PropTypes.string,
  requestGetUser: PropTypes.func.isRequired,
  requestGetFilters: PropTypes.func.isRequired,
  requestSetUserFilters: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
