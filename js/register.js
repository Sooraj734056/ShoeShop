document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const registerMsg = document.getElementById("register-msg");
  const btnLogout = document.getElementById("btn-logout");
  const btnLogin = document.getElementById("btn-open-login");
  const cartLink = document.getElementById("cart-link");

  // Check if user logged in
  if (localStorage.getItem("userLoggedIn") === "true") {
    btnLogout.classList.remove("hidden");
    btnLogin.classList.add("hidden");
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const password2 = document.getElementById("register-password2").value.trim();

    if (password !== password2) {
      registerMsg.textContent = "Passwords do not match!";
      registerMsg.classList.add("text-red-600");
      return;
    }

    // Demo registration success
    registerMsg.textContent = "Registration successful!";
    registerMsg.classList.remove("text-red-600");
    registerMsg.classList.add("text-green-600");

    // Set as logged in
    localStorage.setItem("userLoggedIn", "true");
    btnLogout.classList.remove("hidden");
    btnLogin.classList.add("hidden");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });

  // Logout
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userLoggedIn");
    btnLogout.classList.add("hidden");
    btnLogin.classList.remove("hidden");
    alert("Logged out successfully!");
  });

  // Cart check login
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
