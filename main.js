// main.js

let menuData = [];

function fetchMenu() {
  fetch('https://script.google.com/macros/s/AKfycbzCsP7NxxmHbkkvL5pVGfZ5MIjuom-RE4oO6eEU1evWw_H_fnGYVefRNSh1UzF9gusXDQ/exec')
    .then((res) => res.json())
    .then((data) => {
      menuData = data;
      renderMenu(data);
    })
    .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
}

function renderMenu(menu) {
  const list = document.getElementById('menu-list');
  list.innerHTML = '';
  menu.forEach(item => {
    const card = document.createElement('div');
    card.className = 'rounded-xl border p-4 shadow hover:shadow-lg transition';

    card.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
      <p class="text-sm text-gray-600 mb-1">${item.description}</p>
      <p class="font-bold mb-2">${item.price} VNĐ</p>
      <button onclick="addToCart('${item.id}')" class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
        Thêm vào giỏ
      </button>
    `;
    list.appendChild(card);
  });
}

let cart = [];

function addToCart(itemId) {
  const item = menuData.find(i => i.id === itemId);
  if (item) {
    cart.push(item);
    alert(`Đã thêm ${item.name} vào giỏ hàng!`);
  }
}

function showOrderPage() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  const order = cart.map(i => `• ${i.name}`).join('\n');
  alert("Đơn hàng của bạn:\n" + order);
}

window.onload = fetchMenu;
