
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const rememberCheck = document.getElementById('remember');
    const socialButtons = document.querySelectorAll('.social-button');

    checkPasswordResetNotification();

    // 저장된 아이디가 있다면 불러오기
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheck.checked = true;
    }

    // 로그인 폼 제출
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = document.getElementById('password').value;

        // localStorage에서 사용자 목록 가져오기
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // 사용자 찾기
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // 아이디 저장 처리
            if (rememberCheck.checked) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            // 로그인 상태 저장
            sessionStorage.setItem('loggedInUser', JSON.stringify({
                username: username,
                nickname: user.nickname
            }));

            alert(`${user.nickname}님 환영합니다!`);
            window.location.href = 'index.html';  // index.html로 수정
            return;
        }
        
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    });

    // 소셜 로그인 버튼 이벤트
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('현재 지원하지 않는 기능입니다.');
        });
    });

    // 입력 필드 포커스 효과
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});


// 소셜 로그인 처리
function handleSocialLogin(provider) {
    // TODO: 실제 소셜 로그인 API 연동
    console.log(`${provider} 로그인 시도`);

    const providerNames = {
        'google': 'Google',
        'facebook': 'Facebook',
        'naver': '네이버',
        'apple': 'Apple'
    };

    alert(`${providerNames[provider]} 계정으로 로그인을 시도합니다.\n(현재는 데모 버전입니다)`);
}

// 임시 로그인 처리 (데모용)
function simulateLogin(username) {
    const loginButton = document.querySelector('.login-button');
    const originalText = loginButton.textContent;
    
    loginButton.disabled = true;
    loginButton.textContent = '로그인 중...';

    setTimeout(() => {
        alert(`${username}님, 환영합니다!\n(현재는 데모 버전입니다)`);
        loginButton.disabled = false;
        loginButton.textContent = originalText;
    }, 1500);
}

// QR 코드 로그인 시뮬레이션
let qrCheckInterval;
const qrContainer = document.querySelector('.qr-container');

if (qrContainer) {
    // QR 코드 이미지 업데이트 시뮬레이션
    function updateQRCode() {
        const qrCode = document.querySelector('.qr-code');
        if (qrCode) {
            // 실제로는 서버에서 새로운 QR 코드 이미지를 받아와야 함
            qrCode.style.opacity = '0.8';
            setTimeout(() => {
                qrCode.style.opacity = '1';
            }, 200);
        }
    }

    // QR 코드 주기적 업데이트 (2분마다)
    updateQRCode();
    setInterval(updateQRCode, 120000);

    // QR 코드 스캔 체크 시뮬레이션
    function checkQRLogin() {
        // TODO: 실제 QR 코드 스캔 여부 확인 API 연동
        clearInterval(qrCheckInterval);
    }

    qrCheckInterval = setInterval(checkQRLogin, 3000);

} 

 function checkPasswordResetNotification() {
    const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
    
    if (tempUserData.username && tempUserData.timestamp) {
        const timeDiff = Date.now() - tempUserData.timestamp;
        
        // 5분 이내의 비밀번호 재설정인지 확인
        if (timeDiff < 5 * 60 * 1000) {
            // 💡 수정: usernameInput 요소를 안전하게 찾기
            const usernameInput = document.getElementById('username') || document.querySelector('input[name="username"]');
            
            if (usernameInput) {
                // 사용자 아이디 자동 입력
                usernameInput.value = tempUserData.username;
                
                // 성공 메시지 표시
                showNotification('비밀번호가 성공적으로 재설정되었습니다!', 'success');
                
                console.log('비밀번호 재설정 알림 표시:', tempUserData.username);
            } else {
                console.warn('username 입력 필드를 찾을 수 없습니다.');
            }
            
            // tempUserData 정리
            localStorage.removeItem('tempUserData');
        }
    }
}

// 알림 표시 함수 (없다면 추가)
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);