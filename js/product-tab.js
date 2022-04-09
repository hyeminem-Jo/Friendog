const $productTab = document.querySelector('.product-tab')
const $$productTabBtns = $productTab.querySelectorAll('button')

// console.log($$productTabBtns)

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = $productTab.querySelector('.is-active')
let disableUpdating = false
// console.log(currentActiveTab)

function activeProductTabBtn() {
  const $tabItem = this.parentNode

  if (currentActiveTab !== $tabItem) {
    // 버그 3
    disableUpdating = true
    $tabItem.classList.add('is-active')
    if (currentActiveTab !== null) {
      currentActiveTab.classList.remove('is-active')
    }
    currentActiveTab = $tabItem

    // 버그 3
    // 버튼을 누른 뒤 몇 초 뒤 다시 disableUpdating 를 false 로 바꿔줘야함.
    // true 인채로 그냥 두면 한 번 버튼을 누른 이후 upDateActiveTabScroll() 가 계속 실행이 안됨
    setTimeout(() => {
      disableUpdating = false
    }, 500)
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
  console.log(222)
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

  // 버그 1 해결
  upDateActiveTabScroll();
}

function upDateActiveTabScroll() {
  console.log(111)
  // 스크롤 위치에 따라서 activeTab 업데이트
  // 준비물:
  // 1. 현재 유저가 얼마만큼 스크롤을 했느냐 => window.scrollY
  // 2. 각 tabPanel y축 위치

  // 버그 3
  if (disableUpdating) {
    // 스크롤링 할 때가 아닌, btn 을 눌렀을 때는 upDateActiveTabScroll() 가 실행되지 않도록 하기
    return
  }

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

  // 버그 2-1 (데스크탑)
  // 조건 추가: 끝까지 스크롤을 한 경우 newActiveTab = $$productTabBtns[4]
  // window.scrollY + window.innerHeight = body 의 전체 height 
  const bodyHeight = document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0) // 반응형 분기 처리
  if (window.scrollY + window.innerHeight === bodyHeight) {
    newActiveTab = $$productTabBtns[4]
  }
  // 버그 2-2 (태블릿)
  // 태블릿 버전에서는 현재 하단에 구매하기 영역이 absolute 로 차지해 global-footer 가 가려지는 것을 방지하고자 요소에 margin-bottom 을 주어 밑으로 56px 을 밀어내고 있다. 이 때문에 body 의 size 가 html 보다 height 값이 56px 더 작게 측정된다. 그래서 스크롤을 맨 끝으로 내리는 조건만으론 아직 56px 이 모자라 newActiveTab = $$productTabBtns[4] 가 작동하지 않는다. 조건을 추가해줘야 한다.
  // (margin 은 size 에 포함되지 x)

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      // 1. 현재 활성화될 버튼에 active 추가
      newActiveTab.classList.add('is-active')
      // 1. 이전 버튼으로부터 active 클래스 제거
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      // 3. 이제 active 클래스가 제거된 이전 버튼이 아닌 [현재 활성화된 버튼]으로 currentActiveTab 갱신
      currentActiveTab = newActiveTab
    }
  }

  // console.log(newActiveTab)
}

// window 내의 html 요소들이 모두 load 된 후 위치를 파악하도록 함
// 모바일 버전 등으로 화면 사이즈를 변화시켰을 때 또한 대비를 하기 위해 resize 때도 위치를 파악해야 한다.
window.addEventListener('load', detectTabPanelPosition)
// 화면 사이즈에 따라 좌표가 달라지는 것을 대응하기 위해 resize 적용
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000)) 
// 스크롤 위치에 따라서 activeTab 업데이트
window.addEventListener('scroll', _.throttle(upDateActiveTabScroll, 300) )
// window.addEventListener('scroll',upDateActiveTabScroll)
// 스크롤 과잉 실행 방지 - lodash 의 throttle(throttle 을 적용하고 싶은 함수, 시간 delay 값)

// console.log(productTabPanelList)

// 버그
// 버그 1. 새로고침을 하면(reload) 활성화되는 버튼이 맨 처음 버튼으로 초기화 됨
// ex. 리뷰 section 에 있는 채로 새로고침을 하면 상품정보 버튼에 불이 들어옴
// => 현재 스크롤 감지를 하여 활성화 버튼을 다루는 로직을 'scroll' 이벤트만이 담당하고 있다. 즉 window 에서 스크롤이 실행될 때만 해당 함수가 실행된다. 새로고침 등 다시 로드가 된 이후에도 실행되어야 할 함수이기 때문에  detectTabPanelPosition() 에서 위치 감지를 마친 후에 upDateActiveTabScroll() 함수가 실행되도록 하면 된다.
// 버그 2. 태블릿 버전 이후로 맨 아래의 추천 section 버튼을 눌렀지만 스크롤 영역이 모자라 한끝 차이로 추천 버튼이 아닌 배송/환불 버튼에 불이 들어옴
// => 그냥 스크롤 맨 끝에 도달했을 때 추천 버튼에 불이 들어오게 하는 조건을 추가
// 버그 3. 옆의 버튼이 아니라 여러 칸 띄워져있는 다른 버튼을 클릭해서 이동하려 할 때, section 을 이동하는 사이 중간에 있는 버튼들에 불이 연속으로 들어옴
// => upDateActiveTabScroll() 이 스크롤 할 때만 동작, 버튼을 누를 땐 동작하지 않게 하기