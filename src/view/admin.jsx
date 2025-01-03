import React, {useState, useEffect} from 'react'


export default function admin({ user, showSchedule, changeShowSchedule, announcements, setAnnouncements, getAnnouncements }) {

    const backendURL = import.meta.env.VITE_BACKENDURL

    const addAnnouncement = async (event) => {
        event.preventDefault()
        const reqBody = {
            text: event.target.announcement.value,
            userID: user.uid
        }

        console.log(reqBody)

        try {
            const response = await fetch(`${backendURL}/api/Announcement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            })

            getAnnouncements()
        } catch (error) {
            console.error(error)
        }
    }

    const deleteAnnouncement = async (id) => {

        const reqBody = {
            id: id
        }

        console.log(reqBody)

        try {
            const response = await fetch(`${backendURL}/api/Announcement/delete/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            })

            getAnnouncements()
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div id='admin'>
            <form className='announcement-form' onSubmit={addAnnouncement}>
                <input className='form-control' name='announcement' placeholder='Add Announcement' />
                <button className='btn btn-primary' type='submit'>Submit Announcement</button>
            </form>

            <div id='announcements'>
                <h2>Announcements</h2>
                <div>
                    {announcements && announcements.length > 0 ? <>
                        {announcements.map(i => <>
                            <p key={i.id}>{i.text}</p>
                            <btn onClick={() => { deleteAnnouncement(i.id) }} className='btn btn-sm btn-danger'>Delete</btn>
                        </>)}
                    </>
                        : (
                            <p>No announcements available</p>
                        )}
                </div>
            </div>

                        <div className='d-flex justify-content-center my-5'>
            {showSchedule === 'show' ?
                <button className='btn btn-primary d-flex ' onClick={() => { changeShowSchedule('hide') }}>Hide Schedule</button>
                :
                <button className='btn btn-primary d-flex ' onClick={() => { changeShowSchedule('show') }}>Show Schedule</button>
            }
            </div>

        </div>
    )
}
