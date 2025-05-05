// Dữ liệu sản phẩm mẫu
const products = [
  { id: 1, image: 'image1.jpg', title: 'Học nấu cá sấu cà chua', category: 'Nấu ăn', content: 'Tôi đã học được cách nấu cá sấu...', status: 'Public' },
  { id: 2, image: 'image2.jpg', title: 'Bi kip viết CV ngành IT', category: 'IT', content: 'Chia sẻ cách viết CV ấn tượng...', status: 'Private' },
  { id: 3, image: 'image3.jpg', title: 'Học Python cho người mới bắt đầu', category: 'IT', content: 'Bài học Python cơ bản...', status: 'Public' },
  { id: 4, image: 'image4.jpg', title: 'Cách làm món ăn vặt', category: 'Nấu ăn', content: 'Cách làm các món ăn vặt nhanh...', status: 'Private' },
  { id: 5, image: 'image5.jpg', title: 'Quản lý thời gian hiệu quả', category: 'IT', content: 'Hướng dẫn cách quản lý thời gian...', status: 'Public' },
  // Thêm sản phẩm tại đây...
];

let currentPage = 1;
const itemsPerPage = 5;

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
      <td>${product.category}</td>
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

// Hàm thêm sản phẩm mới
function addNewProduct() {
  const newProduct = {
    id: products.length + 1,
    image: 'image6.jpg',
    title: 'Sản phẩm mới',
    category: 'Nấu ăn',
    content: 'Đây là sản phẩm mới.',
    status: 'Public'
  };
  
  products.push(newProduct);
  displayProducts(); // Hiển thị lại bảng và phân trang
}

displayProducts();
