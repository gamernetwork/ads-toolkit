
/******** CREATIVE INIT CODE ********/

function a_runAdjustmentCode(is_local, args) {
    var takeover_skin_image = '%%FILE:SKIN%%' || args.skin; 
    var skin_top_offset = args.offset || '0'; 
    var leaderboard_height = args.height || '250'; 
    var supersize_me = false;
    var takeover_bg_color = args.background_color || 'black';  
    var analytics_ref = 'undefined' || args.analytics;
    var takeover_skin_link = '%%DEST_URL%%';

    if(args.analytics !== undefined) {
    	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-23103987-1', 'auto', {'name': 'showcase'});
    }

    if(args.resize_frame !== undefined) {
    	frameElement.style.height = args.resize_frame + 'px';
    }

    if(!args.is_halfpage) {
	    var page_wrapper = '#page-wrapper';
	    var this_site = '%%SITE%%';
	    if(this_site == 'metabomb.net') {
	        parent.jQuery('.billboard').css({'max-width' : '1260px'});
	        parent.jQuery('.billboard-container').css({'padding' : '0'});
	    }
	    if(this_site == 'nintendolife.com' || this_site == 'pushsquare.com') {
	        page_wrapper = '#page';
	        parent.jQuery('.inset').css({'position' : 'relative'});
	        parent.jQuery('.insert.for-desktop').css({'padding' : '0'});
	        parent.jQuery('.masthead .insert').css({'min-height':'auto'});
	        frameElement.style.width = '1280px';
	    }
	    if(this_site == 'indiedb.com') {
	        skin_top_offset = '-38';
	    }
	    if(this_site == 'roadtovr.com') {
	        page_wrapper = '#td-outer-wrap > .td-outer-container';
	    }
	    if(this_site == 'moddb.com' || this_site == 'indiedb.com') {
	        parent.$('body').css('background', takeover_bg_color + ' url(' + takeover_skin_image + ') no-repeat center ' + skin_top_offset + 'px').prepend("<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; z-index: 1; width: 100%; height: 100%;'></div>");
	        parent.$('#gn_takeover').click(function(){
	          window.open('%%CLICK_URL_ESC%%' + takeover_skin_link, '_blank');
	        });
	    } else {
	        if(page_wrapper !== '#site-wrapper'){
	            parent.jQuery('body').addClass('skin');
	        }
	       parent.jQuery(page_wrapper).prepend("<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; width: 100%; height: 1300px;'></div>");
	          parent.jQuery('#gn_takeover').each(function () {
	                this.style.setProperty('background-color', takeover_bg_color, 'important' );
	                this.style.setProperty('background-image', 'url(' + takeover_skin_image + ')', 'important' );
	                this.style.setProperty('background-position', 'center ' + skin_top_offset + 'px', 'important');
	                this.style.setProperty('background-repeat', 'no-repeat', 'important');
	            });
	        parent.jQuery('#gn_takeover').click(function(){
	          window.open('%%CLICK_URL_ESC%%' + takeover_skin_link, '_blank');
	        });
	        parent.jQuery('#leaderboard').css({'height' : leaderboard_height + 'px', 'min-height' : leaderboard_height + 'px'});
	        parent.jQuery('.advert.leaderboard.landscape').css({'height' : leaderboard_height + 'px'});
	        parent.jQuery('.leaderboard-container').css({'padding' : '0'});
	        if(this_site == 'metabomb.net') {
	            parent.jQuery('.document').css({'padding':'0'});
	            parent.jQuery('.billboard-container').css({'padding':'0'});
	            parent.jQuery('.billboard.advert').css({'padding':'0','width':'1260px'});
	            frameElement.style.width = '1260px';
	        }
	        if(leaderboard_height){
	        	if(!is_local) {
	            	frameElement.style.height = leaderboard_height + 'px';
	        	}
	            parent.jQuery(page_wrapper).each(function () {
	                 this.style.setProperty( 'position', 'relative' );
	            });
	        } 
	        if(supersize_me) {
	            parent.jQuery(".right-sidebar").remove();
	            parent.jQuery(page_wrapper).each(function () {
	                 this.style.setProperty( 'background-color', takeover_bg_color, 'important' );
	            });
	        }
	        parent.jQuery('html').bind('mousemove', function(e) {
	            if( (e.target == parent.jQuery(page_wrapper)[0]) && (e.pageY <= 1300 + parent.jQuery(page_wrapper).position().top ) ) {
	                    parent.jQuery('html').css({ 'cursor' : 'pointer' });
	            } else {
	                    parent.jQuery('html').css({ 'cursor' : 'auto' });
	            }
	        });
	        parent.jQuery('html').bind('click', function (e) { 
	            if( (e.target == parent.jQuery(page_wrapper)[0]) && (e.pageY <= 1300 + parent.jQuery(page_wrapper).position().top ) ) {
	                window.open('%%CLICK_URL_ESC%%' + takeover_skin_link,'_blank');
	            }
	        }); 
	    }
	}
}

