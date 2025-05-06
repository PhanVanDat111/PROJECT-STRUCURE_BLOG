// Đảm bảo các danh mục được tải khi trang đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
  // Lấy danh sách danh mục từ localStorage
  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let selectCategory = document.getElementById("productCategory");

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
});

// Xử lý sự kiện gửi form
document.querySelector('.article-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn hành động mặc định của form

  // Lấy giá trị từ form
  const title = document.getElementById('title').value.trim();
  const categoryId = parseInt(document.getElementById('productCategory').value, 10); // Lưu categoryId
  const mood = document.getElementById('mood').value;
  const content = document.getElementById('content').value.trim();
  const status = document.querySelector('input[name="status"]:checked')?.value;
  const file = document.getElementById('file-upload').files[0];

  // Kiểm tra đầu vào
  if (!title || !content || !categoryId || !status) {
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
      let articles = JSON.parse(localStorage.getItem('articles')) || [];
      articles.push(newArticle);
      localStorage.setItem('articles', JSON.stringify(articles));

      // Hiển thị thông báo và chuyển hướng
      showMessage("Bài viết đã được lưu thành công!");
      // Chuyển hướng đến trang quản lý bài viết
      window.location.href = 'index-signin.html'; // Chuyển hướng đến trang chính của người dùng
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
          showMessage('Lỗi khi đọc tệp hình ảnh.', 'error');};
      reader.readAsDataURL(file); // Đọc tệp dưới dạng base64
  } else {
      saveArticle(); // Lưu bài viết mà không có hình ảnh
  }
});