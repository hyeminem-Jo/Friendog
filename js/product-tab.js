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

  const scrollAmount = $tabPanel.getBoundingClientRect().top - (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount, // $tabPanel 요소의 top 좌표를 받아 window 화면 영역의 top 부분에 걸치도록 한다.
    behavior: 'smooth', // window.scrollBy() 최신 브라우저 메서드이기 때문에  사파리 등에서는 smooth 하게 작동하지 않는다.
  })
}

$$productTabBtns.forEach(($productTabBtn) => {
  $productTabBtn.addEventListener('click', activeProductTabBtn)
  $productTabBtn.addEventListener('click', scrollToTabPanel)
})