import React from 'react';
import SearchBar from './SearchBar'
import '../Styles/Search.css'

// TODO: make this component hold state for all input
function SummonerSearch(props){
  return(
    <div className="searchBarsDiv">
      <p>Enter your in game summoner name, and a friend's</p>
      Select Your Region
      <select value={props.selectedRegion} onChange={props.regionHandler}>
        {props.regions.map(region => {
          return <option value={region[1]} key={region[0]}>{region[0]}</option>
        })}
      </select>
      <SearchBar parentSubmitHandler = {props.parentSubmitHandler}/>
    </div>
  )
}

export default SummonerSearch;
