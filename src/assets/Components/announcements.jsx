import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, onValue } from 'firebase/database'


export default function announcements({ announcements }) {

    return (
        <div id='announcements'>
            <h2>Announcements</h2>
            <div>
                {announcements ? (
                    Object.entries(announcements).map(([key, announcementObj], index) => (
                        <div key={key}>
                            <p>{announcementObj.announcement}</p>
                        </div>
                    ))
                ) : (
                    <p>No announcements available</p>
                )}
            </div>
        </div>
    )
}
