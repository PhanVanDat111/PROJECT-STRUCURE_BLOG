let loginbutton = document.getElementById("login-btn");
let emailAdmin = 'admin@gmail.com';
let passwordAdmin = '123456';

function showMessage(message, type = "success") {
  const msgBox = document.createElement("div"); // Tạo một phần tử div để hiển thị thông báo
  msgBox.textContent = message; // Gán nội dung thông báo
  msgBox.style.position = "fixed";
  msgBox.style.top = "20px";
  msgBox.style.right = "20px";
  msgBox.style.padding = "10px 20px";
  msgBox.style.backgroundColor = 
    type === "error" ? "#e74c3c" : 
    type === "warning" ? "#f1c40f" : "#2ecc71"; // Đổi màu nền dựa trên loại thông báo
  msgBox.style.color = "#fff";
  msgBox.style.borderRadius = "8px";
  msgBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  msgBox.style.zIndex = 1000;
  document.body.appendChild(msgBox); // Thêm thông báo vào body
  setTimeout(() => msgBox.remove(), 3000); // Tự động xóa thông báo sau 3 giây
}

loginbutton.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

  const username = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (!username || !password) {
    showMessage("Vui lòng nhập đủ thông tin!", "error");
    return;
  }

  // Kiểm tra thông tin đăng nhập với dữ liệu đã lưu trong LocalStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  let isValidUser = false; // Biến để kiểm tra xem người dùng có hợp lệ hay không

  // Kiểm tra tài khoản admin
  if (emailAdmin === username && passwordAdmin === password) {
    showMessage("Đăng Nhập thành côngcông!");
    localStorage.setItem('loginUser', JSON.stringify({ username: 'admin', role: 'admin' }));
    isValidUser = true;
    location.href = "entries_manager.html"; // Chuyển hướng đến trang quản lý
  } else {
    // Kiểm tra người dùng bình thường
    storedUsers.forEach((user) => {
      if (user.email === username && user.password === password) {
        showMessage("Đăng Nhập Thành Công!");
        localStorage.setItem('loginUser', JSON.stringify({ username: user.email, role: 'user' }));
        isValidUser = true;
        location.href = "index-signin.html"; // Chuyển hướng đến trang chính của người dùng
      }
    });
  }

  // Nếu không tìm thấy người dùng hợp lệ, hiển thị thông báo lỗi
  if (!isValidUser) {
    showMessage("Lỗi Đăng Nhập", "error");
  }
});

// Mở modal bằng JS
let myModal = new bootstrap.Modal(document.getElementById('myModal'));
myModal.show();

// Đóng modal
myModal.hide();
