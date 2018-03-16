import React from 'react';
import '../Styles/SearchBar.css'

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    // TODO: clear these values, set to invalid
    this.state = {
      inputVal:"c9 sneaky",
      validated:"valid",
      formatted:"c9sneaky"
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
    let formattedVal = this.state.formatted;
    this.setState({
      inputVal: "",
      formatted: "",
      validated: "invalid"
    })
    this.props.parentSubmitHandler(formattedVal)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type ="text"
          className="text-input"
          value={this.state.inputVal}
          placeholder="Summoner Name"
          onChange={this.handleChange} />
        <button disabled={this.state.validated !== "valid"}
        type="submit">Search for Summoner</button>
      </form>
    )
  }
}

export default SearchBar;
