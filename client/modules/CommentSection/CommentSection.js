import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { getCommentsRequest, commentOnURLRequest } from './CommentSectionActions'
import { getComments } from './CommentSectionReducer'
import WebsiteInputBar from './components/WebsiteInputBar/WebsiteInputBar'
import CommentInputBar from './components/CommentInputBar/CommentInputBar'
import Comment from './components/Comment/Comment'
import { isValidURL } from '../../util/URLTools'

// Import Style for some reason this is fucking node over
import styles from './CommentSection.css'

class CommentSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      websiteLink: props.link,
      showCommentInput: false
    }

    this.onWebsiteFormSubmit = this.onWebsiteFormSubmit.bind(this)
    this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this)
    this.showCommentInput = this.showCommentInput.bind(this)
    this.createComment = this.createComment.bind(this)
  }


  componentDidMount() {
    if (this.state.websiteLink)
      this.onWebsiteFormSubmit(this.state.websiteLink)
  }


  onWebsiteFormSubmit(websiteLink) {
    this.setState({ websiteLink })
    this.props.dispatch(getCommentsRequest(websiteLink))
    this.showCommentInput(true)
    this.props.history.push(`/form/${encodeURIComponent(websiteLink)}`)
  }


  onCommentFormSubmit(comment, parentID) {
    const url = this.state.websiteLink
    if (url && comment)
      this.props.dispatch(commentOnURLRequest(comment, url, parentID))
  }


  showCommentInput(showCommentInput) {
    this.setState({ showCommentInput })
  }


  createComment(comment) {
    return (
      <Comment
        comment={comment}
        submitComment={this.onCommentFormSubmit}
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
          defaultURL={this.props.link}
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


const mapStateToProps = (state, props) => {
  return {
    comments: getComments(state),
    link: (isValidURL(props.params.link) ? props.params.link : null)
  }
}


const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  link: PropTypes.string
}

// CommentSection.need = [
//   () => getCommentsRequest()
// ]

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection)
