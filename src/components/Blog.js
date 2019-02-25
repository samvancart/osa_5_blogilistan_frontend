import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const [contentVisible, setContentVisible] = useState('')

    const hide = { display: contentVisible ? 'none' : '' }
    const show = { display: contentVisible ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (

        <div style={blogStyle}>
            <div>
                <div style={hide}>
                    <div onClick={() => setContentVisible(true)} style={{ cursor: 'pointer' }}>
                        <p>
                            {blog.title} {blog.author}
                        </p>
                    </div>
                </div>
            </div>
            <div style={show}>
                <div onClick={() => setContentVisible(false)} style={{ cursor: 'pointer' }}>
                    <p>{blog.title} {blog.author}</p>
                </div>
                <div>
                    <a href={'/'}>{blog.url}</a>
                    <p>{`${blog.likes} likes`} <button>like</button></p>
                    <p>{`added by ${blog.user.name}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Blog