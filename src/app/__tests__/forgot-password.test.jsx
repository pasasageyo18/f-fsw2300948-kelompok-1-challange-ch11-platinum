import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from '@/app/forgot-password/page'
import userEvent from '@testing-library/user-event'

describe('Page', () => {
  it('should enter email and click on reset password button', async () => {
    render(<Page />)
    const resetButton = screen.getByRole('button', { name: 'Reset Password' })
    // expect(loginButton).toBeDisabled();
    await userEvent.type(
      screen.getByLabelText(/Email Address/),
      'ardiafrizal1@gmail.com'
    )
    // expect(loginButton).toBeEnabled();
    await userEvent.click(resetButton)
    await waitFor(() => {
      expect(
        screen.getByText('The email has been delivered!')
      ).toBeInTheDocument()
    })
  })
  it('should have Reset Password text', () => {
    render(<Page />)
    expect(screen.getByText('Reset Password')).toBeInTheDocument()
  })

  it('should have button with text Click Me', () => {
    render(<Page />)
    expect(
      screen.getByRole('button', { name: 'Reset Password' })
    ).toBeInTheDocument()
  })

  it('should have input field with label Email Address', () => {
    render(<Page />)
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument()
  })
  it('should find input field by placeholder text Email', () => {
    render(<Page />)
    expect(screen.getByPlaceholderText(/name@company.com/)).toBeInTheDocument()
  })
})

describe('form forgot-password', () => {
  it('submiting the form', () => {
    render(<Page />)
    const submitButton = screen.getByRole('button', { name: /Reset Password/ })
    const input = screen.getByLabelText(/Email Address/)
    fireEvent.change(input, { target: { value: 'test@gmail.com' } })
    fireEvent.click(submitButton)
    const submittedMessage = screen
      .getByText('The email has been delivered!')
      .toBeInTheDocument()
    expect(submittedMessage).toBeInTheDocument()
  })
})
