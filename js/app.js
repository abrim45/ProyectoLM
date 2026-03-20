// 1. Ahora nuestra base de datos empieza vacía
let gamesDatabase = [];

// 2. Función asíncrona para ir a buscar los juegos al servidor
async function fetchGames() {
  try {
    const response = await fetch("http://localhost:3000/gamesDatabase");
    if (response.ok) {
      gamesDatabase = await response.json();
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
  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) renderGameCards(gamesDatabase, homeGrid);

  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) {
    let lootGames = gamesDatabase.filter((game) => {
      const discount = Math.round(
        ((game.oldPrice - game.newPrice) / game.oldPrice) * 100,
      );
      return discount >= 40;
    });
    renderGameCards(lootGames, lootGrid);
  }

  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) loadFavoritesPage();

  const cartContainer = document.getElementById("cart-items-container");
  if (cartContainer) loadCartPage();
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
  if (!user) return [];
  try {
    const data = JSON.parse(localStorage.getItem(`memeba_cart_${user}`));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
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
  if (!user) return [];
  try {
    const data = JSON.parse(localStorage.getItem(`memeba_favs_${user}`));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
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

// --- DIBUJAR TARJETAS ---
function renderGameCards(gamesToRender, containerElement) {
  containerElement.innerHTML = "";
  // Forzamos que todos los IDs guardados se lean como Texto (String)
  const favsStr = getFavorites().map(String);

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

    // Comparamos Texto con Texto
    const heartClass = favsStr.includes(String(game.id)) ? "liked" : "";
    const bgSize = game.platform === "Nintendo" ? "contain" : "cover";

    const cardHTML = `
            <div class="card scroll-anim visible">
                <div class="card-img" style="position: relative; overflow: hidden; background-color: #1a0b2e; padding: 10px; display: flex; justify-content: space-between; align-items: flex-start; height: 160px;">
                    
                    <a href="game.html?id=${game.id}" style="display: block; width: 100%; height: 100%; z-index: 0; position: absolute; top: 0; left: 0;">
                        <img src="${game.img}" 
                             alt="${game.title}"
                             onerror="this.onerror=null; this.src='https://picsum.photos/seed/${game.id}fall/460/215';" 
                             style="width: 100%; height: 100%; object-fit: ${bgSize}; opacity: 0.6; background-color: #222; cursor: pointer;">
                    </a>

                    <div style="position: relative; z-index: 1; display: flex; justify-content: space-between; width: 100%; pointer-events: none;">
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

// --- EVENTOS DE CLICK MAESTROS (CARRITO, FAVORITOS Y MODAL) ---
let gameToAddToCart = null;

document.addEventListener("click", (e) => {
  const cartBtn = e.target.closest(".cart-btn");
  const likeBtn = e.target.closest(".like-btn");

  // Botones del interior del Modal
  const btnPlus = e.target.closest("#qty-plus");
  const btnMinus = e.target.closest("#qty-minus");
  const btnCancel = e.target.closest("#modal-cancel");
  const btnConfirm = e.target.closest("#modal-confirm");

  // 1. Abrir Modal del Carrito
  if (cartBtn) {
    if (!requireLogin(false)) return;

    gameToAddToCart = String(cartBtn.dataset.id);
    const gameObj = gamesDatabase.find((g) => String(g.id) === gameToAddToCart);
    if (!gameObj) return;

    let qtyModal = document.getElementById("qty-modal");
    if (!qtyModal) {
      // Si no existe, lo creamos
      const modalHTML = `
        <div id="qty-modal" class="modal-overlay">
            <div class="modal-content">
                <h3 id="modal-game-title">Juego</h3>
                <p>¿Cuántas copias quieres saquear?</p>
                <div class="qty-controls">
                    <button class="qty-btn" id="qty-minus">-</button>
                    <input type="number" id="qty-input" value="1" min="1" readonly style="font-family: 'Fredoka', sans-serif;">
                    <button class="qty-btn" id="qty-plus">+</button>
                </div>
                <button class="btn-primary" id="modal-confirm" style="width: 100%; margin-bottom: 10px;">¡Añadir al Botín!</button>
                <button class="btn-secondary" id="modal-cancel" style="width: 100%; padding: 10px; cursor: pointer;">Cancelar</button>
            </div>
        </div>`;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
      qtyModal = document.getElementById("qty-modal");
    }

    document.getElementById("modal-game-title").textContent = gameObj.title;
    document.getElementById("qty-input").value = 1;
    qtyModal.classList.remove("hidden");
  }

  // 2. Controles de Cantidad (+ y -)
  if (btnPlus) {
    const input = document.getElementById("qty-input");
    input.value = parseInt(input.value) + 1;
  }
  if (btnMinus) {
    const input = document.getElementById("qty-input");
    if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
  }

  // 3. Botón de Cancelar
  if (btnCancel) {
    document.getElementById("qty-modal").classList.add("hidden");
  }

  // 4. Botón de Confirmar (Añadir al Botín)
  if (btnConfirm) {
    const qty = parseInt(document.getElementById("qty-input").value);
    let cart = getCart();
    const existingItemIndex = cart.findIndex(
      (item) => String(item.id) === gameToAddToCart,
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += qty;
    } else {
      cart.push({ id: gameToAddToCart, quantity: qty });
    }

    setCart(cart);
    document.getElementById("qty-modal").classList.add("hidden");
    showToast("¡Añadido al carrito con éxito!", "success");
  }

  // 5. Lógica de Favoritos
  if (likeBtn) {
    if (!requireLogin(false)) return;

    const gameId = String(likeBtn.dataset.id);
    let favs = getFavorites().map(String);

    if (favs.includes(gameId)) {
      favs = favs.filter((id) => String(id) !== gameId);
      likeBtn.classList.remove("liked");
      showToast("Eliminado de deseados 💔", "error");

      const favGrid = document.getElementById("favorites-grid");
      if (favGrid) setTimeout(() => loadFavoritesPage(), 200);
    } else {
      favs.push(gameId);
      likeBtn.classList.add("liked");
      likeBtn.style.transform = "scale(1.3)";
      setTimeout(() => (likeBtn.style.transform = ""), 200);
      showToast("¡Añadido a deseados! ❤️", "success");
    }
    setFavorites(favs);
  }
});

// Llamada para arrancar la base de datos
fetchGames();

// --- FILTROS GLOBALES Y ORDENACIÓN ---
window.applyFiltersGlobal = function () {
  const searchBar = document.getElementById("search-bar");
  const search = searchBar ? searchBar.value.toLowerCase() : "";

  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) {
    const checkboxes = document.querySelectorAll(".filter-platform");
    const selectedPlatforms = Array.from(checkboxes)
      .filter((c) => c.checked)
      .map((c) => c.value);

    const priceFilter = document.getElementById("price-filter");
    const maxPrice = priceFilter ? parseFloat(priceFilter.value) : 80;

    const sortFilter = document.getElementById("sort-filter");
    const sortValue = sortFilter ? sortFilter.value : "default";

    let filtered = gamesDatabase.filter(
      (g) =>
        selectedPlatforms.includes(g.platform) &&
        g.newPrice <= maxPrice &&
        g.title.toLowerCase().includes(search),
    );

    if (sortValue === "price-asc") {
      filtered.sort((a, b) => a.newPrice - b.newPrice);
    } else if (sortValue === "price-desc") {
      filtered.sort((a, b) => b.newPrice - a.newPrice);
    } else if (sortValue === "alpha-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "alpha-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderGameCards(filtered, homeGrid);
  }

  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) {
    let lootGames = gamesDatabase.filter((game) => {
      const discount = Math.round(
        ((game.oldPrice - game.newPrice) / game.oldPrice) * 100,
      );
      return discount >= 40 && game.title.toLowerCase().includes(search);
    });
    renderGameCards(lootGames, lootGrid);
  }
};

// --- INICIALIZACIÓN PRINCIPAL ---
document.addEventListener("DOMContentLoaded", () => {
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

  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) {
    document
      .querySelectorAll(".filter-platform")
      .forEach((cb) => cb.addEventListener("change", applyFiltersGlobal));
    const sortFilter = document.getElementById("sort-filter");
    if (sortFilter) sortFilter.addEventListener("change", applyFiltersGlobal);

    const priceFilter = document.getElementById("price-filter");
    if (priceFilter) {
      priceFilter.addEventListener("input", (e) => {
        document.getElementById("price-display").textContent =
          e.target.value + "€";
        applyFiltersGlobal();
      });
    }

    const resetBtn = document.getElementById("reset-filters-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-platform")
          .forEach((cb) => (cb.checked = true));
        if (priceFilter) {
          priceFilter.value = 80;
          document.getElementById("price-display").textContent = "80€";
        }
        if (sortFilter) sortFilter.value = "default";
        const searchBar = document.getElementById("search-bar");
        if (searchBar) searchBar.value = "";
        applyFiltersGlobal();
      });
    }
  }

  // ==========================================
  // 1. NUEVO REGISTRO (CONECTADO AL SERVIDOR)
  // ==========================================
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = document.getElementById("reg-user").value.trim();
      const pass = document.getElementById("reg-pass").value;

      try {
        // Preguntamos al servidor si ese nombre ya existe (?username=...)
        const checkRes = await fetch(
          `http://localhost:3000/users?username=${user}`,
        );
        const existingUsers = await checkRes.json();

        if (existingUsers.length > 0) {
          showToast("Ese nombre ya está pillado. Espabila.", "error");
          return;
        }

        // Si no existe, preparamos el nuevo jugador con los bolsillos vacíos
        const newUser = {
          username: user,
          password: pass,
          cart: [],
          favorites: [],
        };

        // Lo enviamos a la base de datos (POST)
        const postRes = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (postRes.ok) {
          showToast("¡Cuenta creada! Prepárate para la mandanga...", "success");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        showToast(
          "Error de conexión. ¿Tienes el json-server encendido?",
          "error",
        );
      }
    });
  }

  // ==========================================
  // 2. NUEVO LOGIN (CONECTADO AL SERVIDOR)
  // ==========================================
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = document.getElementById("login-user").value.trim();
      const pass = document.getElementById("login-pass").value.trim();

      try {
        // Buscamos a un usuario que coincida exactamente con ese nombre Y contraseña
        const res = await fetch(
          `http://localhost:3000/users?username=${user}&password=${pass}`,
        );
        const foundUsers = await res.json();

        if (foundUsers.length > 0) {
          const loggedUser = foundUsers[0]; // El servidor nos devuelve un array, pillamos el primero

          // 1. Guardamos quién es (La "Sesión")
          localStorage.setItem("memeba_currentUser", loggedUser.username);
          // ¡NUEVO! Guardamos su ID de la base de datos para saber a quién actualizarle el carrito luego
          localStorage.setItem("memeba_currentUserId", loggedUser.id);

          // 2. Sincronizamos su botín del servidor al navegador (para que la tienda lo lea al instante)
          localStorage.setItem(
            `memeba_cart_${loggedUser.username}`,
            JSON.stringify(loggedUser.cart || []),
          );
          localStorage.setItem(
            `memeba_favs_${loggedUser.username}`,
            JSON.stringify(loggedUser.favorites || []),
          );

          showToast("¡Pa' dentro! Sacando el botín...", "success");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        } else {
          showToast("Datos incorrectos. ¿Tienes demencia?", "error");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        showToast("Error de conexión. El servidor no responde.", "error");
      }
    });
  }
});

