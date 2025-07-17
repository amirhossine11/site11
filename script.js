
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const themeToggle = document.getElementById("theme-toggle");
  const cartPanel = document.getElementById("cart-panel");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout");
  const productList = document.querySelector(".product-list");
  const priceFilter = document.getElementById("price-filter");
  const priceValue = document.getElementById("price-value");

  let cart = [];
  const products = [
    { title: "پسته اکبری", price: 220000, img: "https://via.placeholder.com/300x200?text=اکبری", category: "اکبری" },
    { title: "پسته احمدآقایی", price: 240000, img: "https://via.placeholder.com/300x200?text=احمدآقایی", category: "احمدآقایی" },
    { title: "پسته فندقی", price: 180000, img: "https://via.placeholder.com/300x200?text=فندقی", category: "فندقی" },
    { title: "پسته کله‌قوچی", price: 200000, img: "https://via.placeholder.com/300x200?text=کله+قوچی", category: "کله‌قوچی" },
    { title: "پسته شور صادراتی", price: 260000, img: "https://via.placeholder.com/300x200?text=شور", category: "شور" }
  ];

  function displayProducts(filtered = products) {
    productList.innerHTML = "";
    filtered.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price.toLocaleString()} تومان</p>
        <button class="add-to-cart">افزودن به سبد خرید</button>
      `;
      card.querySelector("button").addEventListener("click", () => addToCart(product));
      productList.appendChild(card);
    });
  }

  function addToCart(product) {
    const existing = cart.find(p => p.title === product.title);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.innerHTML = `
        <span>${item.title} - ${item.price.toLocaleString()} × ${item.quantity}</span>
        <div>
          <button onclick="changeQty(${index}, 1)">➕</button>
          <button onclick="changeQty(${index}, -1)">➖</button>
          <button onclick="removeItem(${index})">❌</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });
    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartPanel.classList.remove("hidden");
  }

  window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCart();
  };

  window.removeItem = index => {
    cart.splice(index, 1);
    updateCart();
  };

  checkoutBtn.addEventListener("click", () => {
    alert("✅ سفارش شما ثبت شد!");
    cart = [];
    updateCart();
  });

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  priceFilter.addEventListener("input", () => {
    priceValue.textContent = priceFilter.value;
    const filtered = products.filter(p => p.price <= parseInt(priceFilter.value));
    displayProducts(filtered);
  });

  document.querySelectorAll(".categories li").forEach(li => {
    li.addEventListener("click", () => {
      const filtered = products.filter(p => p.category === li.dataset.category);
      displayProducts(filtered);
    });
  });

  displayProducts();
});
