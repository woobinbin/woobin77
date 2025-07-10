document.addEventListener('DOMContentLoaded', () => {
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  const gridView = document.querySelector('.game-grid-view');
  const listView = document.querySelector('.game-list-view');

  gridBtn.addEventListener('click', () => {
    gridView.style.display = 'block';
    listView.style.display = 'none';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  listBtn.addEventListener('click', () => {
    gridView.style.display = 'none';
    listView.style.display = 'block';
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const viewButtons = document.querySelectorAll('.view-icon');
  const gameGrid = document.querySelector('.game-grid');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 아이콘 활성화 상태 변경
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 뷰 모드 변경
      const viewType = btn.dataset.view;
      if (viewType === 'grid') {
        gameGrid.classList.add('grid-view');
        gameGrid.classList.remove('list-view');
      } else {
        gameGrid.classList.add('list-view');
        gameGrid.classList.remove('grid-view');
      }
    });
  });

  // 페이지 로딩 시 기본 뷰 적용
  gameGrid.classList.add('grid-view');
});
