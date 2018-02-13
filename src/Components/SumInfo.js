import React from 'react'
import '../Styles/SumInfo.css'

// TODO:version might need to be updated per patch update
// TODO: get iconUrl version from request /lol/static-data/v3/versions
const iconUrl = "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/profileicon/"//3262.png"

function SumInfo (props){
  return (
    <div className="SumInfo">
      <p>{props.name}</p>
      <img className="iconImage" alt={props.icon} src={iconUrl+props.icon+".png"} />
    </div>
  )
}

export default SumInfo;
