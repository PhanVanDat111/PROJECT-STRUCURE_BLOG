let loginbutton = document.getElementById("login-btn");
let emailAdmin = 'admin@gmail.com';
let passwordAdmin = '123456';

loginbutton.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

  const username = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (!username || !password) {
    alert("Vui lòng điền đủ thông tin.");
    return;
  }

  // Kiểm tra thông tin đăng nhập với dữ liệu đã lưu trong LocalStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  let isValidUser = false; // Biến để kiểm tra xem người dùng có hợp lệ hay không

  // Kiểm tra tài khoản admin
  if (emailAdmin === username && passwordAdmin === password) {
    alert("Đăng nhập thành công!");
    localStorage.setItem('loginUser', JSON.stringify({ username: 'admin', role: 'admin' }));
    isValidUser = true;
    location.href = "entries_manager.html"; // Chuyển hướng đến trang quản lý
  } else {
    // Kiểm tra người dùng bình thường
    storedUsers.forEach((user) => {
      if (user.email === username && user.password === password) {
        alert("Đăng nhập thành công!");
        localStorage.setItem('loginUser', JSON.stringify({ username: user.email, role: 'user' }));
        isValidUser = true;
        location.href = "index-signin.html"; // Chuyển hướng đến trang chính của người dùng
      }
    });
  }

  // Nếu không tìm thấy người dùng hợp lệ, hiển thị thông báo lỗi
  if (!isValidUser) {
    alert("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.");
  }
});
