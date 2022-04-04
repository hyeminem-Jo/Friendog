const productCarousel = tns({
  container: '.product-carousel .slider-list',
  controls: false, // prev, next 버튼 없애기
  navContainer: '.product-carousel .thumbnail-list', 
  // nav 를 감싸는 요소를 설정, 버튼을 클릭하면 연결된 해당 순서의 이미지로 전환됨
  navAsThumbnails: true, // nav 를 썸네일로 사용하고 있는가?
  arrowKeys: true, // 키보드(화살표)로 슬라이드 조작
  autoplay: true,
  autoplayHoverPause: true, // 마우스 커서를 올리면 autoplay 가 멈춤
  autoplayButtonOutput: false, // autoplay 를 했을 때 나오는 stop 버튼 제거
  mouseDrag: true, // 마우스로 드래그
  preventScrollOnTouch: 'auto', // preventDefault 에러 해결 (true 로 해도 됨)

  // mode: 'gallery', // fadein out 효과 (기본은 'carousel')
  // items: 3,
  // slideBy: 'page',
  // autoplay: true, // 자동으로 움직임
  // loop: true, // 무한 루프
});

const userGalleryMobile = tns({
  container: '.user-gallery.is-mobile .slider-list',
  controls: false, // prev, next 버튼
  navContainer: '.user-gallery.is-mobile .thumbnail-list', 
  navAsThumbnails: true,
  gutter: 4,
  edgePadding: 16, // 옆에 튀어나오게 하기
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: 'auto',
})

const userGalleryDesktop = tns({
  container: '.user-gallery.is-desktop .slider-list',
  controls: true, // prev, next 버튼
  controlsContainer: '.user-gallery.is-desktop .user-gallery-controls',
  navContainer: '.user-gallery.is-desktop .thumbnail-list', 
  navAsThumbnails: true,
  gutter: 6,
  edgePadding: 75, // 옆에 튀어나오게 하기
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: 'auto',
})