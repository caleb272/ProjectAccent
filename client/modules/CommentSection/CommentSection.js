import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCommentsRequest, commentOnURLRequest } from './CommentSectionActions'
import { getComments } from './CommentSectionReducer'
import WebsiteInputBar from './components/WebsiteInputBar/WebsiteInputBar'
import CommentInputBar from './components/CommentInputBar/CommentInputBar'
import Comment from './components/Comment/Comment'

// Import Style
// import styles from './CommentSection.css' for some reason this is fucking node over

class CommentSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      websiteLink: ''
    }

    this.onWebsiteFormSubmit = this.onWebsiteFormSubmit.bind(this)
    this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this)
  }


  componentDidMount() {
    // this.props.dispatch(getCommentsRequest()) // make this get get called with the website url that the website is called with
  }


  onWebsiteFormSubmit(e) {
    e.preventDefault()
    const websiteLink = e.target.children[1].value
    this.setState({ websiteLink })
    this.props.dispatch(getCommentsRequest(websiteLink))
  }


  onCommentFormSubmit(e) {
    e.preventDefault()
    const url = this.state.websiteLink
    const comment = e.target.children[1].value

    if (url && comment)
      this.props.dispatch(commentOnURLRequest(comment, url))
  }


  render() {
    return (
      <div>
        {
          this.state.websiteLink.length === 0 ?
            <WebsiteInputBar onWebsiteFormSubmit={this.onWebsiteFormSubmit} />
            : <CommentInputBar onCommentFormSubmit={this.onCommentFormSubmit} />
        }
        {
          this.props.comments.map((comment) =>
            (<Comment comment={comment} key={`${comment.username}${comment.comment}${comment.cuid}`} />))
        }
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
