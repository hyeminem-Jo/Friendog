const $productTab = document.querySelector('.product-tab')
const $$productTabBtns = $productTab.querySelectorAll('button')

// console.log($$productTabBtns)

let currentActiveTab = $productTab.querySelector('.is-active')
console.log(currentActiveTab)
function activeProductTabBtn() {
  const $tabItem = this.parentNode

  if (currentActiveTab !== $tabItem) {
    $tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = $tabItem
  }
}

$$productTabBtns.forEach(($productTabBtn) => {
  $productTabBtn.addEventListener('click', activeProductTabBtn)
})