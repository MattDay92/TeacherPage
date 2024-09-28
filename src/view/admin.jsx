import React from 'react'
import { getDatabase, push, ref, remove, set } from "firebase/database";


export default function admin({ announcements }) {

    const addAnnouncement = (event) => {
        event.preventDefault()
        const db = getDatabase();

        const announcement = event.target.announcement.value

        set(push(ref(db, 'announcement')), {
            announcement
        })
    }

    const deleteAnnouncement = (key) => {

        const db = getDatabase();

        remove(ref(db, `announcement/${key}`))
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
                    {announcements ? (
                        Object.entries(announcements).map(([key, announcementObj], index) => (
                            <div key={key}>
                                <p>{announcementObj.announcement}</p>
                                <button onClick={() => deleteAnnouncement(key)} className='btn btn-sm mb-2 btn-danger'>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No announcements available</p>
                    )}
                </div>
            </div>
        </div>
    )
}
