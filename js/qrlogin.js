document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".button1");
    const qrTimer = document.querySelector(".qr-guide");
    let timeRemaining = 180; // 3분 (180초)

    // ✅ 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ QR 로그인 가능한 사용자 찾기 (qrLoginEnabled가 true인 유저)
    const user = users.find(u => u.qrLoginEnabled === true);

    // QR 로그인 대상자가 없으면 로그인 불가능 처리
    if (!user) {
        alert("QR 로그인 가능한 사용자가 없습니다. (회원가입 시 qrLoginEnabled 설정 필요)");
        loginBtn.disabled = true;
        loginBtn.style.opacity = "0.5";
        return;
    }

    // ✅ 타이머 표시 및 유효시간 업데이트
    const interval = setInterval(() => {
        timeRemaining--;
        const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
        const seconds = String(timeRemaining % 60).padStart(2, "0");

        qrTimer.innerHTML = `
            <img src="images/mobile.png" alt="모바일" class="mobile-icon">
            유효시간: ${minutes}:${seconds}
        `;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            qrTimer.innerHTML = `<span style="color: red;">QR 코드가 만료되었습니다.</span>`;
            loginBtn.disabled = true;
            loginBtn.style.opacity = "0.5";
        }
    }, 1000);

    // ✅ QR 로그인 버튼 클릭 시 로그인 처리
    loginBtn.addEventListener("click", function () {
        if (timeRemaining <= 0) {
            alert("QR 코드가 만료되었습니다. 다시 시도해주세요.");
            return;
        }

        // 로그인 처리 (세션 저장)
        sessionStorage.setItem("loggedInUser", JSON.stringify({
            username: user.username,
            nickname: user.nickname
        }));

        alert(`${user.nickname}님, QR 로그인 성공!`);
        window.location.href = "index.html";
    });
});
