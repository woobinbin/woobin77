document.addEventListener("DOMContentLoaded", function () {
  const sessionUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users") || "[]");

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
});
