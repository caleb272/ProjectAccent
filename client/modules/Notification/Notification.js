import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestGetNotifications, requestDeleteNotification } from './NotificationActions'
import { getNotifications } from './NotificationReducer'
import NotificationList from './components/NotificationList/NotificationList'

// Import Style
import styles from './Notification.css'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  componentDidMount() {
    this.props.getNotifications()
  }


  render() {
    return (
      <div className={styles.notification}>
        <NotificationList
          notifications={this.props.notifications}
          deleteNotification={this.props.deleteNotification}
        >Replies</NotificationList>
        <NotificationList
          notifications={[]}
          deleteNotification={this.props.deleteNotification}
        >Followed Links</NotificationList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: getNotifications(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: bindActionCreators(requestGetNotifications, dispatch),
    deleteNotification: bindActionCreators(requestDeleteNotification, dispatch)
  }
}

Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  getNotifications: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
