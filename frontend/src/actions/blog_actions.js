import {
  CREATE_BLOG,
  DELETE_ALL_BLOGS,
  DELETE_BLOGS,
  FETCH_BLOGS,
  UPDATE_BLOGS,
} from './types'

import BlogDataService from '../services/blog_services'

// Create a blog
export const createBlog = (title, description) => async (dispatch) => {
  try {
    const res = await BlogDataService.create({ title, description })

    dispatch({
      type: CREATE_BLOG,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

// Fetch all blogs
export const fetchBlogs = () => async (dispatch) => {
  try {
    const res = await BlogDataService.getAll()

    console.log(res.data)

    dispatch({
      type: FETCH_BLOGS,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

// Update blog
export const updateBlog = (id, data) => async (dispatch) => {
  try {
    const res = await BlogDataService.update(id, data)

    dispatch({
      type: UPDATE_BLOGS,
      payload: data,
    })

    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

// Delete blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    await BlogDataService.delete(id)

    dispatch({
      type: DELETE_BLOGS,
      payload: { id },
    })
  } catch (error) {
    console.log(error)
  }
}

// Delete all blogs
export const deleteAllBlogs = () => async (dispatch) => {
  try {
    const res = await BlogDataService.deleteAll()

    dispatch({
      type: DELETE_ALL_BLOGS,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

// Find blog by title
export const findBlogByTitle = (title) => async (dispatch) => {
  try {
    const res = await BlogDataService.findByTitle(title)

    dispatch({
      type: FETCH_BLOGS,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}
