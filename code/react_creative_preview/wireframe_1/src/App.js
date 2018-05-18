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
		this.editExistingEntry = this.editExistingEntry.bind(this);
	}
	addCampaignObject(campaignObject) {
		// This could be at least 650000x more robust
		let isExistingEntry = false;
		this.state.campaigns.map((k) => {
			const title = k.title;
			if(campaignObject.title === title) {
				isExistingEntry = true;
			} 
		});
		if(!isExistingEntry) {
			this.setState({
				campaigns: [...this.state.campaigns, campaignObject]
			});
		} else {
			this.state.campaigns.filter(entry => {
				entry.title === campaignObject.title ? this.editExistingEntry(entry, campaignObject) : false;
				return;
			});
		}
	}
	editExistingEntry(entry, object) {
		console.log(this.state.campaigns.indexOf(entry))
		let newCampaignState = this.state.campaigns.slice();
		newCampaignState[this.state.campaigns.indexOf(entry)] = object;
		this.setState({
			campaigns: newCampaignState
		})
	}
  	render() {
		return (
			<div className="app-wrapper">
				<CampaignCreator onAddCampaign={this.addCampaignObject} selectedCampaign={this.state.selectedCampaign}/>
			</div>
		);
  	}
}

