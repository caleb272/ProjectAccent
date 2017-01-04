import React, { PropTypes } from 'react';

function Comment(props) {
  const comment = props.comment
  return (
    <div>
      <h4>{comment.username}</h4>
      <p style={{ marginLeft: '20px' }}>{comment.message}</p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

export default Comment
