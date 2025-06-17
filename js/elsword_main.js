// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
});

// Character cards animation on scroll
const characterCards = document.querySelectorAll('.character-card');
const newsCards = document.querySelectorAll('.news-card');
const communityCards = document.querySelectorAll('.community-card');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize cards with opacity 0 and translate Y
[...characterCards, ...newsCards, ...communityCards].forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Mobile menu toggle functionality
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.main-nav').appendChild(mobileMenuButton);

const navLinks = document.querySelector('.nav-links');
mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }

        .nav-links.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.95);
            padding: 1rem;
        }

        .nav-links.show li {
            margin: 1rem 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // 게임 시작 버튼 클릭 이벤트
    const gameStartBtn = document.querySelector('.game-start-btn');
    if (gameStartBtn) {
        gameStartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('이 기능은 아직 미구현되어있습니다.');
        });
    }

    // 네비게이션 관련 기능
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    const navItems = document.querySelectorAll('nav li');

    // 모바일 메뉴 기능
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // 드롭다운 메뉴 동작
    navItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                dropdownContainers.forEach(container => {
                    container.style.transform = 'translateY(0)';
                    container.style.opacity = '1';
                    container.style.visibility = 'visible';
                });
            }
        });
    });

    if (nav) {
        nav.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                dropdownContainers.forEach(container => {
                    container.style.transform = 'translateY(-10px)';
                    container.style.opacity = '0';
                    container.style.visibility = 'hidden';
                });
            }
        });
    }

    // 뉴스 섹션 슬라이더 기능
    const newsSliders = document.querySelectorAll('.news-section .banner-slider');
    
    newsSliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const slides = track.querySelectorAll('.slider-item');
        const indicators = slider.querySelectorAll('.indicator');
        let currentSlide = 0;
        let isSliding = false;

        // 슬라이더 요소가 모두 존재하는지 확인
        if (!track || !slides.length || !indicators.length) return;

        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function slideNext() {
            if (isSliding) return;
            isSliding = true;

            currentSlide = (currentSlide + 1) % 2;
            track.style.transform = `translateX(-${currentSlide * 50}%)`;
            updateIndicators();

            setTimeout(() => {
                isSliding = false;
            }, 500);
        }

        function slideTo(index) {
            if (isSliding || currentSlide === index) return;
            isSliding = true;

            currentSlide = index;
            track.style.transform = `translateX(-${index * 50}%)`;
            updateIndicators();

            setTimeout(() => {
                isSliding = false;
            }, 500);
        }

        // 인디케이터 클릭 이벤트
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                slideTo(index);
            });
        });

        // 초기 인디케이터 상태 설정
        updateIndicators();

        // 자동 슬라이드 시작
        const slideInterval = setInterval(slideNext, 5000);

        // 페이지 벗어날 때 인터벌 정리
        window.addEventListener('beforeunload', () => {
            clearInterval(slideInterval);
        });
    });
}); 