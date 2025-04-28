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
    blogGrid.innerHTML += `
      <div class="blog-card">
        <img src="${post.image}" alt="">
        <div class="card-content">
          <span class="date">Date: ${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <span class="tag ${post.tagClass}">${post.tag}</span>
        </div>
      </div>
    `;
  });
}

function searchPosts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
  );
  renderPosts(filtered);
}

// Load all posts on start
renderPosts();

let bloggrird = document.getElementById("blogGrid");
let postContainer = document.getElementById("post-container");
bloggrird.addEventListener("click", function (event) {
postContainer.style.display = "block";});