function loadFavoritesPage() {
  if (!requireLogin(true)) {
    document.getElementById("favorites-grid").innerHTML =
      '<h3 style="text-align:center; padding: 40px; width: 100%;">Redirigiendo al login...</h3>';
    return;
  }
  const favsStr = getFavorites().map(String);
  const favoriteGames = gamesDatabase.filter((game) =>
    favsStr.includes(String(game.id)),
  );
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
    // Buscar comparando Textos
    const game = gamesDatabase.find(
      (g) => String(g.id) === String(cartItem.id),
    );
    if (!game) return;
    const subtotal = game.newPrice * cartItem.quantity;
    total += subtotal;

    const itemHTML = `
            <div class="cart-item">
                <a href="game.html?id=${game.id}">
                    <img src="${game.img}" alt="${game.title}" style="object-fit: contain; background: #222; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                </a>
                
                <div class="cart-item-details">
                    <a href="game.html?id=${game.id}" style="text-decoration: none; color: inherit;">
                        <h4 class="cart-item-title" style="cursor: pointer;">${game.title}</h4>
                    </a>
                    <span class="platform-tag" style="background:#000; display:inline-block; margin-top:5px;">${game.platform}</span>
                    <p style="margin: 5px 0;">Cantidad: <strong>${cartItem.quantity}</strong></p>
                </div>
                
                <div style="text-align: right;">
                    <div class="cart-item-price">${subtotal.toFixed(2)}€</div>
                    <button class="remove-btn" onclick="removeFromCart('${game.id}')"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;
    cartContainer.insertAdjacentHTML("beforeend", itemHTML);
  });
  totalPriceEl.textContent = total.toFixed(2) + "€";
}

window.removeFromCart = function (id) {
  let cart = getCart();
  cart = cart.filter((item) => String(item.id) !== String(id));
  setCart(cart);
  loadCartPage();
};

function enableSmoothNavigation() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");
      // Evitamos interceptar el link si tiene "?id=" para que navegue correctamente al game.html
      if (
        targetUrl &&
        targetUrl !== "#" &&
        !targetUrl.startsWith("http") &&
        !targetUrl.includes("?id=")
      ) {
        e.preventDefault();
        document.body.classList.remove("page-loaded");
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      }
    });
  });
}

// --- FUNCIÓN PARA CARGAR LA PÁGINA INDIVIDUAL DEL JUEGO ---
async function loadGamePage() {
  if (!window.location.pathname.includes("game.html")) return;

  const params = new URLSearchParams(window.location.search);
  const gameId = parseInt(params.get("id"));

  const container = document.querySelector(".game-page-container");

  if (!gameId) {
    document.querySelector(".game-page-container").innerHTML = `
      <div style="background: #ffffff; border: 3px solid #000; border-radius: 12px; padding: 40px; text-align: center; max-width: 600px; margin: 40px auto; box-shadow: 8px 8px 0px rgba(0,0,0,1);">
        <h2 style="color: var(--primary-purple); font-size: 28px; margin-top: 0;">
          <i class="fas fa-search" style="color: #ffb700;"></i> ¡Juego no encontrado!
        </h2>
        <p style="font-size: 18px; font-weight: 600; color: var(--text-dark);">
          Necesitas hacer clic en un juego desde la tienda para ver sus detalles.
        </p>
        <a href="index.html" class="btn-buy" style="display: inline-block; margin-top: 20px; text-decoration: none; color: #000;">Volver a la tienda</a>
      </div>
    `;
    return;
  }

  try {
    // Intentamos cargar la BD leyendo tu db.json local
    const response = await fetch("db.json");
    if (!response.ok) throw new Error("No se pudo leer el archivo db.json");
    const data = await response.json();

    // Extraemos los juegos (ya sea que tu json tenga "gamesDatabase" o sea directamente un array)
    const juegosArray = data.gamesDatabase ? data.gamesDatabase : data;

    // Buscamos el juego
    const game = juegosArray.find((g) => g.id === gameId);

    if (!game) {
      container.innerHTML =
        "<h2 style='text-align:center; padding: 50px; color: white;'>Error: El juego no existe en la base de datos 🥲</h2>";
      return;
    }

    // Rellenamos datos
    document.title = `${game.title} | Memeba`;
    document.getElementById("g-title").textContent = game.title;
    document.getElementById("g-img").src = game.img;
    document.getElementById("g-platform").textContent = game.platform || "N/A";
    document.getElementById("g-old-price").textContent =
      `${game.oldPrice.toFixed(2)}€`;
    document.getElementById("g-new-price").textContent =
      `${game.newPrice.toFixed(2)}€`;
    document.getElementById("g-desc").textContent =
      game.description || "Descripción no disponible.";

    // --- CÁLCULO DE MEDIA DE ESTRELLAS REAL ---
    let avgRating = 0;
    if (game.reviews && game.reviews.length > 0) {
      // Sumamos todas las puntuaciones
      const totalScore = game.reviews.reduce((sum, rev) => sum + rev.score, 0);
      // Dividimos entre la cantidad de reseñas y redondeamos a 2 decimales
      avgRating = (totalScore / game.reviews.length).toFixed(2);
      avgRating = parseFloat(avgRating); // Le quita los ceros inútiles (ej: 4.00 pasa a 4)
    } else {
      avgRating = parseFloat(game.rating) || 0; // Si no hay reseñas, coge la nota por defecto
    }

    // Calculamos qué porcentaje de relleno amarillo tendrán las estrellas
    const starPercentage = (avgRating / 5) * 100;

    // Pintamos las estrellas fraccionadas y el número
    const ratingContainer = document.querySelector(".average-rating");
    if (ratingContainer) {
      ratingContainer.innerHTML = `
            <div class="stars-outer">
                <div class="stars-inner" style="width: ${starPercentage}%"></div>
            </div>
            <span>${avgRating}</span>/5
        `;
    }

    // Conectamos botones
    const btnCart = document.getElementById("g-btn-cart");
    const btnFav = document.getElementById("g-btn-fav");
    if (btnCart) btnCart.dataset.id = game.id;
    if (btnFav) btnFav.dataset.id = game.id;

    // Pintar corazón
    const favsStr = getFavorites().map(String);
    if (btnFav && favsStr.includes(String(game.id))) {
      btnFav.classList.add("liked");
    }

    // Pintar reseñas
    const reviewsBox = document.getElementById("g-reviews-list");
    reviewsBox.innerHTML = "";

    if (game.reviews && game.reviews.length > 0) {
      game.reviews.forEach((review) => {
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          starsHTML +=
            i <= review.score
              ? '<i class="fas fa-star"></i>'
              : '<i class="far fa-star"></i>';
        }
        reviewsBox.innerHTML += `
            <div class="review-card">
              <div class="review-meta">
                  <span class="review-user"><i class="fas fa-user-circle"></i> ${review.user}</span>
                  <div class="review-stars">${starsHTML}</div>
              </div>
              <p class="review-comment">"${review.comment}"</p>
            </div>`;
      });
    } else {
      reviewsBox.innerHTML =
        "<p style='color: white;'>Aún no hay reseñas para este juego.</p>";
    }
  } catch (error) {
    console.error("Error al cargar los detalles del juego:", error);
    document.querySelector(".game-page-container").innerHTML = `
      <div style="background: #ffffff; border: 3px solid #000; border-radius: 12px; padding: 40px; text-align: center; max-width: 600px; margin: 40px auto; box-shadow: 8px 8px 0px rgba(0,0,0,1);">
        <h2 style="color: var(--primary-purple); font-size: 28px; margin-top: 0;">
          <i class="fas fa-exclamation-triangle" style="color: #ff0044;"></i> ¡Fallo Crítico!
        </h2>
        <p style="font-size: 18px; font-weight: 600; color: var(--text-dark);">
          El servidor json-server no responde o el juego ha desaparecido en un agujero negro. ¡Comprueba tu terminal!
        </p>
        <a href="index.html" class="btn-buy" style="display: inline-block; margin-top: 20px; text-decoration: none; color: #000;">Volver a la tienda</a>
      </div>
    `;
  }
}
// Ejecutamos la función de la página de producto
document.addEventListener("DOMContentLoaded", () => {
  if (typeof loadGamePage === "function") loadGamePage();
});
