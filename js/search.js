document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.view-tab .tag');
  const cards = document.querySelectorAll('.game-card');
  const searchInput = document.getElementById('search-input');

  let activeTag = '#전체';

  // 필터 함수: 태그 + 검색어 동시에 적용
  function filterGames() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(',').map(t => t.trim());
      const title = card.querySelector('.game-title')?.textContent.toLowerCase();

      const matchTag = activeTag === '#전체' || tags.includes(activeTag);
      const matchSearch = !searchTerm || (title && title.includes(searchTerm));

      if (matchTag && matchSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // 태그 버튼 클릭
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTag = tab.textContent.trim();
      filterGames();
    });
  });

  // 검색 입력시 실시간 반영
  searchInput.addEventListener('input', () => {
    filterGames();
  });

  // 초기 상태
  filterGames();
});
