import React, { PropTypes } from 'react'

function WebsiteInputBar(props) {
  return (
    <form onSubmit={props.onWebsiteFormSubmit}>
      <label htmlFor="url-input">WEBSITE:</label>
      <input
        type="url"
        id="url-input"
        autoComplete="false"
        autoCorrect="false"
        autoFocus="true"
      />
    </form>
  )
}

WebsiteInputBar.propTypes = {
  onWebsiteFormSubmit: PropTypes.func.isRequired
}

export default WebsiteInputBar
