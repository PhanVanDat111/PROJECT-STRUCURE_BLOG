let categories = JSON.parse(localStorage.getItem("categories")) || [];

const itemsPerPage = 5;
let currentPage = 1;


// Save categories to localStorage
function saveToLocalStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Display categories in the table
function displayCategories() {
  const categoryTableBody = document.getElementById('category-table-body');
  categoryTableBody.innerHTML = '';  // Clear current rows
  
  categories.forEach((category, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${category.name}</td>
      <td>
        <button onclick="editCategory(${index})">🛠 </button>
        <button onclick="deleteCategory(${index})">🗑 </button>
      </td>
    `;
    categoryTableBody.appendChild(row);
  });
}

// Add new category
function addCategory() {
  const categoryName = document.getElementById('categoryName').value;
  if (categoryName && !categories.includes(categoryName)) {
    categories.push({id: categories.length+1, name: categoryName});
    saveToLocalStorage();
    displayCategories();
  } else {
    alert("Category already exists or is invalid.");
  }
}

// Edit category
function editCategory(index) {
  const newCategoryName = prompt("Enter new category name", categories[index]);
  if (newCategoryName && !categories.includes(newCategoryName)) {
    categories[index] = newCategoryName;
    saveToLocalStorage();
    displayCategories();
  } else {
    alert("Category already exists or is invalid.");
  }
}

// Delete category
function deleteCategory(index) {
  if (confirm("Are you sure you want to delete this category?")) {
    categories.splice(index, 1);
    saveToLocalStorage();
    displayCategories();
  }
}

// Search functionality
function searchData() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const filteredCategories = categories.filter(category => category.toLowerCase().includes(searchValue));
  displayFilteredCategories(filteredCategories);
}

function displayFilteredCategories(filteredCategories) {
  const categoryTableBody = document.getElementById('category-table-body');
  categoryTableBody.innerHTML = '';  // Clear current rows

  filteredCategories.forEach((category, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${category}</td>
      <td>
        <button onclick="editCategory(${index})">Edit</button>
        <button onclick="deleteCategory(${index})">Delete</button>
      </td>
    `;
    categoryTableBody.appendChild(row);
  });
}

// Load categories and display them
displayCategories();
