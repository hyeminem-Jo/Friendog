const $gnbSearch = document.querySelector('.gnb-search');
const $gnbSearchInput = $gnbSearch.querySelector('input');
const $gnbSearchHistory = $gnbSearch.querySelector('.search-history');
const $HistoryList = $gnbSearchHistory.querySelector('ol');
const $deleteAllHistoryBtn = $gnbSearchHistory.querySelector('.search-history-header button');
const $$deleteHistoryBtns = $HistoryList.querySelectorAll('.delete-button');

function closeGnbSearchHistory() {
  $gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', closeGnbSearchHistoryOnClickOutside)
}

function closeGnbSearchHistoryOnClickOutside(e) {
  if (!$gnbSearch.contains(e.target)) {
    closeGnbSearchHistory()
    console.log('window')
  }
}

function openGnbSearchHistory() {
  if (!$gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClickOutside)
  }
  if ($HistoryList.children.length !== 0) {
    $gnbSearchHistory.classList.add('is-active');
  }
}

function deleteAllHistoryItems() {
  $HistoryList.innerHTML = ''
  closeGnbSearchHistory()
}

function deleteHistoryItem(e) {
  e.stopPropagation()
  const $deleteItem = this.parentNode // li
  $deleteItem.remove()
  if ($HistoryList.children.length === 0) {
    closeGnbSearchHistory()
  }
  console.log('delete!!')
}

$gnbSearchInput.addEventListener('focus', openGnbSearchHistory)
$deleteAllHistoryBtn.addEventListener('click', deleteAllHistoryItems)
$$deleteHistoryBtns.forEach((deleteHistoryBtn) => {
  deleteHistoryBtn.addEventListener('click', deleteHistoryItem)
})