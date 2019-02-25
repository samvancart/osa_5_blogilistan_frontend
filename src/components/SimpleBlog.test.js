import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

const blog = {
    title: 'blog 1',
    author: 'author 1',
    likes: 2
}

describe('blog', () => {
    let component
    beforeEach(() => {
        component = render(
            <SimpleBlog blog={blog} />
        )
        component.debug()
    })

    it('renders correct title', () => {
        const div = component.container.querySelector('.titleAndAuthor')
        expect(div).toHaveTextContent(
            'blog 1'
        )
    })

    it('renders correct author', () => {
        const div = component.container.querySelector('.titleAndAuthor')
        expect(div).toHaveTextContent(
            'author 1'
        )
    })

    it('renders correct number of likes', () => {
        const div = component.container.querySelector('.likes')
        expect(div).toHaveTextContent(
            2
        )
    })
})

describe('like button', () => {

    it('calls onClick twice when like button is clicked twice', () => {
        const blog = {
            title: 'blog 1',
            author: 'author 1',
            likes: 2
        }
        const mockHandler = jest.fn()

        const { getByText } = render(
            <SimpleBlog blog={blog} onClick={mockHandler}/>
        )
        const button = getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})