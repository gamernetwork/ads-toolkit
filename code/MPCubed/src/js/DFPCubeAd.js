/**
 * Extension of the Cube Ad, main concerns of the class are getting the cube running on DFP
 * @class DFP Cube Ad
 * @constructor
 * @param {Object} targetNode
 * @param {Object} fallback
 * @param {Object} face1
 * @param {Object} face2
 * @param {Object} face3
 * @param {Object} face4
 * @param {Boolean} desktopSupport
 */
var DFPCubeAd = function(targetNode, fallback, face1, face2, face3, face4, desktopSupport)
{
    this.init(targetNode, fallback, face1, face2, face3, face4, desktopSupport);
};

DFPCubeAd.prototype = Object.create(CubeAd.prototype);
DFPCubeAd.prototype.__super__ = CubeAd;

DFPCubeAd.prototype.ad_name = "TOYBOX DEFAULT";

/**
 * @method init
 * @param {Object} targetNode
 * @param {String}{Object} fallback
 * @param {String}{Object} face1
 * @param {String}{Object} face2
 * @param {String}{Object} face3
 * @param {String}{Object} face4
 * @param {Boolean} desktopSupport
 */
DFPCubeAd.prototype.init = function(targetNode, fallback, face1, face2, face3, face4, desktopSupport)
{
    this.__super__.prototype.init.call(this, targetNode, fallback, face1, face2, face3, face4, desktopSupport);
    
    if(this.checkTransformSupport())
    {
        this.appendStyleSheet();
        this.setAdNotice(targetNode);
        this.setMobileMPUSize();
    }
    window.frameElement.style.height =  "0";
    window.frameElement.style.marginBottom = "0px";
	
	this.setupGoogleAnalytics();
};

/**
 * Setup Google Analytics
 */
DFPCubeAd.prototype.setupGoogleAnalytics = function()
{
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-23103987-1', 'auto', {'name': 'showcase'});
}

/**
 * Setup Analytics Name
 * @param {String} name
 */
DFPCubeAd.prototype.setAnalyticsName = function(ad_name)
{
	this.ad_name = ad_name;
}

DFPCubeAd.prototype.onFirstUserInteraction = function()
{
	ga('showcase.send', 'event', this.ad_name, 'User Interacted With Cube', '%%SITE%%' );
}

/**
 * Adds style sheet to the parent frame as the cube needs to jump out the iframe
 * @method appendStyleSheet
 */
DFPCubeAd.prototype.appendStyleSheet = function()
{
    var styleSheet = document.createElement("link");
    styleSheet.setAttribute("rel", "stylesheet");
    styleSheet.setAttribute("type", "text/css");
    if(this.DEBUG)
    {
        styleSheet.setAttribute("href", "../src/css/toybox-style.css");
    }
    else
    {
        styleSheet.setAttribute("href", "//cdn.gamer-network.net/2014/ads/toybox/toybox.min.css?v=" + this.TB_VERSION);
    }
    parent.document.getElementsByTagName("head")[0].appendChild(styleSheet);
};

/**
* Creates ad box to show that this is an advertisement
* @method setAdNotice
*/
DFPCubeAd.prototype.setAdNotice = function(targetNode)
{
    /*var adNotice = document.createElement('p');
    adNotice.setAttribute("id", "toybox-ad-notice");
    adNotice.setAttribute("style", "display: none;");
    adNotice.textContent = "ADVERTISEMENT";
    this.toyboxElement.appendChild(adNotice);*/
};

/**
 * Sets the parent MPU to 100%
 * @method setMobileMPUSize
 */
DFPCubeAd.prototype.setMobileMPUSize = function()
{
    parent.document.getElementById("mobile-mpu").style.width = "100%";
};