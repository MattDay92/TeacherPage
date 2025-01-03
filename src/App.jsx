import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Home from './view/home'
import Admin from './view/admin'
import './App.css'

function App() {
  const [announcements, setAnnouncements] = useState(() => {
    const savedAnnouncements = localStorage.getItem('announcements')
    return savedAnnouncements ? JSON.parse(savedAnnouncements) : []
  })
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showSchedule, setShowSchedule] = useState(localStorage.getItem('schedule'))

  const backendURL = import.meta.env.VITE_BACKENDURL

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signIn = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;

          setUser(user)

        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);

        });
    } else {
      console.log("Already signed in")
    }
  }

  if (typeof global === 'undefined') {
    window.global = window;
  }


  const getAnnouncements = async () => {
    try {
      const response = await fetch(`${backendURL}/api/Announcement/${user.uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      })
      const data = await response.json();

      console.log(data.announcements)

      setAnnouncements(data.announcements)
    } catch (error) {
      console.error(error)
    }
  }

  const changeShowSchedule = (change) => {
    if(change === 'show') {
      setShowSchedule('show')
      localStorage.setItem('schedule', change)
    } else {
      setShowSchedule('hide')
      localStorage.setItem('schedule', change)
    }
  }

  const createUser = async () => {
    const reqBody = {
      userID: user.uid,
      name: user.displayName,
      email: user.email,
      profileIMG: user.photoURL,
    }

    try {
      const response = await fetch(`${backendURL}/api/Users/${user.uid}`);
      const data = await response.json();
      console.log('done')

      if (data.exists === false) {
        const response = await fetch(`${backendURL}/api/Users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBody),
        });
      } else {
        console.log(`User ${user.displayName} already exists.`)


        // getProfileInfo(data.user)
        // localStorage.setItem('profile_marvelous', JSON.stringify(data.user))
      }
    } catch (error) {
      console.error(error)
    }
  };

  const signOut = () => {
    setUser(null)
    setAnnouncements([])
    setShowSchedule('show')
    localStorage.removeItem('user')
    localStorage.removeItem('announcements')
    localStorage.removeItem('schedule')
  }


  useEffect(() => {
    getAnnouncements()
  }, [user])

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements))
  }, [announcements])

  useEffect(() => {
    createUser()
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user]
  )

  return (
    <BrowserRouter>

      {user ? <>
        <div class="dropdown">
          <div type="button" data-bs-toggle="dropdown" aria-expanded="false"><img className='userIMG ' src={user.photoURL} /></div>
          <ul className="dropdown-menu">
            <div className="dropdown-item" onClick={signOut}>Sign Out</div>
          </ul>
        </div>
      </> :
        <a onClick={signIn} className="signinbtn btn btn-primary">Sign In</a>
      }


      <Routes>
        <Route path='/' element={<Home showSchedule={showSchedule} announcements={announcements} />} />
        <Route path='/admin' element={<Admin user={user} showSchedule={showSchedule} changeShowSchedule={changeShowSchedule} announcements={announcements} setAnnouncements={setAnnouncements} getAnnouncements={getAnnouncements} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
