// Simple animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeInUp");
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => {
    el.classList.add("opacity-0", "transition-all", "duration-700");
    observer.observe(el);
  });
});

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