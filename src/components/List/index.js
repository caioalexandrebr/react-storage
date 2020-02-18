import React, { Component } from 'react';
import styled from "styled-components";
import axios from 'axios';

const Group = styled.ul`
  padding: 20px;
  margin: 0 auto;
  max-width: 250px;
  background: white;
  border-radius: 5px;

  li {
    padding: 10px;
    font-size: 20px;
    list-style: none;
  }
`;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      isLoading: true
    }
  }

  fetchData() {
    axios.get(`https://api.github.com/users/caioalexandrebr/repos`)
    .then(res => this.setState({
      repos: res.data,
      isLoading: false
    }))
  }

  componentWillMount() {
    localStorage.getItem('repos') && this.setState({
      isLoading: false,
      repos: JSON.parse(localStorage.getItem('repos'))
    })
  }

  componentDidMount() {
    if(localStorage.getItem('repos')) {
      console.log('Using data from localStorage.');
    } else {
      this.fetchData();
      console.log('Fetch.');
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('repos', JSON.stringify(nextState.repos));
    localStorage.setItem('reposDate', Date.now());
  }
  
  render() {
    return (
      <div>
        <Group  >
          { this.state.repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
        </Group >
      </div>
    );
  }
}