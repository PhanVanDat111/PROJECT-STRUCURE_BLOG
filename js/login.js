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
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  if (emailAdmin === username && passwordAdmin === password) {
    alert("Đăng nhập thành công!");
    location.href = "entries_manager.html"; // Chuyển hướng đến trang chính sau khi đăng nhập thành công
  }else if (username === storedUsername && password === storedPassword) {
    alert("Đăng nhập thành công!");
    location.href = "index-signin.html"; // Chuyển hướng đến trang chính sau khi đăng nhập thành công
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.");
  }
});

