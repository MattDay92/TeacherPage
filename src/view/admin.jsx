import React from 'react'
import { getDatabase, ref, set } from "firebase/database";


export default function admin() {

    const addAnnouncement = (event) => {
        event.preventDefault()
        const db = getDatabase();

        const announcement = event.target.announcement.value

        set(ref(db, 'announcement'), {
            announcement
        })
    }


    return (
        <div id='admin'>
            <form onSubmit={addAnnouncement}>
                <input className='form-control' name='announcement' placeholder='Add Announcement' />
                <button className='btn btn-primary' type='submit'>Submit Announcement</button>
            </form>
        </div>
    )
}
