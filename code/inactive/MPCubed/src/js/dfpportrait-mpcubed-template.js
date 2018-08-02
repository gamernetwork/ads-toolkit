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
var DFPPortraitCubeAd = function (targetNode, fallback, face1, face2, face3, face4, desktopSupport, closeButtonImage)
{
    this.init(targetNode, fallback, face1, face2, face3, face4, desktopSupport, closeButtonImage);
};

DFPPortraitCubeAd.prototype = Object.create(DFPCubeAd.prototype);
DFPPortraitCubeAd.prototype.___super__ = DFPCubeAd;

DFPPortraitCubeAd.prototype.faceObjs;
DFPPortraitCubeAd.prototype.fullyLoaded;
DFPPortraitCubeAd.prototype.inImageGallery = false;
DFPPortraitCubeAd.prototype.closeButtonImage;

var thisCube;

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
DFPPortraitCubeAd.prototype.init = function(targetNode, fallback, face1, face2, face3, face4, desktopSupport, closeButtonImage)
{
    thisCube = this;

    var videoIds = [];
    var galleryObjects = [];
    this.faceObjs = [face1, face2, face3, face4];
    this.fullyLoaded = false;

    this.closeButtonImage = closeButtonImage;
   
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

    this.___super__.prototype.init.call(this, targetNode, fallback, this.faceObjs[0], this.faceObjs[1], this.faceObjs[2], this.faceObjs[3], desktopSupport, closeButtonImage);
    
    for(var i=0; i < galleryObjects.length; i++)
    {
        var galleryFace = this.getFace(galleryObjects[i].index + 1);
        galleryFace.showingGallery = false;
        galleryFace.gallery = galleryObjects[i];
        galleryFace.addEventListener("click", this.onGalleryClick);
    }
    
    // load YouTube API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.finishLoad();
};

/**
 * Gallery click handler, swaps faces with different ones
 * @method onGalleryClick
 */
DFPPortraitCubeAd.prototype.onGalleryClick = function(evt)
{
	ga('showcase.send', 'event', this.ad_name, 'Click View Gallery', this.site_name );
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

					/*var rightArrow = document.createElement('img');
					rightArrow.setAttribute("class", "arrow right");
					if(this.DEBUG)
					{
						rightArrow.setAttribute("src", "../img/right.png");
					}
					else
					{
						rightArrow.setAttribute("src", "//cdn.gamer-network.net/2014/ads/toybox/right.png");
					}*/
					
					imgWrapper.appendChild(galleryImgNode);
					//imgWrapper.appendChild(rightArrow);
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
		this.spin();
    }
};

/**
 * Gallery click handler, swaps faces with different ones
 * @method onGalleryClick
 */
/*DFPPortraitCubeAd.prototype.onGalleryNext = function(evt)
{
	ga('showcase.send', 'event', this.ad_name, 'Click Gallery Next Button', this.site_name );
	evt.stopPropagation();
};
*/
/**
 * Builds and returns the HTML needed for portrait videos
 * @method buildVideoDOM
 * @param videoId {int}
 * @param videoUrl {String}
 * @param posterImgUrl {String}
 */
var videosReady = false;
var ytVideos = [];
var mp4Videos = [];
DFPPortraitCubeAd.prototype.buildVideoDOM = function(videoId, videoUrl, posterImgUrl)
{

    var posterElement = document.createElement('div');
    posterElement.setAttribute("class", "videoPoster");
    posterElement.style.backgroundImage = "url('" + posterImgUrl + "')";
    posterElement.style.backgroundSize = "100%";
    posterElement.style.width = 300;
    posterElement.style.height = 250;
    posterElement.style.position = "absolute";
    posterElement.style.top = 0;

    var closeElement = document.createElement('img');
    closeElement.setAttribute("class", "videoClose");
    closeElement.style.display = "none";
    closeElement.src = this.closeButtonImage;
    // closeElement.style.backgroundImage = "url('" + this.closeButtonImage + "')";
    // closeElement.style.backgroundSize = "100%";
    // closeElement.style.width = 40;
    // closeElement.style.height = 40;
    closeElement.style.position = "absolute";
    closeElement.style.top = 0;
    closeElement.style.right = 0;

    var isYouTube = false;
    var ytUrl = linkifyYouTubeURLs(videoUrl);
    if (ytUrl != videoUrl) {
        isYouTube = true;
        var videoElement = document.createElement('div');
        videoElement.setAttribute("id", videoId);
        ytVideos.push({element: videoElement, videoUrl: ytUrl});
    } else {
        var videoElement = document.createElement('video');
        videoElement.setAttribute("id", videoId);
        videoElement.setAttribute("src", videoUrl);
        videoElement.setAttribute("width", "300");
        videoElement.setAttribute("height", "250");
        videoElement.setAttribute("controls", "true");
        videoElement.setAttribute("playsinline", "true");
        videoElement.style.backgroundColor = "black";
        videoElement.onpause = function(){mp4Paused(closeElement);};
        mp4Videos.push(videoElement);
    }

    posterElement.onclick = function(){clickFace(videoId, this, closeElement, isYouTube)};
    closeElement.onclick = function(){clickFace(videoId, posterElement, this, isYouTube);};

    var videoContainer = document.createElement('div');
    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(closeElement);
    videoContainer.appendChild(posterElement);

    videosReady = true;
    if (ytReady) makeYouTubePlayer();
    
    return videoContainer;
};

