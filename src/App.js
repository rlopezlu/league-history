import React, { Component } from 'react';
import './Styles/App.css';
import githubLogo from './github.ico'
import MatchList from './Components/MatchList'
import SummonerSearch from './Components/SummonerSearch'
import TeamMates from './Components/TeamMates'
import SumInfo from './Components/SumInfo'

let base = 'https://secret-basin-22820.herokuapp.com'
// let base = 'localhost:8000'
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
        testID: 216172135,
        status: "Search for a summoner name",
        error: ''
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
      // let base = 'https://secret-basin-22820.herokuapp.com'
      let queuesUrl = base + "/queues"
      fetch(queuesUrl)
      .then(response => {return response.json()})
      .then(data => {
        console.log("got queue data");
        this.setState({queues:data})
      })
      .catch(error => {
        console.log("no queue data fetched");
      });

      let championsUrl = base+'/champions';
      fetch(championsUrl)
      .then(response => {return response.json()})
      .then(data =>{
        console.log("got champion data")
        this.setState({champions: data})
        // console.log(data[12]);
      })
      .catch(error => {
        console.log("no champion data fetched");
      })
    }

    getPlayerInfo = (name) =>{
      this.setState(
        {status:`Searching for ${name}`}
      )
      // let base = 'https://secret-basin-22820.herokuapp.com'
      fetch(`${base}/sumNameId/${this.state.region}/${name}`)
      .then(response => {
        if(response.status !== 200){
          this.setState({
              error: 'That player name does not exist',
              status: `${name} was not found`
            })
          return
        }
        response.json().then(data => {
          this.setState({
            playerInfo:data,
            status:`Found ${name} `
          }, this.showParentState)
          console.log("Main player");
          console.log(data);
        })
      })
    }

    getRegion = (e) =>{
      this.setState({region: e.target.value})
    }

    showParentState = () =>{
      this.setState({status:`Loading match history`})
      // let base = 'https://secret-basin-22820.herokuapp.com'
      console.log(this.state.region);
      let url = `${base}/teamMatches/${this.state.region}/${this.state.playerInfo.accountId}`
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
        }, () => {
        console.log("All Matches data")
        console.log(this.state.gameData)
      })
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

    dataReady(){
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
        myElement = (
          <div className="status">
            <p>{this.state.status}</p>
          </div>
        )
      console.log("data not ready, do not render");

      }
      return myElement;
    }

    render(){//conditional rendering of app

      return (
        <div className="App">
          <SummonerSearch
            parentSubmitHandler={this.parentSubmitHandler}
            regionHandler={this.getRegion}
            selectedRegion={this.state.region}
            regions={this.regions}
          />
          {/* <button onClick={this.showParentState}>Show State</button> */}
          {this.dataReady()}
          <footer className="App-footer">
            Check out this project on github
            <a href="https://github.com/rlopezlu/reactlol" target="_blank" rel="noopener noreferrer">
              <img className="github" src={githubLogo} alt="icon"/>
            </a>
          </footer>
        </div>
      )
    }
  }

export default App;
