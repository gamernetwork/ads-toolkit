function openLightboxOverlay() {

    jQuery('#lightbox-auto-video-wrapper').show();
    jQuery("#lightbox-auto-video-wrapper video")[0].play();

    jQuery('#lightbox-toggle-mute').click(function() {
        jQuery('#lightbox-toggle-mute').toggleClass('active');
        if(jQuery('#lightbox-toggle-mute').hasClass('active')) {
            jQuery("video").prop('muted', false);
        } else {
            jQuery("video").prop('muted', true);
        }
        return false;
    });

}

jQuery('document').ready(function() {

    jQuery('#lightbox-auto-overlay').click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, "fast");
        openLightboxOverlay();
        return false;
    });

    jQuery('#lightbox-overlay-close').click( function() {
        lightboxClose();
    });

    function lightboxClose () {
        jQuery('#lightbox-auto-video-wrapper').hide();
        jQuery('#lightbox-auto-video-inner').remove();
    };

    jQuery('#lightbox-auto-video-wrapper').appendTo('body');
    jQuery('#lightbox-auto-video-wrapper').css({ 'height' : jQuery(document).height() + 'px' });

    jQuery('#lightbox-auto-overlay').trigger('click');   

});