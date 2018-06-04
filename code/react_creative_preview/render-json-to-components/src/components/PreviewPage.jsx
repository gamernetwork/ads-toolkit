import React, { Component } from 'react';
import EGHomepage from './sitetemplates/EGHomepage';

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
            <div id="page-wrapper"></div>
                <h1 className="title is-1">{this.state.title}</h1>
                {this.state.creatives.map(creative => {
                    const width = creative.format.slice(0, creative.format.indexOf('x'));
                    const height = creative.format.slice(creative.format.indexOf('x') + 1);
                    return(
                        <iframe title={creative.link} key={creative.link} src={creative.link} width={width} height={height} frameBorder="0"></iframe>
                    );
                })}
                {/* <iframe sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"} width={1260} height={250} srcDoc={this.state.takeovers.leaderboard + this.state.removeBindings} frameBorder="0"></iframe> */}
                {this.state.takeovers.map(takeover => {
                    console.log(takeover)
                    let takeoverFormat;
                    switch(takeover.site) {
                        case 'Eurogamer':
                            takeoverFormat = <EGHomepage/>
                        break;
                    }
                    return(
                        <div className="takeover-container">
                        
                        </div>
                    )
                })}
            </div>
        );
    }
}
