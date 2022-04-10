const $gnbSearch = document.querySelector('.gnb-search');
const $gnbSearchInput = $gnbSearch.querySelector('input');
const $gnbSearchHistory = $gnbSearch.querySelector('.search-history');
const $HistoryList = $gnbSearchHistory.querySelector('ol');
const $deleteAllHistoryBtn = $gnbSearchHistory.querySelector('.search-history-header button');
const $$deleteHistoryBtns = $HistoryList.querySelectorAll('.delete-button');

// console.log($$deleteHistoryBtns)

function closeGnbSearchHistory() {
  $gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', closeGnbSearchHistoryOnClickOutside)
  // 모달이 닫히면 더이상 [모달 외의 영역을 클릭하면 모달이 닫히는] 이벤트가 필요없기 때문에 닫히는 때마다 window 이벤트도 제거해준다.
}

// .gnb-search 외의 영역(input 도 포함해야하기 때문에)을 클릭하면 search-history 닫기
function closeGnbSearchHistoryOnClickOutside(e) {
  // console.log('close!!', e.target); // <i> 태그
  if (!$gnbSearch.contains(e.target)) {
    closeGnbSearchHistory()
    console.log('window')
  }
}

function openGnbSearchHistory() {
  if (!$gnbSearchHistory.classList.contains('is-active')) {
    // is-active 가 안되어있을 때(닫혀있을 때) 클릭하면 window 이벤트(닫는 이벤트) 활성화
    window.addEventListener('click', closeGnbSearchHistoryOnClickOutside)
  }
  if ($HistoryList.children.length !== 0) {
  // if ($HistoryList.innerHTML) {
    $gnbSearchHistory.classList.add('is-active');
  }
}

function deleteAllHistoryItems() {
  // $HistoryList 안에 있는 모든 li 삭제
  $HistoryList.innerHTML = ''
  closeGnbSearchHistory()
}

function deleteHistoryItem(e) {
  e.stopPropagation()
  const $deleteItem = this.parentNode // li
  // removeChild(): 부모가 자식을 제거할 수만 있고, 자식이 부모를 제거할 수 x
  // button 자신이 아닌, ol 이 li 를 지우게 해야한다.
  // $HistoryList.removeChild($deleteItem)
  $deleteItem.remove()
  if ($HistoryList.children.length === 0) {
    closeGnbSearchHistory()
  }
  console.log('delete!!')
}

// Q. delete-button 을 누를 때, gnb-search 까지 닫히는 현상:
// A. deleteHistoryItem() 를 실행할 때, closeGnbSearchHistoryOnClickOutside(e) 가 그 후에 실행되면서 닫혀버린다.
// A. deleteHistoryItem() 가 먼저 실행되는데, 이때 제거된 li 요소는 제거되는 동시에 더 이상 gnb-search 에 소속되어있지 않기 때문에 해당 li 가 그 뒤에 실행되는 closeGnbSearchHistoryOnClickOutside(e) 에서 window 의 클릭이벤트에 감지되어 [gnb-search 요소 외의 것을 클릭하면 gnb-search 가 닫히는 조건] 에 부합해 버렸기 때문이다.
// Q. 그럼 왜 closeGnbSearchHistoryOnClickOutside() 이벤트가 갑자기 뒤에 실행된걸까?
// A. 이벤트 전파: delete-button 도 하나의 window 요소이고, 기본적으로 요소는 자신에 걸려있는 이벤트를 먼저 실행한 다음에 또 자신에게 걸린 이벤트가 없나 찾게 된다. 이때 li 가 제거되면서 li 는 물론 그 안의 delete 버튼이 [gnb-search 가 아닌 window 의 요소] 가 되었고, 그와 관련된 이벤트가 바로 closeGnbSearchHistoryOnClickOutside() 이었기 때문에 이벤트가 전파되어 추가로 발생된 것이다.
// 해결방법: event 객체로 이벤트 전파가 안되도록 해준다. => e.stopPropagation()

$gnbSearchInput.addEventListener('focus', openGnbSearchHistory)
$deleteAllHistoryBtn.addEventListener('click', deleteAllHistoryItems)
$$deleteHistoryBtns.forEach((deleteHistoryBtn) => {
  deleteHistoryBtn.addEventListener('click', deleteHistoryItem)
})