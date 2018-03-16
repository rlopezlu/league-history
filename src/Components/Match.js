import React from 'react'
import Player from './Player'
import '../Styles/Match.css'

// TODO: change so that region also changes
const matchUrl = "https://matchhistory.na.leagueoflegends.com/en/#match-details/NA1/"//2704428580/216172135"

function Match (props){
  const checkWinColor = () => {
    return props.match.team.win === "Win" ? "blueGame" : "redGame";
  }

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

      // TODO: update so that it returns based on ID not name
      let player1 = props.match.playersObj[props.player.id]
      let player2 = props.match.playersObj[props.friend.id]

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
        <p>Queue: {getQueue(props.match.queue)}</p>
        <button className="myButton"><a
          target="_blank"
          rel="noopener noreferrer"
          href={matchUrl+props.match.matchId+'/'+
          player1.accountId}>Match Details</a>
        </button>
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
