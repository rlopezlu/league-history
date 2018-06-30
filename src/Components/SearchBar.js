import React from 'react';
import '../Styles/SearchBar.css'

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    // TODO: clear these values, set to invalid
    this.state = {
      inputVal:"aphromoo",
      validated:"valid",
      formatted:"aphromoo"
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
      <form className="formWrap" onSubmit={this.handleSubmit}>
        <div className="SearchInputWrap">
          {/* <p className="subPrompt">Enter your summoner name</p> */}
          <input type ="text"
            className="text-input"
            value={this.state.inputVal}
            placeholder="Summoner Name"
            onChange={this.handleChange} />
        </div>
        <button disabled={this.state.validated !== "valid"}
          type="submit"
          className="searchButton"
        >Search for Summoner</button>
      </form>
    )
  }
}

export default SearchBar;
