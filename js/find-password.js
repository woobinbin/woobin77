let currentStep = 1;
        let selectedMethod = '';
        let timerInterval;

        function updateProgressBar() {
            const progressLine = document.getElementById('progressLine');
            const steps = document.querySelectorAll('.step');
            
            // 진행률 업데이트
            const progressWidth = ((currentStep - 1) / 3) * 100;
            progressLine.style.width = progressWidth + '%';
            
            // 단계 상태 업데이트
            steps.forEach((step, index) => {
                const stepNumber = index + 1;
                if (stepNumber < currentStep) {
                    step.className = 'step completed';
                } else if (stepNumber === currentStep) {
                    step.className = 'step active';
                } else {
                    step.className = 'step inactive';
                }
            });
        }

        function showStep(stepNumber) {
            // 모든 단계 숨기기
            document.querySelectorAll('.step-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // 현재 단계 표시
            document.getElementById(`step${stepNumber}Content`).classList.remove('hidden');
            currentStep = stepNumber;
            updateProgressBar();
        }

        function validateUser() {
            const userId = document.getElementById('userId').value.trim();
            
            if (!userId) {
                alert('아이디 또는 이메일을 입력해주세요.');
                return;
            }
            
            // 실제로는 서버에 사용자 검증 요청을 보내야 함
            // 여기서는 데모용으로 간단히 처리
            if (userId.length < 3) {
                alert('올바른 아이디 또는 이메일을 입력해주세요.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === userId || u.email === userId);
    
            if (!user) {
            alert('존재하지 않는 사용자입니다.');
            return;
            }
    
    // tempUserData에 사용자 정보 저장
            const tempUserData = {
            username: user.username,
            email: user.email,
            timestamp: Date.now()
    };
    localStorage.setItem('tempUserData', JSON.stringify(tempUserData));
    
    console.log('사용자 검증 완료:', tempUserData);
            
            showStep(2);
        }

        function selectMethod(method) {
            selectedMethod = method;
            
            // 모든 카드 선택 해제
            document.querySelectorAll('.method-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // 선택된 카드 표시
            event.target.closest('.method-card').classList.add('selected');
            
            // 버튼 활성화
            document.getElementById('sendCodeBtn').disabled = false;
        }

        function sendVerificationCode() {
            if (!selectedMethod) {
                alert('인증 방법을 선택해주세요.');
                return;
            }
            
            const message = selectedMethod === 'email' ? 
                '이메일로 인증 코드를 발송했습니다.' : 
                'SMS로 인증 코드를 발송했습니다.';
            
            document.getElementById('verificationMessage').textContent = message;
            
            // 타이머 시작
            startTimer();
            
            showStep(3);
        }

        function startTimer() {
            let timeLeft = 300; // 5분 = 300초
            
            timerInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                
                document.getElementById('timer').textContent = 
                    `남은 시간: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    document.getElementById('timer').textContent = '인증 시간이 만료되었습니다.';
                    alert('인증 시간이 만료되었습니다. 다시 시도해주세요.');
                    showStep(2);
                }
                
                timeLeft--;
            }, 1000);
        }

        function moveToNext(current, index) {
            if (current.value.length === 1) {
                const nextInput = document.querySelectorAll('.code-input')[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }

        function verifyCode() {
            const codeInputs = document.querySelectorAll('.code-input');
            const code = Array.from(codeInputs).map(input => input.value).join('');
            
            if (code.length !== 6) {
                alert('인증 코드 6자리를 모두 입력해주세요.');
                return;
            }
            
            // 실제로는 서버에 인증 코드 검증 요청을 보내야 함
            // 여기서는 데모용으로 간단히 처리
            if (code === '123456') {
                clearInterval(timerInterval);
                showStep(4);
            } else {
                alert('올바르지 않은 인증 코드입니다.');
                // 입력 필드 초기화
                codeInputs.forEach(input => input.value = '');
                codeInputs[0].focus();
            }
        }

        function resendCode() {
            clearInterval(timerInterval);
            startTimer();
            alert('인증 코드를 재발송했습니다.');
            
            // 입력 필드 초기화
            document.querySelectorAll('.code-input').forEach(input => input.value = '');
            document.querySelectorAll('.code-input')[0].focus();
        }

        function checkPasswordRequirements() {
            const password = document.getElementById('newPassword')?.value || '';
            console.log('검증 중인 비밀번호:', password);

    const requirements = [
        { id: 'req-length', regex: /^.{6,12}$/, text: '6자 이상 12자 이하' },
        { id: 'req-lowercase', regex: /[a-z]/, text: '소문자 포함' },
        { id: 'req-number', regex: /[0-9]/, text: '숫자 포함' },
        { id: 'req-special', regex: /[!@#$%^&*(),.?":{}|<>]/, text: '특수문자 포함' }
    ];
    
    let allMet = true;
    
    // 각 요구사항 확인
    requirements.forEach(req => {
        const element = document.getElementById(req.id);
        if (element) {
            const isValid = req.regex.test(password);
            
            if (isValid) {
                element.classList.remove('invalid');
                element.classList.add('valid');
                element.style.color = '#28a745'; // 초록색
            } else {
                element.classList.remove('valid');
                element.classList.add('invalid');
                element.style.color = '#dc3545'; // 빨간색
                allMet = false;
            }
        }
    });
    
    // 완료 버튼 활성화/비활성화
    const submitButton = document.getElementById('resetPasswordBtn');
    if (submitButton) {
        submitButton.disabled = !allMet;
    }
    
    return allMet;
}

function checkPasswordMatch() {
    const password = document.getElementById('newPassword')?.value || '';
    const confirmPassword = document.getElementById('confirmPassword')?.value || '';
    
    const passwordsMatch = password === confirmPassword && password.length > 0;
    
    // 비밀번호 일치 여부를 시각적으로 표시하고 싶다면
    // HTML에 일치 확인용 요소를 추가해야 합니다
    
    // 완료 버튼은 비밀번호 요구사항과 일치 여부 모두 확인
    const allRequirementsMet = checkPasswordRequirements();
    const submitButton = document.getElementById('resetPasswordBtn');
    
    if (submitButton) {
        submitButton.disabled = !(allRequirementsMet && passwordsMatch);
    }
    
    return passwordsMatch;
        }

        function checkPasswordMatch() {
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const resetBtn = document.getElementById('resetPasswordBtn');
            
            // 필수 요구사항만 확인 (대문자는 선택사항)
            const allRequirementsMet = 
                password.length >= 8 &&
                /[a-z]/.test(password) &&
                /[0-9]/.test(password) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(password);
            
            const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
            
            resetBtn.disabled = !(allRequirementsMet && passwordsMatch);
        }

        function resetPassword() {
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            
            // 실제로는 서버에 비밀번호 재설정 요청을 보내야 함
            // 여기서는 데모용으로 간단히 처리
            
            // 로딩 표시
            document.getElementById('resetPasswordBtn').textContent = '처리 중...';
            document.getElementById('resetPasswordBtn').disabled = true;
            
            setTimeout(() => {

                // 💡 핵심 수정: 실제 users 배열 업데이트
        const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        let targetUsername = tempUserData.username;
        
        if (!targetUsername) {
            // 대안 1: URL 파라미터에서 username 가져오기
            const urlParams = new URLSearchParams(window.location.search);
            targetUsername = urlParams.get('username');
            console.log('URL에서 가져온 username:', targetUsername);
        }
        
        // 사용자 찾아서 비밀번호 업데이트
        const userIndex = users.findIndex(u => u.username === tempUserData.username);
        if (userIndex !== -1) {
            users[userIndex].password = password;
            localStorage.setItem('users', JSON.stringify(users));
            console.log('비밀번호 업데이트 완료:', users[userIndex]);
        }
                document.getElementById('successContent').classList.remove('hidden');
                document.getElementById('step4Content').classList.add('hidden');
                
                // 진행률 100%로 업데이트
                document.getElementById('progressLine').style.width = '100%';
                document.querySelectorAll('.step').forEach(step => {
                    step.className = 'step completed';
                });
            }, 2000);
        }

        function goToLogin() {
            // 실제로는 로그인 페이지로 이동
            alert('로그인 페이지로 이동합니다.');
            window.location.href = 'login.html';
        }

        function goBack() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            } else {
                // 로그인 페이지로 돌아가기
                alert('로그인 페이지로 돌아갑니다.');
                window.location.href = 'login.html';
            }
        }

        // 키보드 이벤트 처리
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const activeStep = document.querySelector('.step-content:not(.hidden)');
                const button = activeStep.querySelector('.btn:not(:disabled)');
                if (button) {
                    button.click();
                }
            }
        });

        // 인증 코드 입력 시 백스페이스 처리
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && e.target.classList.contains('code-input')) {
                if (e.target.value === '') {
                    const inputs = document.querySelectorAll('.code-input');
                    const currentIndex = Array.from(inputs).indexOf(e.target);
                    if (currentIndex > 0) {
                        inputs[currentIndex - 1].focus();
                    }
                }
            }
        });

        // 초기화
        updateProgressBar();