/******** CONTAINER CODE ********/

// Add leaderboard link to the leaderboard wrapper 
function a_appendCreativeLink(creative_wrapper, alternate_link) {
	// Append the click-through link to wrapper element 
	var click_through_link = document.createElement('a');
	click_through_link.id = 'a_leaderboard-click-through-link';
	if(alternate_link === undefined) {
		click_through_link.setAttribute('href', '%%CLICK_URL_ESC%%%%DEST_URL%%');
	} else {
		click_through_link.setAttribute('href', alternate_link);
	}
	click_through_link.setAttribute('target', '_blank');
	creative_wrapper.appendChild(click_through_link);
}

// Set container background image 
function a_setCreativeBackground(creative_wrapper, is_local) {
	// Apply background-image based on data-image attribute
	var image_url;
	if(creative_wrapper !== null) {
		image_url = creative_wrapper.dataset.background;
	}
	// Are we doing a local development ?
	if(is_local) {
		console.log('a_: "GET %%FILE:___%% 400 (Bad Request)" errors are generated as a result of the automatic file replacement built into this library. They will not affect the functionality of the library and will not be present in delivery!');
		if(creative_wrapper !== null) {
			if(creative_wrapper.id === 'a_mod-leaderboard-wrapper' || creative_wrapper.id === 'a_push-leaderboard-wrapper' || 
				creative_wrapper.id === 'a_eg-leaderboard-wrapper' || creative_wrapper.id === 'a_300x600-halfpage-wrapper' || 
				creative_wrapper.id === 'a_300x1050-leaderboard-wrapper') {
				if(image_url !== undefined) {
					var local_url = image_url;
					local_url = image_url.replace(/%/g,"").replace(/FILE:/g, 'images/');
					local_url += '.jpg'; // Assumes JPG
					creative_wrapper.style.backgroundImage = 'url('+local_url+')';
				}
			}
			a_handleCPUIntensiveTasks(false, creative_wrapper);
			a_initLocalImages(); // Replace all images with local versions
			a_initLocalVideo();
			a_testPerformance();
		}
	} else {
		a_handleCPUIntensiveTasks(true, creative_wrapper);
		if(creative_wrapper.id === 'a_mod-leaderboard-wrapper' || creative_wrapper.id === 'a_push-leaderboard-wrapper' || 
			creative_wrapper === 'a_eg-leaderboard-wrapper' || creative_wrapper.id === 'a_300x600-halfpage-wrapper' || 
			creative_wrapper.id === 'a_300x1050-leaderboard-wrapper') {
			creative_wrapper.style.backgroundImage = 'url('+image_url+')';
		}
	}
	
}

