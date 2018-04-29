import React from 'react'
import '../Styles/Status.css'

export default function Status (props){
  return (
    <div className="Status">
      <p>{props.text}</p>
      <div className="bgImage"> </div>
    </div>
  )
}
