import React from 'react';
import Match from './Match'

function MatchList(props) {
  //return only matches where friend played
  function filteredList(matches){
    console.log("matches");
    // console.log(matches);
    let filtered =  matches.filter((match, index) => {
      console.log(match.playersObj);
      return match.playersObj.hasOwnProperty(props.friend.name)
    })
    console.log("filtered");
    console.log(filtered);
    return filtered;
  }

  return (
    <ul className="listContainer">
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
