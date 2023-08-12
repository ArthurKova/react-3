import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { toast } from 'react-toastify';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  userRequest = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast('Enter your request!');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.userRequestClear();
  };

  userRequestClear = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            name="value"
            autoFocus
            value={value}
            placeholder="Search images and photos"
            onChange={this.userRequest}
          />
        </form>
      </header>
    );
  }
}

// <DebounceInput
//   className="SearchForm-input"
//   debounceTimeout={100}
//   type="text"
//   autoComplete="off"
//   autoFocus
//   name="request"
//   placeholder="Search images and photos"
//   value={value}
//   onChange={event => this.setState({ value: event.target.value })}
// />;
