/**
 * Extension of the DFP Cube Ad, for more advanced portrait elements
 * @class Videp DFP Cube Ad
 * @constructor
 * @param {Object} targetNode
 * @param {Object} fallback
 * @param {Object} face1
 * @param {Object} face2
 * @param {Object} face3
 * @param {Object} face4
 * @param {Boolean} desktopSupport
 */
var DFPPortraitCubeAd = function(targetNode, fallback, face1, face2, face3, face4, desktopSupport)
{
    this.init(targetNode, fallback, face1, face2, face3, face4, desktopSupport);
};

DFPPortraitCubeAd.prototype = Object.create(DFPCubeAd.prototype);
DFPPortraitCubeAd.prototype.___super__ = DFPCubeAd;

/**
 * @method init
 * @param {Object} targetNode
 * @param {Object} fallback
 * @param {Object} face1
 * @param {Object} face2
 * @param {Object} face3
 * @param {Object} face4
 * @param {Boolean} desktopSupport
 */
DFPPortraitCubeAd.prototype.init = function(targetNode, fallback, face1, face2, face3, face4, desktopSupport)
{
    var videoIds = [];
    var faceObjs = [face1, face2, face3, face4];
    
    for(i = 0;i < faceObjs.length;i++)
    {
        if(faceObjs[i].hasOwnProperty("video"))
        {
            videoIds.push("video_face_" + i);
            //obj check here
            faceObjs[i] = {"dom": this.buildVideoDOM("video_face_" + i, faceObjs[i].video.url, faceObjs[i].video.poster)};
        }
        else if(faceObjs[i].hasOwnProperty("gallery"))
        {
            
        }
    }
    
    if(videoIds.length > 0)
    {
        this.loadVideoScripts(videoIds);
    }
    
    this.___super__.prototype.init.call(this, targetNode, fallback, faceObjs[0], faceObjs[1], faceObjs[2], faceObjs[3], desktopSupport);
};

DFPPortraitCubeAd.prototype.buildVideoDOM = function(videoId, videoUrl, posterImgUrl)
{
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", videoId);
    videoElement.setAttribute("src", videoUrl);
    videoElement.setAttribute("poster", posterImgUrl);
    videoElement.setAttribute("width", "256");
    videoElement.setAttribute("height", "256");
    videoElement.setAttribute("controls", "true");
    videoElement.setAttribute("class", "video-js vjs-default-skin");
    return videoElement;
}

DFPPortraitCubeAd.prototype.loadVideoScripts = function(videoIds)
{
    var styleSheet = document.createElement("link");
    styleSheet.setAttribute("rel", "stylesheet");
    styleSheet.setAttribute("type", "text/css");
    styleSheet.setAttribute("href", "//images.eurogamer.net/2014/toybox/assets/video-js/video-js.min.css");
    parent.document.getElementsByTagName("head")[0].appendChild(styleSheet);

    var videoScript = document.createElement("script");
    var that = this;
    videoScript.onload = function(e){
        that.findVideos(videoIds);
    };
    videoScript.src = "//images.eurogamer.net/2014/toybox/assets/video-js/video.js";
    parent.document.getElementsByTagName("head")[0].appendChild(videoScript);
};

DFPPortraitCubeAd.prototype.findVideos = function(videoIds)
{
    for(var i = 0;i < videoIds.length;i++)
    {
        parent.videojs(videoIds[i], {}, function(){});
    }
};