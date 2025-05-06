// Đảm bảo các danh mục được tải khi trang đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
  // Lấy danh sách danh mục từ localStorage
  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let selectCategory = document.getElementById("productCategory");

  // Xóa các mục cũ
  selectCategory.innerHTML = ''; 

  // Tạo các lựa chọn danh mục từ localStorage
  categories.forEach((category) => {
    selectCategory.innerHTML += `<option value="${category.name}">${category.name}</option>`;
  });

  if (categories.length === 0) {
    selectCategory.innerHTML = '<option value="">Không có danh mục nào</option>';
  }
});

// Xử lý sự kiện gửi form
document.querySelector('.article-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Lấy giá trị từ form
  const title = document.getElementById('title').value;
  const mood = document.getElementById('mood').value;
  const content = document.getElementById('content').value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const file = document.getElementById('file-upload').files[0];
  const category = document.getElementById('productCategory').value; // Lấy tên danh mục đã chọn

  // Kiểm tra xem có tệp tin nào được chọn không, và đọc nếu có
  let imageURL = '';
  if (file) {
    if (!file.type.startsWith('image/')) { // Kiểm tra loại tệp
      alert('Vui lòng tải lên một tệp hình ảnh hợp lệ.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = function() {
      imageURL = reader.result; // Lưu kết quả đọc được từ FileReader
      saveArticle(); // Lưu bài viết sau khi ảnh đã được đọc
    };
    reader.readAsDataURL(file); // Đọc tệp tin dưới dạng base64
  } else {
    saveArticle(); // Lưu bài viết ngay lập tức nếu không có tệp tin
  }

  function saveArticle() {
    const listArticle = { title, category, mood, content, status, imageURL };

    // Lấy danh sách bài viết từ localStorage và thêm bài viết mới
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.push(listArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Hiển thị thông báo thành công
    alert('Bài viết đã được lưu thành công!');
    
  
  }
});
