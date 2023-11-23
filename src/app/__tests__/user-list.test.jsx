import Page from '../user-list/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { jest } from '@jest/globals'


jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}))

describe('should render Users List', () => {
  it('render user list', () => {
    render(<Page />)
    expect(screen.getByTestId('user-list')).toBeInTheDocument()
  })

  it('should be the same component', () => {
    render(<Page />)
    const userList = screen.getByTestId('user-list')
    expect(userList).toMatchSnapshot()
  })

  it('should be null', () => {
    render(<Page />)
    const userName = screen.getByTestId('user-name')
    expect(userName).toBeInTheDocument()
  })
  it('should render users info', async () => {
    render(<Page />)
    const userInfo = screen.getByTestId('user-info')
    expect(userInfo).toBeGreaterThan(1)
  })

  it('should render link', () => {
    render(<Page />)
    const link = screen.getByTestId('link')
    expect(link).toBeInTheDocument()
  })
})
