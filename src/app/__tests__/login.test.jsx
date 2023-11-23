import { render, screen, waitFor } from '@testing-library/react'
import Page from '../(auth)/login/page'
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

    const emailInput = screen.getByLabelText(/Email Address/)
    await user.type(emailInput, 'test1@mail.com')
    expect(emailInput).toHaveValue('test1@mail.com')

    const passwordInput = screen.getByLabelText(/Password/)
    await user.type(passwordInput, 'test123')
    expect(passwordInput).toHaveValue('test123')

    const signupButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(signupButton)

    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('should Sign Up user and display error message', async () => {
    render(
      <ReduxProvider>
        <Page />
      </ReduxProvider>
    )
    const user = userEvent.setup()

    const emailInput = screen.getByLabelText(/Email Address/)
    await user.type(emailInput, 'testt@mail.com')
    expect(emailInput).toHaveValue('testt@mail.com')

    const passwordInput = screen.getByLabelText(/Password/)
    await user.type(passwordInput, 'test123')
    expect(passwordInput).toHaveValue('test123')

    const signupButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(signupButton)
    await waitFor(() => {
      const message = screen.getByText(
        /Login failed. Please check your email and password./
      )
      expect(message).toBeInTheDocument()
    })
  })
})
