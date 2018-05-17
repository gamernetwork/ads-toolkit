import React, { Component } from 'react';
import CampaignCreator from './components/CampaignCreator';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campaigns: []
		}
	}
  	render() {
		return (
			<div className="app-wrapper">
				<CampaignCreator/>
			</div>
		);
  	}
}

