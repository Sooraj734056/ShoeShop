/* SHOP.JS */
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




/* Products by Category */
const PRODUCTS_BY_CATEGORY = {
  Men: [
    { id:'m1', name:'Nike Air Zoom Pegasus', price:120, oldPrice:150, image:'images/products/2.jpg', alt:'Nike Air Zoom Pegasus' },
    { id:'m2', name:'Adidas Ultraboost 22', price:180, oldPrice:210, image:'images/products/3.jpg', alt:'Adidas Ultraboost 22' },
    { id:'m3', name:'Puma Future Rider', price:90, oldPrice:110, image:'images/products/4.jpg', alt:'Puma Future Rider' },
    { id:'m4', name:'Reebok Nano X2', price:130, oldPrice:150, image:'images/products/5.jpg', alt:'Reebok Nano X2' }
  ],
  Women: [
    { id:'w1', name:'Puma Cali Star', price:110, oldPrice:130, image:'images/products/women1.jpg', alt:'Puma Cali Star' },
    { id:'w2', name:'Nike Air Max 90', price:140, oldPrice:160, image:'images/products/women2.jpg', alt:'Nike Air Max 90' },
    { id:'w3', name:'Adidas Superstar', price:130, oldPrice:150, image:'images/products/women3.jpg', alt:'Adidas Superstar' },
    { id:'w4', name:'New Balance 574', price:120, oldPrice:140, image:'images/products/women4.jpg', alt:'New Balance 574' }
  ],
  Kids: [
    { id:'k1', name:'Nike Kids Revolution', price:80, oldPrice:100, image:'images/products/kid1.jpg', alt:'Nike Kids Revolution' },
    { id:'k2', name:'Adidas Kids Runfalcon', price:70, oldPrice:90, image:'images/products/kid2.jpg', alt:'Adidas Kids Runfalcon' },
    { id:'k3', name:'Puma Kids Flyer', price:75, oldPrice:95, image:'images/products/kid3.jpg', alt:'Puma Kids Flyer' },
    { id:'k4', name:'Reebok Kids Zig', price:85, oldPrice:105, image:'images/products/kid4.jpg', alt:'Reebok Kids Zig' }
  ],
  Sports: [
    { id:'s1', name:'Reebok Nano X2', price:130, oldPrice:150, image:'images/products/5.jpg', alt:'Reebok Nano X2' },
    { id:'s2', name:'Under Armour Charged Rogue', price:110, oldPrice:130, image:'images/products/sports2.jpg', alt:'UA Charged Rogue' },
    { id:'s3', name:'Nike ZoomX', price:150, oldPrice:180, image:'images/products/sports3.jpg', alt:'Nike ZoomX' },
    { id:'s4', name:'Adidas Adizero', price:140, oldPrice:165, image:'images/products/sports4.jpg', alt:'Adidas Adizero' }
  ],
  Casual: [
    { id:'c1', name:'New Balance 990v5', price:175, oldPrice:200, image:'images/products/casual1.jpg', alt:'New Balance 990v5' },
    { id:'c2', name:'ASICS Gel-Kayano 28', price:160, oldPrice:185, image:'images/products/casual2.jpg', alt:'ASICS Gel-Kayano 28' },
    { id:'c3', name:'Puma RS-X', price:140, oldPrice:160, image:'images/products/casual3.jpg', alt:'Puma RS-X' },
    { id:'c4', name:'Nike Blazer Mid', price:150, oldPrice:175, image:'images/products/casual4.jpg', alt:'Nike Blazer Mid' }
  ]
};

