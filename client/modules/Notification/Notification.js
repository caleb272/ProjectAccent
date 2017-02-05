import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestGetReplies } from './NotificationActions'
import { getNotifications } from './NotificationReducer'
import NotificationList from './components/NotificationList/NotificationList'

// Import Style
import styles from './Notification.css'

const test = [
  {
    commenter: 'testAccount',
    comment: 'get this to work',
    yourComment: 'first!!!',
    commentID: '20ao049aehou',
    commentSectionURL: 'test.com/'
  },
  {
    commenter: 'myTest',
    comment: 'another comment',
    yourComment: 'yolo',
    commentID: '20ao042341th',
    commentSectionURL: 'test.com/anotherurl'
  }
]

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <div className={styles.notification}>
        <NotificationList
          notifications={test}
        >Replies</NotificationList>
        <NotificationList
          notifications={[]}
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
  return {}
}

Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
