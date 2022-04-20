import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Blog from './Blog'

export default function WrappedComponent(props) {
  let params = useParams()

  return <Blog {...props} params={params} />
}
