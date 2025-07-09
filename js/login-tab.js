  function setActiveTabFromCurrentPage() {
            const currentPage = window.location.pathname.split('/').pop();
            const tabItems = document.querySelectorAll('.tab-list > li');
            
            // 모든 탭에서 active 클래스 제거
            tabItems.forEach(tab => tab.classList.remove('active'));
            
            // 현재 페이지에 맞는 탭 활성화
            tabItems.forEach(tab => {
                const link = tab.querySelector('a');
                const href = link.getAttribute('href');
                
                if (href === currentPage || 
                    (currentPage === '' && href === 'nexon-login.html') ||
                    (currentPage === 'index.html' && href === 'nexon-login.html')) {
                    tab.classList.add('active');
                }
            });
        }
        
        // 페이지 로드 시 실행
        document.addEventListener('DOMContentLoaded', setActiveTabFromCurrentPage);
        
        // 탭 클릭 시 localStorage에 선택된 탭 저장
        const tabItems = document.querySelectorAll('.tab-list > li');
        
        tabItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 클릭한 탭의 정보를 localStorage에 저장
                const tabType = this.querySelector('a').getAttribute('data-tab');
                const href = this.querySelector('a').getAttribute('href');
                
                localStorage.setItem('selectedTab', tabType);
                localStorage.setItem('selectedHref', href);
                
                // 페이지 이동은 자연스럽게 발생 (e.preventDefault() 제거)
                console.log('선택된 탭:', tabType, '이동할 페이지:', href);
            });
        });