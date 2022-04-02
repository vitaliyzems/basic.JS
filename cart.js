'use strict';

const cartIcon = document.querySelector('.cartIconWrap');
const cartWindow = document.querySelector('.cartWindow');
const cartWindowHead = document.querySelector('.cartWindowHead');
const cartCounter = document.querySelector('.cartCounter');
const cartTotal = document.querySelector('.cartTotal');
const featuredItems = document.querySelector('.featuredItems');
const cart = {};

cartIcon.addEventListener('click', event => {
  // Если корзина пустая, то кнопка корзины не сработает.
  if (!Object.keys(cart).length) {
    return;
  }
  cartWindow.classList.toggle('hidden');
});

featuredItems.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'IMG') {
    return;
  }

  const product = event.target.closest('.featuredItem');
  const id = +product.dataset.id;
  const name = product.dataset.name;
  const price = +product.dataset.price;

  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in cart)) {
    cart[id] = { id, name, price, count: 0, total: 0 };
  }
  cart[id].count++;
  cart[id].total = cart[id].count * cart[id].price;

  // Изначально счетчик товаров скрыт, а после добавления он показывается
  cartCounter.classList.remove('hidden');

  drawCartRow(id);
  cartCounter.textContent = increaseCartCounter();
  cartTotal.textContent = getCartTotal(id);
}

function drawCartRow(id) {
  const productRow = document.querySelector(`.cartRow[data-id="${id}"]`);
  if (!productRow) {
    drawNewCartRow(id);
  }
  document.querySelector('.productCount').textContent = cart[id].count;
  document.querySelector('.productTotal')
    .textContent = cart[id].count * cart[id].price;
}

function drawNewCartRow(id) {
  return cartWindowHead.insertAdjacentHTML('afterend', `
    <div class="cartRow" data-id="${cart[id].id}">
      <div>${cart[id].name}</div>
      <div class="productCount">${cart[id].count}</div>
      <div>${cart[id].price}</div>
      <div class="productTotal">${cart[id].total}</div>
    </div>
  `);
}

function increaseCartCounter() {
  return Object.values(cart).reduce((acc, product) => acc + product.count, 0);
}

function getCartTotal() {
  return Object.values(cart).reduce((acc, product) => acc + product.total, 0);
}