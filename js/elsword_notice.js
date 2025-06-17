document.addEventListener('DOMContentLoaded', function() {
    // 게임 시작 버튼 클릭 이벤트
    const gameStartBtn = document.querySelector('.game-start-btn');
    if (gameStartBtn) {
        gameStartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('이 기능은 아직 미구현되어있습니다.');
        });
    }

    // 공지사항 탭 기능
    const tabButtons = document.querySelectorAll('.tab-button');
    const noticeItems = document.querySelectorAll('.notice-item');

    function filterNotices(category) {
        noticeItems.forEach(item => {
            if (category === '전체') {
                item.style.display = 'flex';
            } else {
                const itemCategory = item.querySelector('.category').textContent;
                if (category === itemCategory) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter notices based on selected category
            filterNotices(this.textContent);
        });
    });

    // Initially filter by '전체' category since it's the default active tab
    filterNotices('전체');
}); 