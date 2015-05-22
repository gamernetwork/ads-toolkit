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
        this.setMobileMPUSize();
    }
    window.frameElement.style.height =  "0";
    window.frameElement.style.marginBottom = "0px";
};

/**
 * Adds style sheet to the parent frame as the cube needs to jump out the iframe
 * @method appendStyleSheet
 */
DFPCubeAd.prototype.appendStyleSheet = function()
{
    var styleSheet = document.createElement("link");
    styleSheet.setAttribute("rel", "stylesheet");
    styleSheet.setAttribute("type", "text/css");
    styleSheet.setAttribute("href", "//images.eurogamer.net/2014/toybox/toybox-style.css?v=1");
    parent.document.getElementsByTagName("head")[0].appendChild(styleSheet);
};

/**
 * Sets the parent MPU to 100%
 * @method setMobileMPUSize
 */
DFPCubeAd.prototype.setMobileMPUSize = function()
{
    parent.document.getElementById("mobile-mpu").style.width = "100%";
}