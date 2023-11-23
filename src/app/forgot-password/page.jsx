'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../store/firebase'

export default function Page() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('The email has been delivered!')
        setSuccess(true)
      })
      .catch(() => {
        setMessage('Error, something is not right...')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:shadow-gray-950">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Reset Password
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleReset}>
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="email"
            isRequired
            label="Email Address"
            labelPlacement="outside"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            type="email"
            value={email}
          />
          <Button color="primary" isLoading={loading} type="submit">
            Reset Password
          </Button>
        </form>
        {success ? (
          <p className={'font-semibold text-green-600'}>{message}</p>
        ) : (
          <p className={'font-semibold text-red-600'}>{message}</p>
        )}
      </div>
    </div>
  )
}