// Initialise the leaderboard with a click-through link, background image (if needed) and dimensions
function a_initCreative(is_local, args) {
	document.addEventListener('DOMContentLoaded',function(){
		if(!is_local) {
			a_runAdjustmentCode(is_local,args);
		}
		var creative_wrapper = document.getElementById('a_eg-leaderboard-wrapper') || 
		document.getElementById('a_mod-leaderboard-wrapper') || 
		document.getElementById('a_push-leaderboard-wrapper') ||
		document.getElementById('a_300x600-halfpage-wrapper') ||
		document.getElementById('a_300x1050-leaderboard-wrapper');
		a_addAnimationTrigger(creative_wrapper);
		if(creative_wrapper !== null) {
			a_appendCreativeLink(creative_wrapper,args.alternate_link);
		} 
		a_setCreativeBackground(creative_wrapper, is_local);
		// Runs at init as click through's are always needed 
		a_addClickThroughLinks(); 
		if(document.getElementById('a_autoplaying-video')) {
			a_addVideoLinks(is_local,args.youtube_code);
		}
	});
}

/******** UTILITY FUNCTIONS ********/

function a_initLocalImages() { // Called at setLeaderboardBackground
	var images = document.querySelectorAll('img');
	// Regex to remove file path and extension, then add the %%:FILE:%%
	for (var i = 0; i < images.length; i++) {
		var local_src = images[i].src.replace(/%/g,"").replace(/FILE:/g, 'images/');
		local_src += '.png';
		images[i].src =  local_src;
	}
}

function a_initLocalVideo() {
		if(document.getElementById('a_autoplaying-video') !== null) {
		var autoplaying_video = document.getElementById('a_autoplaying-video');
		var local_src = autoplaying_video.src.replace(/%/g,"").replace(/FILE:/g, '');
		local_src += '.mp4';
		autoplaying_video.src = local_src;
	}
}

// Wrap images in a click through, used as the introducion of z-index or inclusion of hover states interferes with the block level leaderboard wrapper
function a_addClickThroughLinks() {
	var click_through_items = document.querySelectorAll('.a_click-through-wrap');
	for (var i = click_through_items.length - 1; i >= 0; i--) {
		var el = click_through_items[i];
		var click_through_wrapper = document.createElement('a');
		click_through_wrapper.setAttribute('href','%%CLICK_URL_ESC%%%%DEST_URL%%');
		click_through_wrapper.setAttribute('target','_blank');
		click_through_wrapper.classList.add('click-through-link');
		el.parentNode.insertBefore(click_through_wrapper,el);
		click_through_wrapper.appendChild(el);
	}
}

// Wrap all video elements (border, video, play button etc) in an a tag, for the opening of the video lightbox
function a_addVideoLinks(is_local, embed_code) {
	var container_link = document.createElement('a');
	var child_divs = document.getElementsByClassName('a_video-link-wrap');
	container_link.classList.add('a_video-link');
	container_link.setAttribute('href', 'https://www.youtube.com/embed/'+embed_code+'?autoplay=1');
	container_link.setAttribute('target', '_blank');
	for (var i = child_divs.length - 1; i >= 0; i--) {
		if(child_divs[i].getAttribute('class') === 'a_video-link-wrap') {
			container_link.appendChild(child_divs[i]);
		}
	}
	var creative_wrapper = document.getElementById('a_eg-leaderboard-wrapper') || 
	document.getElementById('a_mod-leaderboard-wrapper') || 
	document.getElementById('a_push-leaderboard-wrapper') ||
	document.getElementById('a_300x600-halfpage-wrapper') ||
	document.getElementById('a_300x1050-leaderboard-wrapper');
	creative_wrapper.appendChild(container_link);
	if(document.getElementById('a_autoplaying-video')) {
		document.getElementById('a_autoplaying-video').play();
	}
}

