import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const username = useField('text')
    const password= useField('password')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [blogs])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    })


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username:username.value,password:password.value
            })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedInBlogAppUser', JSON.stringify(user)
            )
            setUser(user)
            username.onReset()
            password.onReset()
        } catch (exception) {
            username.onReset()
            password.onReset()
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }
    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem(
            'loggedInBlogAppUser', JSON.stringify(user)
        )
        window.location.reload()
    }



    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
              käyttäjätunnus
                <input {...username}/>
            </div>
            <div>
            salasana
                <input {...password}/>
            </div>
            <button type="submit">kirjaudu</button>
        </form>
    )



    if (user === null) {
        return (
            <div>
                <Notification message={errorMessage} />
                <h2>log in to application</h2>
                {loginForm()}
            </div>
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <div>
                <Notification message={message} />
                <p>{user.name} logged in</p>
            </div>
            <button onClick={handleLogout}>logout</button>
            <h2>create new</h2>
            < NewBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
        </div>
    )
}

export default App