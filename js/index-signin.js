const posts = [
    {
      title: "A Productive Day at Work",
      date: "2025-02-25",
      content:
        "Today was a really productive day at work. I managed to finish a report ahead of schedule and received positive feedback from my manager.",
      tag: "Daily Journal",
      tagClass: "purple",
      image: "../assets/images/hinhminhhoa.png",
    },
    {
      title: "My First Job Interview Experience",
      date: "2025-02-24",
      content:
        "I had my first job interview today! I was nervous at first, but as the conversation went on, I felt more confident.",
      tag: "Work & Career",
      tagClass: "blue",
      image: "../assets/images/z6537933270819_73ac350a2365c2dc7fb2f8c50b7713f6.jpg",
    },
    {
      title: "Overthinking Everything",
      date: "2025-02-23",
      content:
        "Lately, I have been overthinking everything, from small decisions to bigger life choices. I know I should trust myself.",
      tag: "Personal Thoughts",
      tagClass: "green",
      image: "../assets/images/angsetup2.jpg",
    },
  ];
  
  function renderPosts(filteredPosts = posts) {
    const blogGrid = document.getElementById("blogGrid");
    blogGrid.innerHTML = "";
  
    filteredPosts.forEach((post) => {
      const card = document.createElement('div');
      card.classList.add('blog-card');
  
      card.innerHTML = `
        <img src="${post.image}" alt="">
        <div class="card-content">
          <span class="date">Date: ${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.content.slice(0, 100)}...</p>
          <span class="tag ${post.tagClass}">${post.tag}</span>
        </div>
      `;
  
      card.addEventListener('click', () => {
        openModal(post);
      });
  
      blogGrid.appendChild(card);
    });
  }
  
  function openModal(post) {
    document.getElementById('modalPostTitle').textContent = post.title;
    document.getElementById('modalPostContent').textContent = post.content;
  
    document.getElementById('postModal').style.display = 'flex';
  
    document.querySelector('.container').classList.add('blur');
    document.querySelector('header').classList.add('blur');
    document.querySelector('footer').classList.add('blur');
  }
  
  function closeModal() {
    document.getElementById('postModal').style.display = 'none';
  
    document.querySelector('.container').classList.remove('blur');
    document.querySelector('header').classList.remove('blur');
    document.querySelector('footer').classList.remove('blur');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
  
    document.getElementById('closeModal').addEventListener('click', closeModal);
  });
  
  function searchPosts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
    );
    renderPosts(filtered);
  }
  
  // tính năng bấm vào iconicon
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

function logout() {
  // Xoá token khỏi localStorage (nếu có)
  localStorage.setItem('accessToken', token);

  // Chuyển hướng về trang đăng nhập
  window.location.href = '/login.html';
}
