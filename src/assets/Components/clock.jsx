import React, { useState, useEffect } from 'react'

const Clock = () => {
    const [ctime, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000) 

        return () => clearInterval(intervalId)
    }, []) 

    return <div id='time'>{ctime}</div>
}

export default Clock
