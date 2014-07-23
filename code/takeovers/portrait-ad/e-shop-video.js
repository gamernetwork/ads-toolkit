jQuery(document).ready(function() {

	var j = jQuery;
	var node = j('#portrait-ad-media-image').parent();
	
	// Appended URLs for Gallery
	j('#portrait-ad').find('div.gallery-image').click(function() {
		var url = j(this).attr('title');
		node.attr('href', url);
	});
	
	j('#portrait-ad-tile-video').css({ 'cursor' : 'pointer' });
	
	// Google Analytics Tracking
	function trackGoogleAnalytics (section) {
		// URL
		var url = '/portrait/' + portraitName + '#' + section;
		// Push
		_gaq.push(['_setAccount', 'UA-23103987-1']);
		_gaq.push(['_setDomainName', 'none']);
		_gaq.push(['_setAllowLinker', true]);
		_gaq.push(['_trackPageview', url]);
	};
	
	j('#portrait-ad').find('a.external').click(function() {
		var url = j('#portrait-ad').find('a.external').index(this);
		trackGoogleAnalytics('external-' + url);
	});

});