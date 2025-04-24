// Đảm nhận việc bật/tắt menu khi người dùng click vào biểu tượng hồ sơ.
let profile = document.getElementById("profile-icon");
profile.addEventListener("click", function () {
    let dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});