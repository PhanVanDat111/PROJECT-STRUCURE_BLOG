// Toggle menu thả xuống
let profile = document.getElementById("profile-icon");
let dropdownMenu = document.getElementById("dropdown-menu");

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

// Hiển thị/ẩn menu thả xuống khi nhấp vào avatar
profile.addEventListener("click", function (e) {
  e.stopPropagation(); // Ngăn sự kiện lan tỏa, để không đóng menu khi nhấp vào avatar
  dropdownMenu.classList.toggle("hidden");
});

// Ẩn menu thả xuống nếu nhấp ra ngoài
document.addEventListener("click", function (e) {
  if (!dropdownMenu.contains(e.target) && !profile.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});

// Danh sách người dùng
let users = JSON.parse(localStorage.getItem('users')) || [];
const userTable = document.getElementById('userTable');

// Hàm hiển thị danh sách người dùng
function displayUsers(userList) {
  userTable.innerHTML = ''; // Xóa bảng trước khi hiển thị lại
  userList.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.firstName} ${user.lastName}</td>
      <td>Hoạt động</td>
      <td>${user.email}</td>
      <td>
        <button onclick="deleteUser('${user.email}')">Xóa</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// Hiển thị danh sách người dùng ban đầu
document.addEventListener('DOMContentLoaded', function () {
  displayUsers(users);
});

// Hàm tìm kiếm người dùng theo tên
function searchUsers() {
  const searchInput = document.getElementById('search').value.trim().toLowerCase();
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchInput);
  });
  displayUsers(filteredUsers);
}

// Hàm xóa người dùng
function deleteUser(email) {
  users = users.filter(user => user.email !== email); // Xóa người dùng theo email
  localStorage.setItem('users', JSON.stringify(users));
  showMessage("Người dùng đã được xóa thành công!");
  location.reload(); // Tải lại trang để cập nhật bảng
} 