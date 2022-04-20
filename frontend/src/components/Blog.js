import React, { Component } from 'react'

import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateBlog, deleteBlog } from '../actions/blog_actions'
import BlogDataService from '../services/blog_services'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.getBlog = this.getBlog.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.removeBlog = this.removeBlog.bind(this)
    this.state = {
      currentBlog: {
        id: null,
        title: '',
        description: '',
        published: false,
      },
      message: '',
    }
  }

  componentDidMount() {
    this.getBlog(this.props.params.id)
  }

  onChangeTitle(e) {
    const title = e.target.value
    this.setState(function (prevState) {
      return {
        currentBlog: {
          ...prevState.currentBlog,
          title: title,
        },
      }
    })
  }

  onChangeDescription(e) {
    const description = e.target.value
    this.setState((prevState) => ({
      currentBlog: {
        ...prevState.currentBlog,
        description: description,
      },
    }))
  }

  getBlog(id) {
    BlogDataService.get(id)
      .then((res) => {
        this.setState({
          currentBlog: res.data,
        })
        // console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentBlog.id,
      title: this.state.currentBlog.title,
      description: this.state.currentBlog.description,
      published: status,
    }

    this.props
      .updateBlog(this.state.currentBlog.id, data)
      .then((res) => {
        // console.log(res)
        this.setState((prevState) => ({
          currentBlog: {
            ...prevState.currentBlog,
            published: status,
          },
        }))
        this.setState({ message: 'The status was updated' })
      })
      .catch((err) => console.log(err))
  }

  updateContent() {
    this.props
      .updateBlog(this.state.currentBlog.id, this.state.currentBlog)
      .then((res) => {
        // console.log(res)
        this.setState({ message: 'The tutorial was updated' })
      })
      .catch((err) => console.log(err))
  }

  removeBlog() {
    this.props
      .deleteBlog(this.state.currentBlog.id)
      .then(() => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { currentBlog } = this.state
    return (
      <div>
        {currentBlog ? (
          <div>
            <h4>Blog</h4>
            <form>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  value={currentBlog.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  value={currentBlog.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className='form-group'>
                <label>
                  <strong>Status: </strong>
                </label>
                {currentBlog.published ? 'Published' : 'Pending'}
              </div>
            </form>
            {currentBlog.published ? (
              <button
                className='m-3 btn btn-sm btn-primary'
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className='m-3 btn btn-sm btn-primary'
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}
            <button
              className='m-3 btn btn-sm btn-danger'
              onClick={this.removeBlog}
            >
              Delete
            </button>
            <button
              className='m-3 btn btn-sm btn-success'
              type='submit'
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    )
  }
}

export default connect(null, { updateBlog, deleteBlog })(Blog)
