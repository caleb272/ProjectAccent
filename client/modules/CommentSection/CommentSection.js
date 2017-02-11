import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCommentsRequest, getFiltersRequest, commentOnURLRequest } from './CommentSectionActions'
import { getComments, getFilters } from './CommentSectionReducer'
import { createUserBasedSortAndFilter } from '../User/UserReducer'
import WebsiteInputBar from './components/WebsiteInputBar/WebsiteInputBar'
import CommentInputBar from './components/CommentInputBar/CommentInputBar'
import Comment from './components/Comment/Comment'
import { isValidURL } from '../../util/URLTools'

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
    this.props.dispatch(getFiltersRequest())
    if (this.state.websiteLink)
      this.onWebsiteFormSubmit(this.state.websiteLink)
  }


  onWebsiteFormSubmit(websiteLink) {
    this.setState({ websiteLink })
    this.props.dispatch(getCommentsRequest(websiteLink, this.props.createdUserBasedSortAndFilter))
    this.showCommentInput(true)
    this.props.history.push(`/form/${encodeURIComponent(websiteLink)}`)
  }


  onCommentFormSubmit(comment, parentID) {
    const url = this.state.websiteLink
    if (url && comment)
      this.props.dispatch(commentOnURLRequest(comment, url, parentID, this.props.createdUserBasedSortAndFilter))
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


const mapStateToProps = (store, props) => {
  return {
    comments: getComments(store),
    filters: getFilters(store),
    link: (isValidURL(props.params.link) ? props.params.link : null),
    createdUserBasedSortAndFilter: createUserBasedSortAndFilter(store.user)
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  createdUserBasedSortAndFilter: PropTypes.func,
  link: PropTypes.string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection)
