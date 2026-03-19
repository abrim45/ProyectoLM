// Base de datos COMPLETA de juegos
const gamesDatabase = [
  {
    id: 1,
    title: "Elden Ring",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 35.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 22.45,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
  },
  {
    id: 3,
    title: "Baldur's Gate 3",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 48.1,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
  },
  {
    id: 4,
    title: "Lethal Company",
    platform: "PC",
    oldPrice: 9.75,
    newPrice: 6.2,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1966720/header.jpg",
  },
  {
    id: 5,
    title: "Palworld",
    platform: "PC",
    oldPrice: 28.99,
    newPrice: 20.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg",
  },
  {
    id: 6,
    title: "Counter-Strike 2 Prime",
    platform: "PC",
    oldPrice: 14.99,
    newPrice: 14.2,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
  },
  {
    id: 7,
    title: "Terraria",
    platform: "PC",
    oldPrice: 9.99,
    newPrice: 4.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg",
  },
  {
    id: 8,
    title: "God of War Ragnarök",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 45.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
  },
  {
    id: 9,
    title: "Spider-Man Remastered",
    platform: "PlayStation",
    oldPrice: 59.99,
    newPrice: 29.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg",
  },
  {
    id: 10,
    title: "Ghost of Tsushima",
    platform: "PlayStation",
    oldPrice: 59.99,
    newPrice: 39.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
  },
  {
    id: 11,
    title: "The Last of Us Part I",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 41.9,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg",
  },
  {
    id: 12,
    title: "Helldivers 2",
    platform: "PlayStation",
    oldPrice: 39.99,
    newPrice: 31.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2054970/header.jpg",
  },
  {
    id: 13,
    title: "Horizon Zero Dawn",
    platform: "PlayStation",
    oldPrice: 49.99,
    newPrice: 15.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg",
  },
  {
    id: 14,
    title: "Forza Horizon 5",
    platform: "Xbox",
    oldPrice: 59.99,
    newPrice: 28.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg",
  },
  {
    id: 15,
    title: "Halo Infinite",
    platform: "Xbox",
    oldPrice: 59.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1240440/header.jpg",
  },
  {
    id: 16,
    title: "Starfield",
    platform: "Xbox",
    oldPrice: 69.99,
    newPrice: 35.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg",
  },
  {
    id: 17,
    title: "Sea of Thieves",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172620/header.jpg",
  },
  {
    id: 18,
    title: "Gears 5",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 9.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/header.jpg",
  },
  {
    id: 19,
    title: "Grand Theft Auto V",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 8.95,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
  },
  {
    id: 20,
    title: "Zelda: Tears of the Kingdom",
    platform: "Nintendo",
    oldPrice: 69.99,
    newPrice: 55.0,
    img: "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg",
  },
  {
    id: 21,
    title: "Mario Kart 8 Deluxe",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.99,
    img: "https://upload.wikimedia.org/wikipedia/en/b/b5/Mario_Kart_8_Deluxe_box_art.jpg",
  },
  {
    id: 22,
    title: "Super Smash Bros Ultimate",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 48.5,
    img: "https://upload.wikimedia.org/wikipedia/en/4/44/Super_Smash_Bros._Ultimate.jpg",
  },
  {
    id: 23,
    title: "Animal Crossing: NH",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.9,
    img: "https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg",
  },
  {
    id: 24,
    title: "Super Mario Odyssey",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 35.0,
    img: "https://upload.wikimedia.org/wikipedia/en/8/8d/Super_Mario_Odyssey.jpg",
  },
  {
    id: 25,
    title: "Hollow Knight",
    platform: "Nintendo",
    oldPrice: 14.99,
    newPrice: 7.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg",
  },
];

// Lógica de LocalStorage (La "memoria" del navegador)
function getCart() {
  return JSON.parse(localStorage.getItem("memeneba_cart")) || [];
}
function setCart(cart) {
  localStorage.setItem("memeneba_cart", JSON.stringify(cart));
  updateCartBadge();
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("memeneba_favs")) || [];
}
function setFavorites(favs) {
  localStorage.setItem("memeneba_favs", JSON.stringify(favs));
}

// Actualiza SÓLO el número del carrito
function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
    cartCountEl.classList.add("bump");
    setTimeout(() => cartCountEl.classList.remove("bump"), 300);
  }
}

// Variables globales para el Modal
let gameToAddToCart = null;
const qtyModal = document.getElementById("qty-modal");
const qtyInput = document.getElementById("qty-input");

