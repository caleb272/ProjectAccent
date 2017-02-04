import React, { PropTypes, Component } from 'react'
import { isValidURL } from '../../../../util/URLTools'

import style from './WebsiteInputBar.css'

class WebsiteInputBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputBarExpanded: false,
      inputText: props.defaultURL || '',
      lastRequestedURL: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.expand = this.expand.bind(this)
    this.contract = this.contract.bind(this)
  }

  handleInputChange({ target: { value: inputText } }) {
    this.setState({ inputText })
  }


  handleOnSubmit(e) {
    if (e)
      e.preventDefault()
    if (!isValidURL(this.state.inputText))
      return

    this.props.onWebsiteFormSubmit(this.state.inputText)
    this.setState({ lastRequestedURL: this.state.inputText })
    this.setState({ inputBarExpanded: (this.state.inputText.length > 0) })
    // e.blur()
  }


  expand() {
    const inputText = this.state.inputText
    const isInputValid = isValidURL(inputText)
    this.setState({ inputBarExpanded: isInputValid })
    this.props.showCommentInput(isInputValid)
    if (isInputValid && inputText !== this.state.lastRequestedURL)
      this.handleOnSubmit()
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
  showCommentInput: PropTypes.func.isRequired,
  defaultURL: PropTypes.string
}

export default WebsiteInputBar
