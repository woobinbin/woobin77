document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('character-search-input');
    const searchBtn = document.getElementById('character-search-btn');
    const searchResults = document.getElementById('character-search-results-section');
    const resultCount = document.getElementById('character-result-count');
    const resultsGrid = document.querySelector('.character-results-grid');
    const recentList = document.querySelector('.recent-list');
    const popularCharacter = document.getElementById('popularCharacter');
    const resetBtn = document.getElementById('character-search-reset');

    // 로컬 스토리지에서 최근 검색어 가져오기
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    // 더미 데이터 - 창작게시판의 작성자 정보 활용
    const dummyCharacters = [
        { 
            name: '당묘', 
            level: 99, 
            image: 'images/thumb_char_3.png',
            class: '엘소드',
            subclass: '나이트 엠페러',
            guild: '엘리시온'
        },
        { 
            name: '귤뮬', 
            level: 99, 
            image: 'images/thumb_char_2.png',
            class: '아라',
            subclass: '비천',
            guild: '블랙크로우'
        },
        { 
            name: '가면', 
            level: 99, 
            image: 'images/thumb_char_4.png',
            class: '애드',
            subclass: '오버마인드',
            guild: '나사우',
        },
        { 
            name: '은팡', 
            level: 99, 
            image: 'images/thumb_char_1.png',
            class: '라비',
            subclass: '라디언트 소울',
            guild: '엘리시온'
        }
    ];

    function createCharacterCard(character) {
        return `
            <div class="character-card">
                <div class="character-profile">
                    <img src="${character.image}" alt="${character.name}" class="character-thumb">
                    <div class="character-basic-info">
                        <div class="class-info">
                            <span class="character-class">${character.class}</span>
                            <span class="character-subclass">${character.subclass}</span>
                        </div>
                        <div class="name-info">
                            <span class="character-name">${character.name}</span>
                            <span class="level">Lv.${character.level}</span>
                        </div>
                        <div class="guild-info">
                            <span class="guild">${character.guild}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 최근 검색어 업데이트 함수
    function updateRecentSearches(searchTerm) {
        // 이미 있는 검색어라면 제거
        recentSearches = recentSearches.filter(term => term !== searchTerm);
        // 새 검색어 추가
        recentSearches.unshift(searchTerm);
        // 최대 3개만 유지
        recentSearches = recentSearches.slice(0, 3);
        // 로컬 스토리지 업데이트
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        // UI 업데이트
        updateRecentSearchesUI();
    }

    // 최근 검색어 UI 업데이트
    function updateRecentSearchesUI() {
        recentList.innerHTML = recentSearches.map(term => `
            <span class="recent-item">${term} <img src="images/search.png" alt="다시 검색" class="research-icon"></span>
        `).join('');
        // 이벤트 리스너 다시 추가
        attachRecentSearchListeners();
    }

    function performSearch(searchTerm) {
        const results = dummyCharacters.filter(char => 
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        resultsGrid.innerHTML = '';
        resultCount.textContent = results.length;

        if (searchTerm === '') {
            searchResults.style.display = 'none';
            popularCharacter.style.display = 'block'; // 검색어가 없을 때 인기 캐릭터 표시
            return;
        }

        // 검색어가 있을 때 인기 캐릭터 숨김
        popularCharacter.style.display = 'none';

        if (results.length > 0) {
            results.forEach(character => {
                resultsGrid.innerHTML += createCharacterCard(character);
            });
            searchResults.style.display = 'block';
            // 검색어 저장
            updateRecentSearches(searchTerm);
        } else {
            resultsGrid.innerHTML = '<p class="no-results">검색 결과가 없습니다.</p>';
            searchResults.style.display = 'block';
        }
    }

    // 검색 초기화 함수
    function resetSearch() {
        searchInput.value = '';
        searchResults.style.display = 'none';
        popularCharacter.style.display = 'block';
    }

    // 초기화 버튼 클릭 이벤트
    resetBtn.addEventListener('click', resetSearch);

    // 실시간 검색을 위한 이벤트 리스너
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchTerm = searchInput.value.trim();
            performSearch(searchTerm);
        }, 300);
    });

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        performSearch(searchTerm);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            performSearch(searchTerm);
        }
    });

    // 최근 검색어 클릭 이벤트 리스너 추가 함수
    function attachRecentSearchListeners() {
        document.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                const searchTerm = item.textContent.trim().split(' ')[0];
                searchInput.value = searchTerm;
                performSearch(searchTerm);
            });
        });
    }

    // 초기 최근 검색어 UI 업데이트
    updateRecentSearchesUI();
}); 