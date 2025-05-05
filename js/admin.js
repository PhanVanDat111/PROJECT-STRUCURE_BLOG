function logout() {
    localStorage.removeItem("loginUser"); // Xóa thông tin đăng nhập khỏi LocalStorage

    
    
      // Chuyển hướng về trang đăng nhập
    location.href = 'login.html';
    }
document.addEventListener("DOMContentLoaded", function ()  {
    let loginUser = JSON.parse(localStorage.getItem("loginUser")) || null; // Lấy thông tin người dùng đã đăng nhập từ LocalStorage
    let role = loginUser? loginUser.role :null;
    let path = window.location.pathname;

    if (role !== "admin" && path.includes("manager")) {
        logout();
        window.location.href = "./login.html"; // Chuyển hướng về trang chính
    }else if (!role) {
        logout();
        window.location.href = "./login.html"; // Chuyển hướng về trang chính
    }
});

