import React from 'react';
import bg from '../img/egbg.jpg'
import nav from '../img/egnav.png'

const EGHomepage = (props) => {
    console.log(props)
    return(
        <div className="takeover-wrapper">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <div className="styled">
        <style dangerouslySetInnerHTML={{__html: `
        iframe {
            margin: 0;
        }
        
        #page-wrapper {
            width: 100%;
            position: relative;
            clear: both;
        }
        
        .advert#leaderboard {
            width: 1260px;
            margin: 0 auto;
            display: flex;
            -webkit-box-pack: center;
            -webkit-box-align: center;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 1;
        }
        
        #page-wrapper {
            min-width: 1260px;
        }
        
        .document-wrapper {
            width: 1260px;
            margin: 0 auto;
            clear: both;
            max-width: none;
        }
        .document {
            min-height: 1066px;
            background: #f9f9f9;
            position: relative;
            z-index: 1;
            width: 100%;
        }
        
        .advert {
            display: block;
            text-align: center;
            margin: 0 auto 32px;
            clear: both;
        }
        
        .main {
            clear: both;
            width: 100%;
            float: left;
            position: relative;
            padding-right: 316px;
            min-height: 632px;
        }
        
        .sidebar {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 300px;
            z-index: 1;
        }
        
        #skyscraper {
            width: 300px;
            min-height: 250px;
        }
        
        .site-bg {
            position: absolute;
            width: 1280px;
        }
        `}} />
        </div>
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