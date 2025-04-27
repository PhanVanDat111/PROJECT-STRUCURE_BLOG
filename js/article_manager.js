function openForm() {
    document.getElementById('formOverlay').classList.remove('hidden');
  }
  
  function closeForm() {
    document.getElementById('formOverlay').classList.add('hidden');
  }
  
  function addPost() {
    const imageUrl = document.getElementById('imageUrl').value;
    const title = document.getElementById('title').value;
    const topic = document.getElementById('topic').value;
    const content = document.getElementById('content').value;
    const status = document.getElementById('status').value;
  
    if (!imageUrl || !title || !topic || !content) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
  
    const tableBody = document.getElementById('postTableBody');
    const newRow = document.createElement('tr');
  
    newRow.innerHTML = `
      <td><img src="${imageUrl}" alt="Ảnh bài viết"></td>
      <td>${title}</td>
      <td>${topic}</td>
      <td>${content}</td>
      <td><span class="badge ${status === 'Public' ? 'badge-public' : 'badge-private'}">${status}</span></td>
      <td>
        <select>
          <option ${status === 'Public' ? 'selected' : ''}>Public</option>
          <option ${status === 'Private' ? 'selected' : ''}>Private</option>
        </select>
      </td>
      <td>
        <button class="btn-edit">Sửa</button>
        <button class="btn-delete" onclick="deleteRow(this)">Xóa</button>
      </td>
    `;
  
    tableBody.appendChild(newRow);
  
    closeForm();
    document.getElementById('imageUrl').value = '';
    document.getElementById('title').value = '';
    document.getElementById('topic').value = '';
    document.getElementById('content').value = '';
    document.getElementById('status').value = 'Public';
  }
  
  function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
  }
  