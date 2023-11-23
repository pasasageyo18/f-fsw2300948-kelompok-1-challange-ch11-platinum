'use client'
import { useEffect, useState } from 'react'
import { Link } from '@nextui-org/react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../store/firebase'

export default function Page() {
  const [users, setUsers] = useState([])
  const [expandedUser, setExpandedUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users')
        const querySnapshot = await getDocs(usersRef)

        const userList = []
        querySnapshot.forEach((doc) => {
          userList.push(doc.data())
        })

        setUsers(userList)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleCardClick = (user) => {
    if (expandedUser === user) {
      setExpandedUser(null)
    } else {
      setExpandedUser(user)
    }
  }

  return (
    <>
      <div className="container ml-64 mt-10 flex gap-2">
        <Link aria-current="page" data-testid="link" href="user-list">
          User List
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center my-5 w-3/4 animate__animated animate__fadeInUp dark:bg-black dark:shadow-md dark:shadow-black bg-white py-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-5">User List</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-testid="user-list"
          >
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <div
                  className="border border-gray-300 shadow-lg rounded p-4 cursor-pointer"
                  data-testid="user-info"
                  key={index}
                  onClick={() => handleCardClick(user)}
                >
                  <p className="text-lg font-semibold" data-testid="user-name">
                    Username: {user.username}
                  </p>
                  <p className="text-lg">Total Score: {user.total_score}</p>
                  {expandedUser === user && (
                    <div className="mt-3">
                      <p>Bio: {user.bio}</p>
                      <p>City: {user.city}</p>
                      <p>Social Media: {user.social_media}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
