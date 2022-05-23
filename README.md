# 프렌독(Friendog)
> 오늘의 집이라는 사이트의 레이아웃을 참고하여 강아지 쇼핑몰 사이트로 리뉴얼한 반응형 웹사이트 프로젝트 입니다. 레이아웃으로 모바일, 태블릿, 데스크탑 형식으로 구성되어있습니다.  

![image](https://user-images.githubusercontent.com/83049523/169685148-721a2a53-facf-4afe-bd0c-878537dacc36.png)


## 개요
본 프로젝트는 반응형 웹으로 리뉴얼 디자인을 거친 웹사이트 입니다. 여러 다른 강아지 쇼핑몰 사이트들을 참고하였으며 모바일에 따른 탭 메뉴 기능, 제품을 보여주는 슬라이드, 제품에 대한 리뷰나 후기에 대한 슬라이드, 검색창 등장 기능, 스크롤 시 메뉴 버튼의 활성화 기능, 구매 팝업창 기능 등으로 구성되어 있습니다. 해당 기능들은 순수 자바스크립트로 구현되었습니다.

### 사용된 언어 및 플러그인
- html / scss / javascript
- tiny-slider


## 주요 기능

### 1. 제품 이미지 혹은 제품 후기 슬라이드
쇼핑몰 특성상 제품의 이미지 혹은 후기, 리뷰에 관한 정보가 필수로 있으며, 이를 나타내는 슬라이드 기능을 구현하였습니다. 제품 이미지의 경우 gallery 형식인 슬라이드로 구현하였으며 제품에 대한 후기, 리뷰 슬라이드는 옆으로 넘어갈 수 있는 슬라이드로 제작하였습니다. 리뷰 슬라이드의 경우 유저가 쓴 게시글의 순서와 게시글의 양이 중요시 되기 때문에 무한 슬라이드 되는 옵션 없이 첫 이미지 좌측에는 아무런 이미지가 표시 되지 않게끔 하였습니다. 또한 모바일버전과 데스크탑 버전의 형태가 상이하기 때문에 디테일 부분에서 서로 다르게 구현하였습니다.

![image](https://user-images.githubusercontent.com/83049523/169685413-d9a5e518-dc72-4c1d-aa4e-28bcdea0b380.png)

``` javascript
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
```

---

### 2. gnb 사이드바 탭 메뉴

gnb 사이드바 탭 메뉴 기능입니다. PC 버전에서의 gnb 메뉴와 모바일 버전에서의 gnb 탭 메뉴는 형태가 다르기 때문에 모바일 버전의 gnb 는 사이드 바로 빼서 작업을 하였고 이를 사이드바 내에서 열었다 닫았다 하는 탭 메뉴 형식으로 구현하였습니다.

![image](https://user-images.githubusercontent.com/83049523/169685587-d0411e24-e798-4b4a-99de-4b036f9b434e.png)


``` javascript
const $sidebarMenuBtn = document.querySelector('.gnb-icon-button.is-menu');
const $sidebar = document.querySelector('.sidebar')

function openSidebar() {
  $sidebar.classList.add('is-active');
  $overlay.classList.add('is-active');
}

function closeSidebar() {
  this.classList.remove('is-active');
  $sidebar.classList.remove('is-active');
}

$sidebarMenuBtn.addEventListener('click', openSidebar);
$overlay.addEventListener('click', closeSidebar);

const $$drawerMenuBtns = document.querySelectorAll('.sidebar-nav .drawer-menu-button');

function drawerMenuHandler() {
  const $drawerMenu = this.parentNode;
  $drawerMenu.classList.toggle('is-active');
  $drawerMenu.classList.toggle('is-open');
}

$$drawerMenuBtns.forEach(($drawerMenuBtn) => {
  $drawerMenuBtn.addEventListener('click', drawerMenuHandler);
});
```

---

### 3. 탭메뉴 버튼 스크롤 / 스크롤에 따른 버튼 활성화
탭 메뉴의 버튼을 클릭하면 해당 section 으로 스크롤 되는 기능과, 스크롤이 section 에 있을 때 해당 탭 메뉴 버튼이 활성화되는 기능입니다. 이때 스크롤 될 때 이전 버튼들이 일일히 활성화되는 버그를 해결하는 기능 또한 추가하였습니다.

![image](https://user-images.githubusercontent.com/83049523/169685746-620c7372-718e-478d-a66c-2982048fa187.png)

![image](https://user-images.githubusercontent.com/83049523/169685806-ca4a82d3-488f-4c50-8f68-12e0ba207efe.png)

``` javascript
const $productTab = document.querySelector('.product-tab')
const $$productTabBtns = $productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 100 + 50 + 54
const TOP_HEADER_MOBILE = 70 + 40 + 40

let currentActiveTab = $productTab.querySelector('.is-active')
let disableUpdating = false

function activeProductTabBtn() {
  const $tabItem = this.parentNode

  if (currentActiveTab !== $tabItem) {
    disableUpdating = true
    $tabItem.classList.add('is-active')
    if (currentActiveTab !== null) {
      currentActiveTab.classList.remove('is-active')
    }
    currentActiveTab = $tabItem

    setTimeout(() => {
      disableUpdating = false
    }, 500)
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const $tabPanel = document.querySelector(`#${tabPanelId}`)
  const scrollAmount =
    $tabPanel.getBoundingClientRect().top - (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount, 
    behavior: 'smooth', 
  })
}

$$productTabBtns.forEach(($productTabBtn) => {
  $productTabBtn.addEventListener('click', activeProductTabBtn)
  $productTabBtn.addEventListener('click', scrollToTabPanel)
})

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]

const productTabPanelList = productTabPanelIdList.map((panelId) => {
  const $tabPanel = document.querySelector(`#${panelId}`)
  return $tabPanel
})

const productTabPanelPositionMap = {}

function detectTabPanelPosition() {
  productTabPanelList.forEach(($tabPanel) => {
    const id = $tabPanel.getAttribute('id')
    const position = Math.floor(window.scrollY + $tabPanel.getBoundingClientRect().top)
    productTabPanelPositionMap[id] = position
  })

  upDateActiveTabScroll();
}

function upDateActiveTabScroll() {

  if (disableUpdating) {
    return
  }

  const scrolledAmount = window.scrollY + (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)

  let newActiveTab
  if (scrolledAmount >= productTabPanelPositionMap['product-recommendation']) {
    newActiveTab = $$productTabBtns[4] 
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newActiveTab = $$productTabBtns[3] 
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = $$productTabBtns[2] 
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newActiveTab = $$productTabBtns[1] 
  } else if (scrolledAmount >= productTabPanelPositionMap['product-spec']) {
    newActiveTab = $$productTabBtns[0] 
  }

  const bodyHeight = document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0) 
  if (window.scrollY + window.innerHeight === bodyHeight) {
    newActiveTab = $$productTabBtns[4]
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000)) 
window.addEventListener('scroll', _.throttle(upDateActiveTabScroll, 300) )
```

## 프로젝트 의의
본 프로젝트를 통해 전반적으로 실무와 관련된 지식을 쌓을 수 있었고, 그리드시스템을 사용하여 반응형웹을 구현했던 부분이 가장 인상깊었습니다. 또한 바닐라 자바스크립트 하드코딩이나 scss 를 통한 모듈화, mixin, 반복문 등을 통해 스타일링을 보다 효율적인 방법으로 진행하는 경험 등에 의의가 있다고 생각합니다.
