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
DFPPortraitCubeAd.prototype.inImageGallery = false;

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
	
	this.onGalleryClick = this.onGalleryClick.bind(this);
    
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
    
    for(var i=0; i < galleryObjects.length; i++)
    {
        var galleryFace = this.getFace(galleryObjects[i].index + 1);
        galleryFace.showingGallery = false;
        galleryFace.gallery = galleryObjects[i];
        galleryFace.addEventListener("click", this.onGalleryClick);
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
	ga('showcase.send', 'event', this.ad_name, 'Click View Gallery', '%%SITE%%' );
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
		this.inImageGallery = false;
    }
    else
    {
		//cache the DOM objects, lazy loading here rather than at run time, saving mobile bandwidth yo!
		if(galleryFace.gallery.hasOwnProperty("cachedface1") == false)
		{
			var that = this;
			for(item in galleryFace.gallery)
			{
				if(galleryFace.gallery[item].hasOwnProperty("img") && item != "galleryPoster")
				{
					var imgWrapper = document.createElement('div');
					
					var galleryImgNode = document.createElement('img');
					galleryImgNode.setAttribute("class", "loading-img-face");
					
					var loadingSpinner = document.createElement('div');
					loadingSpinner.setAttribute("class", "spinner");

					var rightArrow = document.createElement('img');
					rightArrow.setAttribute("class", "arrow right");
					if(this.DEBUG)
					{
						rightArrow.setAttribute("src", "../img/right.png");
					}
					else
					{
						rightArrow.setAttribute("src", "//cdn.gamer-network.net/2014/ads/toybox/right.png");
					}
					
					rightArrow.addEventListener("click", function(evt){that.onGalleryNext(evt);});
					
					imgWrapper.appendChild(galleryImgNode);
					imgWrapper.appendChild(rightArrow);
					imgWrapper.appendChild(loadingSpinner);
					
					galleryFace.gallery["cached" + item] = {"dom": imgWrapper};
					
					var galleryImg = new Image;
					galleryImg.onload = function() {
						var imgFace = galleryFace.gallery["cached" + this.key].dom.getElementsByClassName("loading-img-face")[0];
						imgFace.src = this.src;
						imgFace.setAttribute("class", "default-img-face");
						
						var spinner = galleryFace.gallery["cached" + this.key].dom.getElementsByClassName("spinner")[0];
						spinner.parentElement.removeChild(spinner);
					}
					galleryImg.key = item;
					galleryImg.src = galleryFace.gallery[item].img;
				}
				else
				{
					galleryFace.gallery["cached" + item] = galleryFace.gallery[item];
				}
			}
		}
		
        this.setFace(1, galleryFace.gallery.cachedface1);
        this.setFace(2, galleryFace.gallery.cachedface2);
        this.setFace(3, galleryFace.gallery.cachedface3);
        this.setFace(4, galleryFace.gallery.cachedface4);
        galleryFace.showingGallery = true;
		this.inImageGallery = true;
    }
};

/**
 * Gallery click handler, swaps faces with different ones
 * @method onGalleryClick
 */
DFPPortraitCubeAd.prototype.onGalleryNext = function(evt)
{
	ga('showcase.send', 'event', this.ad_name, 'Click Gallery Next Button', '%%SITE%%' );
	evt.stopPropagation();
	this.roundCube(-90);
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
    videoElement.setAttribute("width", "254");
    videoElement.setAttribute("height", "210");
    videoElement.setAttribute("controls", "true");
    videoElement.setAttribute("preload", "none");
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
    styleSheet.setAttribute("href", "//cdn.gamer-network.net/2014/toybox/assets/video-js/video-js.min.css");
    parent.document.getElementsByTagName("head")[0].appendChild(styleSheet);

    var videoScript = document.createElement("script");
    var that = this;
    videoScript.onload = function(e){
        that.findVideos(videoIds);
    };
    videoScript.src = "//cdn.gamer-network.net/2014/toybox/assets/video-js/video.js";
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
		var ad_name = this.ad_name;
        parent.videojs(videoIds[i], {}, function(){}).ready(function(){
			this.on("play", function() {
				ga('showcase.send', 'event', ad_name, 'Video Play', '%%SITE%%' );
			});
		});
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

/**
 * override of the original roundCube method to add some analytics
 * @param {int} bias
 */
DFPPortraitCubeAd.prototype.roundCube = function(bias)
{
	bias = typeof bias !== 'undefined' ? bias : 0;
	this.xDeg = 90 * (Math.round((this.xDeg + bias) / 90));
	this.cubeElement.setAttribute("class", "anim-cube");
	
	var newFace = this.getFaceInView();
	if(newFace != this.currentFace)
	{
		this.currentFace = newFace;
		var face = this.currentFace;

		if(face == 1)
		{
			face = 3;
		}
		else if(face == 3)
		{
			face = 1;
		}

		ga('showcase.send', 'event', this.ad_name, 'Focused on side ' + face + ' In image gallery: ' + this.inImageGallery, '%%SITE%%' );
	}
};