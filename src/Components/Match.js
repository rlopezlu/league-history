import React from 'react'
import Player from './Player'

const matchUrl = "https://matchhistory.na.leagueoflegends.com/en/#match-details/NA1/"//2704428580/216172135"

function Match (props){
  const checkWinColor =
    () => props.match.team.win === "Win" ? "blueGame" : "redGame";

    const getQueue =
      (queueId) => {return props.queues[queueId].name}

    const matchDate =
      (millis) => {
        // console.log("this was used to make the date",millis)
        let myDate = new Date(millis)
        return myDate.getMonth()+1+"/"+myDate.getDate()+"/"+myDate.getFullYear()
      }

      const matchLength =
        (seconds) => {return Math.floor(seconds / 60)}

        const findChamp = (champId) => {
          let myChamp = props.champions.find(x => {
            return x.id === champId
          })
          // console.log(myChamp);
          return myChamp;
        }

      let player1 = props.match.playersObj[props.player.name][0]
      let player2 = props.match.playersObj[props.friend.name][0]

  return (
    <div className={"match " + checkWinColor()}>

      <Player
        lane={player1.lane}
        champion={findChamp(player1.championId)}
        stats={player1.stats}
      />
      <div className="matchInfo">
        <p>{props.match.team.win === "Win" ? "Victory" : "Defeat"}</p>
        <p>Date: {matchDate(props.match.gameCreation)}</p>
        <p>Length: {matchLength(props.match.length)} minutes</p>
        <button className="myButton"><a
          target="_blank"
          href={matchUrl+props.match.gameId+'/'+
          props.friend.id}>Match Details</a>
        </button>
        <p>Queue: {getQueue(props.match.queue)}</p>
      </div>
      <Player
        lane={player2.lane}
        champion={findChamp(player2.championId)}
        stats={player2.stats}
      />
    </div>
  )
}

export default Match;
