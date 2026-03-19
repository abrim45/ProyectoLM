// 1. Ahora nuestra base de datos empieza vacía
let gamesDatabase = []; 

// 2. Función asíncrona para ir a buscar los juegos al servidor
async function fetchGames() {
    try {
        // Hacemos la llamada al json-server
        const response = await fetch('http://localhost:3000/gamesDatabase');
        
        // Si el servidor responde bien, guardamos los juegos
        if (response.ok) {
            gamesDatabase = await response.json();
            
            // ¡AHORA SÍ! Como ya tenemos los juegos, pintamos las pantallas
            initShop();
        } else {
            console.error("Error al cargar la base de datos");
        }
    } catch (error) {
        console.error("El servidor json-server está apagado:", error);
    }
}

// 3. Función para arrancar la tienda una vez tenemos los datos
function initShop() {
    const homeGrid = document.getElementById('game-grid');
    if (homeGrid) {
        // Pintamos el catálogo completo en el inicio
        renderGameCards(gamesDatabase, homeGrid);
    }

    const lootGrid = document.getElementById('loot-grid');
    if (lootGrid) {
        // Pintamos solo los que tienen descuento >= 40%
        let lootGames = gamesDatabase.filter(game => {
            const discount = Math.round(((game.oldPrice - game.newPrice) / game.oldPrice) * 100);
            return discount >= 40;
        });
        renderGameCards(lootGames, lootGrid);
    }
}

// --- SISTEMA DE TOAST NOTIFICATIONS ---
function showToast(message, type = "error") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon =
    type === "error"
      ? '<i class="fas fa-exclamation-triangle" style="color: #ff0044; font-size: 20px;"></i>'
      : '<i class="fas fa-check-circle" style="color: var(--price-green); font-size: 20px;"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- SISTEMA DE SESIONES ---
function getCurrentUser() {
  return localStorage.getItem("memeba_currentUser");
}

