import React, { PropTypes } from 'react';

function CommentInputBar(props) {
  return (
    <form onSubmit={props.onCommentFormSubmit}>
      <label htmlFor="comment-input">Comment:</label>
      <input
        type="text"
        id="comment-input"
        autoComplete="false"
        autoCorrect="false"
      />
    </form>
  )
}

CommentInputBar.propTypes = {
  onCommentFormSubmit: PropTypes.func.isRequired
}

export default CommentInputBar
