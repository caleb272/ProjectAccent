import React, { PropTypes } from 'react';

import styles from './Comment.css'

function Comment(props) {
  function commentTimeStamp(timestamp) {
    let timeFormat = 'seconds'
    // console.log(timestamp)
    const secondsToNow = Math.floor((Date.now() - timestamp) / 1000)
    const minutesToNow = Math.floor(secondsToNow / 60)
    const hoursToNow = Math.floor(minutesToNow / 60)
    const daysToNow = Math.floor(hoursToNow / 24)
    const yearsToNow = Math.floor(daysToNow / 360)

    if (yearsToNow)
      timeFormat = 'years'
    else if (daysToNow)
      timeFormat = 'days'
    else if (hoursToNow)
      timeFormat = 'hours'
    else if (minutesToNow)
      timeFormat = 'minutes'

    const time = (yearsToNow || daysToNow || hoursToNow || minutesToNow || secondsToNow)
    return `about ${time} ${timeFormat} ago`
  }

  const comment = props.comment
  return (
    <div className={styles.comment}>
      <div>
        <h8>{comment.username}</h8>
        <span>&nbsp;-&nbsp;{commentTimeStamp(comment.timestamp)}</span>
      </div>
      <p>{comment.comment}</p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

export default Comment
