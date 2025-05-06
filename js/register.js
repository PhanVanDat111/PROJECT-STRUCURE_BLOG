// Lưu tài khoản đăng ký vào LocalStorage
// tài khoảng admin mặc định
const admin = 'admin@gmail.com'
const passwordAdmin = '123456';

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

function signUp() {
  const firstname = document.getElementById('Firstname-signup').value.trim();
  const lastname = document.getElementById('Lastname-sigup').value.trim();
  const username = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value;
  const confirmPassword = document.getElementById('password-Confirm-signup').value;

  // Kiểm tra nếu có thông tin thiếu
  if (!firstname || !lastname || !username || !password || !confirmPassword) {
    showMessage("Vui lòng điền đủ thông tin!", "error");
    return;
  }
  if (username === admin) {
    showMessage("Tài khoản đã tồn tại!", "error");
    return;
    
  }

  // Kiểm tra mật khẩu có khớp không
  if (password !== confirmPassword) {
    showMessage("Mật khẩu không khớp. Vui lòng kiểm tra lại.", "error");
    return;
  }

  // Kiểm tra xem email đã tồn tại trong localStorage chưa
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const emailExists = users.some(user => user.email === username);

  if (emailExists) {
    showMessage("Email đã tồn tại. Vui lòng sử dụng email khác.", "error");
    return;
  }
  
  // Tạo đối tượng người dùng mới
  const newUser = { firstName: firstname, lastName: lastname, email: username, password: password, role: "user" };

  // Thêm người dùng mới vào mảng
  users.push(newUser);

  // Lưu lại danh sách người dùng vào localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Thông báo đăng ký thành công
  showMessage("Đăng ký thành công! Vui lòng đăng nhập.");
  location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
}
