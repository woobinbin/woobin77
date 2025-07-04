// 로그인 상태 관리 함수
function initAuthStatus() {
    const userInfo = document.querySelector('.user-info');
    const authButtons = document.querySelector('.auth-buttons');
    const userNickname = document.querySelector('.user-nickname');
    const logoutButton = document.querySelector('.logout-button');

    if (userInfo && authButtons && userNickname) {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            userNickname.textContent = `${user.nickname}`;
            userInfo.style.display = 'flex';
            authButtons.style.display = 'none';
        } else {
            userInfo.style.display = 'none';
            authButtons.style.display = 'flex';
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('loggedInUser');
                userInfo.style.display = 'none';
                authButtons.style.display = 'flex';
                window.location.reload();
            });
        }
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', initAuthStatus);