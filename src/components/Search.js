import React, { Component } from "react";
export default class Search extends Component {
  constructor() {
    super();
    this.state = { userinput: "" };
  }
  handleChange = (e) => {
    let input = this.state.userinput
    input = e.target.value
    this.setState({userinput: input})
  }
  render() {
    return (
      <div className="container-fluid search-component">
        <form 
        onSubmit={(e) => this.props.getLatLng(e, this.state.userinput)} >
          <input
            type="search"
            className="browser-default"
            onChange={this.handleChange}
            placeholder="Enter in a city, zipcode, or address"
          />
        </form>
      </div>
    );
  }
}
