const logoutBtn = document.getElementById('logoutbtn');

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.href = '/index.html';
});
