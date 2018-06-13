import React, { Component } from 'react';
import EGHomepage from './sitetemplates/js/EGHomepage';
import ReactDOMServer from 'react-dom/server';

// This is the page that the whole application generates. It is seen in the preview modal, and is what is rendered to the disk on 'generate'
export default class PreviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            creatives: this.props.creatives,
            takeovers: this.props.takeovers,
            // Removebindings string is appended to creative scripts to eliminate jquery errors caused by the binding of 'mousemove' and 'click'
            removeBindings: `
                <script>parent.jQuery('html').unbind();</script>
            `
        } 
    }
    // Returned page
    render() {
        return (
            <div className="page-wrapper">
            <div className="styled">
            {/* Page styling */}
            {/* May move to styled components */}
            <style dangerouslySetInnerHTML={{__html: `
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .page-wrapper {
                    margin-top: 2rem;
                }
                .campaign-card {
                    height: 100%;
                    width: 100%;
                }
                
                input {
                    position: relative;
                    bottom: .08rem;
                    margin-right: .5rem;
                }
                
                iframe {
                    position: relative;
                    display: block;
                    margin: 4rem auto 4rem auto;
                    z-index: 1;
                }
                
                .preview-content {
                    width: 95%;
                    height: 90%;
                    background: #f9f9f9;
                }
                
                .preview-content h1 {
                    text-align: center;
                    margin: 2rem;
                }
                
                .takeover-container {
                    margin: 2rem 0;
                }
                
                .takeover-container-iframe {
                    width: 100%;
                    height: 1316px;
                    margin: 0;
                    padding: 0;
                }
            `}} />
            </div>
                <h1 className="title is-1 has-text-centered">{this.state.title}</h1>
                <hr/>
                {/* For each takeover passed to props, return a new site specific takeover page */}
                {this.state.takeovers.map(takeover => {
                    let takeoverFormat;
                    const leaderboard = takeover.leaderboard.data + this.state.removeBindings;
                    const halfpage = takeover.halfpage.data + this.state.removeBindings;
                    switch(takeover.site) {
                        default: 
                            takeoverFormat = <EGHomepage leaderboard={leaderboard} halfpage={halfpage}/>
                        break;
                    }
                    return(
                        <div key={takeover.site} className="takeover-container">
                            <h2 className="title is-2 has-text-centered">{takeover.site}</h2>
                            <h2 className="subtitle is-5 has-text-centered">Desktop Takeover</h2>
                            {/* Each takeover page is rendered to static markup and injected into an iframe 
                                to allow for multiple instances of gn_takeover and parent inteactions
                            */}
                            <iframe title={takeover.site} className="takeover-container-iframe" scrolling={"no"} sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"} srcDoc={ReactDOMServer.renderToStaticMarkup(takeoverFormat)} width={1920} height={1316} frameBorder="0"></iframe>
                        </div>
                    )
                })}
                {/* Rendering standalone creatives is a lot more simple, an iframe is just created with its original source url */}
                {this.state.creatives.map(creative => {
                    // Creative formats are stored in widthxheight format, this just splits off the seperate values to be used for the container iframe sizing
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
