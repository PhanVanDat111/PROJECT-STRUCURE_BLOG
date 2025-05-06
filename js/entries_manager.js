let categories = JSON.parse(localStorage.getItem("categories")) || [];
const itemsPerPage = 5;
let currentPage = 1;

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
// Lưu danh mục vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Cập nhật danh sách danh mục trong <select>
function updateCategorySelect() {
  const selectCategory = document.getElementById("productCategory");
  if (!selectCategory) return; // Kiểm tra xem phần tử có tồn tại không

  selectCategory.innerHTML = ''; // Xóa các mục cũ
  if (categories.length === 0) {
    selectCategory.innerHTML = '<option value="">Không có danh mục nào</option>';
  } else {
    categories.forEach((category) => {
      selectCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
  }
}

// Hiển thị danh mục trong bảng
function displayCategories() {
  const categoryTableBody = document.getElementById('category-table-body');
  if (!categoryTableBody) return; // Kiểm tra xem phần tử có tồn tại không

  categoryTableBody.innerHTML = ''; // Xóa các dòng hiện tại
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

  updateCategorySelect(); // Cập nhật <select> sau khi hiển thị bảng
}

// Hiển thị danh mục đã lọc (sửa lỗi chỉ số)
function displayFilteredCategories(filteredCategories) {
  const categoryTableBody = document.getElementById('category-table-body');
  if (!categoryTableBody) return;

  categoryTableBody.innerHTML = ''; // Xóa các dòng hiện tại
  filteredCategories.forEach((category) => {
    const index = categories.findIndex((cat) => cat.id === category.id); // Lấy chỉ số từ mảng gốc
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
  const categoryName = document.getElementById('categoryName')?.value.trim();
  if (!categoryName) {
    showMessage("Tên danh mục không hợp lệ!", "error");
    return;
  }
  if (categories.some(category => category.name.toLowerCase() === categoryName.toLowerCase())) {
    showMessage("Danh mục đã tồn tại!", "error");
    return;
  }

  const newCategory = { id: Date.now(), name: categoryName }; // Sử dụng timestamp làm ID
  categories.push(newCategory);
  saveToLocalStorage();
  displayCategories();
}

// Chỉnh sửa danh mục
function editCategory(index) {
  const newCategoryName = prompt("Nhập tên danh mục mới", categories[index].name);
  if (!newCategoryName || newCategoryName.trim() === '') {
    showMessage("Tên danh mục không hợp lệ!", "error");
    return;
  }
  if (newCategoryName !== categories[index].name && categories.some(category => category.name.toLowerCase() === newCategoryName.toLowerCase())) {
    showMessage("Danh mục đã tồn tại!", "error");
    return;
  }

  categories[index].name = newCategoryName.trim();
  saveToLocalStorage();
  displayCategories();
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
  const searchValue = document.getElementById('search-input')?.value.toLowerCase() || '';
  if (searchValue === '') {
    displayCategories(); // Khôi phục danh sách đầy đủ nếu không có giá trị tìm kiếm
  } else {
    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchValue));
    displayFilteredCategories(filteredCategories);
  }
}

// Xử lý sự kiện gửi form
document.querySelector('.article-form')?.addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn hành động mặc định của form

  // Lấy giá trị từ form
  const title = document.getElementById('title')?.value.trim();
  const category = document.getElementById('productCategory')?.value;
  const mood = document.getElementById('mood')?.value;
  const content = document.getElementById('content')?.value.trim();
  const status = document.querySelector('input[name="status"]:checked')?.value;
  const file = document.getElementById('file-upload')?.files[0];

  // Kiểm tra đầu vào
  if (!title || !content || !category || !status) {
    showMessage( 'vui lòng điền đủ thông tin ', "error");
    return;
  }

  // Hàm lưu bài viết
  function saveArticle(imageURL = '') {
    const newArticle = {
      id: Date.now(), // Sử dụng timestamp làm ID
      title,
      category,
      mood,
      content,
      status,
      image: imageURL, // Lưu base64 của hình ảnh
      date: new Date().toISOString().split('T')[0], // Ngày hiện tại
    };

    // Lấy danh sách bài viết từ localStorage và thêm bài viết mới
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Hiển thị thông báo và chuyển hướng
    showMessage("Bài viết đã được lưu thành công!");
    // Chuyển hướng đến trang quản lý bài viết
    window.location.href = 'article_manager.html';
  }

  // Xử lý tệp hình ảnh nếu có
  if (file) {
    if (!file.type.startsWith('image/')) {
      showMessage("Vui lòng tải lên một tệp hình ảnh hợp lệ.", "error");
      return;
    }

    // Kiểm tra kích thước tệp (tối đa 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage("Tệp hình ảnh quá lớn. Vui lòng chọn tệp dưới 5MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageURL = event.target.result; // Base64 của hình ảnh
      saveArticle(imageURL); // Lưu bài viết với hình ảnh
    };
    reader.onerror = function () {
      showMessage("lỗi tệp hình ảnh!", "error");
    };
    reader.readAsDataURL(file); // Đọc tệp dưới dạng base64
  } else {
    saveArticle(); // Lưu bài viết mà không có hình ảnh
  }
});

// Khởi tạo khi trang tải
document.addEventListener('DOMContentLoaded', function () {
  displayCategories(); // Hiển thị danh mục và cập nhật <select>
});