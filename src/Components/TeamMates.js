import React from 'react'
import SingleTeamMate from './SingleTeamMate'

function TeamMates(props){
  return (
    <div className="teamWrapper">
      {props.members.map(member => {
        return <SingleTeamMate
          key={member.id}
          name={member.name}
          icon={member.icon}
          id={member.id}
          selectTeamMate={props.selectTeamMate}
          count={member.count}/>
      })}
    </div>
  )
}

export default TeamMates;
