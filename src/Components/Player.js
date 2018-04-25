import React from 'react';
import '../Styles/Player.css'
import version from '../apiVersion'

// const imgUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"//LeeSin_0.jpg
// TODO: save game version to app state,
const imgUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`//Aatrox.png

function Player (props){
  let pStats = props.stats;
  //lane (role) is all caps, so make it Caps instead
  const formatLane = (lane) => {
    return lane.charAt(0)+ lane.slice(1).toLowerCase()
  }

  return (
  <div className="playerClass">
    <p className="champName">{props.champion.name}</p>

    <img
      // src={imgUrl+props.champion.alias+"_0.jpg"}
      src={imgUrl+props.champion.alias+".png"}
      alt={props.img}
      title={props.img} />
    <p> {formatLane(props.lane)}</p>
    <p>Champ Lvl: {pStats.champLevel}</p>
    <p>KDA: {pStats.kills}/{pStats.deaths}/{pStats.assists}</p>
    <p>CS: {pStats.totalMinionsKilled + pStats.neutralMinionsKilled}</p>
    <p>Gold: {pStats.goldEarned} </p>
  </div>
  );
};

export default Player;
