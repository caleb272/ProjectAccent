import React, { PropTypes } from 'react';

import styles from '../../Notification.css'

function NotificationListItem(props) {
  const originalURL = `https://${props.commentSectionURL}`
  const linkToComment = `/form/${encodeURIComponent(originalURL)}`

  function deleteNotification() {
    props.deleteNotification(props.commentID)
  }

  return (
    <li className={`collection-item dismissable row ${styles['notification-item']}`}>
      <span className="col s11 m11">
        {props.commenter} replied &quot;{props.comment}&quot; to &quot;{props.parentComment}&quot; in <a href={linkToComment}>{props.commentSectionURL}</a>
      </span>
      <button className="secondary-content">
        <i
          className="material-icons"
          onClick={deleteNotification}
        >clear</i>
      </button>
    </li>
  )
}

NotificationListItem.propTypes = {
  commenter: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  parentComment: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  commentSectionURL: PropTypes.string.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

export default NotificationListItem
