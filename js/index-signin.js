document.addEventListener('DOMContentLoaded', function() {
  // Lấy danh sách bài viết và danh mục từ localStorage
  let articles = JSON.parse(localStorage.getItem('articles')) || [];
  let categories = JSON.parse(localStorage.getItem('categories')) || [];
  const articlesContainer = document.getElementById('blogGrid');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const paginationContainer = document.createElement('div'); // Thêm container cho phân trang
  paginationContainer.classList.add('pagination');
  document.querySelector('main.container').appendChild(paginationContainer); // Thêm vào main

  // Số bài viết mỗi trang
  const postsPerPage = 6;
  let currentPage = 1;

  // Hiển thị danh mục trong dropdown
  function populateCategorySelect() {
    if (!categorySelect) return;
    categorySelect.innerHTML = '<option value="">Tất cả danh mục</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  }

  // Hàm hiển thị bài viết cho trang hiện tại
  function renderPosts(filteredPosts = articles) {
    if (!articlesContainer) return;
    articlesContainer.innerHTML = ''; // Làm trống container

    if (filteredPosts.length === 0) {
      articlesContainer.innerHTML = '<p>Không có bài viết nào phù hợp với tìm kiếm.</p>';
      return;
    }

    // Tính toán các bài viết cần hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    postsToShow.forEach(article => {
      const categoryName = categories.find(cat => cat.id === article.categoryId)?.name || 'Không có danh mục';
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article-card');
      articleDiv.innerHTML = `
        <h3>${article.title}</h3>
        ${article.image ? `<img src="${article.image}" alt="Image" style="height: 30%; width: 30%">` : ''}
        <p><strong>Danh mục:</strong> ${categoryName}</p>
        <p><strong>Tâm trạng:</strong> ${article.mood || 'Không có'}</p>
        <p><strong>Nội dung:</strong> ${article.content.slice(0, 100)}...</p>
        <p><strong>Trạng thái:</strong> ${article.status}</p>
        <p><strong>Ngày:</strong> ${article.date}</p>
      `;
      articleDiv.addEventListener('click', () => openModal(article));
      articlesContainer.appendChild(articleDiv);
    });

    // Hiển thị phân trang
    renderPagination(filteredPosts.length);
  }

  // Hàm hiển thị phân trang
  function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    paginationContainer.innerHTML = ''; // Xóa các nút phân trang cũ

    // Nút Previous
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('page-btn');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        searchPosts();
      }
    });
    paginationContainer.appendChild(prevButton);

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('page-number');
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i;
        searchPosts();
      });
      paginationContainer.appendChild(pageButton);
    }

    // Nút Next
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('page-btn');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        searchPosts();
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  // Hàm tìm kiếm và lọc bài viết
  function searchPosts() {
    const searchValue = searchInput?.value.toLowerCase().trim() || '';
    const selectedCategoryId = categorySelect?.value || '';

    const filteredArticles = articles.filter(article => {
      const categoryName = categories.find(cat => cat.id === article.categoryId)?.name.toLowerCase() || '';
      const matchesCategory = selectedCategoryId ? article.categoryId === parseInt(selectedCategoryId) : true;
      const matchesSearch = article.title.toLowerCase().includes(searchValue) ||
                           categoryName.includes(searchValue) ||
                           article.content.toLowerCase().includes(searchValue);
      return matchesCategory && matchesSearch;
    });

    currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    renderPosts(filteredArticles);
  }

  // Mở modal khi click vào bài viết
  function openModal(post) {
    const modal = document.getElementById('postModal');
    if (!modal) return;

    document.getElementById('modalPostTitle').textContent = post.title;
    document.getElementById('modalPostContent').textContent = post.content;

    const commentsSection = document.getElementById('commentsSection');
    if (commentsSection) {
      commentsSection.innerHTML = '';
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
      commentsSection.style.display = 'block';
    }

    const viewCommentsLink = document.getElementById('viewCommentsLink');
    if (viewCommentsLink) viewCommentsLink.style.display = 'none';

    modal.style.display = 'flex';
    document.querySelector('.container')?.classList.add('blur');
    document.querySelector('header')?.classList.add('blur');
    document.querySelector('footer')?.classList.add('blur');
  }

  // Đóng modal
  function closeModal() {
    const modal = document.getElementById('postModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.querySelector('.container')?.classList.remove('blur');
    document.querySelector('header')?.classList.remove('blur');
    document.querySelector('footer')?.classList.remove('blur');
  }

  // Tính năng bấm vào icon profile
  function setupProfileDropdown() {
    const profile = document.getElementById('profile-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!profile || !dropdownMenu) return;

    profile.addEventListener('click', function() {
      dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
      if (!dropdownMenu.contains(e.target) && !profile.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
      }
    });
  }

  // Lắng nghe sự kiện
  if (searchInput) searchInput.addEventListener('input', searchPosts);
  if (categorySelect) categorySelect.addEventListener('change', searchPosts);
  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Tự động cập nhật khi localStorage thay đổi
  window.addEventListener('storage', (event) => {
    if (event.key === 'articles') {
      articles = JSON.parse(event.newValue) || [];
      renderPosts();
    }
    if (event.key === 'categories') {
      categories = JSON.parse(event.newValue) || [];
      populateCategorySelect();
      renderPosts();
    }
  });

  // Tải lại dữ liệu khi trang được focus
  window.addEventListener('focus', () => {
    articles = JSON.parse(localStorage.getItem('articles')) || [];
    categories = JSON.parse(localStorage.getItem('categories')) || [];
    populateCategorySelect();
    renderPosts();
  });

  // Khởi tạo
  populateCategorySelect();
  renderPosts();
  setupProfileDropdown();
});