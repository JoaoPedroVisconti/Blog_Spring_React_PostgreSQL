import React from 'react'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'

function App() {
  return (
    <BrowserRouter>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/blogs'} className='navbar-brand'>
          besCoder
        </Link>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/blogs' className='nav-link'>
              Blogs
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/add' className='nav-link'>
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route exact path='/' element={<BlogList />} />
          <Route exact path='/blogs' element={<BlogList />} />
          <Route exact path='/add' element={<AddBlog />} />
          <Route exact path='/blogs/:id' element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
