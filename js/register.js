// Lưu tài khoản đăng ký vào LocalStorage
function signUp() {
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
    
        // Create new user object
        const newUser = { firstName: firstname, lastName: lastname, email: username, password: password, role : "user" };

        // Get existing users from localStorage or initialize an empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];
  
        // Add the new user to the users array
        users.push(newUser);
  
        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));
    // Lưu dữ liệu vào LocalStorage

  
    alert("Sign up successful! Now please login.");
    location.href = "login.html";
  }