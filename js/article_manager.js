// --- 1. Khởi tạo danh mục ---
let categories = JSON.parse(localStorage.getItem('categories')) || [];

// --- 2. Mẫu bài viết ban đầu ---
const sampleArticles = [];
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

// --- 3. State chung ---
const postsPerPage = 5;
let articles = JSON.parse(localStorage.getItem('articles')) || sampleArticles;
let currentPage = 1;
let editingId = null;

// --- 4. Khởi chạy khi DOM sẵn sàng ---
document.addEventListener('DOMContentLoaded', () => {
    populateCategoryOptions();
    renderPosts();
    renderPagination();
});

// --- 5. Show / Hide form ---
function showAddProductForm(isEdit = false) {
    const form = document.getElementById('addProductForm');
    if (!form) return;
    form.style.display = 'block';
    form.querySelector('h2').textContent = isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới';
    form.querySelector('.save-btn').textContent = isEdit ? 'Cập nhật' : 'Lưu';
}

function closeAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (!form) return;
    form.style.display = 'none';
    clearForm();
    editingId = null;
}

function clearForm() {
    ['productTitle', 'productCategory', 'productContent', 'productStatus']
        .forEach(id => {
            const elem = document.getElementById(id);
            if (elem) elem.value = '';
        });
    const fileInput = document.getElementById('productImage');
    if (fileInput) fileInput.value = '';
}

// --- 6. Lưu bài (thêm mới hoặc cập nhật) ---
function saveNewProduct() {
    const titleElem = document.getElementById('productTitle');
    const selectElem = document.getElementById('productCategory');
    const contentElem = document.getElementById('productContent');
    const statusElem = document.getElementById('productStatus');
    const fileIn = document.getElementById('productImage');

    if (!titleElem || !selectElem || !contentElem || !statusElem) {
        showMessage('Có lỗi xảy ra khi lấy thông tin từ form.', 'error');
        return;
    }

    const title = titleElem.value.trim();
    const catId = parseInt(selectElem.value, 10);
    const content = contentElem.value.trim();
    const status = statusElem.value;

    if (!title || !catId || !content || !status) {
        showMessage('Vui lòng điền đầy đủ các trường bắt buộc: tiêu đề, danh mục, nội dung, trạng thái.', 'error');
        return;
    }

    function proceedSave(imageData) {
        if (editingId === null) {
            const nextId = articles.length
                ? Math.max(...articles.map(a => a.id)) + 1
                : 1;
            const date = new Date().toISOString().split('T')[0];
            articles.push({
                id: nextId,
                title,
                categoryId: catId,
                content,
                status,
                image: imageData,
                date
            });
        } else {
            const a = articles.find(x => x.id === editingId);
            a.title = title;
            a.categoryId = catId;
            a.content = content;
            a.status = status;
            if (imageData !== null) a.image = imageData;
        }

        localStorage.setItem('articles', JSON.stringify(articles));
        closeAddProductForm();
        renderPosts();
        renderPagination();
    }

    // Xử lý tệp hình ảnh nếu có
    if (fileIn?.files && fileIn.files[0]) {
        const file = fileIn.files[0];
        if (!file.type.startsWith('image/')) {
            showMessage('Vui lòng tải lên một tệp hình ảnh hợp lệ.', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showMessage('Tệp hình ảnh quá lớn. Vui lòng chọn tệp dưới 5MB.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = e => proceedSave(e.target.result);
        reader.onerror = () => showMessage('Lỗi khi đọc tệp hình ảnh.', 'error');
        reader.readAsDataURL(file);
    } else {
        proceedSave(editingId === null ? '' : null);
    }
}

// --- 7. Đổ options cho <select> category ---
function populateCategoryOptions() {
    const sel = document.getElementById('productCategory');
    if (!sel) return;
    sel.innerHTML = categories.length
        ? categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
        : '<option value="">Không có danh mục nào</option>';
}

// --- 8. Render bảng bài viết ---
function renderPosts() {
    const tbody = document.getElementById('post-table-body');
    if (!tbody) return;
    const start = (currentPage - 1) * postsPerPage;
    const slice = articles.slice(start, start + postsPerPage);

    tbody.innerHTML = slice.map(a => {
        const cat = categories.find(c => c.id === a.categoryId)?.name || 'Không có danh mục';
        const imgHtml = a.image
            ? `<img src="${a.image}" class="post-img">`
            : `<div class="placeholder">Không có hình ảnh</div>`;
        return `
            <tr>
                <td>${imgHtml}</td>
                <td>${a.title}</td>
                <td>${cat}</td>
                <td class="ellipsis">${a.content}</td>
                <td>${a.status}</td>
                <td>
                    <button class="toggle-btn" onclick="toggleStatus(${a.id})">Chuyển trạng thái</button>
                    <button class="edit-btn" onclick="startEdit(${a.id})">Sửa</button>
                    <button class="delete-btn" onclick="deletePost(${a.id})">Xóa</button>
                </td>
            </tr>`;
    }).join('');
}

// --- 9. Phân trang ---
function renderPagination() {
    const total = Math.ceil(articles.length / postsPerPage);
    const cont = document.getElementById('page-numbers');
    if (!cont) return;
    cont.innerHTML = '';
    for (let i = 1; i <= total; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active-page');
        btn.onclick = () => {
            currentPage = i;
            renderPosts();
            renderPagination();
        };
        cont.appendChild(btn);
    }
}

// --- 10. Chuyển trạng thái ---
function toggleStatus(id) {
    const a = articles.find(x => x.id === id);
    a.status = a.status === 'public' ? 'private' : 'public';
    localStorage.setItem('articles', JSON.stringify(articles));
    renderPosts();
}

// --- 11. Bắt đầu sửa ---
function startEdit(id) {
    const a = articles.find(x => x.id === id);
    editingId = id;
    const titleElem = document.getElementById('productTitle');
    const catElem = document.getElementById('productCategory');
    const contentElem = document.getElementById('productContent');
    const statusElem = document.getElementById('productStatus');
    if (titleElem && catElem && contentElem && statusElem) {
        titleElem.value = a.title;
        catElem.value = a.categoryId;
        contentElem.value = a.content;
        statusElem.value = a.status;
        showAddProductForm(true);
    }
}

// --- 12. Xóa bài ---
function deletePost(id) {
    if (!confirm('Xác nhận xóa bài viết?')) return;
    articles = articles.filter(x => x.id !== id);
    localStorage.setItem('articles', JSON.stringify(articles));
    const maxP = Math.max(1, Math.ceil(articles.length / postsPerPage));
    if (currentPage > maxP) currentPage = maxP;
    renderPosts();
    renderPagination();
}