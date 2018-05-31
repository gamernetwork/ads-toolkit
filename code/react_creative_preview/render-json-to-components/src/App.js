import React, { Component } from 'react';
import CampaignCard from './components/CampaignCard';
import PreviewModal from './components/PreviewModal';
import PreviewPage from './components/PreviewPage';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campaignList: [],
			displayPreviewModal: false,
			pageData: null,
			previewPage: null
		}
	}
	// On mount, get the creatives JSON
	componentDidMount() {
		axios.get('http://images.eurogamer.net/2018/george.francis/reactcomptest/testjson.json')
			.then(res => {
				const campaigns = res.data;
				// Add campaigns to campaignList state
				this.setState({
					campaignList: campaigns
				});
			})
			.catch(error => {
				console.error('Error Fetching JSON:', error.response)
			});
			axios.get('https://partner.googleadservices.com/gampad/ads?gct=GyMSSdk5ABMKmwL4DAGKGJQCKowCCAkQIEoAWICAgKCbusOpdbgBjviy-4IE0gIJdGV4dC9odG1s8ALsCfgCbpADAKIDEhDsCRhuKICAgKCbusOpdeABAKIDHBABGAEogICAoJu6w_LKAVILQlVUVE9OX1RFWFSiAxQQARgBKICAgKCbuoiIJVIEU0tJTsgD7AnQA27wAwLKBYABaHR0cHM6Ly93d3cuZXZlb25saW5lLmNvbS9ydS8_dXRtX3NvdXJjZT1kYm0mdXRtX21lZGl1bT1jcG0mdXRtX2NhbXBhaWduPTIwMTgwNl9CcmFuZF9HTl9sYW5nX3RvJnV0bV90ZXJtPXJ1JnV0bV9jb250ZW50PWduXzAwMDH6BgIoALIBAhgBGN6YwNgFKAAw3rT13wU4AFgBagZfYmxhbmtwyse52AU&iu=43340684&gdfp_req=1&height=110&width=1260&impl=ifr')
			.then(res => {
				console.log(res.data)
			})

	}

	// Toggle preview modal, set pageData to the returned state from campaignCard
	toggleModal(e) {
		this.state.displayPreviewModal === true ? (
			this.setState({
				displayPreviewModal: false
			})
		) : (
			this.setState({
				displayPreviewModal: true,
			})
		);
	}

	generatePreviewPage(e, data) {
		this.setState({
			pageData: data
		}, () => {
			this.setState({
				previewPage: ReactDOMServer.renderToStaticMarkup(<PreviewPage data={this.state.pageData}/>)
			}, () => {
				console.log(this.state.previewPage)
			});
		})
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
						{/* For each campaign in campaignList, make a campaignCard */}
							<div className="columns is-multiline">
								{this.state.campaignList.map(campaign => {
									return (
										<CampaignCard 
											key={campaign.name} 
											title={campaign.name} 
											creatives={campaign.creatives} 
											takeovers={campaign.takeovers}
											toggleModal={(e, data) => this.toggleModal(e, data)}
											returnPage={(e, data) => this.generatePreviewPage(e, data)}
										/>
									);
								})}
							</div>
						</div>
					</section>
				</div>
				{this.state.displayPreviewModal === true && 
					<PreviewModal page={this.state.previewPage} closeModal={(e, data) => this.toggleModal(e, null)} />
				}
			</div>
		);
  	}
}

export default App;
