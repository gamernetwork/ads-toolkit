import React, { Component } from 'react';
import CampaignCreator from './components/CampaignCreator';
import CampaignCard from './components/CampaignCard';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campaigns: [],
			selectedCampaign: null,
			campaignBlocks: []
		}
		this.addCampaignObject = this.addCampaignObject.bind(this);
		this.editExistingEntry = this.editExistingEntry.bind(this);
		this.selectCampaign = this.selectCampaign.bind(this);
	}
	addCampaignObject(campaignObject) {
		// This could be at least 650000x more robust
		let isExistingEntry = false;
		this.state.campaigns.map((k) => {
			const title = k.title;
			if(campaignObject.title === title) {
				isExistingEntry = true;
			} 
			return false;
		});
		if(!isExistingEntry) {
			this.setState({
				campaigns: [...this.state.campaigns, campaignObject]
			}, () => {
				this.renderCampaignBlocks()
			});
		} else {
			this.state.campaigns.filter(entry => {
				entry.title === campaignObject.title ? this.editExistingEntry(entry, campaignObject) : console.log();
				return false;
			});
		}
		
	}
	editExistingEntry(entry, object) {
		let newCampaignState = this.state.campaigns.slice();
		newCampaignState[this.state.campaigns.indexOf(entry)] = object;
		this.setState({
			campaigns: newCampaignState
		});
	}
	renderCampaignBlocks() {
		return this.state.campaigns.map((item) => {
			this.setState({
				campaignBlocks: [...this.state.campaignBlocks, <CampaignCard select={this.selectCampaign} index={this.state.campaigns.indexOf(item)} key={item.title} title={item.title}/>]
			});
		});
	}
	selectCampaign(index) {
		this.setState({
			selectedCampaign: this.state.campaigns[index]
		});
	}
  	render() {
		return (
			<div className="app-wrapper">
				{this.state.selectedCampaign === null ? 
					<CampaignCreator title={""} units={[]} unitCount={null} items={[]} onAddCampaign={this.addCampaignObject} selectedCampaign={this.state.selectedCampaign}/>
					:
					<CampaignCreator title={this.state.selectedCampaign.title} units={this.state.selectedCampaign.units} unitCount={this.state.selectedCampaign.unitCount} items={this.state.selectedCampaign.items} onAddCampaign={this.addCampaignObject} selectedCampaign={this.state.selectedCampaign}/>
				}
				{this.state.campaignBlocks}
			</div>
		);
  	}
}