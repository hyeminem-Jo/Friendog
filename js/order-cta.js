import { $overlay } from './common.js'
const $orderCta = document.querySelector('.order-cta')

const [$orderCtaBookmarkBtn, $orderCtaBuyBtn] = $orderCta.children
const [$iconBookmark, $numOfBookmarks] = $orderCtaBookmarkBtn.children
const $orderFormModal = document.querySelector('.order-form-modal')

function openOrderFormModal() {
  $orderFormModal.classList.add('is-open')
  $overlay.classList.add('is-active')
}

function closeOrderFormModal() {
  $orderFormModal.classList.remove('is-open')
}

$orderCtaBuyBtn.addEventListener('click', openOrderFormModal)
$overlay.addEventListener('click', closeOrderFormModal)
$orderCtaBookmarkBtn.addEventListener('click', function () {
  let count = Number($numOfBookmarks.innerHTML.replaceAll(",",""));
  
  if (this.classList.contains('is-active')) {
    $iconBookmark.className = 'ic-bookmark';
    count -= 1;
  } else {
    $iconBookmark.className = 'ic-bookmark-filled';
    count += 1;
  }

  this.classList.toggle('is-active')
  $numOfBookmarks.innerHTML = count.toLocaleString(); // 숫자에 , 를 붙여줌
  $numOfBookmarks.setAttribute('aria-label', `북마크 ${count.toLocaleString()}회`)
})

