document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginMsg = document.getElementById("login-msg");
  const btnLogout = document.getElementById("btn-logout");
  const btnLogin = document.getElementById("btn-open-login");
  const cartLink = document.getElementById("cart-link");

  // Demo credentials
  const demoUser = {
    email: "demo@shoeshop.com",
    password: "demo123"
  };

  // Check if user already logged in
  if (localStorage.getItem("userLoggedIn") === "true") {
    btnLogout.classList.remove("hidden");
    btnLogin.classList.add("hidden");
  }

  // Login form
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email === demoUser.email && password === demoUser.password) {
      loginMsg.textContent = "Login successful!";
      loginMsg.classList.remove("text-red-600");
      loginMsg.classList.add("text-green-600");
      localStorage.setItem("userLoggedIn", "true");
      btnLogout.classList.remove("hidden");
      btnLogin.classList.add("hidden");
      setTimeout(() => { window.location.href = "index.html"; }, 1000);
    } else {
      loginMsg.textContent = "Invalid demo credentials!";
      loginMsg.classList.add("text-red-600");
    }
  });

  // Logout button
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userLoggedIn");
    btnLogout.classList.add("hidden");
    btnLogin.classList.remove("hidden");
    alert("Logged out successfully!");
  });

  // Cart click check login
  cartLink.addEventListener("click", (e) => {
    if (localStorage.getItem("userLoggedIn") !== "true") {
      e.preventDefault();
      alert("Please login first to access your cart!");
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sideMenu = document.getElementById("side-menu");
  const sideMenuClose = document.getElementById("side-menu-close");
  const overlay = document.getElementById("overlay");

  const openMenu = () => {
    sideMenu.classList.add("open");
    overlay.classList.add("show");
  };

  const closeMenu = () => {
    sideMenu.classList.remove("open");
    overlay.classList.remove("show");
  };

  menuToggle.addEventListener("click", openMenu);
  sideMenuClose.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});

