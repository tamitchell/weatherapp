import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();
    this.state = { userinput: "" };
  }


  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={e => this.props.onInputChange(e.target.value)}
            placeholder="I'm a searchbar"
          />
          <input type="submit" onSubmit={this.props.handleSubmit} />
        </form>
      </div>
    );
  }
}
