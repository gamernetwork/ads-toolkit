import React, { Component } from 'react';
import CampaignCard from './components/CampaignCard'
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campaignList: []
		}
	}
	componentDidMount() {
		axios.get('http://images.eurogamer.net/2018/george.francis/reactcomptest/testjson.json')
			.then(res => {
				const campaigns = res.data;
				this.setState({
					campaignList: campaigns
				});
			})
			.catch(error => {
				console.error('Error Fetching JSON:', error.response)
			});
	}
  	render() {
		return (
			<div className="App">
				<section className="section program-info">
					<div className="container">
						<h1 className="title is-1">Campaign Preview Generator</h1>
						<h2 className="subtitle is-3">Render Campaigns View</h2>
					</div>
				</section>
				<section className="section">
				<div className="container">
					<div className="columns is-multiline">
						{this.state.campaignList.map(campaign => {
							console.log(campaign);
							return (
								<CampaignCard 
									key={campaign.name} 
									title={campaign.name} 
									creatives={campaign.creatives} 
									takeovers={campaign.takeovers}
								/>
							);
						})}
					</div>
				</div>
				</section>
			</div>
		);
  	}
}

export default App;
