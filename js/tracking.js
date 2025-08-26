// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('translate-x-full');
  mobileMenu.classList.toggle('translate-x-0');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
  });
});

const form = document.getElementById('track-form');
const resultBox = document.getElementById('tracking-result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const orderId = document.getElementById('tracking-id').value.trim();
  if (!orderId) return;

  resultBox.innerHTML = '';
  resultBox.classList.remove('hidden');

  const steps = [
    { icon: 'fas fa-receipt', title: 'Order Placed', desc: 'Your order has been received.' },
    { icon: 'fas fa-box', title: 'Processing & Packing', desc: 'We are preparing your items.' },
    { icon: 'fas fa-truck', title: 'Shipped', desc: 'Your order is on the way.' },
    { icon: 'fas fa-check-circle', title: 'Delivered', desc: 'Your order has been delivered.' },
  ];

  steps.forEach((step, index) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'flex items-start space-x-4 mb-4 animate-fadeIn';
      div.innerHTML = `
        <div class="flex-shrink-0 mt-1">
          <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shadow-md">
            <i class="${step.icon}"></i>
          </div>
        </div>
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900">${step.title}</h4>
          <p class="text-gray-600">${step.desc}</p>
        </div>
      `;
      resultBox.appendChild(div);
    }, index * 800);
  });
});
