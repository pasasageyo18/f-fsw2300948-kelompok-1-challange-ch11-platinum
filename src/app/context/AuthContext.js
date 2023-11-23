import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../store/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { login, logout } from '../redux/auth/auth'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [username, setUsername] = useState()
  const [isLogin, setIsLogin] = useState(false)
  const [authLoaded, setAuthLoaded] = useState(false)
  const dispatch = useDispatch()

  const getUserData = async (authUser) => {
    const userId = authUser.uid
    const userDocRef = doc(db, 'users', userId)

    try {
      const userDocSnapshot = await getDoc(userDocRef)
      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data()
      } 
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authUser = auth.currentUser
        if (authUser) {
          localStorage.setItem('currentUser', JSON.stringify(authUser))
          const userData = await getUserData(authUser)
          if (userData) {
            localStorage.setItem('currentUserUid', authUser.uid)
            localStorage.setItem('currentUserUsername', userData.username)
            setUsername(userData.username)
            setIsLogin(true)
            dispatch(login())
          } else {
            setIsLogin(false)
          }
        } else {
          setIsLogin(false)
        }
        // set authLoaded to true when authentication state is checked
        setAuthLoaded(true)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUserData()
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  const handleLogout = async () => {
    if (isLogin) {
      console.log('logout called')
      try {
        await auth.signOut()
        // clear all user-related data from localStorage when the user logs out
        localStorage.clear()
        setUsername(null)
        setIsLogin(false)
        dispatch(logout())
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }
  }

  const value = {
    username,
    isLogin,
    logout: handleLogout,
  }

  return (
    <AuthContext.Provider value={value}>
      {authLoaded ? children : null}
    </AuthContext.Provider>
  )
}
