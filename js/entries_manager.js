let categories = JSON.parse(localStorage.getItem("categories")) || [];

const itemsPerPage = 5;
let currentPage = 1;

// Lưu danh mục vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Hiển thị danh mục trong bảng
function displayCategories() {
  const categoryTableBody = document.getElementById('category-table-body');
  categoryTableBody.innerHTML = '';  // Xóa các dòng hiện tại
  
  categories.forEach((category, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${category.name}</td>
      <td>
        <button onclick="editCategory(${index})">🛠</button>
        <button onclick="deleteCategory(${index})">🗑</button>
      </td>
    `;
    categoryTableBody.appendChild(row);
  });
}

// Thêm danh mục mới
function addCategory() {
  const categoryName = document.getElementById('categoryName').value.trim();
  if (categoryName && !categories.some(category => category.name === categoryName)) {
    const newCategory = { id: categories.length + 1, name: categoryName };
    categories.push(newCategory);
    saveToLocalStorage();
    displayCategories();
  } else {
    alert("Danh mục đã tồn tại hoặc không hợp lệ.");
  }
}

// Chỉnh sửa danh mục
function editCategory(index) {
  const newCategoryName = prompt("Nhập tên danh mục mới", categories[index].name);
  
  // Kiểm tra nếu tên mới không rỗng và không trùng với tên các danh mục khác
  if (newCategoryName && newCategoryName !== categories[index].name && !categories.some(category => category.name === newCategoryName)) {
    categories[index].name = newCategoryName;
    saveToLocalStorage();
    displayCategories();
  } else {
    alert("Danh mục đã tồn tại hoặc không hợp lệ.");
  }
}


// Xóa danh mục
function deleteCategory(index) {
  if (confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
    categories.splice(index, 1);
    saveToLocalStorage();
    displayCategories();
  }
}

// Chức năng tìm kiếm
function searchData() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchValue));
  displayFilteredCategories(filteredCategories);
}

function displayFilteredCategories(filteredCategories) {
  const categoryTableBody = document.getElementById('category-table-body');
  categoryTableBody.innerHTML = '';  // Xóa các dòng hiện tại

  filteredCategories.forEach((category, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${category.name}</td>
      <td>
        <button onclick="editCategory(${index})">Sửa</button>
        <button onclick="deleteCategory(${index})">Xóa</button>
      </td>
    `;
    categoryTableBody.appendChild(row);
  });
}

// Tải danh mục và hiển thị
displayCategories();
