const navContainer = document.getElementById('nav-container');
const heroSection = document.querySelector('section:first-of-type');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Scroll effect
window.addEventListener('scroll', () => {
  const heroHeight = heroSection.offsetHeight;
  if (window.scrollY > heroHeight - 70) {
    navContainer.classList.add('scrolled');
  } else {
    navContainer.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Stop event from bubbling
  mobileMenu.classList.toggle('active');
  // Always keep the toggle button on top
  mobileToggle.style.zIndex = '999';
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
    mobileMenu.classList.remove('active');
  }
});

// Optional: Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const featuredProductsEl = document.querySelector('#featured-products .grid');
  if (!featuredProductsEl) {
    console.error("Featured products grid not found!");
    return;
  }

  (window.PRODUCTS || []).forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card p-4 flex flex-col';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-full h-auto rounded-lg">
      <h3 class="font-semibold mt-2 text-gray-900">${p.name}</h3>
      <p class="text-orange-500 font-bold mt-1">$${p.price}</p>
      <div class="mt-2 flex gap-2">
        <button class="btn-gradient flex-1" onclick="addToCartById('${p.id}')">Add to Cart</button>
        <button class="px-3 py-1 border rounded text-gray-700 hover:text-orange-500 view-btn" data-id="${p.id}">View</button>
      </div>
    `;
    featuredProductsEl.appendChild(card);
  });
});

/* Modal Popup */
const modal = document.getElementById('product-modal');
const modalContent = document.getElementById('product-modal-content');

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('view-btn')) {
    const pid = e.target.dataset.id;
    showProductModal(pid);
  }
  if(e.target.id==='product-modal') modal.classList.remove('active');
});

function showProductModal(pid) {
  const p = window.PRODUCTS.find(x=>x.id===pid);
  if(!p) return;
  modalContent.innerHTML = `
    <button class="absolute top-2 right-4 text-xl font-bold" onclick="modal.classList.remove('active')">&times;</button>
    <div class="md:flex gap-6">
      <img src="${p.image}" alt="${p.name}" class="w-full md:w-1/2 rounded-lg">
      <div class="flex-1">
        <h2 class="text-2xl font-bold mb-2">${p.name}</h2>
        <p class="text-orange-500 font-bold text-xl mb-2">$${p.price} <span class="line-through text-gray-400">$${p.oldPrice}</span></p>
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
        <button class="btn-gradient mt-4" onclick="addToCartById('${p.id}');modal.classList.remove('active')">Add to Cart</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

/* Flash Sale Timer */
function startFlashSale() {
  const endTime = new Date();
  endTime.setHours(endTime.getHours()+5); // 5 hour sale
  const hEl = document.getElementById('hours'), mEl=document.getElementById('minutes'), sEl=document.getElementById('seconds');
  setInterval(()=>{
    const now = new Date();
    let diff = Math.max(0, Math.floor((endTime-now)/1000));
    const h = Math.floor(diff/3600); diff%=3600;
    const m = Math.floor(diff/60); const s = diff%60;
    if(hEl) hEl.textContent=String(h).padStart(2,'0');
    if(mEl) mEl.textContent=String(m).padStart(2,'0');
    if(sEl) sEl.textContent=String(s).padStart(2,'0');
  },1000);
}

// Customer Reviews data
window.REVIEWS = [
  { 
    name: "Suraj Sharma", 
    img: "images/suraj.jpg", 
    rating: 5, 
    text: "Absolutely love these shoes! Super comfortable and stylish — perfect for daily wear." 
  },
  { 
    name: "Sumit Sharma", 
    img: "images/sumit.jpg", 
    rating: 4, 
    text: "High quality and fast delivery. The shoes fit perfectly and look amazing!" 
  },
  { 
    name: "Ashish Sharma", 
    img: "images/ashish.webp", 
    rating: 5, 
    text: "Trendy designs and very comfy. I get compliments every time I wear them!" 
  }
];

function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;
  container.innerHTML = "";

  window.REVIEWS.forEach(r => {
    const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
    const card = document.createElement('div');
    card.className = 'review-card p-6 flex flex-col items-center text-center transition-transform duration-300';
    card.innerHTML = `
      <div class="w-24 h-24 mb-4">
        <img src="${r.img}" alt="${r.name}" class="w-full h-full object-cover rounded-full border-2 border-orange-500 shadow-lg">
      </div>
      <h3 class="name text-orange-500 font-semibold mb-2">${r.name}</h3>
      <div class="rating text-yellow-400 mb-3 text-lg">${stars}</div>
      <p class="text-gray-100 opacity-90 leading-relaxed">${r.text}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderReviews);


// Call on page load
document.addEventListener('DOMContentLoaded', renderReviews);


// Call on page load
document.addEventListener('DOMContentLoaded', renderReviews);

