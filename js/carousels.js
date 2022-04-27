const productCarousel = tns({
  container: '.product-carousel .slider-list',
  mode: 'gallery',
  controls: false, 
  navContainer: '.product-carousel .thumbnail-list', 
  navAsThumbnails: true, 
  arrowKeys: true, 
  autoplay: true,
  autoplayHoverPause: true, 
  autoplayButtonOutput: false, 
  mouseDrag: true, 
  preventScrollOnTouch: 'auto', 
});

const userGalleryMobile = tns({
  container: '.user-gallery.is-mobile .slider-list',
  controls: false, 
  navContainer: '.user-gallery.is-mobile .thumbnail-list', 
  navAsThumbnails: true,
  gutter: 4,
  edgePadding: 16, 
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: 'auto',
})

const userGalleryDesktop = tns({
  container: '.user-gallery.is-desktop .slider-list',
  controls: true, 
  controlsContainer: '.user-gallery.is-desktop .user-gallery-controls',
  navContainer: '.user-gallery.is-desktop .thumbnail-list', 
  navAsThumbnails: true,
  gutter: 6,
  edgePadding: 75, 
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: 'auto',
})