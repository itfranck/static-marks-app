import React, { PureComponent } from "react";

import Button from "../button/Button";
import "./Filter.css";

class Filter extends PureComponent {
  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyUp = event => {
    if (event.keyCode === 27) {
      // clear on 'escape'
      this.clearFilter();
    } else if (event.keyCode === 70 && this.input) {
      // focus input field on 'f'
      this.input.focus();
    }
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      event.preventDefault(); // Firefox Hack
    }
  };

  handleFilterButtonClicked = () => {
    if (this.props.currentValue) this.clearFilter();
  };

  handleChange = event => {
    this.applyFilter(event.target.value);
  };

  applyFilter = filter => {
    this.props.onFilter(filter);
  };

  clearFilter = () => {
    this.applyFilter("");
  };

  render() {
    const { currentValue } = this.props;
    return (
      <div className="filter">
        <Button
          className="filter-button"
          label="Clear filter"
          disabled={!currentValue}
          onClick={this.handleFilterButtonClicked}
          icon={(currentValue && "times") || "search"}
        />

        <input
          className="input"
          value={currentValue}
          placeholder="Search everywhere..."
          aria-label="Search everywhere"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Filter;