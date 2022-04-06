const $sidebarMenuBtn = document.querySelector('.gnb-icon-button.is-menu');
const $sidebar = document.querySelector('.sidebar')
const $sidebarOverlay = document.querySelector('.overlay');

function openSidebar() {
  $sidebar.classList.add('is-active');
  $sidebarOverlay.classList.add('is-active');
}

function closeSidebar() {
  this.classList.remove('is-active');
  $sidebar.classList.remove('is-active');
}

$sidebarMenuBtn.addEventListener('click', openSidebar);
$sidebarOverlay.addEventListener('click', closeSidebar);