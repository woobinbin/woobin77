// 전화번호 자동 하이픈 처리
document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length >= 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length >= 8) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
    e.target.value = value;
});

// 아이디 찾기 함수
function findUserId() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loading = document.getElementById('loading');
    const findBtn = document.querySelector('.find-btn');

    // 초기화
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    // 유효성 검사
    if (!name) {
        showError('이름을 입력해주세요.');
        return;
    }

    if (!phone) {
        showError('전화번호를 입력해주세요.');
        return;
    }

    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
        showError('전화번호 형식이 올바르지 않습니다.');
        return;
    }

    // 로딩 표시
    loading.style.display = 'block';
    findBtn.disabled = true;

    // 딜레이 후 아이디 검색
    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('저장된 사용자들:', users);

        const inputPhoneClean = phone.replace(/[^0-9]/g, '');

        const foundUser = users.find(user => {
            const userPhoneClean = user.phone ? user.phone.replace(/[^0-9]/g, '') : '';
            console.log(`비교: ${user.name} === ${name} && ${userPhoneClean} === ${inputPhoneClean}`);
            return user.name === name && userPhoneClean === inputPhoneClean;
        });

        loading.style.display = 'none';
        findBtn.disabled = false;

        if (foundUser) {
            showFoundId(foundUser.username);
        } else {
            showError('입력하신 정보로 가입된 아이디를 찾을 수 없습니다.');
            console.log('검색 조건:', { name, phone: inputPhoneClean });
            console.log('등록된 사용자:', users.map(u => ({
                name: u.name,
                phone: u.phone,
                username: u.username
            })));
        }
    }, 1500);
}

// 에러 메시지 표시
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// 아이디 찾기 결과 표시
function showFoundId(username) {
    const maskedId = maskUserId(username);

    document.getElementById('foundId').textContent = maskedId;
    document.getElementById('findForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
}

// 아이디 마스킹 처리 (ex: ab***z)
function maskUserId(username) {
    if (username.length <= 3) {
        return username.charAt(0) + '*'.repeat(username.length - 1);
    } else {
        const firstTwo = username.substring(0, 2);
        const lastOne = username.charAt(username.length - 1);
        const middle = '*'.repeat(username.length - 3);
        return firstTwo + middle + lastOne;
    }
}

// 다시 찾기
function findAnother() {
    document.getElementById('findForm').style.display = 'block';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('errorMessage').style.display = 'none';
}

// 로그인 페이지로 이동
function goToLogin() {
    window.location.href = 'login.html';
}


        