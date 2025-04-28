// Lưu tài khoản đăng ký vào LocalStorage
function signUp() {
    console.log(("tyhrgfdvc"));
    
    const firstname = document.getElementById('Firstname-signup').value.trim();
    const lastname = document.getElementById('Lastname-sigup').value.trim();
    const username = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value;
    const confirmPassword = document.getElementById('password-Confirm-signup').value;
  
    if (!firstname || !lastname || !username || !password || !confirmPassword) {
      alert("Vui lòng điền đủ thông tin.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Mật Khâu không khớp. Vui lòng kiểm tra lại.");
      return;
    }
  
    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  
    alert("Sign up successful! Now please login.");
    location.href = "login.html";
  }