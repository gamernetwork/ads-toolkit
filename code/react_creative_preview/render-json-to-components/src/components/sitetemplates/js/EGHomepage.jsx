import React from 'react';
import '../css/eg.css';
import bg from '../img/egbg.jpg'
import nav from '../img/egnav.png'

const EGHomepage = (props) => {
    return(
        <div>
            <div className="eg" id="page-wrapper">
                <div id="leaderboard" className="advert leaderboard">
                    <div className="collapsible advertContainer" data-dfp-id="EGNET_LB_1" data-dfp-sizes="728x90, 960x160, 960x250, 970x250, 1260x110, 1260x160, 1260x200, 1260x250" data-dfp-targeting="site=eurogamer.net,position=atf" id="div-ga-EGNET_LB_1" data-google-query-id="CNaflKTnudsCFQoI4Aod0WAA8w">
                        <div id="google_ads_iframe_/43340684/EGNET_LB_1_0__container__">
                            <iframe sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"} width={1260} height={250} srcDoc={props.leaderboard} frameBorder="0"></iframe>
                        </div>
                    </div>
                </div>
                <div className="document-wrapper">
                    <div className="document">
                        <div className="main">
                        <img className="site-bg" src={bg} alt=""/>
                            <div className="sidebar">
                                <div id="skyscraper">
                                    <iframe sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"} width={300} height={600} srcDoc={props.halfpage} frameBorder="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EGHomepage;