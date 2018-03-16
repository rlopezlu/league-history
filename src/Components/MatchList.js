import React from 'react';
import Match from './Match'
import '../Styles/MatchList.css'

function MatchList(props) {
  //return only matches where friend played
  function filteredList(matches){
    console.log("All matches");
    // console.log(matches);
    let filtered =  matches.filter(match => {
      console.log(match.playersObj);
      // return match.playersObj.hasOwnProperty(props.friend.name)
      return match.playersObj[props.friend.id]
    })
    console.log("filtered. Show selected friend");
    console.log(filtered);
    return filtered;
  }

  return (
    <ul className="matchlistContainer">
      {filteredList(props.matches).map((match, index) => {
        return <Match
          friend={props.friend}
          player={props.player}
          key={match.gameId}
          idx={index}
          champions={props.champions}
          queues={props.queues}
          match={match}></Match>
      })}
    </ul>
  )
}

export default MatchList;
