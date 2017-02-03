import React, { PropTypes } from 'react';

function CommentInputBar(props) {
  function onSubmit(e) {
    e.preventDefault()
    props.onCommentFormSubmit(e.target.children[0].children[0].value)
    e.target.children[0].children[0].value = ''
  }

  return (
    <div className="row">
      <form onSubmit={onSubmit} className="col s12">
        <div className="input-field col s12">
          <input
            type="text"
            id="comment-input"
            autoComplete="off"
            className="validate"
            autoFocus="true"
            placeholder="Comment:"
          />
        </div>
      </form>
    </div>
  )
}

// <label htmlFor="comment-input" className="active">Comment:</label>

CommentInputBar.propTypes = {
  onCommentFormSubmit: PropTypes.func.isRequired
}

export default CommentInputBar
