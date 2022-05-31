import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AddEvent = () => {
  let nav = useNavigate()

  const create = () => {
    nav('/Add-Event')
  }
  
  return (
    <div>
        <p onClick={create} className='cursor '>Add Event</p>
    </div>
  )
}
