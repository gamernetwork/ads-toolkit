/*
US Gamer
Landscape Ad JS
*/

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-23103987-1', 'auto', {'name': 'showcase'});

/* ---------- Exposed */

var mediaPanel;

/* ---------- Scoped */

(function() {

	/* ---------- 'Global' */
	
	// Get Script - For JWPlayer
	function getScript(url, success) {

		var script = document.createElement('script');
			script.type = 'text/javascript'; script.async = true;
			script.src = url;
	
		var head = document.getElementsByTagName('script')[0],
			done = false;
	
		head.parentNode.insertBefore(script, head);

		script.onload = script.onreadystatechange = function() {
	
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
		
				// Callback
				success();
				script.onload = script.onreadystatechange = null;
				done = true;
			
			};
	
		};

	};
	
	/* ---------- DOM Ready */

	jQuery(document).ready(function() {
	
		/* ---------- Options */
	
		// Base jQuery Settings
		var j = jQuery;
			j.fx.interval = 25;
		
		// Landscape Ad Options
		var options = {
			blocks: {
				container: j('#landscape-ad-blocks')
				},
			media: {
				container: j('#landscape-ad-media'),
				state: 'closed',
				splash: j('#advert-media-splash').attr('src'),
				video: j('#advert-video').attr('rel')
				}
			}
			
		/* ---------- Functions */
		
		mediaPanel = {
			state: function (onComplete) {
				
				// Check For Function As Callback
				if( typeof onComplete === 'function' ) {
				
					// Open Panel
					if( options.media.state == 'closed' ) {
				
						// Run Callback On Animation Complete
						this.open(onComplete);
						
					// Change Panel
					} else if( options.media.state == 'open' ) {
					
						// Reset Video
						if( j('#advert-media-video_wrapper').length == 1 ) {
							videoDestroy();
						}
			
						// Run Callback Now
						onComplete();
			
					}
					
				}
				
			},
			open: function (onComplete) {
	
				// Get Content Height
				var height = j('#advert-media-splash').height();
		
				// Open Animation
				options.media.container.animate({ 'height' : height + 16 + 'px' }, 1200, function() {
					j(this).addClass('active').css({ 'height' : 'auto' });
					
					options.media.state = 'open';
					onComplete();
				});
				
				mediaPanel.tracking.google('open');
	
			},
			close: function () {
			
				// Get Content Height
				if( j('#advert-media-splash').css('display') == 'none' ) {
					var height = j('#advert-media-video_wrapper').find('*:first').height();
				} else {
					var height = j('#advert-media-splash').height();
				}
			
				// Non Mobile Breakpoint Includes Padding
				if( window.innerWidth > 540 ) {
					height = height + 16;
				}
				
				// Reset Panel
				j('#advert-media-splash').attr('src', options.media.splash);
				
				// Reset Video
				if( j('#advert-media-video_wrapper').length == 1 ) {
					videoDestroy();
				}
		
				// Close States
				options.media.container.removeClass('active');
				options.media.container.css({ 'height' : height + 'px' });
				
				// Close Animation
				options.media.container.animate({ 'height' : '0px' }, 1200, function() {
					options.media.state = 'closed';
				});
				
				mediaPanel.tracking.google('closed');
			
			},
			tracking: {
				google: function (section) {
					
					// TODO: Implement
					// URL
					var url = '/landscape/' + landscapeName + '#' + section;
					// Push
					ga('showcase.send', 'pageview', url);
				
				},
				thirdParty: function (pixel) {
					
					// TODO: Document
			 
					/* 
					- Example
					track3P({
						beg: 'http://www.google.com/',
						end: '?=TEST'
					});
					*/
			
					// Options
					var options = {};
						options.beg = pixel.beg || '';
						options.end = pixel.end || '';
		
					// Only Track If Pixel Is Set
					if( ( options.beg > 7 ) || ( options.end > 7 ) ) {

						j('#landscape-ad-tracking').attr('src', options.beg + Math.floor(Math.random() * 1000) + options.end );
				
					}
					
				}
			}
		}
		
		function videoCreate () {
		
			j('#advert-media-splash').hide();
	
			jwplayer('advert-media-video').setup({
				'modes': [
					{
						type: 'flash',
						controls: 'none',
						src: 'http://images.eurogamer.net/2011/eg-creative/scripts/jwplayer/player-5.10.swf'
					},
					{
						type: 'html5',
						controls: 'none'
					}
				],
				autostart: true,
				file: options.media.video,
				height: '100%',
				width: '100%',
				dock: false
			});

			ga('showcase.send', 'event', 'ESO', 'Landscape Video Open', campaignID);

			jwplayer('advert-media-video').onComplete( function(evt) { 
				ga('showcase.send', 'event', 'ESO', 'Landscape Video Complete', campaignID);
			});
		
		};
		
		function videoDestroy () {
				
			jwplayer('advert-media-video').stop();
			// jwplayer('advert-media-video_wrapper').remove();
			j('#advert-media-video_wrapper').remove();
			j('<div id="advert-media-video"></div>').insertAfter('#advert-media-splash');
			j('#advert-media-splash').show();
			ga('showcase.send', 'event', 'ESO', 'Landscape Video Close', campaignID);

		};
		
		/* ---------- Event Handlers */
		
		// Video
		
		j('#advert-video-play-btn').css({ 'opacity' : '0.8' });
		
		j('#advert-video-play-btn').click(function() {
		
			mediaPanel.tracking.google('video');

			mediaPanel.state(function() {
		
				// On Complete
				if( typeof jwplayer === 'undefined' ) {
					getScript('http://images.eurogamer.net/2011/eg-creative/scripts/jwplayer/jwplayer-5.10.js', videoCreate);
				} else {
					videoCreate();
				}
			
			});
		});
		
		j('#advert-video-play-btn').mouseenter(function() {
				
			j(this).animate({ 'opacity' : '1' }, 100);
				
		});

		j('#advert-video-play-btn').mouseleave(function() {
				
			j(this).animate({ 'opacity' : '0.8' }, 100);
				
		});
		
		// Screenshots
		j('#advert-screens-container').find('div.advert-screen').click(function() {
		
			var selected = j('#advert-screens-container').find('div.advert-screen').index(this);
			var node = j('#advert-screens-container').find('div.advert-screen').eq(selected);
			
			mediaPanel.tracking.google('screens-' + selected);
			ga('showcase.send', 'event', 'ESO', 'Landscape Open Gallery #' + selected, campaignID);
		
			mediaPanel.state(function() {
				
				// On Complete					
				j('#advert-media-splash').attr('src', node.attr('rel'));
				
			});
		
		});
		
		// Close Button
		j('#advert-media-close').click(function() {
			mediaPanel.close();
		});

	});
	
})();