import React, { PropTypes } from 'react'
import NotificationListItem from '../NotificationListItem/NotificationListItem'

import styles from '../../Notification.css'

function NotificationList(props) {
  return (
    <ul className={`collection with-header ${styles['notification-collection']}`}>
      <li className={`collection-header ${styles['collection-header']}`}>
        <h5>{props.children}</h5>
      </li>
      {props.notifications.map(nli =>
        <NotificationListItem
          {...nli}
          deleteNotification={props.deleteNotification}
          key={`${nli.commentor}${nli.commentID}`}
        />
      )}
    </ul>
  )
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      commenter: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      parentComment: PropTypes.string.isRequired,
      commentID: PropTypes.string.isRequired,
      commentSectionURL: PropTypes.string.isRequired
    })
  ).isRequired,
  deleteNotification: PropTypes.func.isRequired,
  children: PropTypes.string
}

export default NotificationList
