// DEFAULT
var halfpage_container = jQuery('div.halfpage-container');

function takeover_scale() {
	var iframe_margin = 10;
	var site_width = 960;
	var window_width = jQuery(document).width();
	var browser_width =  jQuery( window ).width();

	var content_offset = jQuery('#box5').offset();
	jQuery('.halfpage-container').css({ 'left' : content_offset.left + 960 + 'px' });
	
	var width = (window_width - site_width) / 2 - 2 * iframe_margin + 150;
	console.log(browser_width);
	if ( browser_width < 400 ) {
		jQuery('.halfpage-container').width(width);
		jQuery('.primaryContainer').css({ 'background-image' : 'url(' + jQuery('#responsive-skin-takeover').attr('data-original') + '/EG11/resize/400x-1/crop/400x800/format/jpg/quality/100)' });
	} else {
		if ( browser_width < 1024 ) {
			jQuery('.halfpage-container').width(width);
			jQuery('.primaryContainer').css({ 'background-image' : 'url(' + jQuery('#responsive-skin-takeover').attr('data-original') + '/EG11/resize/1024x-1/crop/1024xx800/format/jpg/quality/100)' });
		} else {
			jQuery('.halfpage-container').width(400);
			jQuery('.primaryContainer').css({ 'background-image' : 'url(' + jQuery('#responsive-skin-takeover').attr('data-original') + ')' });
		}
	}
	
}

jQuery(window).ready(function(){
	// DEFAULT
	jQuery(window).load(takeover_scale);
	jQuery(window).ready(takeover_scale);
	jQuery(window).resize(takeover_scale);
	jQuery(window).scroll(takeover_scale);
	jQuery("body").append(halfpage_container);

});