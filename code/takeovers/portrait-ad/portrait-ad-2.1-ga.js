/*
Eurogamer
Portrait Ad JS
*/

/* ---------- Global */

// GA From micro.js
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23103987-1', 'eurogamer.net', {'name': 'showcase'});

// Dimensions
var portraitMargin = 0;

var mediaToggle;

var topOffset;

/* ---------- DOM Ready */

jQuery(document).ready(function() {
	
	// Globals
	var j = jQuery;
	
	// Dimensions
	topOffset = j('#header').height() + j('#leaderboard').height() + portraitMargin;
	var openWidth = '654px'; // Image Width + Margin - Shadow
    var closeWidth = '0px';
    var mediaBg = j('#portrait-ad-media-image', portraitMedia).attr('src');
	
	// States
    var expanded = false;
    var position = '';
    
   	if( j('#portrait-ad-tile-video').find('div.video-image').length <= 0 ) {
    	var multipleVideos = false;
    } else {
    	var multipleVideos = true;
    }
    
    // Durations
   	var expandSpeed = 900;
   	var closeSpeed = 300;
   	var mediaDelay = 100;
   	var opacitySpeed = 100;
   	
   	// Cache
   	var portraitAd = j('#portrait-ad');
   	var portraitMedia = j('#portrait-ad-media');
	
   	// Google Analytics Tracking
	function trackGoogleAnalytics (section) {
		// URL
		var url = '/portrait/' + portraitName + '#' + section;
		// Push
		ga('showcase.send', 'pageview', url);
	};
	
	function trackThirdParty () {};
    
	// Close Media Panel
	function mediaClose () {	
		// Reset Video
		j('#portrait-ad-media-video').contents().remove().css({ 'display' : 'none' });
    	j('#portrait-ad-media-image').attr('src', mediaBg);
		
		// Close
		// if( multipleVideos == true ) {
		//	j('#portrait-ad-tile-video').find('div.video-info').animate({ 'opacity' : '0' }, 500, function() {
		//		j(this).css({ 'display' : 'none' });
		//	});
		// }
		
		portraitMedia.find('div.close-mask').animate({ 'height' : '0px' }, 100, function() {
			j(this).css({ 'display' : 'none' });
			
			portraitMedia.stop().animate({ 'width' : closeWidth }, expandSpeed);
			portraitMedia.find('div.media-mask').stop().animate({ 'width' : closeWidth }, expandSpeed, function() {
				// Remove Shadow
				portraitMedia.removeClass('box-shadow');
				// Display Play Button
				j('#portrait-ad-tile-video').find('div.play-btn').removeClass('hidden');
			});
		});
		
		j('#close-fix').css({ 'display' : 'none' });
		
		expanded = false;
		position = '';
		return false;
	};
    
	// Media Panel
    mediaToggle = function (destination, setPosition, onComplete, onCompleteArgs) {
    	// Panel Closed
    	if (expanded == false) {
    		
    		// Move Panel
    		portraitMedia.css({ 'top' : portraitAd.find(destination).offset().top - topOffset });
    		
    		position = setPosition;
    		
    		// Open
			portraitMedia.stop().animate({ 'width' : openWidth }, expandSpeed).addClass('box-shadow');
			portraitMedia.find('div.media-mask').stop().animate({ 'width' : openWidth }, expandSpeed, function() {
				j('#close-fix').css({ 'display' : 'block' });
				portraitMedia.find('div.close-mask').css({ 'display' : 'block' }).animate({ 'height' : '22px' }, 100);
				
				// On Open
				if( onComplete != undefined ) {
					setTimeout(function() { onComplete(onCompleteArgs); }, 500);
				}
			});
			expanded = true;
    	
    	// Panel Open
    	} else if (expanded == true) {
    	
    		// Does Not Need To Move
    		if (position == setPosition) {
    			
    			// On Open
				if( onComplete != undefined ) {
					setTimeout(function() { onComplete(onCompleteArgs); }, 500);
				}
    			
    		// Needs To Move
    		} else {
    		
    			// Resets
    			j('#portrait-ad-media-image').attr('src', mediaBg);
				j('#portrait-ad-media-video').contents().remove().css({ 'display' : 'none' });
				
				// Move Panel
				portraitMedia.stop().animate({
					'top' : portraitAd.find(destination).offset().top - topOffset
				}, 500, function() {
				
					// Display Play Button
					j('#portrait-ad-tile-video').find('div.play-btn').removeClass('hidden');
					// On Open
					if( onComplete != undefined ) {
						setTimeout(function() { onComplete(onCompleteArgs); }, 500);
					}
			
				});
				
				position = setPosition;
			}
    	}
    	
    };
    
    function checkVideoInfo () {
    	var videoInfo = j('#portrait-ad-tile-video').find('div.video-info');
    	
    	if( multipleVideos == false ) {
    	
    		return false;
    	
    	} else {
    	
			if( (videoInfo.css('display') == 'block') && (position != 'video') ) {
				videoInfo.animate({ 'opacity' : '0' }, 500, function() {
					j(this).css({ 'display' : 'none' });
				});
			} else {
				videoInfo.css({ 'display' : 'block' });
				videoInfo.animate({ 'opacity' : '1' }, 500);
			}
			
		}
    };
    
    // Create Video
	function videoBuild (video) {
		j('#portrait-ad-media-video').prepend('<div id="portrait-ad-video-container"/>');
		portraitAd.find('div.play-btn').addClass('hidden');
		jwplayer('portrait-ad-video-container').setup({
			'modes': [
				{
					type: 'flash',
					src: "http://www.eurogamer.net/scripts/Eurogamer/jwplayer/player.swf",
					controls: 'none'
				},
				{
					type: 'html5',
					controls: 'none'
				},
				{
					type: 'download'
				}
				
			],
			autostart: true,
			file: video,
			height: 362,
			width: 644,
			dock: false
		}); 
		// Show
		setTimeout(function() { j('#portrait-ad-media-video').css({ 'display' : 'block' }); }, mediaDelay);
	};
	
	// Video Carousel
	function videoSetup () {
	
		var totalSplashes = portraitAd.find('div.video-image').length;
		
    	j('#portrait-ad-tile-video').find('div.video-info').css({ 'display' : 'block', 'opacity' : '1' });
		
		portraitAd.find('div.video-image').hover(function() {
			j(this).find('div.gallery-border').animate({ 'opacity' : '1' }, opacitySpeed);
		}, function() {
			j(this).find('div.gallery-border').animate({ 'opacity' : '0' }, opacitySpeed);
		});
		
		portraitAd.find('div.play-btn').hover(function() {
			portraitAd.find('div.play-bg').animate({ 'opacity' : '1' }, opacitySpeed);
		}, function() {
			portraitAd.find('div.play-bg').animate({ 'opacity' : '0.8' }, opacitySpeed);
		});
		
		// Set Values
		j('#portrait-ad-tile-video').find('div.play-bg').css({ 'opacity' : '0.8' });
	};
	
	function imageBuild (full) {
		j('#portrait-ad-media-image').attr('src', full);
	};
	
	// Gallery
	function gallerySetup () {
		
		portraitAd.find('div.gallery-image').hover(function() {
			j(this).find('div.gallery-border').animate({ 'opacity' : '1' }, opacitySpeed);
		}, function() {
			j(this).find('div.gallery-border').animate({ 'opacity' : '0' }, opacitySpeed);
		});
		
	};
	
	// Events
	portraitAd.find('div.gallery-image').click(function(e) {
		e.preventDefault();
		if ( portraitMedia.is(':animated') ) {
			return false; // Fail
		} else {
		
			// checkVideoInfo();
			
			var numberOfImages = portraitAd.find('div.gallery-thumbs div.gallery-image').length;
			var clickedNode = portraitAd.find('div.gallery-thumbs div.gallery-image').index(this);
			var full = j(this).find('img').attr('rel');
			
			mediaToggle('#portrait-ad-tile-gallery', 'gallery', imageBuild, full);
			
			// GA
			trackGoogleAnalytics('screens' + clickedNode);
		}
	});

	portraitAd.find('div.video-image').click(function() { 
		if ( ( portraitMedia.is(':animated') ) || ( j(this).hasClass('disabled') ) ) {
			return false; // Fail
		} else {
		
			// Details
			var clickedNode = portraitAd.find('div.video-image').index(this);
			// console.log(clickedNode);
			var splash = j(this).find('img').attr('rel');
			var title = j(this).find('img').attr('alt');
			var video = j(this).find('a').attr('href');
			var title = j(this).find('img').attr('title');
			var strap = j(this).find('img').attr('strap');
			j('#portrait-ad-tile-video').find('div.splash-video').attr('href', video);
			portraitAd.find('a.splash-video').attr('href', video);
			j('#portrait-ad-tile-video').find('span.counter-selected').html(clickedNode + 1);
			j('#portrait-ad-tile-video').find('img.splash-image').attr('src', splash);
			j('#portrait-ad-tile-video').find('div.video-info-title').html(title);
			j('#portrait-ad-tile-video').find('div.video-info-strap').html(strap);
					
			// checkVideoInfo();
			
			portraitAd.find('div.play-btn').addClass('hidden');
		
			// Destroy Existing Videos
			j('#portrait-ad-media-video').contents().remove();
			
			mediaToggle('#portrait-ad-tile-video', 'video', videoBuild, video);
		
			// GA
			trackGoogleAnalytics('videos' + (clickedNode + 1) );
		}
	});

	portraitAd.find('div.play-btn').click(function(e) {   
		if ( portraitMedia.is(':animated') ) {
			return false; // Fail
		} else {
		
			// checkVideoInfo();
			
			portraitAd.find('div.play-btn').addClass('hidden');
			var video = portraitAd.find('img.splash-image', portraitAd).next('a').attr('href');
			var clickedNode = 1;
			
			mediaToggle('#portrait-ad-tile-video', 'video', videoBuild, video);
			
			e.preventDefault(); 
		
			// GA
			trackGoogleAnalytics('videos' + clickedNode);
		}
	});

	j('#portrait-ad-media-close').click(mediaClose);
	
	// Twitter
	function twitterSetup () {
		j('#twtr-widget-1').appendTo('#twitter-mask'); // Opera Fix
        
        function twidget () {
        
            var anim;
            var hold = 3000;
            
            j('#twitter-mask').find('.twtr-tweet:first').css({ 'opacity' : '1', 'display' : 'block' });
            
            // Animate
            function anim () {
                j('#twitter-mask').find('.twtr-tweet:first').animate({ 'opacity' : '0' }, 500, function() {
                    j(this).css({ 'display' : 'none' });
                    j(this).appendTo('.twtr-tweets');
                    j('#twitter-mask').find('.twtr-tweet:first').css({ 'display' : 'block' }).animate({ 'opacity' : '1' }, 500, function() {
                        setTimeout(anim, hold);
                    });
                });
            };
            
            // Start
            setTimeout(anim, hold);
        
        };
        
        init = function (fn) {
            var count = 20;
            
            if (j('#tweet-id-1').length <= 0) {
                // Try Again
                if (count > 1) {
                    setTimeout(function() {
                        init(fn, count - 1);
                    }, 500);
                }           
            } else {
                // Let's Go!
                fn();
            }
        };

        init(twidget);
        
    };	
    
    // Init
    if( j('#portrait-ad').find('#twitter-mask').length > 0 ) {
    	twitterSetup();
    }
    
    videoSetup();
    gallerySetup();
    
});