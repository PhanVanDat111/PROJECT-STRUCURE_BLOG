let profile = document.getElementById("profile-icon");
let dropdownMenu = document.getElementById("dropdown-menu");

// Toggle dropdown khi click avatar
profile.addEventListener("click", function (e) {
  e.stopPropagation(); // Ngừng sự kiện lan tỏa, để không đóng menu khi click vào avatar
  dropdownMenu.classList.toggle("hidden");
});

// Ẩn dropdown nếu click ra ngoài
document.addEventListener("click", function (e) {
  if (!dropdownMenu.contains(e.target) && !profile.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Hàm để hiển thị danh sách người dùng
  const userTable = document.getElementById('userTable');
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.firstName} ${user.lastName}</td>
      <td>Active</td>
      <td>${user.email}</td>
      <td>
        <button onclick="deleteUser('${user.email}')">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
});

// hàm xóa người dùng
function deleteUser(email) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.filter(user => user.email !== email); // Remove user by email
  localStorage.setItem('users', JSON.stringify(users));

  alert('User deleted successfully!');
  location.reload(); // Reload to update the table
}
