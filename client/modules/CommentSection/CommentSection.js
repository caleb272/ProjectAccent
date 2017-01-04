import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCommentsRequest } from './CommentSectionActions'
import { getComments } from './CommentSectionReducer'
import Comment from './components/Comment/Comment'

// Import Style
// import styles from './CommentSection.css' for some reason this is fucking node over

class CommentSection extends Component {
  constructor(props) {
    super(props)

    this.onWebsiteFormSubmit = this.onWebsiteFormSubmit.bind(this)
  }


  componentDidMount() {
    // this.props.dispatch(getCommentsRequest())
  }


  onWebsiteFormSubmit(e) {
    e.preventDefault()
    const websiteLink = e.target.children[1].value
    this.props.dispatch(getCommentsRequest(websiteLink))
  }


  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onWebsiteFormSubmit}>
            <label htmlFor="url-input">WEBSITE:</label>
            <input
              type="url"
              id="url-input"
            />
          </form>
        </div>

        {this.props.comments.map((comment) => (<Comment comment={comment} key={`${comment.username}${comment.message}`} />))}
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
