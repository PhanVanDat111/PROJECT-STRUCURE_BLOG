let products = JSON.parse(localStorage.getItem("products")) || [

];let categories = JSON.parse(localStorage.getItem("categories")) || [];


let selecteCategory = document.getElementById("productCategory");
document.addEventListener('DOMContentLoaded', function () {
  categories.forEach((category) => {
    // Create option elements for each category
    selecteCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
});

let currentPage = 1;
const itemsPerPage = 5;

// Hàm lưu dữ liệu vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Hàm hiển thị sản phẩm
function displayProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleProducts = products.slice(start, end);
  
  const tableBody = document.getElementById('post-table-body');
  tableBody.innerHTML = ''; // Xóa các dòng hiện tại
  
  
  visibleProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.image}" alt="Ảnh bài viết" class="post-img"></td>
      <td>${product.title}</td>
      <td>${categories.find(item => item.id === (product.category)).name}</td>
      <td>${product.content}</td>
      <td><span class="status ${product.status === 'Public' ? 'public' : 'private'}">${product.status}</span></td>
      <td><select class="status-select" onchange="changeStatus(${product.id}, this.value)">
        <option value="Public" ${product.status === 'Public' ? 'selected' : ''}>Public</option>
        <option value="Private" ${product.status === 'Private' ? 'selected' : ''}>Private</option>
      </select></td>
      <td>
        <button class="edit-btn" onclick="editProduct(${product.id})">Sửa</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Cập nhật phân trang
  updatePagination();
}

// Hàm thay đổi trạng thái sản phẩm
function changeStatus(productId, newStatus) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.status = newStatus;
    saveToLocalStorage();  // Lưu lại dữ liệu vào localStorage
    displayProducts(); // Hiển thị lại bảng
  }
}

// Hàm chỉnh sửa sản phẩm
function editProduct(productId) {
  alert('Chỉnh sửa sản phẩm với ID ' + productId);
}

// Hàm xóa sản phẩm
function deleteProduct(productId) {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    saveToLocalStorage();  // Lưu lại dữ liệu vào localStorage
    displayProducts(); // Hiển thị lại bảng
  }
}

// Hàm thay đổi trang
function changePage(direction) {
  if (direction === 'prev' && currentPage > 1) {
    currentPage--;
  } else if (direction === 'next' && currentPage * itemsPerPage < products.length) {
    currentPage++;
  }
  displayProducts();
}

// Hàm đi tới trang cụ thể
function goToPage(page) {
  currentPage = page;
  displayProducts();
}

// Hàm cập nhật phân trang
function updatePagination() {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageNumbersContainer = document.getElementById('page-numbers');
  pageNumbersContainer.innerHTML = ''; // Xóa các số trang hiện tại
  
  for (let i = 1; i <= totalPages; i++) {
    const pageElement = document.createElement('span');
    pageElement.classList.add('page-number');
    pageElement.textContent = i;
    pageElement.onclick = () => goToPage(i);
    
    if (i === currentPage) {
      pageElement.style.fontWeight = 'bold';
    }
    
    pageNumbersContainer.appendChild(pageElement);
  }
}

// Hàm hiển thị form thêm sản phẩm
function showAddProductForm() {
  document.getElementById('addProductForm').style.display = 'block';
}

// Hàm đóng form thêm sản phẩm
function closeAddProductForm() {
  document.getElementById('addProductForm').style.display = 'none';
}

// Hàm lưu sản phẩm mới
function saveNewProduct() {
  const title = document.getElementById('productTitle').value;
  const category = document.getElementById('productCategory').value;
  const content = document.getElementById('productContent').value;
  const status = document.getElementById('productStatus').value;
  const image = document.getElementById('productImage').value;

  const newProduct = {
    id: products.length + 1,
    image: image,
    title: title,
    category: parseInt(category),
    content: content,
    status: status
  };

  products.push(newProduct);
  saveToLocalStorage();  // Lưu lại dữ liệu vào localStorage
  displayProducts(); // Hiển thị lại bảng và phân trang
  closeAddProductForm(); // Đóng form sau khi lưu sản phẩm
}

displayProducts(); // Hiển thị dữ liệu khi tải trang
