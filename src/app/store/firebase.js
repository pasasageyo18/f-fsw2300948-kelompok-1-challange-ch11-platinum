import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDdm472wcfGy6H1xtPe8Gs2moHRwVDXEa0',
  authDomain: 'chapter-10-70693.firebaseapp.com',
  projectId: 'chapter-10-70693',
  storageBucket: 'chapter-10-70693.appspot.com',
  messagingSenderId: '647861763015',
  appId: '1:647861763015:web:fa82f9dac12e2cd74bb7e2',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
