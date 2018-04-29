import React from 'react';
import SearchBar from './SearchBar'
import '../Styles/Search.css'

function SummonerSearch(props){
  return(
    <div className="searchBarsDiv">
      <p className="SearchTitle">LoL Team Mate History</p>
      <div className="searchElementsWrap">
        <div className="selectWrapper">
          {/* <p className="subPrompt">Select your region</p> */}
          <select value={props.selectedRegion} onChange={props.regionHandler}>
            {props.regions.map(region => {
              return <option value={region[1]} key={region[0]}>{region[0]}</option>
            })}
          </select>
        </div>
        <SearchBar parentSubmitHandler = {props.parentSubmitHandler}/>
      </div>
    </div>
      )
      }

      export default SummonerSearch;
