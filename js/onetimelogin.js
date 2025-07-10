function OnlyNumbers(e, targetClass, msg) {
    const key = e.key;
    const isNumber = /^[0-9]$/.test(key);

    if (!isNumber) {
        const warning = document.querySelector("." + targetClass);
        warning.textContent = msg;
        warning.style.display = "block";
        e.preventDefault();
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".button1");
    const input1 = document.querySelector(".input01");
    const input2 = document.querySelector(".input02");
    const message = document.querySelector(".inputMag");

    // 자동 포커스 이동 기능
document.querySelector(".input01").addEventListener("input", function () {
    if (this.value.length === 4) {
        document.querySelector(".input02").focus();
    }
});


    loginBtn.addEventListener("click", function () {
        const code1 = input1.value.trim();
        const code2 = input2.value.trim();
        const fullCode = code1 + code2;

        if (fullCode.length !== 8 || isNaN(fullCode)) {
            message.textContent = "8자리 숫자를 정확히 입력해주세요.";
            message.style.display = "block";
            return;
        }

        // ✅ 기존 시뮬레이션 코드는 제거하고 실제 저장된 사용자 검색으로 변경
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.otpCode === fullCode);

        if (user) {
            sessionStorage.setItem("loggedInUser", JSON.stringify({
                username: user.username,
                nickname: user.nickname
            }));

            alert(`${user.nickname}님, 일회용 로그인 성공!`);
            window.location.href = "index.html";
        } else {
            message.textContent = "유효하지 않은 일회용 로그인 번호입니다.";
            message.style.display = "block";
        }
    });
});

