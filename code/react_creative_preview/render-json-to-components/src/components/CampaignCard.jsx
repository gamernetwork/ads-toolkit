import React, { Component } from 'react';
import Checkbox from './Checkbox';

export default class CampaignCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            creatives: this.props.creatives,
            takeovers: this.props.takeovers,
            creativesForPreview: [],
            takeoversForPreview: [],
            renderOverlay: false
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
                    creativesForPreview: this.state.creativesForPreview.splice(0,this.state.creativesForPreview.indexOf(obj))
                })
            )
        } else {
            val === true ? (
                this.setState({
                    takeoversForPreview: [...this.state.takeoversForPreview, obj]
                })
            ) : (
                this.setState({
                    takeoversForPreview: this.state.takeoversForPreview.splice(0,this.state.takeoversForPreview.indexOf(obj))
                })
            )
        }
    }
    generatePreviewPage(e) {
        e.preventDefault();
        const previewData = {
            title: this.state.title,
            creatives: this.state.creativesForPreview,
            takeovers: this.state.takeoversForPreview
        }
        this.props.toggleModal(e, previewData);
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
                        <a onClick={(e) => this.generatePreviewPage(e)} className="button is-secondary">Preview</a>
                        <a className="button is-primary">Generate</a>
                    </div>
                </div>
            </div>
        );
    }
}