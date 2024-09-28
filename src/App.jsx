import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import Home from './view/home'
import Admin from './view/admin'
import './App.css'

function App() {
  const [announcements, setAnnouncements] = useState([])

  if (typeof global === 'undefined') {
    window.global = window;
  }

  const getAnnouncements = () => {
    const db = getDatabase()
    const link = ref(db, '/announcement')

    onValue(link, (snapshot) => {
      const data = snapshot.val();
      // let data_list = [];

      // for (let key in data) {
      //     if (data.hasOwnProperty(key)) {
      //         data_list.push(data[key]);
      //     }
      // }
      setAnnouncements(data);
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
        <Route path='/' element={<Home announcements={announcements} />} />
        <Route path='/admin' element={<Admin announcements={announcements} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
