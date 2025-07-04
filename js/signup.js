document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const name =document.getElementById('name');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const checkUsernameBtn = document.getElementById('checkUsername');
    const usernameMessage = document.getElementById('usernameMessage');
    const passwordMessage = document.getElementById('passwordMessage');
    const strengthBar = document.querySelector('.strength-bar');
    const agreeAllCheckbox = document.getElementById('agreeAll');
    const agreementCheckboxes = document.querySelectorAll('input[name="agreements"]');

    // 저장된 사용자 목록 (실제로는 서버에서 관리됨)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // 비밀번호 입력 필드에 메시지 컨테이너 추가
    const passwordContainer = password.parentElement;
    const passwordValidationMessage = document.createElement('div');
    passwordValidationMessage.className = 'message';
    passwordContainer.appendChild(passwordValidationMessage);

    // 비밀번호 유효성 검사 및 메시지 표시
    password.addEventListener('input', (e) => {
        const passwordValue = e.target.value;
        const validationResult = validatePassword(passwordValue);
        
        if (!validationResult.isValid) {
            showMessage(passwordValidationMessage, validationResult.message, 'error');
        } else {
            passwordValidationMessage.textContent = '';
        }

        // 비밀번호 강도 표시
        const strength = checkPasswordStrength(passwordValue);
        updateStrengthBar(strength);
    });

    // 아이디 중복 확인
    checkUsernameBtn.addEventListener('click', () => {
        const usernameValue = username.value.trim();
        
        if (!usernameValue) {
            showMessage(usernameMessage, '아이디를 입력해주세요.', 'error');
            return;
        }

        const isUserExists = existingUsers.some(user => user.username === usernameValue);
        
        if (isUserExists) {
            showMessage(usernameMessage, '중복된 아이디입니다.', 'error');
        } else {
            showMessage(usernameMessage, '사용 가능한 아이디입니다.', 'success');
        }
    });

    // 비밀번호 확인
    confirmPassword.addEventListener('input', () => {
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;

        if (!confirmValue) {
            passwordMessage.textContent = '';
            return;
        }

        if (passwordValue === confirmValue) {
            showMessage(passwordMessage, '비밀번호가 동일합니다.', 'success');
        } else {
            showMessage(passwordMessage, '비밀번호가 일치하지 않습니다.', 'error');
        }
    });

    // 이메일 인증
    document.getElementById('verifyEmail').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        if (!email) {
            alert('이메일을 입력해주세요.');
            return;
        }

        // TODO: 실제 이메일 인증 구현
        await simulateServerCheck();
        alert('인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
    });

    // 휴대폰 인증
    document.getElementById('verifyPhone').addEventListener('click', async () => {
        const phone = document.getElementById('phone').value;
        if (!phone) {
            alert('휴대폰 번호를 입력해주세요.');
            return;
        }

        // TODO: 실제 휴대폰 인증 구현
        await simulateServerCheck();
        alert('인증번호가 발송되었습니다.');
    });

    // 전체 동의 체크박스 처리
    agreeAllCheckbox.addEventListener('change', (e) => {
        agreementCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

    // 개별 약관 체크박스 변경 시 전체 동의 상태 업데이트
    agreementCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(agreementCheckboxes).every(box => box.checked);
            agreeAllCheckbox.checked = allChecked;
        });
    });

    // 폼 제출 처리
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            nickname: document.getElementById('nickname').value,
            username: username.value,
            password: password.value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        // 사용자 추가
        existingUsers.push(formData);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // 회원가입 완료 후 로그인 페이지로 이동
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'login.html';
    });
});

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 16;

    if (!isValidLength) {
        return {
            isValid: false,
            message: '8~16자로 입력해야합니다!'
        };
    }

    if (!(hasLetter && hasNumber && hasSpecial)) {
        return {
            isValid: false,
            message: '영문,숫자,특수문자를 조합하여 입력해야합니다!'
        };
    }

    return {
        isValid: true,
        message: ''
    };
}

// 비밀번호 강도 체크 함수
function checkPasswordStrength(password) {
    let strength = 0;
    
    // 길이 체크 (8-16자)
    if (password.length >= 8 && password.length <= 16) strength += 25;
    
    // 영문 포함 체크
    if (/[a-zA-Z]/.test(password)) strength += 25;
    
    // 숫자 포함 체크
    if (/[0-9]/.test(password)) strength += 25;
    
    // 특수문자 포함 체크
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    
    return strength;
}

// 비밀번호 강도 표시바 업데이트
function updateStrengthBar(strength) {
    const strengthBar = document.querySelector('.strength-bar');
    strengthBar.style.width = `${strength}%`;
    
    if (strength < 50) {
        strengthBar.style.backgroundColor = '#ff3366';
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = '#ffaa00';
    } else {
        strengthBar.style.backgroundColor = '#00cc44';
    }
}

// 서버 요청 시뮬레이션 (테스트용)
function simulateServerCheck() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
}

// 메시지 표시 함수
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
} 