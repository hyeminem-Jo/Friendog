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
  console.log(222)
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