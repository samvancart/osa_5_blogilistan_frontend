import React from 'react'
import Blog from './Blog'

const Content = (props) => {
    return (
        props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )
    )
}
export default Content
