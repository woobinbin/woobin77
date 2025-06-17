// 로그인 상태 체크 및 UI 업데이트
function updateLoginState() {
    const userInfo = document.querySelector('.user-info');
    const guestLinks = document.querySelector('.guest-links');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const userNickname = document.querySelector('.user-nickname');
        if (userNickname) {
            userNickname.textContent = user.nickname;
        }
        if (userInfo) {
            userInfo.style.display = 'flex';
        }
        if (guestLinks) {
            guestLinks.style.display = 'none';
        }
    } else {
        if (userInfo) {
            userInfo.style.display = 'none';
        }
        if (guestLinks) {
            guestLinks.style.display = 'flex';
        }
    }
}

// 로그아웃 처리
function handleLogout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.reload();
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 로그인 상태 업데이트
    updateLoginState();

    // 로그아웃 버튼 이벤트 리스너
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.getElementById(targetId.substring(1));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active navigation highlight
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// News tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const newsItems = document.querySelectorAll('.news-item');
    
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f5f5f5';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
        
        item.addEventListener('click', () => {
            const title = item.querySelector('.title');
            if (title) {
                console.log('News item clicked:', title.textContent);
            }
        });
    });
});

// Add animation for game start button
const gameStartBtn = document.querySelector('.game-start-btn');
if (gameStartBtn) {
    gameStartBtn.addEventListener('mouseenter', () => {
        gameStartBtn.style.transform = 'scale(1.05)';
    });
    
    gameStartBtn.addEventListener('mouseleave', () => {
        gameStartBtn.style.transform = 'scale(1)';
    });
    
    gameStartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add game start functionality here
        console.log('Game Start clicked!');
    });
}

// 네비게이션 메뉴 기능
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const fulldownContainer = document.querySelector('.fulldown-container');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (!fulldownContainer) return;

    // PC에서 호버 시 서브메뉴 표시
    if (window.innerWidth > 768) {
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const category = this.dataset.category;
                menuSections.forEach(section => {
                    if (section.dataset.category === category) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });

        // 풀다운 메뉴 영역을 벗어났을 때 처리
        fulldownContainer.addEventListener('mouseleave', function() {
            menuSections.forEach(section => {
                section.style.display = 'none';
            });
        });
    }
});

// Responsive menu for mobile devices
const createMobileMenu = () => {
    const headerContainer = document.querySelector('.game-header-container');
    const nav = document.querySelector('.game-nav');
    
    if (!headerContainer || !nav) return;
    
    if (window.innerWidth <= 768) {
        let menuButton = document.querySelector('.mobile-menu-btn');
        
        if (!menuButton) {
            menuButton = document.createElement('button');
            menuButton.classList.add('mobile-menu-btn');
            menuButton.innerHTML = '☰';
            
            menuButton.addEventListener('click', () => {
                nav.classList.toggle('show');
                menuButton.classList.toggle('active');
                menuButton.innerHTML = nav.classList.contains('show') ? '✕' : '☰';
            });
            
            const gameLogo = headerContainer.querySelector('.game-logo');
            if (gameLogo) {
                gameLogo.insertAdjacentElement('afterend', menuButton);
            } else {
                headerContainer.insertBefore(menuButton, nav);
            }
        }

        // 모바일에서 메뉴 아이템 클릭 시 서브메뉴 토글
        const navItems = nav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('show');
                        
                        // 다른 메뉴 아이템들의 show 클래스 제거
                        navItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('show');
                            }
                        });

                        // 서브메뉴 표시/숨김 처리
                        const category = item.dataset.category;
                        const targetSection = document.querySelector(`.menu-section[data-category="${category}"]`);
                        if (targetSection) {
                            targetSection.style.display = item.classList.contains('show') ? 'block' : 'none';
                        }
                    }
                });
            }
        });
    } else {
        const menuButton = document.querySelector('.mobile-menu-btn');
        if (menuButton) {
            menuButton.remove();
        }
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
        // PC 모드에서는 모든 show 클래스 제거
        nav.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('show');
        });
        // 모든 메뉴 섹션 초기화
        document.querySelectorAll('.menu-section').forEach(section => {
            section.style.display = 'none';
        });
    }
};

// Initialize mobile menu and update on resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Banner slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.banner-slider');
    
    sliders.forEach((slider) => {
        const sliderTrack = slider.querySelector('.slider-track');
        const items = slider.querySelectorAll('.slider-item');
        
        if (!sliderTrack || !items.length) return;
        
        let currentIndex = 0;
        const itemCount = items.length;
        
        // Clone first item for infinite loop if there are multiple items
        if (itemCount > 1) {
            const firstItem = items[0].cloneNode(true);
            sliderTrack.appendChild(firstItem);
        }
        
        function slideToNext() {
            currentIndex++;
            updateSlide();
        }

        function updateSlide() {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
            sliderTrack.style.transform = `translateX(-${(currentIndex * 100)}%)`;

            if (currentIndex >= itemCount) {
                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    currentIndex = 0;
                    sliderTrack.style.transform = 'translateX(0)';
                    setTimeout(() => {
                        sliderTrack.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
        }
        
        // Set initial position
        sliderTrack.style.transform = 'translateX(0)';
        
        // Only start automatic sliding if there are multiple items
        if (itemCount > 1) {
            let intervalId = setInterval(slideToNext, 3000);

            // 마우스 호버 시 정지
            slider.addEventListener('mouseenter', () => {
                clearInterval(intervalId);
            });

            // 마우스가 벗어나면 다시 시작
            slider.addEventListener('mouseleave', () => {
                intervalId = setInterval(slideToNext, 3000);
            });
        }
    });
}); 