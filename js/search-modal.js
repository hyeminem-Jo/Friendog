import { $overlay } from "./common.js";
const $searchModal = document.querySelector('.search-modal');
const $searchBtn = document.querySelector('.gnb-icon-button.is-search');
const $searchCloseBtn = $searchModal.querySelector('.search-modal-form .btn-ghost');

function openSearchModal() {
  $searchModal.classList.add('is-active');
  $overlay.classList.add('is-active');
}

function closeSearchModal() {
  $searchModal.classList.remove('is-active');
  $overlay.classList.remove('is-active');
}

$searchBtn.addEventListener('click', openSearchModal);
$searchCloseBtn.addEventListener('click', closeSearchModal);