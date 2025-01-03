import React, { useState, useEffect } from 'react'
import Clock from '../assets/Components/clock'
import Announcements from '../assets/Components/announcements'
import FCHSLogo from '../assets/Photos/FCHSLogo.png'
import '../App.css'

export default function home({ showSchedule, announcements }) {
  const [day, setDay] = useState(null)

  useEffect(() => {
    setDay(new Date().getDay())
  }, [])

  return (
    <>
      <img className='FCHSLogo' src={FCHSLogo} />

      <Clock />

      {showSchedule === 'show' ?
        <div id='bellschedule'>
          <h2>Bell Schedule</h2>
          {[1, 2, 5].includes(day) ?
            <>
              <p>Period 1: 7:45 AM - 8:31 AM</p>
              <p>Period 2: 8:36 AM - 9:22 AM</p>
              <p>Period 3: 9:27 AM - 10:13 AM</p>
              <p>Period 4: 10:18 AM - 11:04 AM</p>
              <p>Period 5: 11:09 AM - 1:04 PM</p>
              <p>L1: 11:04 AM - 11:34 AM</p>
              <p>L2: 11:34 AM - 12:04 PM</p>
              <p>L3: 12:04 PM - 12:34 PM</p>
              <p>L4: 12:34 PM - 1:04 PM</p>
              <p>Period 6: 1:09 PM - 1:55 PM</p>
              <p>Period 7: 2:00 PM - 2:45 PM</p>
            </> : day === 3 ?
              <>
                <p>Period 1: 7:45 AM - 9:10 AM</p>
                <p>Period 3: 9:15 AM - 10:40 AM</p>
                <p>COACH:  10:45 AM - 11: 15 AM</p>
                <p>Period 5: 11:20 AM - 1:15 PM</p>
                <p>L1: 11:15 AM - 11:45 AM</p>
                <p>L2: 11:45 AM - 12:15 PM</p>
                <p>L3: 12:15 PM - 12:45 PM</p>
                <p>L4: 12:45 PM - 1:15 PM</p>
                <p>Period 7: 1:20 PM - 2:45 PM</p>
              </> : day === 4 ?
                <>
                  <p>Period 2: 8:30 AM - 9:55 AM</p>
                  <p>COACH:  10:00 AM - 11:15 AM</p>
                  <p>Period 4: 11:20 AM - 1:15 PM</p>
                  <p>L1: 11:15 AM - 11:45 AM</p>
                  <p>L2: 11:45 AM - 12:15 PM</p>
                  <p>L3: 12:15 PM - 12:45 PM</p>
                  <p>L4: 12:45 PM - 1:15 PM</p>
                  <p>Period 6: 1:20 PM - 2:45 PM</p>
                </> :
                <>
                  <h2>There is no school today!</h2>
                </>}
        </div>
        :
        <></>
      }

      <Announcements announcements={announcements} />

    </>
  )
}
