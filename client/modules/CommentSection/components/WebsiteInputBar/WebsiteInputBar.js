import React, { PropTypes, Component } from 'react'
import url from 'url'

import style from './WebsiteInputBar.css'

class WebsiteInputBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputBarExpanded: false,
      inputText: '',
      lastRequestedURL: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.isValidURL = this.isValidURL.bind(this)
    this.expand = this.expand.bind(this)
    this.contract = this.contract.bind(this)
  }


  handleInputChange({ target: { value: inputText } }) {
    this.setState({ inputText })
  }


  handleOnSubmit(e) {
    e.preventDefault()
    if (!this.isValidURL(this.state.inputText))
      return

    console.log(url.parse(this.state.inputText))
    this.props.onWebsiteFormSubmit(this.state.inputText)
    this.setState({ lastRequestedURL: this.state.inputText })
    this.setState({ inputBarExpanded: (this.state.inputText.length > 0) })
    // e.blur()
  }


  isValidURL(rawURL) {
    const parsedURL = url.parse(rawURL)
    const hasProtocol = Boolean((parsedURL.protocol || '').length)
    const hasHost = Boolean((parsedURL.host || '').length)
    return hasProtocol && hasHost
  }


  expand() {
    this.setState({ inputBarExpanded: this.isValidURL(this.state.inputText) })
    this.props.showCommentInput(this.isValidURL(this.state.inputText))
  }


  contract() {
    this.setState({ inputBarExpanded: false })
    this.props.showCommentInput(false)
  }


  render() {
    return (
      <div className={`row ${style['website-input-bar']}`}>
        <form
          onSubmit={this.handleOnSubmit}
          className="col s12"
        >
          <div className="input-field col s12">
            <input
              ref="test_hoc"
              id="website"
              onChange={this.handleInputChange}
              onFocus={this.contract}
              onBlur={this.expand}
              type="text"
              className={`validate ${this.state.inputBarExpanded ? style.complete : ''}`}
              placeholder="Website"
              autoComplete="off"
              autoFocus="true"
              value={this.state.inputText}
            />
          </div>
        </form>
      </div>
    )
  }
}

// className={`validate ${this.checkComplete}`}
// <label htmlFor="website">Website</label>

WebsiteInputBar.propTypes = {
  onWebsiteFormSubmit: PropTypes.func.isRequired,
  showCommentInput: PropTypes.func.isRequired
}

export default WebsiteInputBar
