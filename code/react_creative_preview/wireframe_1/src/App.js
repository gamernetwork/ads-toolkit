import React, { Component } from 'react';
import CampaignCreator from './components/CampaignCreator';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campaigns: [],
			selectedCampaign: null
		}
		this.addCampaignObject = this.addCampaignObject.bind(this);
	}
	addCampaignObject(campaignObject) {
		console.log('Adding To Campaigns')
		this.setState({
			campaigns: [...this.state.campaigns, campaignObject]
		});
	}
  	render() {
		return (
			<div className="app-wrapper">
				<CampaignCreator onAddCampaign={this.addCampaignObject} selectedCampaign={this.state.selectedCampaign}/>
			</div>
		);
  	}
}

