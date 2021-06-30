$$api.on('ready', function(){
  $( $$api.getSkinLayer() ).append(`
  <style>
  .bbv--large .bbv-logo.bbv-logo-bottomleft .bbv-logo-image, .bbv--large .bbv-logo.bbv-logo-bottomright .bbv-logo-image, .bbv--large .bbv-logo.bbv-logo-topleft .bbv-logo-image, .bbv--large .bbv-logo.bbv-logo-topright .bbv-logo-image, .bbv--xlarge .bbv-logo.bbv-logo-bottomleft .bbv-logo-image, .bbv--xlarge .bbv-logo.bbv-logo-bottomright .bbv-logo-image, .bbv--xlarge .bbv-logo.bbv-logo-topleft .bbv-logo-image, .bbv--xlarge .bbv-logo.bbv-logo-topright .bbv-logo-image {
    max-height: 100px;
    max-width: 150px;
    background: none;
  }

  .bbv--large .bbv-big-buttons, .bbv--medium .bbv-big-buttons, .bbv--touch .bbv-big-buttons {
    width: 68px;
    height: 48px;
  }

  .bbv--medium .bbv-big-buttons .bbv-bigPlay, .bbv--medium .bbv-big-buttons .bbv-bigReplay, .bbv--medium .bbv-big-buttons .bbv-load-spinner, .bbv--touch .bbv-big-buttons .bbv-bigPlay, .bbv--touch .bbv-big-buttons .bbv-bigReplay, .bbv--touch .bbv-big-buttons .bbv-load-spinner, .bbv--large .bbv-big-buttons .bbv-bigPlay, .bbv--large .bbv-big-buttons .bbv-bigReplay, .bbv--large .bbv-big-buttons .bbv-load-spinner {
    width: 68px;
    height: 48px;
    border-radius: 11px!important;
  }

  .bbv--medium .bbv-big-buttons .bbv-bigPlay .bbv-arrow, .bbv--medium .bbv-big-buttons .bbv-bigReplay .bbv-arrow, .bbv--medium .bbv-big-buttons .bbv-load-spinner .bbv-arrow, .bbv--touch .bbv-big-buttons .bbv-bigPlay .bbv-arrow, .bbv--touch .bbv-big-buttons .bbv-bigReplay .bbv-arrow, .bbv--touch .bbv-big-buttons .bbv-load-spinner .bbv-arrow, .bbv--large .bbv-big-buttons .bbv-bigPlay .bbv-arrow, .bbv--large .bbv-big-buttons .bbv-bigReplay .bbv-arrow, .bbv--large .bbv-big-buttons .bbv-load-spinner .bbv-arrow {
    margin-top: 14px;
    width: 18px;
    height: 20px;
  }
  .bbv--medium .bbv-big-buttons .bbv-bigPlay svg, .bbv--medium .bbv-big-buttons .bbv-bigReplay svg, .bbv--medium .bbv-big-buttons .bbv-load-spinner svg, .bbv--touch .bbv-big-buttons .bbv-bigPlay svg, .bbv--touch .bbv-big-buttons .bbv-bigReplay svg, .bbv--touch .bbv-big-buttons .bbv-load-spinner svg, .bbv--large .bbv-big-buttons .bbv-bigPlay svg, .bbv--large .bbv-big-buttons .bbv-bigReplay svg, .bbv--large .bbv-big-buttons .bbv-load-spinner svg {
    width: 18px;
    height: 20px;
  }

  .bbv--touch .bbv-header .bbv-title, .bbv--large .bbv-header .bbv-title {
    font-size: 1rem;
    line-height: 18pt;
  }
   </style>
  `);
  });