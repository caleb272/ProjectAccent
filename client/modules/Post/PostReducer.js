import { ADD_POST, ADD_POSTS, DELETE_POST } from './PostActions'

const initialState = { data: [] }

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      }

    case ADD_POSTS :
      return {
        data: action.posts,
      }

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      }

    default:
      return state;
  }
}

export const getPosts = state => state.posts.data

export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0]

export default PostReducer
