import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, onValue } from 'firebase/database'


export default function Announcements({ announcements }) {

    return (
        <div id='announcements'>
            <h2>Announcements</h2>
            <div>
                {announcements ? <>
                    {announcements.map(i => <p key={i.id}>{i.text}</p>)}
                    </>
                 : (
                    <p>No announcements available</p>
                )}
            </div>
        </div>
    )
}
