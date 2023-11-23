'use client'
import { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { db } from '../store/firebase'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default function ProfilePage() {
  const [newUsername, setNewUsername] = useState('')
  const [newBio, setNewBio] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newSocialMedia, setNewSocialMedia] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { username, isLogin } = useAuth()
  const currentUserCollectionId = localStorage.getItem('currentUserUid')

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    } else {
      setNewUsername(username || '')

      if (currentUserCollectionId) {
        // fetch user data from firestore and update the state
        const userDocRef = doc(db, 'users', currentUserCollectionId)
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data()
              setNewBio(data.bio || '')
              setNewCity(data.city || '')
              setNewSocialMedia(data.social_media || '')
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error)
          })
      }
    }
  }, [isLogin, username, router, currentUserCollectionId])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (currentUserCollectionId) {
        const userDocRef = doc(db, 'users', currentUserCollectionId)
        await updateDoc(userDocRef, {
          username: newUsername,
          bio: newBio,
          city: newCity,
          social_media: newSocialMedia,
        })
        alert('Profile updated successfully')
      } else {
        console.error('currentUserCollectionId is null or undefined')
        alert('Error updating profile. Please try again later.')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center flex-col my-5 w-1/2 animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-bold mb-5 mt-24">Profile</h2>
      <div className="shadow dark:shadow dark:bg-black dark:shadow-gray-950 w-full rounded bg-white p-8">
        <form className="space-y-4 md:space-y-6" onSubmit={handleProfileUpdate}>
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="username"
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="username"
            type="username"
            value={newUsername}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="biodata"
            isRequired
            label="Biodata"
            labelPlacement="outside"
            name="biodata"
            onChange={(e) => setNewBio(e.target.value)}
            placeholder="your biodata"
            type="text"
            value={newBio}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="city"
            isRequired
            label="City"
            labelPlacement="outside"
            name="city"
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="your city"
            type="text"
            value={newCity}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="social-media"
            isRequired
            label="Social Media"
            labelPlacement="outside"
            name="social-media"
            onChange={(e) => setNewSocialMedia(e.target.value)}
            placeholder="your social media"
            type="text"
            value={newSocialMedia}
          />
          <Button color="primary" isLoading={loading} type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}
