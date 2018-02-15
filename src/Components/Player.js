import React from 'react';
import '../Styles/Player.css'

// const imgUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"//LeeSin_0.jpg
const imgUrl = "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/champion/"//Aatrox.png

function Player (props){
  let pStats = props.stats;
  //lane (role) is all caps, so make it Caps instead
  const formatLane = (lane) => {
    return lane.charAt(0)+ lane.slice(1).toLowerCase()
  }

  return (
  <div className="playerClass">
    <p>{props.champion.name}</p>
    <p> {formatLane(props.lane)}</p>
    <img
      // src={imgUrl+props.champion.alias+"_0.jpg"}
      src={imgUrl+props.champion.alias+".png"}
      alt={props.img}
      title={props.img} />
    <p>Champ Lvl: {pStats.champLevel}</p>
    <p>KDA: {pStats.kills}/{pStats.deaths}/{pStats.assists}</p>
    <p>CS: {pStats.totalMinionsKilled + pStats.neutralMinionsKilled}</p>
  </div>
  );
};

export default Player;
