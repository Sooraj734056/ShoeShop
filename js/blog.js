
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
});


  // Optional: close menu when a link is clicked
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });