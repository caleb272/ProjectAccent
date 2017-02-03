import React, { Component, PropTypes } from 'react';
import CommentInputBar from '../CommentInputBar/CommentInputBar'

import styles from './Comment.css'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showCommentInput: false
    }

    this.toggleShowReplyInput = this.toggleShowReplyInput.bind(this)
    this.onReply = this.onReply.bind(this)
  }


  commentTimeStamp(timestamp) {
    let timeFormat = 'seconds'
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


  toggleShowReplyInput() {
    this.setState({ showCommentInput: !this.state.showCommentInput })
  }


  onReply(message) {
    this.toggleShowReplyInput()
    this.props.submitComment(message, this.props.comment.cuid)
  }


  render() {
    const comment = this.props.comment
    return (
      <div className={styles.comment}>
        <div>
          <h8>{comment.username}</h8>
          <span>&nbsp;-&nbsp;{this.commentTimeStamp(comment.timestamp)}</span>
          <button onClick={this.toggleShowReplyInput}>reply</button>
        </div>
        <p>{comment.comment}</p>
        {this.state.showCommentInput
            ? <CommentInputBar onCommentFormSubmit={this.onReply} /> : null}
      </div>
    )
  }
}


Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired
}

export default Comment
