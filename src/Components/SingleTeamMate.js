import React from 'react'
import '../Styles/SingleTeamMate.css'

// TODO:version might need to be updated per patch update
// TODO: get iconUrl version from request /lol/static-data/v3/versions
const iconUrl = "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/profileicon/"//3262.png"

function SingleTeamMate(props){

  function handleClick() {
    props.selectTeamMate(props.name, props.id)
    console.log(props.name);
    console.log(props.id);
  }

  return(
    <div className={"teamMember "+props.current} onClick={handleClick}>
      <p>{props.count} games</p>
      <img className="iconImageTeamMates" alt={props.icon} src={iconUrl+props.icon+".png"} />
      <p>{props.name}</p>
    </div>
  )
}

export default SingleTeamMate
