const $myMenu = document.querySelector('.my-menu')
const $myMenuBtn = document.querySelector('.my-menu-button')

function closeMyMenu(e) {
  // .my-menu 외의 영역을 클릭하면 .my-menu 닫기
  if (!$myMenu.contains(e.target)) {
    $myMenu.classList.remove('is-active');
    window.removeEventListener('click', closeMyMenu)
    // console.log('window')
  }
}

function toggleMyMenu() {
  // window 이벤트 생성 시 주의점:
  // 사이트를 이용하면서 window 에 계속 클릭을 하게 되는데, 이때 알게 모르게 클릭 event 들이 누적된다.
  // 이를 방지하기 위해 $myMenu 가 열려있을 때만(if) window 이벤트가 발생되게끔 toggleMyMenu 안에 이벤트를 넣는다.
  // 여기서 끝이 아닌, toggleMyMenu 가 실행된 후에 window 가 계속 발생하는데 이때 완전히 이벤트를 제거해줘야 한다.
  // => removeEventListener()
  if (!$myMenu.classList.contains('is-active')) {
    // is-active 가 안되어있을 때(닫혀있을 때) 클릭하면 window 이벤트(닫는 이벤트) 활성화
    window.addEventListener('click', closeMyMenu)
  }
  $myMenu.classList.toggle('is-active')
}

$myMenuBtn.addEventListener('click', toggleMyMenu)