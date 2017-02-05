import React, { PropTypes } from 'react';

import styles from '../../Notification.css'

function NotificationListItem(props) {
  const originalURL = `https://${props.commentSectionURL}`
  const linkToComment = `/form/${encodeURIComponent(originalURL)}`
  return (
    <li className={`collection-item dismissable ${styles['notification-item']}`}>
      <span>
        {props.commenter} replied &quot;{props.yourComment}&quot; to &quot;{props.comment}&quot; in <a href={linkToComment}>{props.commentSectionURL}</a>
      </span>
      <i className="secondary-content material-icons">clear</i>
    </li>
  )
}

NotificationListItem.propTypes = {
  commenter: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  yourComment: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  commentSectionURL: PropTypes.string.isRequired
}

export default NotificationListItem
