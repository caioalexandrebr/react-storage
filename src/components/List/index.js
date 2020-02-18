import React, { Component } from 'react';
import axios from 'axios';

export default class List extends Component {
  state = {
    repos: []
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/caioalexandrebr/repos`)
    .then(res => {
      console.log(res.data);
      this.setState({ repos: res.data })
    });
  }
  
  render() {
    return (
      <div>
        <ul>
          { this.state.repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
        </ul>
      </div>
    );
  }
}