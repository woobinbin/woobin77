// 아이템 데이터
const itemsData = [
    {
        id: 1,
        name: "시어터 스낵 파티",
        category: "악세서리",
        description: "배고픈 당신을 위한 간식세트!",
        image: "images/shop1.jpg"
    },
    {
        id: 2,
        name: "신비한 아쿠아리움",
        category: "스킨",
        description: "깊은 바다의 신비로움",
        image: "images/shop2.jpg"
    },
    {
        id: 3,
        name: "키네틱 애니멀",
        category: "코스튬",
        description: "시원한 바람과 함께 활기찬 나들이",
        image: "images/shop3.jpg"
    },
    {
        id: 4,
        name: "지난 가열기 복각",
        category: "가열기",
        description: "다시 돌아온 가열기",
        image: "images/shop4.jpg"
    },
    {
        id: 5,
        name: "커스텀 아이",
        category: "악세서리",
        description: "새로운 모험을 시작하세요",
        image: "images/shop5.jpg"
    },
    {
        id: 6,
        name: "스프링 미뉴에트",
        category: "코스튬",
        description: "봄의 향기를 담은 특별한 선물",
        image: "images/shop6.jpg"
    },
    {
        id: 7,
        name: "신규 가열기:맹호기담",
        category: "가열기",
        description: "새로운 이야기가 시작됩니다",
        image: "images/shop7.jpg"
    },
    {
        id: 8,
        name: "여름 아바타",
        category: "코스튬",
        description: "시원한 여름을 위한 특별한 의상",
        image: "images/shop8.jpg"
    }
];

// DOM 요소
const searchInput = document.getElementById('item-search-input');
const categorySelect = document.getElementById('item-category-select');
const searchButton = document.getElementById('item-search-btn');
const resetButton = document.getElementById('search-reset-btn');
const searchResults = document.getElementById('item-search-results');
const resultCount = document.getElementById('item-result-count');
const searchResultsSection = document.querySelector('.item-search .search-results');
const popularItemsSection = document.getElementById('popular-items-section');

// 아이템 카드 HTML 생성 함수
function createItemCard(item) {
    return `
        <div class="item-card">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-info">
                <span class="item-category">${item.category}</span>
                <h3 class="item-title">${item.name}</h3>
                <p class="item-description">${item.description}</p>
            </div>
        </div>
    `;
}

// 검색 결과 표시 함수
function displayResults(filteredItems) {
    if (filteredItems.length === 0) {
        searchResults.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
    } else {
        searchResults.innerHTML = filteredItems.map(item => createItemCard(item)).join('');
    }
    resultCount.textContent = filteredItems.length;
    
    // 검색 결과 섹션 표시
    searchResultsSection.style.display = 'block';
    popularItemsSection.style.display = 'none';
}

// 검색 상태 업데이트 함수
function updateSearchState(isSearching) {
    if (isSearching) {
        searchResultsSection.style.display = 'block';
        popularItemsSection.style.display = 'none';
    } else {
        searchResultsSection.style.display = 'none';
        popularItemsSection.style.display = 'block';
    }
}

// 아이템 필터링 함수
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;

    // 검색어와 카테고리가 모두 비어있을 때
    if (searchTerm === '' && selectedCategory === 'all') {
        updateSearchState(false);
        return;
    }

    const filteredItems = itemsData.filter(item => {
        const matchesSearch = searchTerm === '' || 
                            item.name.toLowerCase().includes(searchTerm) || 
                            item.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayResults(filteredItems);
}

// 검색 초기화 함수
function resetSearch() {
    searchInput.value = '';
    categorySelect.value = 'all';
    updateSearchState(false);
}

// 이벤트 리스너 등록
searchInput.addEventListener('input', filterItems);
categorySelect.addEventListener('change', filterItems);
searchButton.addEventListener('click', filterItems);
resetButton.addEventListener('click', resetSearch);

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    updateSearchState(false);
}); 