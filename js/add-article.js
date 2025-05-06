// Hàm hiển thị thông báo (thêm nếu chưa có)
function showMessage(message, type = "success") {
  const msgBox = document.createElement("div");
  msgBox.textContent = message;
  msgBox.style.position = "fixed";
  msgBox.style.top = "20px";
  msgBox.style.right = "20px";
  msgBox.style.padding = "10px 20px";
  msgBox.style.backgroundColor = 
    type === "error" ? "#e74c3c" : 
    type === "warning" ? "#f1c40f" : "#2ecc71";
  msgBox.style.color = "#fff";
  msgBox.style.borderRadius = "8px";
  msgBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  msgBox.style.zIndex = 1000;
  document.body.appendChild(msgBox);
  setTimeout(() => msgBox.remove(), 3000);
}

// Đảm bảo các danh mục được tải khi trang đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
  // Lấy danh sách danh mục từ localStorage
  let categories = [];
  try {
    categories = JSON.parse(localStorage.getItem("categories")) || [];
  } catch (error) {
    showMessage("Lỗi khi tải danh mục từ localStorage.", "error");
    return;
  }

  const selectCategory = document.getElementById("productCategory");
  if (!selectCategory) {
    showMessage("Không tìm thấy phần tử danh mục trong HTML.", "error");
    return;
  }

  // Xóa các mục cũ
  selectCategory.innerHTML = '';

  // Tạo các lựa chọn danh mục từ localStorage
  if (categories.length === 0) {
    selectCategory.innerHTML = '<option value="">Không có danh mục nào</option>';
  } else {
    categories.forEach((category) => {
      selectCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
  }

  // Xử lý sự kiện gửi form
  const articleForm = document.querySelector('.article-form');
  if (!articleForm) {
    showMessage("Không tìm thấy form bài viết trong HTML.", "error");
    return;
  }

  articleForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn hành động mặc định của form

    // Lấy giá trị từ form
    const titleElem = document.getElementById('title');
    const categoryElem = document.getElementById('productCategory');
    const moodElem = document.getElementById('mood');
    const contentElem = document.getElementById('content');
    const statusElem = document.querySelector('input[name="status"]:checked');
    const fileElem = document.getElementById('file-upload');

    if (!titleElem || !categoryElem || !moodElem || !contentElem || !fileElem) {
      showMessage("Có lỗi xảy ra khi lấy thông tin từ form.", "error");
      return;
    }

    const title = titleElem.value.trim();
    const categoryId = parseInt(categoryElem.value, 10);
    const mood = moodElem.value;
    const content = contentElem.value.trim();
    const status = statusElem?.value;
    const file = fileElem.files[0];

    // Kiểm tra đầu vào
    if (!title || !content || isNaN(categoryId) || !status) {
      showMessage('Vui lòng điền đầy đủ các trường bắt buộc: tiêu đề, danh mục, nội dung, trạng thái.', 'error');
      return;
    }

    // Hàm lưu bài viết
    function saveArticle(imageURL = '') {
      const newArticle = {
        id: Date.now(), // Sử dụng timestamp làm ID
        title,
        categoryId, // Lưu categoryId thay vì category
        mood,
        content,
        status,
        image: imageURL, // Lưu base64 của hình ảnh
        date: new Date().toISOString().split('T')[0], // Ngày hiện tại
      };

      // Lấy danh sách bài viết từ localStorage và thêm bài viết mới
      let articles = [];
      try {
        articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.push(newArticle);
        localStorage.setItem('articles', JSON.stringify(articles));
      } catch (error) {
        showMessage("Lỗi khi lưu bài viết vào localStorage.", "error");
        return;
      }

      // Hiển thị thông báo và chuyển hướng
      showMessage('Bài viết đã được lưu thành công!', 'success');
      setTimeout(() => {
        window.location.href = 'index-signin.html'; // Chuyển hướng đến trang chính của người dùng
      }, 1000);
    }

    // Xử lý tệp hình ảnh nếu có
    if (file) {
      if (!file.type.startsWith('image/')) {
        showMessage('Vui lòng tải lên một tệp hình ảnh hợp lệ.', 'error');
        return;
      }

      // Kiểm tra kích thước tệp (tối đa 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('Tệp hình ảnh quá lớn. Vui lòng chọn tệp dưới 5MB.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        const imageURL = event.target.result; // Base64 của hình ảnh
        saveArticle(imageURL); // Lưu bài viết với hình ảnh
      };
      reader.onerror = function () {
        showMessage('Lỗi khi đọc tệp hình ảnh.', 'error');
      };
      reader.readAsDataURL(file); // Đọc tệp dưới dạng base64
    } else {
      saveArticle(); // Lưu bài viết mà không có hình ảnh
    }
  });
});