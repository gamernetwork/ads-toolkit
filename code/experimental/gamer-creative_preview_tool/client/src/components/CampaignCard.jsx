import React, { Component } from 'react';
import Checkbox from './Checkbox';
import axios from 'axios';

// The campaigncard component manages the creatives and takeovers for each campaign
// It returns these to app (creativesForPreview / takeoversForPreview), which in turn renders them to a static .html page
export default class CampaignCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            creatives: this.props.creatives,
            takeovers: this.props.takeovers,
            creativesForPreview: [],
            takeoversForPreview: [],
            previewData: {},
            hasGeneratedPage: false,
            pageLink: null
        }
    }
    /* 
    Passed to checkbox component, returns t / f display value
    Standalone creatives and takeover creatives must be handled slightly differently, as standalone creative can be rendered in a normal iframe, 
    whilst takeover creative code must be fetched and inserted into an iframe on this domain, to allow interaction with the parent page 
    */
    returnStateFromCheckbox(key, obj, val) {
        if(key === 'creative') {
            // If the object type is creative, and its checked value is true, push to creatives for preview
            val === true ? (
                this.setState({
                    creativesForPreview: [...this.state.creativesForPreview, obj]
                })
            ) : (
                // Value is false, remove creative from preview array
                this.setState({
                    creativesForPreview: this.state.creativesForPreview.splice(0, this.state.creativesForPreview.indexOf(obj))
                })
            )
        } else {
            // Returned object is a takeover
            val === true ? (
                // Run fetchtakeovercode function to get creative code from dfp
                this.fetchTakeoverCode(obj)
            ) : (
                this.setState({
                    takeoversForPreview: this.state.takeoversForPreview.splice(0, this.state.takeoversForPreview.indexOf(obj))
                })
            )
        }
    }

    returnStateFromCheckbox = this.returnStateFromCheckbox.bind(this);

    // Triggered on 'save', return previewData object to app which in turn is previewed and / or rendered.
    returnPreviewPage(e) {
        e.preventDefault();
        this.setState({
            previewData: {
                title: this.state.title,
                creatives: this.state.creativesForPreview,
                takeovers: this.state.takeoversForPreview
            }
            // Passed as callback to ensure previewData has been set
        }, function(e) {
            this.props.returnPage(e, this.state.previewData);
        });
    }

    fetchTakeoverCode(takeover) {
        // Get leaderboard / halfpage takeover code from DFP
		axios.all([
			axios.get(takeover.leaderboard),
			axios.get(takeover.halfpage)
        ])
        // After data is returned, push a new object to takeoversforpreview array, with the leaderboard / halfpage code stored as strings
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
    generatePage(e) {
        this.setState({
            hasGeneratedPage: true
        })
        this.props.savePage(res => {
            this.setState({
                pageLink: res.data.path
            })
        });
    }
    // Render campaign card
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
                                // For each creative, render a checkbox
                                // Returnfunc tells the checkbox what to do on interaction, returnobj is the object that is returned if the state is true
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
                            // Perform the same task as creatives
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
                    {/* Save writes the object list to a new 'html' file / string */}
                    {/* Preview simply toggles a preview modal, which houses a rendered version of the returned file */}
                    {/* Generate writes the file to disk */}
                    <div className="buttons">
                        <a onClick={(e) => this.returnPreviewPage(e)} className="button is-secondary">Save</a>
                        <a onClick={(e) => this.props.toggleModal(e)} className="button is-secondary">Preview</a>
                        <a onClick={e => this.generatePage(e)} className="button is-primary">Generate</a>
                    </div>
                    
                    {
                        // If page link has been returned, display it within campaignCard
                        this.state.pageLink !== null && <React.Fragment><hr/> Link: <input readOnly value={this.state.pageLink} type="text"/></React.Fragment>
                    }
                </div>
            </div>
        );
    }
}