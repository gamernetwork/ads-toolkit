import React, { Component } from 'react';
import Checkbox from './Checkbox';
import axios from 'axios';
import $ from 'jquery';



export default class CampaignCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            creatives: this.props.creatives,
            takeovers: this.props.takeovers,
            creativesForPreview: [],
            takeoversForPreview: [],
            previewData: {}
        }
    }

    returnStateFromCheckbox(key, obj, val) {
        if(key === 'creative') {
            val === true ? (
                this.setState({
                    creativesForPreview: [...this.state.creativesForPreview, obj]
                })
            ) : (
                this.setState({
                    creativesForPreview: this.state.creativesForPreview.splice(0, this.state.creativesForPreview.indexOf(obj))
                })
            )
        } else {
            val === true ? (
                this.fetchTakeoverCode(obj)
            ) : (
                this.setState({
                    takeoversForPreview: this.state.takeoversForPreview.splice(0, this.state.takeoversForPreview.indexOf(obj))
                })
            )
        }
    }

    showPreviewPage(e) {
        e.preventDefault();
        this.setState({
            previewData: {
                title: this.state.title,
                creatives: this.state.creativesForPreview,
                takeovers: this.state.takeoversForPreview
            }
        }, function(e) {
            this.props.toggleModal(e, this.state.previewData);
        })
    }

    returnPreviewPage(e) {
        e.preventDefault();
        this.setState({
            previewData: {
                title: this.state.title,
                creatives: this.state.creativesForPreview,
                takeovers: this.state.takeoversForPreview
            }
        }, function(e) {
            this.props.returnPage(e, this.state.previewData);
        });
    }

    fetchTakeoverCode(takeover) {
		axios.all([
			axios.get(takeover.leaderboard),
			axios.get(takeover.halfpage)
		])
		.then(axios.spread((leaderboard, halfpage) => { 
            this.setState({
                takeoversForPreview: [...this.state.takeoversForPreview, {
                    site: takeover.site,
                    leaderboard: leaderboard,
                    halfpage: halfpage
                }]
            })
		}))
	}

    returnStateFromCheckbox = this.returnStateFromCheckbox.bind(this);

    render() {
        return(
            <div className="column is-4">
                <div className="box campaign-card">
                    <h3 className="title is-3">{this.props.title}</h3>
                        <hr/>
                    <div className="field">
                        <h4 className="subtitle is-4">Creatives</h4>
                        {this.props.creatives.map(creative => {
                            return (
                                <Checkbox 
                                    title={creative.name} 
                                    format={creative.format} 
                                    key={creative.link}
                                    returnFunc={(key, obj, val) => this.returnStateFromCheckbox(key, obj, val)}
                                    returnObj={creative}
                                />
                            );
                        })}
                    </div>
                    <hr/>
                    <div className="field">
                        <h4 className="subtitle is-4">Takeovers</h4>
                        {this.props.takeovers.map(takeover => {
                            return (
                                <Checkbox 
                                    title={takeover.site} 
                                    key={takeover.leaderboard}
                                    returnFunc={(key, obj, val) => this.returnStateFromCheckbox(key, obj, val)}
                                    returnObj={takeover}
                                />
                            );
                        })}
                    </div>
                    <hr/>
                    <div className="buttons">
                        <a onClick={(e) => this.returnPreviewPage(e)} className="button is-secondary">Save</a>
                        <a onClick={(e) => this.showPreviewPage(e)} className="button is-secondary">Preview</a>
                        <a className="button is-primary">Generate</a>
                    </div>
                </div>
            </div>
        );
    }
}