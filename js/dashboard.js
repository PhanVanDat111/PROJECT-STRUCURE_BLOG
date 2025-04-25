let profile = document.getElementById("profile-icon");
let dropdownMenu = document.getElementById("dropdown-menu");

// Toggle dropdown khi click avatar
profile.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

// Ẩn dropdown nếu click ra ngoài
document.addEventListener("click", function (e) {
  if (!dropdownMenu.contains(e.target) && !profile.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});


