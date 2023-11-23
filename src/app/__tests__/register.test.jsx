import { render, screen, waitFor } from '@testing-library/react'
import Page from '../(auth)/register/page'
import { ReduxProvider } from '../redux/provider'
import userEvent from '@testing-library/user-event'
import 'isomorphic-fetch'

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Register', () => {
  it('should enter username and password and click on Sign Up button', async () => {
    render(
      <ReduxProvider>
        <Page />
      </ReduxProvider>
    )
    // mockRouter.push("/home");
    const user = userEvent.setup()
    const usernameInput = screen.getByLabelText(/Username/)
    await user.type(usernameInput, 'test')
    expect(usernameInput).toHaveValue('test')

    const emailInput = screen.getByLabelText(/Email Address/)
    await user.type(emailInput, 'test@mail.com')
    expect(emailInput).toHaveValue('test@mail.com')

    const passwordInput = screen.getByLabelText(/Password/)
    await user.type(passwordInput, 'test123')
    expect(passwordInput).toHaveValue('test123')

    const signupButton = screen.getByRole('button', { name: 'Sign Up' })
    await user.click(signupButton)

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument()
  })

  it('should Sign Up user and display error message', async () => {
    render(
      <ReduxProvider>
        <Page />
      </ReduxProvider>
    )
    const user = userEvent.setup()
    const usernameInput = screen.getByLabelText(/Username/)
    await user.type(usernameInput, 'test')
    expect(usernameInput).toHaveValue('test')

    const emailInput = screen.getByLabelText(/Email Address/)
    await user.type(emailInput, 'test@mail.com')
    expect(emailInput).toHaveValue('test@mail.com')

    const passwordInput = screen.getByLabelText(/Password/)
    await user.type(passwordInput, 'test123')
    expect(passwordInput).toHaveValue('test123')

    const signupButton = screen.getByRole('button', { name: 'Sign Up' })
    await user.click(signupButton)
    await waitFor(() => {
      const message = screen.getByText(
        /Registration failed. Please check your information./
      )
      expect(message).toBeInTheDocument()
    })
  })
})
