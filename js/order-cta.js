import { $overlay } from './common.js'
const $orderCta = document.querySelector('.order-cta')

// const $orderCtaBuyBtn = $orderCta.querySelector('.btn-primary');
// const $orderCtaBookmarkBtn = $orderCta.querySelector('.btn-ghost');

// const $orderCtaBookmarkBtn = $orderCta.children[0];
// const $orderCtaBuyBtn = $orderCta.children[1];
// $orderCta.children = [button1, button2]

// 구조분해할당
const [$orderCtaBookmarkBtn, $orderCtaBuyBtn] = $orderCta.children
const $orderFormModal = document.querySelector('.order-form-modal')

function openOrderFormModal() {
  // alert('modal');
  $orderFormModal.classList.add('is-open')
  $overlay.classList.add('is-active')
}

function closeOrderFormModal() {
  $orderFormModal.classList.remove('is-open')
}

$orderCtaBuyBtn.addEventListener('click', openOrderFormModal)
$overlay.addEventListener('click', closeOrderFormModal)
