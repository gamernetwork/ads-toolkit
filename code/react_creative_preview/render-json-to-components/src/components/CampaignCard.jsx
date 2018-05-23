import React, { Component } from 'react';

export default class CampaignCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            creatives: this.props.creatives,
            takeovers: this.props.takeovers,
            creativesForPreview: [],
            takeoversForPreview: []
        }
    }
    addCreativeToPreview() {

    }
    render() {
        return(
            <div className="column is-4">
                <div className="box campaign-card">
                    <h3 className="title is-3">{this.props.title}</h3>
                        <hr/>
                    <div className="field">
                        <label className="label">Creatives</label>
                        {this.props.creatives.map(creative => {
                            return (
                                <div key={creative.link} className="control">
                                    <label className="checkbox">
                                        <input type="checkbox"/>
                                        <strong>{creative.name}</strong> : {creative.format}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <hr/>
                    <div className="field">
                        <label className="label">Takeovers</label>
                        {this.props.takeovers.map(takeover => {
                            return (
                                <div key={takeover.leaderboard}  className="control">
                                    <label className="checkbox">
                                        <input type="checkbox"/>
                                        <strong>{takeover.site}</strong>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <hr/>
                    <div className="buttons">
                        <a className="button is-secondary">Preview Link</a>
                        <a className="button is-primary">Generate Link</a>
                    </div>
                </div>
            </div>
        );
    }
}