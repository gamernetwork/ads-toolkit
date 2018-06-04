import React, { Component } from 'react';
import EGHomepage from './sitetemplates/js/EGHomepage';

export default class PreviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            creatives: this.props.creatives,
            takeovers: this.props.takeovers,
            removeBindings: `
                <script>parent.jQuery('html').unbind();</script>
            `
        } 
    }
    
    render() {
        return (
            <div className="page-wrapper">
                <h1 className="title is-1">{this.state.title}</h1>
                <hr/>
                {this.state.takeovers.map(takeover => {
                    let takeoverFormat;
                    const leaderboard = takeover.leaderboard.data + this.state.removeBindings;
                    const halfpage = takeover.halfpage.data;
                    switch(takeover.site) {
                        case 'Eurogamer':
                            takeoverFormat = <EGHomepage leaderboard={leaderboard} halfpage={halfpage}/>
                        break;
                    }
                    return(
                        <div className="takeover-container">
                            <h2 className="title is-2 has-text-centered">{takeover.site}</h2>
                            <h2 className="subtitle is-5 has-text-centered">Desktop Takeover</h2>
                            {takeoverFormat}
                        </div>
                    )
                })}
                {this.state.creatives.map(creative => {
                    const width = creative.format.slice(0, creative.format.indexOf('x'));
                    const height = creative.format.slice(creative.format.indexOf('x') + 1);
                    return(
                        <iframe title={creative.link} key={creative.link} src={creative.link} width={width} height={height} frameBorder="0"></iframe>
                    );
                })}
            </div>
        );
    }
}
