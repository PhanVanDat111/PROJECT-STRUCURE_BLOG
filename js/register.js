// Lưu tài khoản đăng ký vào LocalStorage
// tài khoảng admin mặc định
const admin = 'admin@gmail.com'
const passwordAdmin = '123456';

function signUp() {
  const firstname = document.getElementById('Firstname-signup').value.trim();
  const lastname = document.getElementById('Lastname-sigup').value.trim();
  const username = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value;
  const confirmPassword = document.getElementById('password-Confirm-signup').value;

  // Kiểm tra nếu có thông tin thiếu
  if (!firstname || !lastname || !username || !password || !confirmPassword) {
    alert("Vui lòng điền đủ thông tin.");
    return;
  }
  if (username === admin) {
    alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
    return;
    
  }

  // Kiểm tra mật khẩu có khớp không
  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
    return;
  }

  // Kiểm tra xem email đã tồn tại trong localStorage chưa
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const emailExists = users.some(user => user.email === username);

  if (emailExists) {
    alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
    return;
  }
  
  // Tạo đối tượng người dùng mới
  const newUser = { firstName: firstname, lastName: lastname, email: username, password: password, role: "user" };

  // Thêm người dùng mới vào mảng
  users.push(newUser);

  // Lưu lại danh sách người dùng vào localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Thông báo đăng ký thành công
  alert("Đăng ký thành công! Vui lòng đăng nhập.");
  location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
}
