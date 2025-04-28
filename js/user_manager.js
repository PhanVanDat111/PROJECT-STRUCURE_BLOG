let profile = document.getElementById("profile-icon");
let dropdownMenu = document.getElementById("dropdown-menu");

// Toggle dropdown khi click avatar
profile.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

// Ẩn dropdown nếu click ra ngoài
document.addEventListener("click", function (e) {
  if (!dropdownMenu.contains(e.target) && !profile.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});


document.addEventListener('DOMContentLoaded', function () {
  
  const username = JSON.parse(localStorage.getItem('users')) || [];

  // Display users in the table
  const userTable = document.getElementById('userTable');
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${username.firstName} ${username.lastName}</td>
      <td>Active</td>
      <td>${username.email}</td>
      <td>
        <button onclick="deleteUser('${user.email}')">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
});

// Delete user from localStorage
function deleteUser(email) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.filter(user => user.email !== email); // Remove user by email
  localStorage.setItem('users', JSON.stringify(users));

  alert('User deleted successfully!');
  location.reload(); // Reload to update the table
}
