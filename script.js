let cart = {};

function addToCart(name, price) {
  if (cart[name]) {
    if (cart[name].qty < 10) {
      cart[name].qty += 1;
    } else {
      alert("Maximum 10 items allowed per product.");
    }
  } else {
    cart[name] = { price: price, qty: 1 };
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartList.innerHTML = "";
  let total = 0;
  for (let item in cart) {
    let itemTotal = cart[item].price * cart[item].qty;
    total += itemTotal;
    cartList.innerHTML += `<li>${item} x ${cart[item].qty} = ₹${itemTotal}</li>`;
  }
  cartTotal.textContent = total;
}

let modalProductName = '';
let modalProductPrice = 0;

function openModal(name, price, imgSrc) {
  modalProductName = name;
  modalProductPrice = price;
  document.getElementById("modalImage").src = imgSrc;
  document.getElementById("modalProductName").innerText = name;
  document.getElementById("modalProductPrice").innerText = price;
  document.getElementById("modalQuantity").innerText = cart[name]?.qty || 0;
  document.getElementById("imageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

function addModalToCart() {
  addToCart(modalProductName, modalProductPrice);
  document.getElementById("modalQuantity").innerText = cart[modalProductName]?.qty || 0;
}

document.querySelectorAll(".product-card img").forEach((img) => {
  img.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const src = this.src;
    openModal(name, price, src);
  });
});

document.querySelectorAll(".product-card button").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    addToCart(name, price);
  });
});

document.querySelector(".close").addEventListener("click", closeModal);
document.getElementById("modal-add-cart").addEventListener("click", addModalToCart);

// Redirect to login if not logged in before checkout
document.getElementById("checkout-btn").addEventListener("click", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    alert("Proceeding to checkout...");
    // Proceed with your flow
  } else {
    window.location.href = "login.html";
  }
});
