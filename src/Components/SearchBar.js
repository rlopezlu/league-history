import React from 'react';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      inputVal:"ihyphyx510i",
      validated:"valid",
      formatted:"ihyphyx510i"
    }
  }



  handleChange = (e) => {
    this.setState({inputVal:e.target.value})
    let str = e.target.value.replace(/\s+/g, '');
    // TODO: figure out how to use unicode letters in regex
    // let re = /^[0-9\\p{L}_\\.]+$/u;
    let re = /^[A-Za-z._0-9]+$/;
    if(re.test(str) ===true) {
      console.log("valid " + str);
      this.setState({
        validated: "valid",
        formatted: str
      })
    } else{
      console.log("invalid "+str);
      this.setState({validated:"invalid"})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault(); //prevent redirect from form submission
    console.log("there was a form submit");
    this.props.parentSubmitHandler(this.state.formatted)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type ="text" value={this.state.inputVal} placeholder="Summoner Name" onChange={this.handleChange}></input>
        <button disabled={this.state.validated !== "valid"} type="submit">Search for Summoner</button>
      </form>
    )
  }
}

export default SearchBar;