// Is used to pause autoplaying video + can be used for any other purpose such as pausing an animation to prevent buildup
function a_windowFocusListen(is_p, fn_focus, fn_blur) {
    var is_parent = is_p; // Listen to parent window (T/F)
    var window_sel;
    var visibility_change;
    var hidden;
    // Take care of prefix 
    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibility_change = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibility_change = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibility_change = 'webkitvisibilitychange';
    }
    // Local / iframe selection
    if (is_parent) {
        window_sel = window.parent.window;
    } else {
        window_sel = window;
    }
    window_sel.addEventListener(visibility_change, function() {
        if (!document.hidden) {
            fn_focus();
            document.body.classList.remove('animation-paused');
        } else {
            fn_blur();
            document.body.classList.add('animation-paused');
        }
    }, true);
}

function a_testPerformance() {
	window.addEventListener('load',function(){
		var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
   		console.log('a_: Creative load time: '+ loadTime + 'ms');
	});
}

// TODO finish adding analytics code

// Simple function to add analytics to an object, pass in an event such a 'click' or 'mouseenter' alonside an analytics reference and event name
HTMLElement.prototype.a_addAnalytics = function(on_ev, analytics_ref, ev_text) {
	this.addEventListener(on_ev, function(){
		//ga();
	});
};

// TODO create function

// Append an object to parent 
HTMLElement.prototype.a_appendToParent = function(args) {
	var object = this;
	object.style.position = 'absolute';
	object.top = args.top || 0 + 'px';
	object.left = args.left || 0 + 'px';
	object.right = args.right || 0 + 'px';
	object.bottom = args.bottom || 0 + 'px';
	// Get css 
	// Inline and add to div 
	// Append to parent 
};

/******** PERFORMANCE FUNCTIONS ********/

function a_handleCPUIntensiveTasks(parent_toggle, creative_wrapper) {
	var in_focus = true;
	var processIntersection;
	// Check for window focus, if hidden, pause and hide the video to save cpu
	var autoplaying_video = document.getElementById('a_autoplaying-video');
	a_windowFocusListen(parent_toggle,function(){
		// Prevent throwing a promise error if there is not video present during development
		if(autoplaying_video !== null && document.getElementById('a_autoplaying-video').readyState === 4) { 
				in_focus = true;
				autoplaying_video.display = 'block';
				autoplaying_video.play();
		}
	},function(){
		if(autoplaying_video !== null && document.getElementById('a_autoplaying-video').readyState === 4) {
				in_focus = false;
				autoplaying_video.display = 'none';
				autoplaying_video.pause();
		} 
	});
	// Check viewport intersection, if < 1/2 is in view, hide the autoplaying video and pause animations
	if('IntersectionObserver' in window) {
        processIntersection = function(entries) {
        	if(document.getElementById('a_autoplaying-video')) {
        		entries.forEach(function(entry) {
	            	if (entry.intersectionRatio > 0.5) {
	              		autoplaying_video.style.opacity = '1';
	              		autoplaying_video.display = 'block';
	              		document.body.classList.remove('animation-paused');
	            	} else {
	              		autoplaying_video.style.opacity = '0';
	              		autoplaying_video.display = 'none';
	              		document.body.classList.add('animation-paused');
	            	}
	          	});
        	}
        };
        var options_dict = {
        	threshold: 0.5
        };
        var observer = new IntersectionObserver(processIntersection, options_dict);
        var theAd = creative_wrapper;
        observer.observe(theAd);
    } 
}

function a_addAnimationTrigger(target_obj) {
	document.body.classList.add('animation-paused');
	window.addEventListener('load', function(){
		document.body.classList.remove('animation-paused');
	});
}

/******** IMAGE FUNCTIONS ********/

function a_progImage(obj) {
	var images = document.querySelectorAll(obj);
	document.addEventListener('DOMContentLoaded',function(){
		for (var i = images.length - 1; i >= 0; i--) {
			images[i].src = images[i].getAttribute('data-fullres');
			images[i].addEventListener('load',function(){
				this.style.filter = 'blur(0)';
			});
		}
	});
}