// Función que dibuja tarjetas de juegos
function renderGameCards(gamesToRender, containerElement) {
  containerElement.innerHTML = "";
  const favs = getFavorites();

  if (gamesToRender.length === 0) {
    containerElement.innerHTML =
      '<h3 style="grid-column: 1/-1; text-align: center; padding: 40px; font-size: 24px;">No hay juegos aquí 😢</h3>';
    return;
  }

  gamesToRender.forEach((game) => {
    const discount = Math.round(
      ((game.oldPrice - game.newPrice) / game.oldPrice) * 100,
    );
    let tagClass =
      game.platform === "PC"
        ? "tag-pc"
        : game.platform === "PlayStation"
          ? "tag-playstation"
          : game.platform === "Xbox"
            ? "tag-xbox"
            : "tag-nintendo";
    const heartClass = favs.includes(game.id) ? "liked" : "";
    const bgSize = game.platform === "Nintendo" ? "contain" : "cover";

    const cardHTML = `
            <div class="card scroll-anim visible">
                <div class="card-img" style="background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5)), url('${game.img}'); background-size: ${bgSize}; background-position: top; background-repeat: no-repeat; background-color: #222;">
                    <span class="platform-tag ${tagClass}">${game.platform}</span>
                    <span class="discount-badge">-${discount}%</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${game.title}</h3>
                    <div class="card-footer">
                        <div class="card-actions">
                            <button class="action-btn cart-btn" data-id="${game.id}" title="Añadir al carrito"><i class="fas fa-cart-plus"></i></button>
                            <button class="action-btn like-btn ${heartClass}" data-id="${game.id}" title="Me gusta"><i class="fas fa-heart"></i></button>
                        </div>
                        <div class="price-box">
                            <span class="old-price">${game.oldPrice.toFixed(2)}€</span>
                            <span class="new-price">${game.newPrice.toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    containerElement.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Escuchar clics en botones de carrito y favoritos
document.addEventListener("click", (e) => {
  const cartBtn = e.target.closest(".cart-btn");
  const likeBtn = e.target.closest(".like-btn");

  if (cartBtn) {
    gameToAddToCart = parseInt(cartBtn.dataset.id);
    const gameObj = gamesDatabase.find((g) => g.id === gameToAddToCart);
    document.getElementById("modal-game-title").textContent = gameObj.title;
    qtyInput.value = 1;
    qtyModal.classList.remove("hidden");
  }

  if (likeBtn) {
    const gameId = parseInt(likeBtn.dataset.id);
    let favs = getFavorites();

    if (favs.includes(gameId)) {
      favs = favs.filter((id) => id !== gameId);
      likeBtn.classList.remove("liked");
      const favGrid = document.getElementById("favorites-grid");
      if (favGrid) setTimeout(() => loadFavoritesPage(), 200);
    } else {
      favs.push(gameId);
      likeBtn.classList.add("liked");
      likeBtn.style.transform = "scale(1.3)";
      setTimeout(() => (likeBtn.style.transform = ""), 200);
    }
    setFavorites(favs);
  }
});

// Lógica del modal
if (qtyModal) {
  document
    .getElementById("qty-plus")
    .addEventListener(
      "click",
      () => (qtyInput.value = parseInt(qtyInput.value) + 1),
    );
  document.getElementById("qty-minus").addEventListener("click", () => {
    if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });

  document
    .getElementById("modal-cancel")
    .addEventListener("click", () => qtyModal.classList.add("hidden"));

  document.getElementById("modal-confirm").addEventListener("click", () => {
    const qty = parseInt(qtyInput.value);
    let cart = getCart();
    const existingItemIndex = cart.findIndex(
      (item) => item.id === gameToAddToCart,
    );
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += qty;
    } else {
      cart.push({ id: gameToAddToCart, quantity: qty });
    }
    setCart(cart);
    qtyModal.classList.add("hidden");

    const btnConfirm = document.getElementById("modal-confirm");
    const originalText = btnConfirm.textContent;
    btnConfirm.textContent = "¡Añadido!";
    btnConfirm.style.backgroundColor = "var(--price-green)";
    btnConfirm.style.color = "white";
    setTimeout(() => {
      btnConfirm.textContent = originalText;
      btnConfirm.style.backgroundColor = "";
      btnConfirm.style.color = "";
    }, 1000);
  });
}

// Función global de filtros para poder llamarla desde el header inyectado
window.applyFiltersGlobal = function () {
  const searchBar = document.getElementById("search-bar");
  const search = searchBar ? searchBar.value.toLowerCase() : "";

  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) {
    const checkboxes = document.querySelectorAll(".filter-platform");
    const selectedPlatforms = Array.from(checkboxes)
      .filter((c) => c.checked)
      .map((c) => c.value);
    const maxPrice = parseFloat(document.getElementById("price-filter").value);

    const filtered = gamesDatabase.filter(
      (g) =>
        selectedPlatforms.includes(g.platform) &&
        g.newPrice <= maxPrice &&
        g.title.toLowerCase().includes(search),
    );
    renderGameCards(filtered, homeGrid);
  }

  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) {
    const lootGames = gamesDatabase.filter((game) => {
      const discount = Math.round(
        ((game.oldPrice - game.newPrice) / game.oldPrice) * 100,
      );
      return discount >= 40 && game.title.toLowerCase().includes(search);
    });
    renderGameCards(lootGames, lootGrid);
  }
};

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGAR EL HEADER DINÁMICAMENTE
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      updateCartBadge();
      const searchBar = document.getElementById("search-bar");
      if (searchBar) {
        searchBar.addEventListener("keyup", applyFiltersGlobal);
      }

      // ¡NUEVO! Mostrar la página suavemente una vez que el header ya está en su sitio
      document.body.classList.add("page-loaded");

      // ¡NUEVO! Activar las transiciones suaves al cambiar de página
      enableSmoothNavigation();
    });

  // 2. Lógica para INDEX.HTML
  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) {
    renderGameCards(gamesDatabase, homeGrid);
    document
      .querySelectorAll(".filter-platform")
      .forEach((cb) => cb.addEventListener("change", applyFiltersGlobal));
    document.getElementById("price-filter").addEventListener("input", (e) => {
      document.getElementById("price-display").textContent =
        e.target.value + "€";
      applyFiltersGlobal();
    });
  }

  // 3. Lógica para FAVORITES.HTML
  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) loadFavoritesPage();

  // 4. Lógica para CART.HTML
  const cartContainer = document.getElementById("cart-items-container");
  if (cartContainer) loadCartPage();

  // 5. Lógica para LOOT.HTML
  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) applyFiltersGlobal();
});

function loadFavoritesPage() {
  const favs = getFavorites();
  const favoriteGames = gamesDatabase.filter((game) => favs.includes(game.id));
  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) renderGameCards(favoriteGames, favGrid);
}

function loadCartPage() {
  const cart = getCart();
  const cartContainer = document.getElementById("cart-items-container");
  const totalPriceEl = document.getElementById("cart-total-price");

  if (!cartContainer || !totalPriceEl) return;
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<h3 style="text-align: center;">Tu carrito está más vacío que mi cartera 🥲</h3>';
    totalPriceEl.textContent = "0.00€";
    return;
  }

  cart.forEach((cartItem) => {
    const game = gamesDatabase.find((g) => g.id === cartItem.id);
    if (!game) return;
    const subtotal = game.newPrice * cartItem.quantity;
    total += subtotal;

    const itemHTML = `
            <div class="cart-item">
                <img src="${game.img}" alt="${game.title}" style="object-fit: contain; background: #222;">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${game.title}</h4>
                    <span class="platform-tag" style="background:#000; display:inline-block; margin-top:5px;">${game.platform}</span>
                    <p style="margin: 5px 0;">Cantidad: <strong>${cartItem.quantity}</strong></p>
                </div>
                <div style="text-align: right;">
                    <div class="cart-item-price">${subtotal.toFixed(2)}€</div>
                    <button class="remove-btn" onclick="removeFromCart(${game.id})"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;
    cartContainer.insertAdjacentHTML("beforeend", itemHTML);
  });
  totalPriceEl.textContent = total.toFixed(2) + "€";
}

window.removeFromCart = function (id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  setCart(cart);
  loadCartPage();
};

// Función para transiciones suaves entre páginas
function enableSmoothNavigation() {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Si es un enlace normal a otra de nuestras páginas (y no un enlace externo o vacío)
      if (
        targetUrl &&
        !targetUrl.startsWith("http") &&
        !targetUrl.startsWith("#")
      ) {
        e.preventDefault(); // Congelamos el salto de página

        // Desvanecemos la página
        document.body.classList.remove("page-loaded");

        // Esperamos 300ms (lo que dura la animación CSS) y luego viajamos a la página
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      }
    });
  });
}
