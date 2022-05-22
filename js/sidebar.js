import { $overlay } from "./common.js";

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