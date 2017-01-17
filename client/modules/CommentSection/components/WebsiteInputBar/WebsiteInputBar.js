import React, { PropTypes } from 'react'

function WebsiteInputBar(props) {
  return (
    <div className="row">
      <form
        onSubmit={props.onWebsiteFormSubmit}
        className="col s12"
      >
        <div className="input-field col s12">
          <input
            id="website"
            type="text"
            className="validate"
          />
          <label htmlFor="website">Website</label>
        </div>
      </form>
    </div>
  )
}

WebsiteInputBar.propTypes = {
  onWebsiteFormSubmit: PropTypes.func.isRequired
}

export default WebsiteInputBar