function requireLogin(shouldRedirect = false) {
  if (!getCurrentUser()) {
    showToast("¡Eh, quieto ahí! Tienes que iniciar sesión.", "error");
    if (shouldRedirect) {
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
    return false;
  }
  return true;
}

// --- LÓGICA DE DATOS LOCALES ---
function getCart() {
  const user = getCurrentUser();
  return user
    ? JSON.parse(localStorage.getItem(`memeba_cart_${user}`)) || []
    : [];
}
function setCart(cart) {
  const user = getCurrentUser();
  if (user) {
    localStorage.setItem(`memeba_cart_${user}`, JSON.stringify(cart));
    updateCartBadge();
  }
}

function getFavorites() {
  const user = getCurrentUser();
  return user
    ? JSON.parse(localStorage.getItem(`memeba_favs_${user}`)) || []
    : [];
}
function setFavorites(favs) {
  const user = getCurrentUser();
  if (user) localStorage.setItem(`memeba_favs_${user}`, JSON.stringify(favs));
}

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

// --- GLOBALES MODAL ---
let gameToAddToCart = null;
const qtyModal = document.getElementById("qty-modal");
const qtyInput = document.getElementById("qty-input");

// --- DIBUJAR TARJETAS CON PORTADAS REALES Y SEGURO ANTIFALLOS ---
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
                <div class="card-img" style="position: relative; overflow: hidden; background-color: #1a0b2e; padding: 10px; display: flex; justify-content: space-between; align-items: flex-start; height: 160px;">
                    
                    <img src="${game.img}" 
                         alt="${game.title}"
                         onerror="this.onerror=null; this.src='https://picsum.photos/seed/${game.id}fall/460/215';" 
                         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: ${bgSize}; opacity: 0.6; z-index: 0; background-color: #222;">
                    
                    <div style="position: relative; z-index: 1; display: flex; justify-content: space-between; width: 100%;">
                        <span class="platform-tag ${tagClass}">${game.platform}</span>
                        <span class="discount-badge">-${discount}%</span>
                    </div>
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

// --- EVENTOS DE CLICK EN TARJETAS ---
document.addEventListener("click", (e) => {
  const cartBtn = e.target.closest(".cart-btn");
  const likeBtn = e.target.closest(".like-btn");

  if (cartBtn) {
    if (!requireLogin(false)) return;
    gameToAddToCart = parseInt(cartBtn.dataset.id);
    const gameObj = gamesDatabase.find((g) => g.id === gameToAddToCart);
    document.getElementById("modal-game-title").textContent = gameObj.title;
    qtyInput.value = 1;
    qtyModal.classList.remove("hidden");
  }

  if (likeBtn) {
    if (!requireLogin(false)) return;
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

// --- LÓGICA MODAL CARRITO ---
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
    showToast("¡Añadido al carrito con éxito!", "success");
  });
}

fetchGames();

// --- FILTROS GLOBALES Y ORDENACIÓN ---
window.applyFiltersGlobal = function() {
    const searchBar = document.getElementById('search-bar');
    const search = searchBar ? searchBar.value.toLowerCase() : '';

    const homeGrid = document.getElementById('game-grid');
    if (homeGrid) {
        const checkboxes = document.querySelectorAll('.filter-platform');
        const selectedPlatforms = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
        
        const priceFilter = document.getElementById('price-filter');
        const maxPrice = priceFilter ? parseFloat(priceFilter.value) : 80;

        // Leer el valor del nuevo desplegable de ordenar
        const sortFilter = document.getElementById('sort-filter');
        const sortValue = sortFilter ? sortFilter.value : 'default';

        // 1. Filtrar los juegos
        let filtered = gamesDatabase.filter(g => 
            selectedPlatforms.includes(g.platform) && 
            g.newPrice <= maxPrice && 
            g.title.toLowerCase().includes(search)
        );

        // 2. Ordenar los juegos
        if (sortValue === 'price-asc') {
            filtered.sort((a, b) => a.newPrice - b.newPrice); // Más barato primero
        } else if (sortValue === 'price-desc') {
            filtered.sort((a, b) => b.newPrice - a.newPrice); // Más caro primero
        } else if (sortValue === 'alpha-asc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title)); // A-Z
        } else if (sortValue === 'alpha-desc') {
            filtered.sort((a, b) => b.title.localeCompare(a.title)); // Z-A
        }

        // 3. Dibujarlos
        renderGameCards(filtered, homeGrid);
    }

    const lootGrid = document.getElementById('loot-grid');
    if(lootGrid) {
        let lootGames = gamesDatabase.filter(game => {
            const discount = Math.round(((game.oldPrice - game.newPrice) / game.oldPrice) * 100);
            return discount >= 40 && game.title.toLowerCase().includes(search);
        });
        renderGameCards(lootGames, lootGrid);
    }
};

// --- INICIALIZACIÓN PRINCIPAL ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGAR HEADER (Sin sombras raras, limpio y puro)
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) headerPlaceholder.innerHTML = data;

      const user = getCurrentUser();
      const accountBtn = document.getElementById("account-btn");

      if (user && accountBtn) {
        accountBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i><span>SALIR</span>`;
        accountBtn.href = "#";
        accountBtn.title = `Sesión iniciada como: ${user}`;
        accountBtn.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("memeba_currentUser");
          window.location.reload();
        });
      }

      updateCartBadge();
      const searchBar = document.getElementById("search-bar");
      if (searchBar) {
        searchBar.addEventListener("keyup", applyFiltersGlobal);
      }

      document.body.classList.add("page-loaded");
      enableSmoothNavigation();
    });

  // 2. CARGAR FOOTER Y MODAL CHISTES
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;

        const linkTerms = document.getElementById("link-terms");
        const linkPrivacy = document.getElementById("link-privacy");
        const jokeModal = document.getElementById("joke-modal");
        const jokeTitle = document.getElementById("joke-title");
        const jokeText = document.getElementById("joke-text");
        const jokeClose = document.getElementById("joke-close");

        if (linkTerms && linkPrivacy && jokeModal) {
          linkTerms.addEventListener("click", (e) => {
            e.preventDefault();
            jokeTitle.innerHTML =
              '<i class="fas fa-file-contract"></i> Términos de Risa';
            jokeText.innerHTML =
              "Al usar Memeba, aceptas cedernos tu alma, tu historial de búsqueda (sí, sabemos lo que miras a las 3 AM) y prometes no jugar Yasuo en el LoL nunca más. <br><br>Ah, y no hacemos devoluciones ni aunque el juego sea un .txt vacío. ¡Gracias por tu dinero!";
            jokeModal.classList.remove("hidden");
          });

          linkPrivacy.addEventListener("click", (e) => {
            e.preventDefault();
            jokeTitle.innerHTML =
              '<i class="fas fa-user-secret"></i> Política de Espionaje';
            jokeText.innerHTML =
              "Tus datos están 100% seguros... de ser vendidos al primero que nos de algo. Compartimos tu info con Jefrey Epstein, tu padre y con alienígenas.<br><br>Usamos cookies, pero de las que llevan pepitas de chocolate y engordan. Al seguir aquí, nos das permiso para espiarte y vender tus organos.";
            jokeModal.classList.remove("hidden");
          });

          jokeClose.addEventListener("click", () => {
            jokeModal.classList.add("hidden");
          });
        }
      }
    });

  // 3. LÓGICA DE PÁGINAS
    const homeGrid = document.getElementById('game-grid');
    if (homeGrid) {
        renderGameCards(gamesDatabase, homeGrid);
        
        document.querySelectorAll('.filter-platform').forEach(cb => cb.addEventListener('change', applyFiltersGlobal));
        
        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter) sortFilter.addEventListener('change', applyFiltersGlobal);

        const priceFilter = document.getElementById('price-filter');
        if(priceFilter) {
            priceFilter.addEventListener('input', (e) => {
                document.getElementById('price-display').textContent = e.target.value + '€';
                applyFiltersGlobal();
            });
        }

        // --- ¡NUEVO! LÓGICA DEL BOTÓN RESTABLECER ---
        const resetBtn = document.getElementById('reset-filters-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // 1. Marcar todos los checkboxes
                document.querySelectorAll('.filter-platform').forEach(cb => cb.checked = true);
                
                // 2. Restaurar la barra de precio al máximo
                if (priceFilter) {
                    priceFilter.value = 80;
                    document.getElementById('price-display').textContent = '80€';
                }
                
                // 3. Restaurar el selector de orden al valor por defecto
                if (sortFilter) sortFilter.value = 'default';
                
                // 4. Limpiar la barra de búsqueda si había algo escrito
                const searchBar = document.getElementById('search-bar');
                if (searchBar) searchBar.value = '';

                // 5. Aplicar los filtros de nuevo para mostrar todos los juegos
                applyFiltersGlobal();
            });
        }
    }

  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) loadFavoritesPage();

  const cartContainer = document.getElementById("cart-items-container");
  if (cartContainer) loadCartPage();

  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) applyFiltersGlobal();

  // 4. FORMULARIOS DE LOGIN / REGISTRO
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("reg-user").value.trim();
      const pass = document.getElementById("reg-pass").value;
      const users = JSON.parse(localStorage.getItem("memeba_users")) || [];

      if (users.find((u) => u.username === user)) {
        showToast("Ese nombre ya está pillado. Espabila.", "error");
        return;
      }
      users.push({ username: user, password: pass });
      localStorage.setItem("memeba_users", JSON.stringify(users));

      showToast("¡Cuenta creada! Prepárate para la mandanga...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = document.getElementById("login-user").value.trim();
      const pass = document.getElementById("login-pass").value.trim();
      
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem("memeba_users")) || [];
        if (!Array.isArray(users)) {
            users = [];
        }
      } catch (error) {
        console.error("Memoria corrupta detectada. Reseteando usuarios...");
        users = [];
      }

      const foundUser = users.find(u => u.username === user && u.password === pass);

      if (foundUser) {
        localStorage.setItem("memeba_currentUser", foundUser.username);
        showToast("¡Pa' dentro! Sacando el botín...", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        showToast("Datos incorrectos. ¿Tienes demencia?", "error");
      }
    });
  }
}); // <--- ¡ESTA ES LA LÍNEA QUE TE FALTABA Y ROMPÍA TODO!

function loadFavoritesPage() {
  if (!requireLogin(true)) {
    document.getElementById("favorites-grid").innerHTML =
      '<h3 style="text-align:center; padding: 40px; width: 100%;">Redirigiendo al login...</h3>';
    return;
  }
  const favs = getFavorites();
  const favoriteGames = gamesDatabase.filter((game) => favs.includes(game.id));
  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) renderGameCards(favoriteGames, favGrid);
}

function loadCartPage() {
  if (!requireLogin(true)) {
    document.getElementById("cart-items-container").innerHTML =
      '<h3 style="text-align:center; padding: 40px;">Redirigiendo al login...</h3>';
    const summary = document.querySelector(".cart-summary");
    if (summary) summary.style.display = "none";
    return;
  }

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

function enableSmoothNavigation() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");
      if (targetUrl && targetUrl !== "#" && !targetUrl.startsWith("http")) {
        e.preventDefault();
        document.body.classList.remove("page-loaded");
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      }
    });
  });
}
