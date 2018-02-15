import React, { Component } from 'react';
import './Styles/App.css';
import MatchList from './Components/MatchList'
import SummonerSearch from './Components/SummonerSearch'
import TeamMates from './Components/TeamMates'
import SumInfo from './Components/SumInfo'

// TODO: use https://mushroom.teemo.gg/8.2/ for resources

// function errorCatching(response){
//   if(!response.ok){
//     throw Error(response.statusText)
//   }
//   return response;
// }

class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        gameData:[],
        loaded:false,
        queues: null,
        champions:null,
        region:'NA1',
        testID: 216172135
      }
    }

    regions = [
      ["BR" , "BR1"],
      ["EUNE", "EUN1"],
      ["EUW", "EUW1"],
      ["JP" ,"JP1"],
      ["KR" ,"KR"],
      ["LAN", "LA1"],
      ["LAS", "LA2"],
      ["NA" ,"NA1"],
      ["OCE", "OC1"],
      ["TR" ,"TR1"],
      ["RU" ,"RU"],
      ["PBE", "PBE1"],
    ]

    componentDidMount(){

      fetch('/queues')
      .then(response => {return response.json()})
      .then(data => {
        console.log("got queue data");
        this.setState({queues:data})
      });

      fetch('/champions')
      .then(response => {return response.json()})
      .then(data =>{
        console.log("got champion data")
        this.setState({champions: data})
      })
    }

    getPlayerInfo = (name) =>{
      fetch(`/sumNameId/${this.state.region}/${name}`)
      .then(response => {return response.json()})
      .then(data => {
        this.setState({playerInfo:data}, this.showParentState)
        console.log(data);
      })
    }

    getRegion = (e) =>{
      this.setState({region: e.target.value})
    }

    showParentState = () =>{
      console.log("showing updated State");
      console.log(this.state.region);
      let url = `/teamMatches/${this.state.region}/${this.state.playerInfo.accountId}`
      // let url="/demoData"
      console.log(url);
      fetch(url)
      .then(response =>{ return response.json()})
      .then(data => {
        console.log("got match history data");
        console.log(data);
        this.setState({
          gameData : data,
          loaded:true,
          friend: {
            // id:205215452,
            // name:"LoneWolf59"
          }
        },
        console.log("data", this.state.gameData))
      })
    }

    //get both summoner names from input fields
    parentSubmitHandler = (value) => {
      console.log(`passed up value is "${value}"`);
        this.getPlayerInfo(value);
    }

    selectTeamMate = (name, id) =>{
      this.setState({
        friend: {
          id: id,
          name: name
        }
      })
    }

    render(){//conditional rendering of app
      let myElement = null;
      if(this.state.loaded && this.state.queues && this.state.champions){
        let playerInfo = this.state.gameData.mainUser;
        console.log("all data is ready, render app");
        console.log(playerInfo);
          myElement =
            <div className="mainElement">
              {/* <div className="mainUser"> */}
              {/*  TODO some icon have very different sizes*/}
              <SumInfo
                icon={playerInfo.icon}
                name={playerInfo.name} />
              {/* </div> */}
              <TeamMates selectTeamMate={this.selectTeamMate}
                members={this.state.gameData.commonPlayers}
                friend={this.state.friend}
              />
              <MatchList
                matches={this.state.gameData.matches}
                friend={this.state.friend}
                champions={this.state.champions}
                queues={this.state.queues}
                player={this.state.gameData.mainUser}
              />
            </div>
      } else {
        myElement = <p>Search for a summoner name</p>
      console.log("data not ready, do not render");
      }

      return (
        <div className="App">
          <SummonerSearch
            parentSubmitHandler={this.parentSubmitHandler}
            regionHandler={this.getRegion}
            selectedRegion={this.state.region}
            regions={this.regions}
          />
          {/* <button onClick={this.showParentState}>Show State</button> */}
          {myElement}
          <footer className="App-footer">
            Check out this project on github
            <a href="https://github.com/rlopezlu/reactlol" target="_blank" rel="noopener noreferrer">
              <img className="github" src="/github.ico" alt="icon"/>
            </a>
          </footer>
        </div>
      )
    }
  }


export default App;
