document.querySelector('.article-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const categories = document.getElementById('categories').value;
    const mood = document.getElementById('mood').value;
    const content = document.getElementById('content').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const file = document.getElementById('file-upload').files[0];
  
    console.log({
      title,
      categories,
      mood,
      content,
      status,
      file
    });
  
    alert('Article added successfully!');
    // Here, you can save the data or send it to a server
  });
  