import React from 'react'
import { useField } from '../hooks'
import blogService from '../services/blogs'
import Content from './Content'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

const NewBlogForm = (props) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const blogFormRef = React.createRef()

    const handleCreateNewBlog = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const localStorage = window.localStorage.getItem('loggedInBlogAppUser')
        const user = JSON.parse(localStorage)
        blogService.setToken(user.token)
        try {
            await blogService.create({
                title:title.value, author:author.value, url:url.value, likes:0
            })
            title.onReset()
            author.onReset()
            url.onReset()
            props.setMessage(`added ${title.value.toUpperCase()} by ${author.value.toUpperCase()}`)
            setTimeout(() => {
                props.setMessage(null)
            }, 3000)
        } catch (e) {
            console.log(e)
        }

    }


    const blogForm = () => {
        return (
            <Toggleable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm
                    title={title}
                    author={author}
                    url={url}
                    handleSubmit={handleCreateNewBlog}
                />
            </Toggleable>
        )
    }



    return (
        <div>
            {blogForm()}
            <Content blogs={props.blogs} />
        </div>
    )

}

export default NewBlogForm




