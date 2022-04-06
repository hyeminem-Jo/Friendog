const $drawerMenuBtns = document.querySelectorAll('.sidebar-nav .drawer-menu-button');

function drawerMenuHandler() {
  const $drawerMenu = this.parentNode;
  $drawerMenu.classList.toggle('is-active');
  $drawerMenu.classList.toggle('is-open');
}

$drawerMenuBtns.forEach(($drawerMenuBtn) => {
  $drawerMenuBtn.addEventListener('click', drawerMenuHandler);
});