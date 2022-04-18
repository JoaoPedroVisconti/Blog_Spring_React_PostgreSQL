import {
  CREATE_BLOG,
  DELETE_ALL_BLOGS,
  DELETE_BLOGS,
  FETCH_BLOGS,
  UPDATE_BLOGS,
} from '../actions/types'

const initialState = []

function blogReducer(blogs = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_BLOG:
      return [...blogs, payload]

    case FETCH_BLOGS:
      return payload

    case UPDATE_BLOGS:
      return blogs.map((blog) => {
        if (blog.id === payload.id) {
          return {
            ...blog,
            ...payload,
          }
        } else {
          return blog
        }
      })

    case DELETE_BLOGS:
      return blogs.filter(({ id }) => id !== payload.id)

    case DELETE_ALL_BLOGS:
      return []

    default:
      return blogs
  }
}

export default blogReducer
