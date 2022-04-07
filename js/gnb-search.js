const $gnbSearch = document.querySelector('.gnb-search');
const $gnbSearchInput = $gnbSearch.querySelector('input');
const $gnbSearchHistory = $gnbSearch.querySelector('.search-history');

// .gnb-search 외의 영역(input 도 포함해야하기 때문에)을 클릭하면 search-history 닫기
function closeGnbSearchHistory(e) {
  if (!$gnbSearch.contains(e.target)) {
    $gnbSearchHistory.classList.remove('is-active');
    window.removeEventListener('click', closeGnbSearchHistory)
    console.log('window')
  }
}

function openGnbSearchHistory() {
  if (!$gnbSearchHistory.classList.contains('is-active')) {
    // is-active 가 안되어있을 때(닫혀있을 때) 클릭하면 window 이벤트(닫는 이벤트) 활성화
    window.addEventListener('click', closeGnbSearchHistory)
  }
  $gnbSearchHistory.classList.add('is-active');
}

$gnbSearchInput.addEventListener('focus', openGnbSearchHistory)