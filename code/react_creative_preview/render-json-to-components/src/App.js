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
				<nav className="navbar is-light" aria-label="main navigation">
					<div className="navbar-brand">
						<a className="navbar-item">
							JSON Generator
						</a>
						<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
				</nav>
				<div className="container">
					<section className="section program-info">
						<div className="container">
							<h1 className="title is-size-1-desktop is-size-2-tablet is-size-2-mobile">Campaign Preview Generator</h1>
							<h2 className="subtitle is-size-3-desktop is-size-4-tablet is-size-4-mobile">Render Campaigns View</h2>
						</div>
					</section>
					<hr/>
					<section className="section">
						<div className="container">
							<div className="columns is-multiline">
								{this.state.campaignList.map(campaign => {
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
			</div>
		);
  	}
}

export default App;
