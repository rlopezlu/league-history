import React from 'react'
import SingleTeamMate from './SingleTeamMate'
import '../Styles/TeamMates.css'

function TeamMates(props){
  function checkSelected(id, name){
    if(!props.friend) return ''
    if(name === props.friend.name){
      console.log("active player found");
      return 'activePlayer'
    } else {
      console.log("no active players");
      return ''
    }
  }
  return (
    <div className="teamMates">
      <p>Select a team mate</p>
      <div className="teamWrapper">
        {props.members.map(member => {
          return <SingleTeamMate
            key={member.id}
            current={checkSelected(member.id, member.name)}
            name={member.name}
            icon={member.icon}
            id={member.id}
            selectTeamMate={props.selectTeamMate}
            count={member.count}/>
        })}
      </div>
    </div>
  )
}

export default TeamMates;
