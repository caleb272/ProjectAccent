import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCommentsRequest, commentOnURLRequest } from './CommentSectionActions'
import { getComments } from './CommentSectionReducer'
import WebsiteInputBar from './components/WebsiteInputBar/WebsiteInputBar'
import CommentInputBar from './components/CommentInputBar/CommentInputBar'
import Comment from './components/Comment/Comment'

// Import Style for some reason this is fucking node over
import styles from './CommentSection.css'

class CommentSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      websiteLink: '',
      showCommentInput: false
    }

    this.onWebsiteFormSubmit = this.onWebsiteFormSubmit.bind(this)
    this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this)
    this.showCommentInput = this.showCommentInput.bind(this)
  }


  componentDidMount() {
    // this.props.dispatch(getCommentsRequest()) // make this get get called with the website url that the website is called with
  }


  onWebsiteFormSubmit(websiteLink) {
    this.setState({ websiteLink })
    this.props.dispatch(getCommentsRequest(websiteLink))
    this.showCommentInput(true)
  }


  onCommentFormSubmit(e) {
    e.preventDefault()
    const url = this.state.websiteLink
    const comment = e.target.children[0].children[0].value
    e.target.children[0].children[0].value = ''

    if (url && comment)
      this.props.dispatch(commentOnURLRequest(comment, url))
  }


  showCommentInput(showCommentInput) {
    this.setState({ showCommentInput })
  }


  createComment(comment) {
    return (
      <Comment
        comment={comment}
        key={`${comment.username}${comment.comment}${comment.cuid}`}
      />
    )
  }


  render() {
    return (
      <div className={styles['comment-section']}>
        <WebsiteInputBar
          onWebsiteFormSubmit={this.onWebsiteFormSubmit}
          showCommentInput={this.showCommentInput}
        />
        <div className={styles.comments}>
          {this.state.showCommentInput
              ? <CommentInputBar onCommentFormSubmit={this.onCommentFormSubmit} /> : null}
          {this.state.showCommentInput
              ? this.props.comments.map(this.createComment) : null}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    comments: getComments(state)
  }
}


const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

// CommentSection.need = [
//   () => getCommentsRequest()
// ]

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection)
