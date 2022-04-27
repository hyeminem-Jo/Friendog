const $myMenu = document.querySelector('.my-menu')
const $myMenuBtn = document.querySelector('.my-menu-button')

function closeMyMenu(e) {
  if (!$myMenu.contains(e.target)) {
    $myMenu.classList.remove('is-active');
    window.removeEventListener('click', closeMyMenu)
  }
}

function toggleMyMenu() {
  if (!$myMenu.classList.contains('is-active')) {
    window.addEventListener('click', closeMyMenu)
  }
  $myMenu.classList.toggle('is-active')
}

$myMenuBtn.addEventListener('click', toggleMyMenu)