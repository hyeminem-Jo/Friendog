const $productTab = document.querySelector('.product-tab')
const $$productTabBtns = $productTab.querySelectorAll('button')

// console.log($$productTabBtns)

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = $productTab.querySelector('.is-active')
// console.log(currentActiveTab)
function activeProductTabBtn() {
  const $tabItem = this.parentNode

  if (currentActiveTab !== $tabItem) {
    $tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = $tabItem
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const $tabPanel = document.querySelector(`#${tabPanelId}`)
  // console.log($tabPanel)

  // getBoundingClientRect(): viewport 기준 위치
  // window.scrollY: 위에서부터 얼마나 scroll 되었는지
  const scrollAmount =
    $tabPanel.getBoundingClientRect().top - (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    // scrollBy: 상대적 위치, 현재 위치 기준으로 주어진 파라미터 값만큼 이동
    top: scrollAmount, // $tabPanel 요소의 top 좌표를 받아 그만큼 아래(+) 혹은 위(-)쪽으로 이동하여 window 화면 영역의 최상단에 걸치도록 한다. (현재 위치 기준)
    behavior: 'smooth', // window.scrollBy() 최신 브라우저 메서드이기 때문에  사파리 등에서는 smooth 하게 작동하지 않는다.
  })
}

$$productTabBtns.forEach(($productTabBtn) => {
  $productTabBtn.addEventListener('click', activeProductTabBtn)
  $productTabBtn.addEventListener('click', scrollToTabPanel)
})

// 사전정보: 각 tabPanel 의 y축 위치 (문서의 시작점(뷰포트x)으로부터 얼마나 아래에 있는지)
// 요소의 y축 위치 = window.scrollY + element.getBoundingClientRect().top
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
// ex) productTabPanelPositionMap 형태:
// {
//   'product-spec': 1000,
//   'product-review': 5000, ...
// }

function detectTabPanelPosition() {
  productTabPanelList.forEach(($tabPanel) => {
    // console.log($tabPanel); 실행 결과: 
    // <section class="product-spec"></section>,
    // <section class="product-review"></section>...
    const id = $tabPanel.getAttribute('id')
    const position = Math.floor(window.scrollY + $tabPanel.getBoundingClientRect().top)
    // console.log(id, position) // product-spec 1806.796875
    productTabPanelPositionMap[id] = position
  })
  // console.log(productTabPanelPositionMap)
}

function upDateActiveTabScroll() {
  // 스크롤 위치에 따라서 activeTab 업데이트
  // 준비물:
  // 1. 현재 유저가 얼마만큼 스크롤을 했느냐 => window.scrollY
  // 2. 각 tabPanel y축 위치

  const scrolledAmount = window.scrollY + (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)
  // TOP_HEADER_DESKTOP + 80 : 유저 관점에서 딱 section 에 도달해서 버튼이 활성화되기 보다, section 이 눈에 보일 시점에 미리 버튼 색이 바뀌면 더 좋을 것 같아서 padding: 80px 만큼의 간격을 가진 부분을 이용해 + 80 을 해주었다. > 기준점 낮추기 
  // (모바일은 section-divider 의 height 값(8px) 만큼)

  // console.log(scrolledAmount)

  let newActiveTab
  if (scrolledAmount >= productTabPanelPositionMap['product-recommendation']) {
    newActiveTab = $$productTabBtns[4] // 추천 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newActiveTab = $$productTabBtns[3] // 배송/환불 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = $$productTabBtns[2] // 문의 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newActiveTab = $$productTabBtns[1] // 리뷰 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-spec']) {
    newActiveTab = $$productTabBtns[0] // 상품정보 버튼
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      // 1. 현재 활성화될 버튼에 active 추가
      newActiveTab.classList.add('is-active')
      // 1. 이전 버튼으로부터 active 클래스 제거
      currentActiveTab.classList.remove('is-active')
      // 3. 이제 active 클래스가 제거된 이전 버튼이 아닌 [현재 활성화된 버튼]으로 currentActiveTab 갱신
      currentActiveTab = newActiveTab
    }
  }

  // console.log(newActiveTab)
}

// window 내의 html 요소들이 모두 load 된 후 위치를 파악하도록 함
// 모바일 버전 등으로 화면 사이즈를 변화시켰을 때 또한 대비를 하기 위해 resize 때도 위치를 파악해야 한다.
window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
// 스크롤 위치에 따라서 activeTab 업데이트
window.addEventListener('scroll', upDateActiveTabScroll)

// console.log(productTabPanelList)