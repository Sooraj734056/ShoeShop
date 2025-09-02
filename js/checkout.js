document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const nextBtns = document.querySelectorAll(".btn-next");
  const prevBtns = document.querySelectorAll(".btn-prev");
  const formSteps = document.querySelectorAll(".form-step");
  const stepperItems = document.querySelectorAll(".stepper-item");
  const paymentSelect = document.getElementById("payment-method");

  const modal = document.getElementById("invoice-modal");
  const modalClose = document.getElementById("modal-close");
  const invoiceDetails = document.getElementById("invoice-details");

  let currentStep = 0;

  // -------- STEP VALIDATION --------
  const validateStep = () => {
    let valid = true;
    const inputs = formSteps[currentStep].querySelectorAll("[required]");
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = "#f87171";
        valid = false;
      } else {
        input.style.borderColor = "#ccc";
      }
    });
    return valid;
  };

  // -------- UPDATE STEPPER --------
  const updateStepper = () => {
    formSteps.forEach((step, idx) => step.classList.toggle("active-step", idx === currentStep));
    stepperItems.forEach((item, idx) => item.classList.toggle("active", idx <= currentStep));
  };

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!validateStep()) return;
      if (currentStep < formSteps.length - 1) currentStep++;
      updateStepper();
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) currentStep--;
      updateStepper();
    });
  });

  // -------- PAYMENT TOGGLE --------
  paymentSelect.addEventListener("change", () => {
    document.getElementById("card-details").style.display = paymentSelect.value === "Card" ? "block" : "none";
    document.getElementById("upi-details").style.display = paymentSelect.value === "UPI" ? "block" : "none";
  });

  // -------- ORDER SUMMARY --------
  const loadSummary = () => {
    const list = document.getElementById("order-summary-list");
    const subtotalEl = document.getElementById("subtotal-price");
    const totalEl = document.getElementById("total-price");

    list.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("demo_shoeshop_cart")) || [];

    if (cart.length === 0) {
      list.innerHTML = "<li>Your cart is empty</li>";
      subtotalEl.textContent = "₹0";
      totalEl.textContent = "₹0";
      return;
    }

    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.product.price * item.quantity;
      list.innerHTML += `<li><span>${item.quantity} x ${item.product.name}</span><span>₹${item.product.price * item.quantity}</span></li>`;
    });

    const delivery = 50;
    subtotalEl.textContent = `₹${subtotal}`;
    totalEl.textContent = `₹${subtotal + delivery}`;
  };

  // -------- PLACE ORDER --------
  form.addEventListener("submit", e => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("demo_shoeshop_cart")) || [];
    if(cart.length === 0){
      alert("Cart is empty!");
      return;
    }

    invoiceDetails.innerHTML = `<p><strong>Order ID:</strong> PX${Math.floor(Math.random()*100000)}</p>
      <p><strong>Name:</strong> ${document.getElementById("full-name").value}</p>
      <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
      <p><strong>Address:</strong> ${document.getElementById("address").value}</p>
      <p><strong>Total:</strong> ${document.getElementById("total-price").textContent}</p>`;

    modal.style.display = "flex";
    localStorage.removeItem("demo_shoeshop_cart");
    loadSummary();
  });

  // -------- MODAL CLOSE --------
  modalClose.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => { if(e.target===modal) modal.style.display="none"; });

  // -------- INIT --------
  updateStepper();
  loadSummary();
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-toggle") || document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu") || document.querySelector(".side-menu");
  const closeBtn = mobileMenu.querySelector(".close-btn");

  // TOGGLE MENU ON HAMBURGER CLICK
  menuToggle.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      mobileMenu.style.transform = "translateX(100%)";
    } else {
      mobileMenu.classList.add("active");
      mobileMenu.style.transform = "translateX(0)";
    }
  });

  // CLOSE MENU ON CLOSE BUTTON CLICK
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    mobileMenu.style.transform = "translateX(100%)";
  });

  // CLOSE MENU ON CLICK OUTSIDE
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        e.target !== menuToggle) {
      mobileMenu.classList.remove("active");
      mobileMenu.style.transform = "translateX(100%)";
    }
  });
});

