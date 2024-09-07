import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getDatabase, ref, set, onValue} from 'firebase/database'
import Home from './view/home'
import Admin from './view/admin'
import './App.css'

function App() {
  const [announcements, setAnnouncements] = useState(null)

  const getAnnouncements = () => {
    const db = getDatabase()
    const list = ref(db, '/announcement')

    onValue(list, (snapshot) => {
      const data = snapshot.val();
      setAnnouncements(data.announcement)
    })
  }

  useEffect(() => {
    getAnnouncements()
  }, [])

  useEffect(() => {
    console.log(announcements)
  }, [announcements])
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
