/* Global State via localStorage */
const CART_KEY = 'demo_shoeshop_cart';
const USER_KEY = 'demo_shoeshop_user';
const USERS_DB_KEY = 'demo_shoeshop_users';

/* Demo product list (shared) — can be split later */
window.PRODUCTS = [
  { id:'p1', name:'Nike Air Zoom Pegasus', price:120, oldPrice:150, image:'images/products/2.jpg', alt:'Nike Air Zoom Pegasus' },
  { id:'p2', name:'Adidas Ultraboost 22', price:180, oldPrice:210, image:'images/products/3.jpg', alt:'Adidas Ultraboost 22' },
  { id:'p3', name:'Puma Future Rider', price:90, oldPrice:110, image:'images/products/4.jpg', alt:'Puma Future Rider' },
  { id:'p4', name:'Reebok Nano X2', price:130, oldPrice:150, image:'images/products/5.jpg', alt:'Reebok Nano X2' },
  { id:'p5', name:'New Balance 990v5', price:175, oldPrice:200, image:'images/products/casual1.jpg', alt:'New Balance 990v5' },
  { id:'p6', name:'Nike Air Max 270', price:150, oldPrice:180, image:'images/products/kid1.jpg', alt:'Nike Air Max 270' },
  { id:'p7', name:'ASICS Gel-Kayano 28', price:160, oldPrice:185, image:'images/products/casual2.jpg', alt:'ASICS Gel-Kayano 28' },
  { id:'p8', name:'UA Charged Rogue', price:110, oldPrice:130, image:'images/products/sports2.jpg', alt:'Under Armour Charged Rogue' }
];

/* Helpers */
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart||[]));
  updateCartCount();
}
function addToCartById(pid) {
  const cart = readCart();
  const idx = cart.findIndex(it => it.product && it.product.id === pid);
  if (idx >= 0) cart[idx].quantity += 1;
  else {
    const p = (window.PRODUCTS||[]).find(x => x.id===pid);
    if (!p) return;
    cart.push({ product: p, quantity: 1 });
  }
  writeCart(cart);
  alert('Added to cart!');
}
function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const count = readCart().reduce((sum, it) => sum + (it.quantity||0), 0);
  el.textContent = String(count);
}
function currentUserEmail() {
  return localStorage.getItem(USER_KEY);
}
function setCurrentUser(email) {
  if (email) localStorage.setItem(USER_KEY, email); else localStorage.removeItem(USER_KEY);
  applyLoginState();
}
function applyLoginState() {
  const email = currentUserEmail();
  const loginBtn = document.getElementById('btn-open-login');
  const logoutBtn = document.getElementById('btn-logout');
  if (email) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
  } else {
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
  }
}
function logout() {
  setCurrentUser(null);
  alert('Logged out!');
  window.location.href = 'index.html';
}

/* Run on every page */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  applyLoginState();
});
