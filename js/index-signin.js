document.addEventListener('DOMContentLoaded', function() {
  // Lấy danh sách bài viết từ localStorage
  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  const articlesContainer = document.getElementById('blogGrid');

  const article = {
  title: "Bài viết mẫu",
  content: "Đây là nội dung bài viết...",
  comments: [
    { username: "User1", content: "Bài viết rất hay!" },
    { username: "User2", content: "Cảm ơn về thông tin hữu ích." }
  ]
};
  // Hiển thị từng bài viết
  articles.forEach(article => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article-card');
    articleDiv.innerHTML = `
      <h3>${article.title}</h3>
      ${article.imageURL ? `<img src="${article.imageURL}" alt="Image" style="height: 30%; width: 30%">` : ''} 
      <p><strong>Categories : </strong> ${article.category}</p>
      <p><strong>Mood : </strong> ${article.mood}</p>
      <p><strong>Content : </strong>${article.content}</p>
      <p><strong>Status : </strong> ${article.status}</p>
    `;
    articlesContainer.appendChild(articleDiv);
  });


  // Hiển thị bài viết lên giao diện
  function renderPosts(filteredPosts = articles) {
    const blogGrid = document.getElementById("blogGrid");
    blogGrid.innerHTML = "";

    filteredPosts.forEach((post) => {
      const card = document.createElement('div');
      card.classList.add('blog-card');
      card.innerHTML = `
        <img src="${post.imageURL}" alt=""/>
        <div class="card-content">
          <span class="date">Date: ${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.content.slice(0, 100)}...</p>
          <span class="tag ${post.tagClass}">${post.tag}</span>
        </div>
      `;
      card.addEventListener('click', () => openModal(post));
      blogGrid.appendChild(card);
    });
  }

  // Mở modal khi click vào bài viết
  function openModal(post) {
    document.getElementById('modalPostTitle').textContent = post.title;
    document.getElementById('modalPostContent').textContent = post.content;

    // Xóa các bình luận cũ
    const commentsSection = document.getElementById('commentsSection');
    commentsSection.innerHTML = ''; 

    // Hiển thị bình luận nếu có
    if (post.comments && post.comments.length > 0) {
      post.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>${comment.username}:</strong> ${comment.content}</p>`;
        commentsSection.appendChild(commentDiv);
      });
    } else {
      commentsSection.innerHTML = '<p>Chưa có bình luận nào</p>';
    }

    // Ẩn liên kết "Xem tất cả bình luận" và hiển thị phần bình luận
    document.getElementById('viewCommentsLink').style.display = 'none';
    commentsSection.style.display = 'block';

    document.getElementById('postModal').style.display = 'flex';
    document.querySelector('.container').classList.add('blur');
    document.querySelector('header').classList.add('blur');
    document.querySelector('footer').classList.add('blur');
  }

  // Đóng modal
  function closeModal() {
    document.getElementById('postModal').style.display = 'none';

    document.querySelector('.container').classList.remove('blur');
    document.querySelector('header').classList.remove('blur');
    document.querySelector('footer').classList.remove('blur');
  }

  // Bắt sự kiện đóng modal
  document.getElementById('closeModal').addEventListener('click', closeModal);

  // Tính năng bấm vào icon profile
  let profile = document.getElementById("profile-icon");
  let dropdownMenu = document.getElementById("dropdown-menu");

  profile.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });

  // Ẩn dropdown nếu click ra ngoài
  document.addEventListener("click", function (e) {
    if (!dropdownMenu.contains(e.target) && !profile.contains(e.target)) {
      dropdownMenu.classList.add("hidden");
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  const articlesContainer = document.getElementById('blogGrid');
  const categorySelect = document.getElementById('categorySelect');

  // Hiển thị danh mục trong dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });

  // Hiển thị bài viết
  function renderPosts(filteredPosts = articles) {
    articlesContainer.innerHTML = '';
    filteredPosts.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article-card');
      articleDiv.innerHTML = `
        <h3>${article.title}</h3>
        ${article.imageURL ? `<img src="${article.imageURL}" alt="Image" style="height: 30%; width: 30%">` : ''} 
        <p><strong>Categories : </strong> ${article.category}</p>
        <p><strong>Mood : </strong> ${article.mood}</p>
        <p><strong>Content : </strong>${article.content}</p>
        <p><strong>Status : </strong> ${article.status}</p>
      `;
      articlesContainer.appendChild(articleDiv);
    });
  }
  // Thực hiện tìm kiếm mỗi khi người dùng nhập từ khóa hoặc chọn category
  document.getElementById("searchInput").addEventListener("input", searchPosts);
  document.getElementById("categorySelect").addEventListener("change", searchPosts);

  renderPosts(articles); // Hiển thị các bài viết khi tải trang
});
