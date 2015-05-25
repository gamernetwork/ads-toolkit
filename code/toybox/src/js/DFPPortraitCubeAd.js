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
var DFPPortraitCubeAd = function (targetNode, fallback, face1, face2, face3, face4, desktopSupport)
{
    this.init(targetNode, fallback, face1, face2, face3, face4, desktopSupport);
};

DFPPortraitCubeAd.prototype = Object.create(DFPCubeAd.prototype);
DFPPortraitCubeAd.prototype.___super__ = DFPCubeAd;

DFPPortraitCubeAd.prototype.faceObjs;
DFPPortraitCubeAd.prototype.fullyLoaded;

/**
 * Gets portrait items and builds their DOM objects
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
    var galleryObjects = [];
    this.faceObjs = [face1, face2, face3, face4];
    this.fullyLoaded = false;
    
    for(i = 0;i < this.faceObjs.length;i++)
    {
        if(this.faceObjs[i].hasOwnProperty("video"))
        {
            if(this.faceObjs[i].video.hasOwnProperty("url"))
            {
                videoIds.push("video_face_" + i);
                this.faceObjs[i] = {"dom": this.buildVideoDOM("video_face_" + i, this.faceObjs[i].video.url, this.faceObjs[i].video.poster)};
            }
            else
            {
                throw new Error("Missing a video URL");
            }
        }
        else if(this.faceObjs[i].hasOwnProperty("gallery"))
        {
            if(this.faceObjs[i].gallery.hasOwnProperty("galleryPoster"))
            {
                for(var x = 1; x < 5; x++){
                    if(!this.faceObjs[i].gallery.hasOwnProperty("face" + x))
                    {
                        throw new Error("Missing gallery image " + x);
                    }
                }
                this.faceObjs[i].gallery.index = i;
                galleryObjects.push(this.faceObjs[i].gallery);
                this.faceObjs[i] = this.faceObjs[i].gallery.galleryPoster;
            }
            else
            {
                throw new Error("Missing a gallery poster");
            }
        }
    }
    
    this.___super__.prototype.init.call(this, targetNode, fallback, this.faceObjs[0], this.faceObjs[1], this.faceObjs[2], this.faceObjs[3], desktopSupport);
    
    var that = this;
    for(var i=0; i < galleryObjects.length; i++)
    {
        var galleryFace = this.getFace(galleryObjects[i].index + 1);
        galleryFace.showingGallery = false;
        galleryFace.gallery = galleryObjects[i];
        galleryFace.addEventListener("click", function(evt){that.onGalleryClick(evt);});
    }
    
    if(videoIds.length > 0)
    {
        this.loadVideoScripts(videoIds);
    }
    else
    {
        this.finishLoad();
    }
};

/**
 * Gallery click handler, swaps faces with different ones
 * @method onGalleryClick
 */
DFPPortraitCubeAd.prototype.onGalleryClick = function(evt)
{
    evt.stopPropagation();
    if(!this.fullyLoaded)
    {
        return;
    }
    var galleryFace = evt.currentTarget;
    if(evt.currentTarget.showingGallery)
    {
        this.setFace(1, this.faceObjs[0]);
        this.setFace(2, this.faceObjs[1]);
        this.setFace(3, this.faceObjs[2]);
        this.setFace(4, this.faceObjs[3]);
        galleryFace.showingGallery = false;
    }
    else
    {
        this.setFace(1, galleryFace.gallery.face1);
        this.setFace(2, galleryFace.gallery.face2);
        this.setFace(3, galleryFace.gallery.face3);
        this.setFace(4, galleryFace.gallery.face4);
        galleryFace.showingGallery = true;
    }
};

/**
 * Builds and returns the HTML needed for portrait videos
 * @method buildVideoDOM
 * @param videoId {int}
 * @param videoUrl {String}
 * @param posterImgUrl {String}
 */
DFPPortraitCubeAd.prototype.buildVideoDOM = function(videoId, videoUrl, posterImgUrl)
{
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", videoId);
    videoElement.setAttribute("src", videoUrl);
    if(posterImgUrl)
    {
        videoElement.setAttribute("poster", posterImgUrl);
    }
    videoElement.setAttribute("width", "200");
    videoElement.setAttribute("height", "200");
    videoElement.setAttribute("controls", "true");
    videoElement.setAttribute("class", "video-js vjs-default-skin");
    return videoElement;
};

/**
 * Appends video library to the website <head> section
 * @method loadVideoScripts
 * @param videoIds {array}
 */
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

/**
 * Initialises videojs for the portrait video/s, waits for videojs to load before this is run
 * @method findVideos
 * @param videoIds {array}
 */
DFPPortraitCubeAd.prototype.findVideos = function(videoIds)
{
    for(var i = 0;i < videoIds.length;i++)
    {
        parent.videojs(videoIds[i], {}, function(){});
    }
    this.finishLoad();
};

/**
 * Saves a reference to all fully loaded DOM of the faces so they can be swapped on the fly and retreived again
 * @method finishLoad
 */
DFPPortraitCubeAd.prototype.finishLoad = function()
{
    this.faceObjs[0] = {dom: this.getFace(1).firstChild};
    this.faceObjs[1] = {dom: this.getFace(2).firstChild};
    this.faceObjs[2] = {dom: this.getFace(3).firstChild};
    this.faceObjs[3] = {dom: this.getFace(4).firstChild};
    
    this.fullyLoaded = true;
};