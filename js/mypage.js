const profileUpload = document.getElementById('profileUpload');
const profilePreview = document.getElementById('profilePreview');

profileUpload.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      profilePreview.src = imageData;

      // 저장 (사용자별 저장이라면 username으로 키 관리)
      const sessionUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (sessionUser) {
        localStorage.setItem(`profileImg-${sessionUser.username}`, imageData);
      }
    };
    reader.readAsDataURL(file);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const sessionUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (!users) return;

  

  if (sessionUser) {
    const savedImage = localStorage.getItem(`profileImg-${sessionUser.username}`);
    if (savedImage) {
      profilePreview.src = savedImage;
    }
  }

  if (!sessionUser) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html";
    return;
  }

  const user = users.find(u => u.username === sessionUser.username);

  if (user) {
    document.getElementById("nickname").textContent = user.nickname;
    document.getElementById("email").textContent = user.email;
    document.getElementById("username").textContent = user.username;
    document.getElementById("otpCode").textContent = user.otpCode || "(없음)";
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  document.getElementById("last-login").textContent = user.lastLogin || "2025-07-14";
  document.getElementById("registered-games").textContent = user.games?.join(", ") || "없음";
  document.getElementById("security-status").textContent = user.security || "양호";

  // 보안 상태 색상 클래스 부여
  const securityEl = document.getElementById("security-status");
  if (user.security === "위험") {
    securityEl.classList.add("status-danger");
  } else if (user.security === "주의") {
    securityEl.classList.add("status-warning");
  } else {
    securityEl.classList.add("status-good");
  }
});
