import React, { PropTypes } from 'react';

function CommentInputBar(props) {
  return (
    <div className="row">
      <form onSubmit={props.onCommentFormSubmit} className="col s12">
        <div className="input-field col s12">
          <input
            type="text"
            id="comment-input"
            autoComplete="false"
            autoCorrect="false"
            className="validate"
          />
          <label htmlFor="comment-input" className="active">Comment:</label>
        </div>
      </form>
    </div>
  )
}

CommentInputBar.propTypes = {
  onCommentFormSubmit: PropTypes.func.isRequired
}

export default CommentInputBar
