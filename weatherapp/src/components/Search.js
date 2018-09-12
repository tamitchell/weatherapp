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
      <div>
        <form onSubmit={(e) => this.props.handleSubmit(e, this.state.userinput)} >
          <input
            type="text"
            name="query"
            onChange={this.handleChange}
            placeholder="I'm a searchbar"
          />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}
