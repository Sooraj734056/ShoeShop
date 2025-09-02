// Retrieve cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("demo_shoeshop_cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("demo_shoeshop_cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems(); // re-render after saving
}

// Update cart count in navbar
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    countEl.textContent = totalQty;
  }
}

// Remove an item from the cart
function removeFromCart(id) {
  cart = cart.filter(item => item.product.id !== id);
  saveCart();
}

// Change quantity of a cart item
function changeQty(id, delta) {
  const item = cart.find(i => i.product.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) item.quantity = 1;
  saveCart();
}

// Render cart items in cart page or dropdown
function renderCartItems() {
  const container = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500 mt-4">Your cart is empty.</p>`;
    if(subtotalEl) subtotalEl.textContent = "$0.00";
    if(taxEl) taxEl.textContent = "$0.00";
    if(totalEl) totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.product.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item flex items-center justify-between border-b py-3";
    div.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.alt}" class="w-16 h-16 object-cover rounded">
      <div class="cart-details flex-1 ml-3">
        <h3 class="cart-title font-semibold">${item.product.name}</h3>
        <p class="cart-price text-gray-700">$${item.product.price.toFixed(2)}</p>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="changeQty('${item.product.id}', -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${item.product.id}', 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
      </div>
      <button class="remove-btn text-red-500 hover:text-red-700 ml-2" onclick="removeFromCart('${item.product.id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    container.appendChild(div);
  });

  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  if(subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
  if(taxEl) taxEl.textContent = "$" + tax.toFixed(2);
  if(totalEl) totalEl.textContent = "$" + total.toFixed(2);
}

// Initialize cart on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  updateCartCount();
});