/* Global cart helper */
function readCart() {
  try { return JSON.parse(localStorage.getItem('demo_shoeshop_cart')||"[]"); }
  catch { return []; }
}
function writeCart(cart) { localStorage.setItem('demo_shoeshop_cart', JSON.stringify(cart||[])); updateCartCount(); }
function addToCartById(pid) {
  const cart = readCart();
  const found = Object.values(PRODUCTS_BY_CATEGORY).flat().find(p=>p.id===pid);
  if(!found) return;
  const idx = cart.findIndex(it=>it.product.id===pid);
  if(idx>=0) cart[idx].quantity +=1;
  else cart.push({ product: found, quantity: 1 });
  writeCart(cart);
  alert('Added to cart!');
}
function updateCartCount() {
  const el = document.getElementById('cart-count');
  if(!el) return;
  const count = readCart().reduce((sum,it)=>sum+(it.quantity||0),0);
  el.textContent = String(count);
}

/* Render products by category */
function renderProductsByCategory() {
  const main = document.querySelector('main');
  Object.keys(PRODUCTS_BY_CATEGORY).forEach(cat => {
    const section = document.createElement('section');
    section.className = 'product-section mb-12';
    section.innerHTML = `
      <h2 class="text-2xl font-bold text-orange-600 mb-4">${cat}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" id="grid-${cat}"></div>
    `;
    main.appendChild(section);

    const grid = section.querySelector('.grid');
    PRODUCTS_BY_CATEGORY[cat].forEach(p=>{
      const card = document.createElement('div');
      card.className = 'product-card bg-white rounded-lg shadow p-4 flex flex-col';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.alt}" class="w-full h-48 object-cover rounded">
        <h3 class="mt-2 font-semibold">${p.name}</h3>
        <p class="text-orange-500 font-bold mt-1">$${p.price} <span class="line-through text-gray-400 text-sm">$${p.oldPrice}</span></p>
        <div class="mt-2 flex gap-2">
          <button class="btn-add flex-1" onclick="addToCartById('${p.id}')">Add to Cart</button>
          <button class="btn-view flex-1" data-id="${p.id}">View</button>
        </div>
      `;
      grid.appendChild(card);
    });
  });
}

/* Modal */
const modal = document.createElement('div');
modal.id = 'product-modal';
modal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50';
modal.innerHTML = `<div id="product-modal-content" class="bg-white rounded-lg p-6 max-w-3xl w-full relative"></div>`;
document.body.appendChild(modal);
const modalContent = document.getElementById('product-modal-content');

document.addEventListener('click', e=>{
  if(e.target.classList.contains('btn-view')){
    const pid = e.target.dataset.id;
    showProductModal(pid);
  }
  if(e.target.id==='product-modal') modal.classList.remove('flex'), modal.classList.add('hidden');
});

function showProductModal(pid){
  const found = Object.values(PRODUCTS_BY_CATEGORY).flat().find(p=>p.id===pid);
  if(!found) return;
  modalContent.innerHTML = `
    <button class="absolute top-2 right-4 text-xl font-bold" onclick="modal.classList.remove('flex'); modal.classList.add('hidden');">&times;</button>
    <div class="md:flex gap-6">
      <img src="${found.image}" alt="${found.alt}" class="w-full md:w-1/2 rounded-lg object-cover">
      <div class="flex-1">
        <h2 class="text-2xl font-bold mb-2">${found.name}</h2>
        <p class="text-orange-500 font-bold text-xl mb-2">$${found.price} <span class="line-through text-gray-400">$${found.oldPrice}</span></p>
        <p class="mb-2">Select Size: 
          <select class="border rounded px-2 py-1">
            <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>
          </select>
        </p>
        <p class="mb-2">Color:
          <select class="border rounded px-2 py-1">
            <option>Black</option><option>White</option><option>Red</option><option>Blue</option>
          </select>
        </p>
        <p class="mb-2">Rating: ⭐⭐⭐⭐☆</p>
        <p class="mb-2">High-quality shoe with comfort and style. Perfect for sports and casual wear.</p>
        <button class="btn-add mt-4" onclick="addToCartById('${found.id}'); modal.classList.remove('flex'); modal.classList.add('hidden');">Add to Cart</button>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

/* Initialize */
document.addEventListener('DOMContentLoaded', () => {
  renderProductsByCategory();
  updateCartCount();
}); 