'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { auth } from '../store/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { login } from '../redux/auth/auth'

export default function Form({
  title,
  buttonText,
  signText,
  signLink,
  signHref,
}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const registerHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      const userData = {
        username: username,
        email: email,
        bio: '',
        city: '',
        total_score: 0,
        social_media: '',
      }

      const db = getFirestore()
      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, userData)
      dispatch(login())
      router.push('/home')
    } catch (error) {
      setError('Registration failed. Please check your information.')
    } finally {
      setLoading(false)
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/home')
      dispatch(login())
    } catch (error) {
      setError('Login failed. Please check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:shadow-gray-950">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {title}
        </h1>
        {error && <div className="text-red-500">{error}</div>}

        <form
          className="space-y-4 md:space-y-6"
          onSubmit={title === 'Sign Up' ? registerHandler : loginHandler}
        >
          {title === 'Sign Up' && (
            <Input
              className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="username"
              isRequired
              label="Username"
              labelPlacement="outside"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              type="username"
              value={username}
            />
          )}
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
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="password"
            isRequired
            label="Password"
            labelPlacement="outside"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="your password"
            type="password"
            value={password}
          />
          {title === 'Sign In' && (
            <div className="flex items-center justify-between">
              <a
                className="dark:text-primary-500 font-medium hover:underline text-sm text-primary-600"
                href="/forgot-password"
              >
                Forgot password?
              </a>
            </div>
          )}

          <Button
            color="primary"
            isLoading={loading}
            onClick={(e) => {
              e.preventDefault()
              title === 'Sign Up' ? registerHandler(e) : loginHandler(e)
            }}
          >
            {buttonText}
          </Button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {signText}
            <a
              className="dark:text-primary-500 font-medium hover:underline text-primary-600"
              href={signHref}
            >
              {signLink}
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