function mp4Paused(close) {
    close.style.display = 'none';
    showAllPosters();
}

var ytPlayers = [];
function clickFace(videoId, poster, close, isYouTube) {
    if (isYouTube && ytReady)
    {
        var playerNumber = videoId.substr(videoId.length - 1);
        var player;
        for (var i = 0; i < ytPlayers.length; i++) {
            if (ytPlayers[i].face === playerNumber) {
                player = ytPlayers[i].player;
                break;
            }
        }
        if (player) {
            if (player.getPlayerState() != 1) {
                // play YouTube video
                poster.style.display = 'none';
                close.style.display = 'block';
                player.playVideo();
                thisCube.setVideoPlaying(true);
                // console.log(thisCube.ad_name + ' play ' + videoId);
                ga('showcase.send', 'event', thisCube.ad_name, 'Play ' + videoId, this.site_name );
            } else {
                // pause YouTube video
                close.style.display = 'none';
                showAllPosters();
                thisCube.setVideoPlaying(false);
            }
        }
    } else {
        var video = document.getElementById(videoId);
        if (video) {
            if (video.paused) {
                // play mp4 video
                poster.style.display = 'none';
                close.style.display = 'block';
                video.play();
                thisCube.setVideoPlaying(true);
                // console.log(thisCube.ad_name + ' play ' + videoId);
                ga('showcase.send', 'event', thisCube.ad_name, 'Play ' + videoId, this.site_name );
            } else {
                // pause mp4 video
                close.style.display = 'none';
                showAllPosters();
                thisCube.setVideoPlaying(false);
            }
        }
    }
}

function pauseAllVideos() {
    if (ytReady)
    {
        for (var i = 0; i < ytPlayers.length; i++) {
            ytPlayers[i].player.pauseVideo();
        }
    }

    for (var i = 0; i < mp4Videos.length; i++) {
        mp4Videos[i].pause();
    }

    thisCube.setVideoPlaying(false);
}

function showAllPosters() {
    var posters = document.getElementsByClassName("videoPoster");
    for (var i = 0; i < posters.length; i++) {
        posters[i].style.display = 'block';
    }
    pauseAllVideos();
}

function getMatchingIds(str)
{
    var nodes = document.body.getElementsByTagName('*'),
    L = nodes.length, A = [], temp;
    while (L){
        temp = nodes[--L].id || '';
        if (temp.indexOf(str) == 0) A.push(temp);
    }
    return A;
}

function makeYouTubePlayer() {
    if (videosReady)
    {
        for(var i = 0;i < ytVideos.length;i++)
        {
            var newPlayer = new YT.Player(ytVideos[i].element, {
                height: '250',
                width: '300',
                playerVars: {
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    controls: 1
                },
                videoId: ytVideos[i].videoUrl,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            ytPlayers.push({player: newPlayer, face: ytVideos[i].element.id.substr(ytVideos[i].element.id.length - 1)});
        }
    } else ytReady = true;
}

function onYouTubeIframeAPIReady() {
    makeYouTubePlayer();
}

function linkifyYouTubeURLs(text) {
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    return text.replace(re, '$1');
}

var ytReady = false;
function onPlayerReady(event) {
    ytReady = true;
}

function onPlayerStateChange(event) {
    if (event.data == 2) {
        showAllPosters();
    }
}

/**
 * Initialises videojs for the portrait video/s, waits for videojs to load before this is run
 * @method findVideos
 * @param videoIds {array}
 */
// DFPPortraitCubeAd.prototype.findVideos = function(videoIds)
// {
//     for(var i = 0;i < videoIds.length;i++)
//     {
// 		var ad_name = this.ad_name;
//         videojs(videoIds[i], {}, function(){}).ready(function(){
// 			this.on("play", function() {
// 				ga('showcase.send', 'event', ad_name, 'Video Play', this.site_name );
// 			});
// 		});

//         videojs(videoIds[i]).pause();
//     }
//     this.finishLoad();
//     // this.pauseAllVideos();
// };


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
