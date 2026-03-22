// 1. Ahora nuestra base de datos empieza vacía
let gamesDatabase = [];

// --- DICCIONARIO DE ETIQUETAS (TAGS OCULTOS) ---
// Le añadimos palabras clave "invisibles" a los juegos para que coincidan con siglas y alias.
const searchTags = {
    "grand theft auto": "gta gta5 gta v gta 5",
    "baldur": "bg3",
    "league of legends": "lol",
    "call of duty": "cod",
    "ea sports": "fifa fc24",
    "rocket league": "rl",
    "zelda": "the legend of zelda totk botw",
    "cyberpunk": "cbp",
    "red dead": "rdr2 rdr",
    "counter-strike": "csgo cs2 cs",
    "resident evil": "re",
    "final fantasy": "ff"
};

// Función de búsqueda avanzada (Ignora acentos, busca palabras sueltas y usa tags)
function checkSearchMatch(gameTitle, searchTerm) {
    // 1. Quitar acentos y pasar a minúsculas
    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const normTitle = normalize(gameTitle);
    const normSearch = normalize(searchTerm.trim());

    if (!normSearch) return true;

    // 2. Expandir el título con etiquetas ocultas si procede
    let expandedTitle = normTitle;
    for (const [key, tags] of Object.entries(searchTags)) {
        // Si el título contiene la clave (ej: "zelda"), le añadimos sus tags
        if (normTitle.includes(key)) {
            expandedTitle += " " + tags;
        }
    }

    // 3. Dividir la búsqueda del usuario en palabras sueltas
    // (Ej: "zelda kingdom" se divide en ["zelda", "kingdom"])
    const searchWords = normSearch.split(/\s+/).filter(word => word.length > 0);

    // 4. Match perfecto: TODAS las palabras que ha escrito el usuario deben estar en el título expandido
    return searchWords.every(word => expandedTitle.includes(word));
}

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
async function setCart(cart) {
  const user = getCurrentUser();
  const userId = localStorage.getItem("memeba_currentUserId"); // Recuperamos su ID

  if (user) {
    // 1. Guardamos en el navegador (para que la web vaya rapidísima sin recargar)
    localStorage.setItem(`memeba_cart_${user}`, JSON.stringify(cart));
    updateCartBadge();

    // 2. Lo guardamos en tu base de datos (json-server)
    if (userId) {
      try {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: cart }) // Le pasamos el nuevo carrito
        });
      } catch (error) {
        console.error("Error al sincronizar carrito con la base de datos:", error);
      }
    }
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
async function setFavorites(favs) {
  const user = getCurrentUser();
  const userId = localStorage.getItem("memeba_currentUserId");

  if (user) {
    // 1. Al navegador
    localStorage.setItem(`memeba_favs_${user}`, JSON.stringify(favs));

    // 2. A la base de datos
    if (userId) {
      try {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorites: favs }) // Le pasamos los nuevos favoritos
        });
      } catch (error) {
        console.error("Error al sincronizar favoritos con la base de datos:", error);
      }
    }
  }
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

  // --- LO NUEVO: DETECTAR EL BOTÓN DE PAGAR ---
  const btnCheckout = e.target.closest("#btn-checkout");
  if (btnCheckout) {
      if (typeof processCheckout === "function") {
          processCheckout();
      } else {
          console.error("Falta la función processCheckout()");
      }
  }

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
  // --- DETECCIÓN DEL GACHA ---
  const btnGacha = e.target.closest("#btn-gacha");
  
  if (btnGacha) {
      if (!requireLogin(false)) return; // Obligamos a estar logueado
      tirarGacha();
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
        checkSearchMatch(g.title, search)
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
      const discount = Math.round(((game.oldPrice - game.newPrice) / game.oldPrice) * 100);
      return discount >= 40 && checkSearchMatch(game.title, search); // <--- Y AQUÍ
    });
    renderGameCards(lootGames, lootGrid);
  }
};

// --- FUNCIÓN DE CHECKOUT (PAGAR EL CARRITO) ---
async function processCheckout() {
    const userId = localStorage.getItem("memeba_currentUserId");
    const cart = getCart();

    if (!userId || cart.length === 0) {
        showToast("Tu carrito está vacío. ¡Añade algo primero!", "error");
        return;
    }

    try {
        // 1. Descargamos los datos más recientes del usuario y de la base de datos de juegos
        const userRes = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await userRes.json();
        const gamesRes = await fetch(`http://localhost:3000/gamesDatabase`);
        const gamesDb = await gamesRes.json();

        // 2. Calculamos el total a pagar y el ahorro total del carrito actual
        let totalCosto = 0;
        let totalAhorro = 0;
        const comprasNuevas = [];

        cart.forEach(cartItem => {
            const game = gamesDb.find(g => String(g.id) === String(cartItem.id));
            if (game) {
                totalCosto += (game.newPrice * cartItem.quantity);
                totalAhorro += ((game.oldPrice - game.newPrice) * cartItem.quantity);
                
                // Preparamos el registro para el historial de compras
                comprasNuevas.push({
                    gameId: game.id,
                    title: game.title,
                    pricePaid: game.newPrice,
                    quantity: cartItem.quantity,
                    date: new Date().toISOString()
                });
            }
        });

        const saldoActual = user.balance || 0;

        // 3. Comprobamos si hay suficiente guita
        if (saldoActual < totalCosto) {
            showToast(`¡Pobreza detectada! Te faltan ${(totalCosto - saldoActual).toFixed(2)}€`, "error");
            // Aquí podríamos redirigir a añadir fondos, o abrir el modal de fondos
            return;
        }

        // 4. Si hay dinero, realizamos la transacción
        const nuevoSaldo = saldoActual - totalCosto;
        const nuevoGastoTotal = (user.totalSpent || 0) + totalCosto;
        const nuevoAhorroTotal = (user.savings || 0) + totalAhorro;
        
        // Unimos las compras antiguas con las nuevas
        const historialCompras = user.purchases ? [...user.purchases, ...comprasNuevas] : comprasNuevas;

        // 5. Actualizamos el servidor
        const patchRes = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                balance: nuevoSaldo,
                totalSpent: nuevoGastoTotal,
                savings: nuevoAhorroTotal,
                purchases: historialCompras,
                cart: [] // ¡Vaciamos el carrito en el servidor!
            })
        });

        if (patchRes.ok) {
            // 6. Si el servidor dice OK, actualizamos el navegador
            localStorage.setItem(`memeba_cart_${user.username}`, JSON.stringify([])); // Vaciamos local
            updateCartBadge(); // Resetea el numerito a 0
            
            // Efecto visual épico de compra
            document.getElementById("cart-items-container").innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <i class="fas fa-check-circle" style="font-size: 80px; color: var(--price-green); margin-bottom: 20px;"></i>
                    <h2 style="color: var(--primary-purple); font-size: 32px; margin-top: 0;">¡Compra Exitosa!</h2>
                    <p style="font-size: 18px; font-weight: 600;">Te has ahorrado ${totalAhorro.toFixed(2)}€ en esta compra.</p>
                    <a href="index.html" class="btn-primary" style="margin-top: 20px;">Seguir Saqueando</a>
                </div>
            `;
            
            // Ocultamos el bloque de pagar
            const summaryBox = document.querySelector(".cart-summary");
            if(summaryBox) summaryBox.style.display = "none";
            
            // Actualizamos el saldo del header al instante
            const headerBal = document.getElementById("global-balance-text");
            if (headerBal) headerBal.textContent = `${nuevoSaldo.toFixed(2)}€`;
            
            showToast("¡Pago completado! Disfruta de los juegazos.", "success");
        }

    } catch (error) {
        console.error("Error durante el checkout:", error);
        showToast("Error conectando con el banco de Memeba.", "error");
    }
}

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
        accountBtn.innerHTML = `<i class="fas fa-user-circle"></i><span>PERFIL</span>`;
        accountBtn.href = "profile.html"; 
        accountBtn.title = `Sesión iniciada como: ${user}`;

        // --- 1. INYECTAR BOTÓN DE SALDO ARREGLADO ---
        const navContainer = accountBtn.parentNode; 
        
        if (navContainer && !document.getElementById("header-wallet-btn")) {
            const walletBtn = document.createElement("a");
            walletBtn.href = "#";
            walletBtn.id = "header-wallet-btn";
            walletBtn.className = accountBtn.className; 
            walletBtn.style.textDecoration = "none"; 
            
            // --- SIN COLORES FORZADOS: Dejamos que el CSS haga su magia ---
            walletBtn.innerHTML = `
                <i class="fas fa-wallet"></i>
                <span id="global-balance-text" style="font-weight: 900; font-size: 14px;">0.00€</span>
            `;
            
            // Lo insertamos UNA sola vez
            navContainer.insertBefore(walletBtn, accountBtn);

            // Cargar saldo al iniciar
            const userId = localStorage.getItem("memeba_currentUserId");
            fetch(`http://localhost:3000/users/${userId}`)
              .then(res => res.json())
              .then(userData => {
                  const balance = userData.balance || 0;
                  document.getElementById("global-balance-text").textContent = `${balance.toFixed(2)}€`;
              });

            // --- 2. CREAR EL MODAL CÓMIC DE INGRESO (Se inyecta en el body) ---
            let fundsModal = document.getElementById("quick-funds-modal");
            if (!fundsModal) {
                fundsModal = document.createElement("div");
                fundsModal.id = "quick-funds-modal";
                fundsModal.className = "modal-overlay hidden"; // Reutilizamos tu clase de modal oscuro
                fundsModal.innerHTML = `
                  <div class="modal-content" style="max-width: 400px;">
                    <h3 style="color: var(--price-green); font-size: 26px; margin-top: 0; margin-bottom: 10px;">
                      <i class="fas fa-money-bill-wave"></i> Ingreso Rápido
                    </h3>
                    <p style="font-weight: 600; color: #555; margin-bottom: 20px; font-size: 16px;">
                      ¿Cuánta mandanga quieres meter? (Max. 1000€)
                    </p>
                    <input type="number" id="quick-funds-input" class="comic-input" placeholder="Ej: 50" min="1" max="1000" style="width: 100%; margin-bottom: 20px; text-align: center; font-size: 24px;">
                    
                    <button id="btn-confirm-funds" class="btn-buy" style="width: 100%; margin-bottom: 10px; background: var(--price-green); color: white; border-color: #000;">Inyectar Saldo</button>
                    <button id="btn-cancel-funds" class="btn-secondary" style="width: 100%; padding: 10px; cursor: pointer;">Cancelar</button>
                  </div>
                `;
                document.body.appendChild(fundsModal);

                // Lógica de los botones del modal
                document.getElementById("btn-cancel-funds").addEventListener("click", () => {
                    fundsModal.classList.add("hidden");
                });

                document.getElementById("btn-confirm-funds").addEventListener("click", async () => {
                    const inputVal = document.getElementById("quick-funds-input").value;
                    const num = parseFloat(inputVal);
                    
                    if (num > 0 && num <= 1000) {
                        await processAddFunds(num); // Usa la función global que creamos antes
                        fundsModal.classList.add("hidden");
                        document.getElementById("quick-funds-input").value = ""; // Limpia el input
                    } else {
                        showToast("Cantidad inválida. Máximo 1000€.", "error");
                    }
                });
            }

            // --- 3. ABRIR EL MODAL AL HACER CLIC EN EL HEADER ---
            walletBtn.addEventListener("click", (e) => {
                e.preventDefault();
                document.getElementById("quick-funds-modal").classList.remove("hidden");
                document.getElementById("quick-funds-input").focus(); // Pone el cursor directo para escribir
            });
        }
      }

      updateCartBadge();
      
      // ==========================================
      // MOTOR DE BÚSQUEDA INTERACTIVO Y GLOBAL
      // ==========================================
      const searchBar = document.getElementById("search-bar");
      const searchContainer = searchBar ? searchBar.closest('.search-container') : null;

      if (searchBar && searchContainer) {
          // 1. Inyectamos la cajita de sugerencias en el HTML
          const suggestionsBox = document.createElement("div");
          suggestionsBox.className = "search-suggestions";
          searchContainer.appendChild(suggestionsBox);

          // 2. Al escribir, mostramos sugerencias en vivo
          searchBar.addEventListener("input", (e) => {
              const term = e.target.value.trim();
              
              // Si está en el index, aplicamos el filtro normal debajo también
              if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
                  applyFiltersGlobal();
              }

              if (term.length < 2) {
                  suggestionsBox.style.display = "none";
                  return;
              }

              // Buscamos coincidencias inteligentes
              const matches = gamesDatabase.filter(g => checkSearchMatch(g.title, term)).slice(0, 5); // Máximo 5 resultados

              if (matches.length > 0) {
                  suggestionsBox.innerHTML = matches.map(g => `
                      <a href="game.html?id=${g.id}" class="suggestion-item">
                          <img src="${g.img}" alt="${g.title}">
                          <div>
                              <div style="font-weight: 800; font-size: 16px;">${g.title}</div>
                              <div style="font-size: 14px; color: var(--price-green); font-weight: 900;">${parseFloat(g.newPrice).toFixed(2)}€</div>
                          </div>
                      </a>
                  `).join("");
              } else {
                  suggestionsBox.innerHTML = `<div style="padding: 15px; text-align: center; color: #666; font-weight: 600;">No hay rastro de "${term}" 🕵️‍♂️</div>`;
              }
              suggestionsBox.style.display = "block";
          });

          // 3. Ocultar sugerencias si pinchamos fuera
          document.addEventListener("click", (evt) => {
              if (!searchContainer.contains(evt.target)) {
                  suggestionsBox.style.display = "none";
              }
          });

          // 4. Lógica de Redirección (Al pulsar Enter o hacer click en la Lupa)
          const executeSearchRedirect = () => {
              const term = searchBar.value.trim();
              if (term) {
                  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
                      applyFiltersGlobal();
                      suggestionsBox.style.display = "none";
                  } else {
                      // Si no estamos en el Index, saltamos hacia allá pasándole la búsqueda por la URL
                      window.location.href = `index.html?search=${encodeURIComponent(term)}`;
                  }
              }
          };

          searchBar.addEventListener("keypress", (e) => {
              if (e.key === "Enter") {
                  e.preventDefault();
                  executeSearchRedirect();
              }
          });

          const searchButton = searchContainer.querySelector("button");
          if (searchButton) {
              searchButton.addEventListener("click", (e) => {
                  e.preventDefault();
                  executeSearchRedirect();
              });
          }
          
          // 5. Autocompletar la barra si venimos rebotados de otra página con búsqueda
          const urlParams = new URLSearchParams(window.location.search);
          const searchQuery = urlParams.get("search");
          if (searchQuery) {
              searchBar.value = searchQuery;
              // Le damos un respiro al DOM para cargar y aplicamos el filtro
              if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
                  setTimeout(applyFiltersGlobal, 200);
              }
          }
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

  // --- LÓGICA DEL DESPLEGABLE ESTILO CÓMIC ---
  const customSelectWrapper = document.querySelector('.custom-select-wrapper');
  if (customSelectWrapper) {
      const trigger = customSelectWrapper.querySelector('.custom-select-trigger');
      const triggerText = trigger.querySelector('span');
      const options = customSelectWrapper.querySelectorAll('.custom-option');
      const hiddenSelect = document.getElementById('sort-filter');

      // Abrir/cerrar al hacer clic
      trigger.addEventListener('click', function(e) {
          e.stopPropagation(); // Evita que el clic se propague al document
          customSelectWrapper.classList.toggle('open');
      });

      // Seleccionar una opción
      options.forEach(option => {
          option.addEventListener('click', function(e) {
              e.stopPropagation();
              // Cambiar el texto mostrado
              triggerText.textContent = this.textContent;
              
              // Marcar cuál está seleccionada para el CSS
              options.forEach(opt => opt.classList.remove('selected'));
              this.classList.add('selected');
              
              // Cerrar el menú
              customSelectWrapper.classList.remove('open');
              
              // Actualizar el select original oculto y disparar la orden de filtrar
              hiddenSelect.value = this.dataset.value;
              applyFiltersGlobal(); 
          });
      });

      // Cerrar si se hace clic fuera del menú
      document.addEventListener('click', function(e) {
          if (!customSelectWrapper.contains(e.target)) {
              customSelectWrapper.classList.remove('open');
          }
      });
      
      // Conectar el botón de "Restablecer Filtros" para que también limpie este menú
      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
          resetBtn.addEventListener("click", () => {
              triggerText.textContent = "Relevancia";
              options.forEach(opt => opt.classList.remove('selected'));
              options[0].classList.add('selected'); // Vuelve a marcar el primero
          });
      }
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
    const btnCheckout = document.getElementById("btn-checkout");
    if (btnCheckout) {
      const newBtn = btnCheckout.cloneNode(true);
      btnCheckout.parentNode.replaceChild(newBtn, btnCheckout);

      newBtn.addEventListener("click", () => {
        processCheckout();
      });
    }
  }

  const cart = getCart();
  const cartContainer = document.getElementById("cart-items-container");
  const totalPriceEl = document.getElementById("cart-total-price");

  if (!cartContainer || !totalPriceEl) return;
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<h3 style="text-align: center; padding: 40px;">Tu carrito está más vacío que mi cartera 🥲</h3>';
    totalPriceEl.textContent = "0.00€";
    
    // --- NUEVO: Ocultamos la caja de pagar si no hay juegos ---
    const summaryBox = document.querySelector(".cart-summary");
    if (summaryBox) summaryBox.style.display = "none";
    
    return;
  } else {
    // --- NUEVO: Nos aseguramos de que se vea si SÍ hay juegos ---
    const summaryBox = document.querySelector(".cart-summary");
    if (summaryBox) summaryBox.style.display = "block";
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
// --- FUNCIÓN PARA CARGAR LA PÁGINA INDIVIDUAL DEL JUEGO ---
async function loadGamePage() {
  if (!window.location.pathname.includes("game.html")) return;

  const params = new URLSearchParams(window.location.search);
  // CLAVE: No usamos parseInt, lo dejamos como texto por si json-server usa IDs de texto ("1")
  const gameId = params.get("id");
  const container = document.querySelector(".game-page-container");

  // Plantilla para errores bonita y estilo cómic
  const showError = (mensaje) => {
    container.innerHTML = `
      <div style="background: #ffffff; border: 3px solid #000; border-radius: 12px; padding: 40px; text-align: center; max-width: 600px; margin: 40px auto; box-shadow: 8px 8px 0px rgba(0,0,0,1);">
        <h2 style="color: var(--primary-purple); font-size: 28px; margin-top: 0;"><i class="fas fa-exclamation-triangle" style="color: #ff0044;"></i> ¡Fallo Crítico!</h2>
        <p style="font-size: 18px; font-weight: 600; color: #333;">${mensaje}</p>
        <a href="index.html" class="btn-buy" style="display: inline-block; margin-top: 20px; text-decoration: none; color: #000;">Volver a la tienda</a>
      </div>`;
  };

  if (!gameId) {
    showError("Necesitas hacer clic en un juego desde la tienda.");
    return;
  }

  try {
    // Le pedimos los datos directamente a tu json-server (Puerto 3000)
    const response = await fetch(`http://localhost:3000/gamesDatabase/${gameId}`);

    if (!response.ok) throw new Error("Juego no encontrado en el servidor");

    const game = await response.json();

    // 1. Rellenamos datos básicos
    document.title = `${game.title} | Memeba`;
    document.getElementById("g-title").textContent = game.title;
    document.getElementById("g-img").src = game.img;
    document.getElementById("g-platform").textContent = game.platform || "N/A";
    document.getElementById("g-old-price").textContent = `${parseFloat(game.oldPrice).toFixed(2)}€`;
    document.getElementById("g-new-price").textContent = `${parseFloat(game.newPrice).toFixed(2)}€`;
    document.getElementById("g-desc").textContent = game.description || "Descripción no disponible.";

    // 2. Cálculo de media de estrellas REAL
    let avgRating = 0;
    if (game.reviews && game.reviews.length > 0) {
        const totalScore = game.reviews.reduce((sum, rev) => sum + rev.score, 0);
        avgRating = parseFloat((totalScore / game.reviews.length).toFixed(2));
    } else {
        avgRating = parseFloat(game.rating) || 0;
    }

    const starPercentage = (avgRating / 5) * 100;
    const ratingContainer = document.querySelector(".average-rating");
    if (ratingContainer) {
        ratingContainer.innerHTML = `
            <div class="stars-outer">
                <div class="stars-inner" style="width: ${starPercentage}%"></div>
            </div>
            <span>${avgRating}</span>/5
        `;
    }

    // 3. Conectamos botones
    const btnCart = document.getElementById("g-btn-cart");
    const btnFav = document.getElementById("g-btn-fav");
    if(btnCart) btnCart.dataset.id = game.id;
    if(btnFav) btnFav.dataset.id = game.id;

    const favsStr = getFavorites().map(String);
    if (btnFav && favsStr.includes(String(game.id))) {
        btnFav.classList.add("liked");
    }

    // 4. Pintar reseñas
    const reviewsBox = document.getElementById("g-reviews-list");
    reviewsBox.innerHTML = "";

    if (game.reviews && game.reviews.length > 0) {
        game.reviews.forEach(review => {
          let starsHTML = "";
          for (let i = 1; i <= 5; i++) {
            starsHTML += i <= review.score ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
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
        reviewsBox.innerHTML = "<p style='font-weight: 800; font-size: 18px;'>Aún no hay reseñas para este juego. ¡Sé el primero!</p>";
    }

  } catch (error) {
    console.error("Error al cargar los detalles:", error);
    showError("El servidor json-server no responde o el juego ha desaparecido en un agujero negro.");
  }
}


// --- FUNCIÓN PARA CARGAR LA PÁGINA DE PERFIL ---
async function loadProfilePage() {
  if (!window.location.pathname.includes("profile.html")) return;

  if (!requireLogin(true)) return; 

  // Intentamos recuperar el ID
  const userId = localStorage.getItem("memeba_currentUserId");
  const container = document.querySelector(".profile-card");

  // Si no hay ID (es un usuario fantasma del código viejo), lo echamos al login
  if (!userId) {
      showToast("Sesión caducada. Por favor, vuelve a entrar.", "error");
      localStorage.removeItem("memeba_currentUser");
      setTimeout(() => { window.location.href = "login.html"; }, 1500);
      return;
  }

  try {
    // Le pedimos al servidor los datos frescos de este usuario
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    if (!response.ok) throw new Error("Usuario no encontrado en la BD");
    
    const userData = await response.json();

    // Pintamos sus datos en el HTML
    document.getElementById("p-username").textContent = userData.username;

    // --- NUEVO: SISTEMA DE TÍTULOS DINÁMICOS ---
    const totalGastado = userData.totalSpent || 0;
    let tituloRango = "Rata de Alcantarilla 🐀"; // Rango base (0€)

    if (totalGastado >= 1000) {
        tituloRango = "Amigo Personal de Abraham Reyes Nuñez";
    } else if (totalGastado >= 500) {
        tituloRango = "VIP de Memeba";
    } else if (totalGastado >= 200) {
        tituloRango = "Ludópata en Potencia";
    } else if (totalGastado >= 50) {
        tituloRango = "Gamer Promedio";
    } else if (totalGastado > 0) {
        tituloRango = "Tieso absoluto";
    }

    const titleElement = document.getElementById("p-title");
    if (titleElement) {
        titleElement.textContent = tituloRango;
        
        // Le damos un color especial si es muy rico
        if (totalGastado >= 500) {
            titleElement.style.color = "#ff0044"; // Rojo mítico para los VIP
            titleElement.style.textShadow = "1px 1px 0px #000";
        } else {
            titleElement.style.color = "var(--accent-yellow)"; // Amarillo normal
            titleElement.style.textShadow = "none";
        }
    }
    
    // Contamos cuántos favoritos y juegos en el carrito tiene
    const favCount = userData.favorites ? userData.favorites.length : 0;
    const cartCount = userData.cart ? userData.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

    document.getElementById("p-fav-count").textContent = favCount;
    document.getElementById("p-cart-count").textContent = cartCount;
    document.getElementById("w-current-balance").textContent = `${(userData.balance || 0).toFixed(2)}€`;
    document.getElementById("w-total-deposited").textContent = `${(userData.totalDeposited || 0).toFixed(2)}€`;
    document.getElementById("w-total-spent").textContent = `${(userData.totalSpent || 0).toFixed(2)}€`;

    // Configurar el botón de Cerrar Sesión
    const btnLogout = document.getElementById("btn-logout");
    if(btnLogout) {
        btnLogout.addEventListener("click", () => {
          localStorage.removeItem("memeba_currentUser");
          localStorage.removeItem("memeba_currentUserId");
          showToast("¡Sesión cerrada! Vuelve pronto.", "success");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        });
    }

    // --- NUEVO: Rellenar el Ahorro Total ---
    // En el futuro, sumaremos (oldPrice - newPrice) de los juegos en "userData.purchases".
    // Por ahora, simulamos 0.00€ o lo que tenga la base de datos en "savings".
    const totalSavings = userData.savings ? userData.savings : 0;
    document.getElementById("p-saved-money").textContent = `${totalSavings.toFixed(2)}€`;

    // --- NUEVO: Lógica del Modal de Ajustes de Perfil ---
    const linkEditProfile = document.getElementById("link-edit-profile");
    const settingsModal = document.getElementById("settings-modal");
    const btnCancelSettings = document.getElementById("btn-cancel-settings");
    const btnSaveSettings = document.getElementById("btn-save-settings");
    const inputEditUser = document.getElementById("edit-username");
    const inputEditPass = document.getElementById("edit-password");

    if (linkEditProfile && settingsModal) {
      // 1. Abrir Modal y rellenar con los datos actuales
      linkEditProfile.addEventListener("click", (e) => {
        e.preventDefault();
        inputEditUser.value = userData.username; // Precargamos su nombre
        inputEditPass.value = userData.password; // Precargamos su contraseña
        settingsModal.classList.remove("hidden");
      });

      // 2. Cancelar y cerrar
      btnCancelSettings.addEventListener("click", () => {
        settingsModal.classList.add("hidden");
      });

      // 3. Guardar cambios en el servidor
      btnSaveSettings.addEventListener("click", async () => {
        const newUsername = inputEditUser.value.trim();
        const newPassword = inputEditPass.value.trim();

        if (!newUsername || !newPassword) {
          showToast("¡Eh! No dejes campos vacíos.", "error");
          return;
        }

        try {
          // Comprobamos si el nuevo nombre ya está pillado (solo si lo ha cambiado)
          if (newUsername !== userData.username) {
            const checkRes = await fetch(`http://localhost:3000/users?username=${newUsername}`);
            const existingUsers = await checkRes.json();
            if (existingUsers.length > 0) {
              showToast("Ese nombre ya está pillado. Sé más original.", "error");
              return;
            }
          }

          // Enviamos la actualización (PATCH) a la base de datos
          const patchRes = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername, password: newPassword })
          });

          if (patchRes.ok) {
            showToast("¡Perfil actualizado con éxito!", "success");
            
            // EL TRUCO SENIOR: Migramos las claves del localStorage si cambió el nombre
            if (newUsername !== userData.username) {
              localStorage.removeItem(`memeba_cart_${userData.username}`);
              localStorage.removeItem(`memeba_favs_${userData.username}`);
              
              localStorage.setItem("memeba_currentUser", newUsername);
              localStorage.setItem(`memeba_cart_${newUsername}`, JSON.stringify(userData.cart || []));
              localStorage.setItem(`memeba_favs_${newUsername}`, JSON.stringify(userData.favorites || []));
            }
            
            // Actualizamos la pantalla y cerramos el modal sin tener que recargar
            document.getElementById("p-username").textContent = newUsername;
            userData.username = newUsername; 
            userData.password = newPassword;
            settingsModal.classList.add("hidden");
          }
        } catch (error) {
          console.error("Error al actualizar perfil:", error);
          showToast("Error al conectar con la base de datos.", "error");
        }
      });
    }

    // --- NAVEGACIÓN ENTRE VISTAS (PESTAÑAS) ---
    const linkSummary = document.getElementById("link-summary");
    const linkWallet = document.getElementById("link-wallet");
    const linkPurchases = document.getElementById("link-purchases"); // NUEVO
    
    const viewSummary = document.getElementById("view-summary");
    const viewWallet = document.getElementById("view-wallet");
    const viewPurchases = document.getElementById("view-purchases"); // NUEVO

    // Función auxiliar para limpiar colores del menú y ocultar todas las vistas
    const resetViews = () => {
        if(linkSummary) linkSummary.style.background = "transparent";
        if(linkWallet) linkWallet.style.background = "transparent";
        if(linkPurchases) linkPurchases.style.background = "transparent";
        
        if(viewSummary) viewSummary.classList.add("hidden");
        if(viewWallet) viewWallet.classList.add("hidden");
        if(viewPurchases) viewPurchases.classList.add("hidden");
    };

    if (linkSummary && linkWallet && linkPurchases) {
        linkSummary.addEventListener("click", (e) => {
            e.preventDefault();
            resetViews();
            linkSummary.style.background = "#fffacd";
            viewSummary.classList.remove("hidden");
        });

        linkWallet.addEventListener("click", (e) => {
            e.preventDefault();
            resetViews();
            linkWallet.style.background = "#fffacd";
            viewWallet.classList.remove("hidden");
        });

        // NUEVO EVENTO PARA LA PESTAÑA COMPRAS
        linkPurchases.addEventListener("click", (e) => {
            e.preventDefault();
            resetViews();
            linkPurchases.style.background = "#fffacd";
            viewPurchases.classList.remove("hidden");
        });
    }

    // --- PINTAR EL HISTORIAL DE COMPRAS ---
    const purchasesList = document.getElementById("purchases-list");
    if (purchasesList) {
        // Comprobamos si el usuario tiene compras en la base de datos
        if (userData.purchases && userData.purchases.length > 0) {
            // Le damos la vuelta (reverse) para que las compras más recientes salgan arriba del todo
            purchasesList.innerHTML = userData.purchases.reverse().map(p => `
                <div style="background: #fff; border: 2px solid #000; border-radius: 8px; padding: 15px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: 3px 3px 0px rgba(0,0,0,1);">
                    <div>
                        <h4 style="margin: 0; font-size: 18px; color: var(--primary-purple);">${p.title}</h4>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #555;">
                            <i class="far fa-calendar-alt"></i> ${new Date(p.date).toLocaleDateString()}
                        </p>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: block; font-weight: 900; color: var(--price-green); font-size: 18px;">${parseFloat(p.pricePaid).toFixed(2)}€</span>
                        <span style="font-size: 13px; font-weight: 600; color: #666;">Copias: ${p.quantity}</span>
                    </div>
                </div>
            `).join("");
        } else {
            // Diseño por si el historial está vacío
            purchasesList.innerHTML = `
                <div style="text-align: center; padding: 30px; background: #fffacd; border: 2px dashed #000; border-radius: 12px;">
                    <i class="fas fa-ghost" style="font-size: 40px; color: var(--primary-purple); margin-bottom: 10px;"></i>
                    <h3 style="margin: 0; color: #333;">Aún no has saqueado nada</h3>
                    <p style="color: #666; font-weight: 600;">¿A qué esperas para vaciar la tienda?</p>
                </div>
            `;
        }
    }

    // --- BOTÓN DE AÑADIR SALDO DESDE LA VISTA CARTERA ---
    const btnAddFunds = document.getElementById("btn-add-funds");
    const inputFunds = document.getElementById("input-add-funds");

    if (btnAddFunds) {
        btnAddFunds.addEventListener("click", async () => {
            const amount = parseFloat(inputFunds.value);
            if (amount > 0 && amount <= 1000) {
                await processAddFunds(amount);
                inputFunds.value = ""; // Limpiar el input
            } else {
                showToast("Introduce una cantidad válida (Max: 1000€)", "error");
            }
        });
    }

  } catch (error) {
    console.error("Error al cargar el perfil:", error);
    // Caja de error con opción a forzar cierre de sesión
    container.innerHTML = `
      <h2 style='color: #ff0044; font-size: 28px; margin-bottom: 20px;'>
        <i class="fas fa-exclamation-triangle"></i> Error de Conexión
      </h2>
      <p style='color: #333; font-weight: 600; font-size: 18px; margin-bottom: 30px;'>
        Tu sesión es antigua o el servidor de base de datos está apagado.
      </p>
      <button id="btn-force-logout" class="btn-reset" style="width: 100%; margin-top: 0;">
        <i class="fas fa-sign-out-alt"></i> Forzar Cierre de Sesión
      </button>
    `;
    
    document.getElementById("btn-force-logout").addEventListener("click", () => {
        localStorage.removeItem("memeba_currentUser");
        localStorage.removeItem("memeba_currentUserId");
        window.location.href = "login.html";
    });
  }
}

// --- FUNCIÓN GLOBAL PARA INYECTAR DINERO EN LA BD ---
async function processAddFunds(amount) {
  const userId = localStorage.getItem("memeba_currentUserId");
  if (!userId) return;

  try {
      // 1. Descargamos los datos actuales
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await res.json();

      // 2. Calculamos los nuevos totales (si no existen en la BD, empiezan en 0)
      const newBalance = (user.balance || 0) + amount;
      const newDeposited = (user.totalDeposited || 0) + amount;

      // 3. Subimos los datos al servidor (PATCH)
      const patchRes = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: newBalance, totalDeposited: newDeposited })
      });

      if (patchRes.ok) {
          showToast(`¡Has añadido ${amount.toFixed(2)}€ a tu cartera! 💸`, "success");
          
          // 4. Actualizamos el número del Header
          const headerBal = document.getElementById("global-balance-text");
          if (headerBal) headerBal.textContent = `${newBalance.toFixed(2)}€`;

          // 5. Si estamos en la página de perfil, actualizamos las cajas también
          const profileBal = document.getElementById("w-current-balance");
          if (profileBal) {
              profileBal.textContent = `${newBalance.toFixed(2)}€`;
              document.getElementById("w-total-deposited").textContent = `${newDeposited.toFixed(2)}€`;
          }
      }
  } catch (error) {
      console.error("Error al añadir fondos:", error);
      showToast("No tienes ni un duro cabron, no podemos añadir saldo", "error");
  }
}

// --- ARRANQUE DE PÁGINAS INDIVIDUALES ---
document.addEventListener("DOMContentLoaded", () => {
  // Arranca la lógica de la página del juego (si estamos en game.html)
  if (typeof loadGamePage === "function") {
      loadGamePage();
  }
  
  // Arranca la lógica de la página de perfil (si estamos en profile.html)
  if (typeof loadProfilePage === "function") {
      loadProfilePage();
  }
});

// ==========================================
// 🎰 SISTEMA GACHA (LA CAJA DE BOTÍN)
// ==========================================
async function tirarGacha() {
    const userId = localStorage.getItem("memeba_currentUserId");
    if (!userId) return;

    if (!gamesDatabase || gamesDatabase.length === 0) {
        showToast("La tienda está vacía. Vuelve luego.", "error");
        return;
    }

    try {
        // 1. Miramos la cartera del usuario
        const userRes = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await userRes.json();
        const PRECIO_GACHA = 15;

        const saldoActual = user.balance || 0;
        if (saldoActual < PRECIO_GACHA) {
            showToast("¡No tienes 15€! Deja de mendigar y añade saldo.", "error");
            return;
        }

        // 2. LA RULETA: Elegimos un juego aleatorio
        const randomIndex = Math.floor(Math.random() * gamesDatabase.length);
        const premio = gamesDatabase[randomIndex];

        // 3. Cobramos los 15€ y guardamos la compra en el historial
        const nuevoSaldo = saldoActual - PRECIO_GACHA;
        const nuevoGastoTotal = (user.totalSpent || 0) + PRECIO_GACHA;
        
        const nuevaCompra = {
            gameId: premio.id,
            title: `[GACHA] ${premio.title}`, // Le ponemos etiqueta Gacha
            pricePaid: PRECIO_GACHA, // Pagó 15€ por él
            quantity: 1,
            date: new Date().toISOString()
        };

        const historialCompras = user.purchases ? [...user.purchases, nuevaCompra] : [nuevaCompra];

        // 4. Actualizamos el servidor
        const patchRes = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                balance: nuevoSaldo,
                totalSpent: nuevoGastoTotal,
                purchases: historialCompras
            })
        });

        if (patchRes.ok) {
            // Actualizamos la pasta en el Header de inmediato
            const headerBal = document.getElementById("global-balance-text");
            if (headerBal) headerBal.textContent = `${nuevoSaldo.toFixed(2)}€`;
            
            // ¡Mostramos el pantallazo épico del premio!
            mostrarPremioGacha(premio);
        }

    } catch (error) {
        console.error("Error en el Gacha:", error);
        showToast("El casino se ha roto. Inténtalo de nuevo.", "error");
    }
}

// Ventana emergente estilo cómic para el premio animado (TAMAÑO CINE)
function mostrarPremioGacha(premio) {
    let modal = document.getElementById("gacha-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "gacha-modal";
        modal.className = "modal-overlay hidden";
        document.body.appendChild(modal);
    }
    
    // Calculamos si ha ganado dinero (STONKS) o lo ha perdido (TIMADA)
    const isStonks = premio.newPrice > 15;
    const mensajeStonks = isStonks ? "¡GAMBLING ALWAYS WIN! 📈" : "¡TIMADA MESOPOTAMICA! 📉";
    const colorStonks = isStonks ? "var(--price-green)" : "#ff0044";
    const bgStonks = isStonks ? "#e6ffed" : "#ffe6e6";

    // Hemos pasado el max-width a 800px y aumentado todos los márgenes y textos
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 800px; width: 90%; background: ${bgStonks}; transition: all 0.3s; position: relative; padding: 40px;">
            <h2 style="color: var(--primary-purple); font-size: 42px; margin-top: 0; text-transform: uppercase; text-shadow: 2px 2px #fff;">
                <i class="fas fa-gift"></i> ¡GAMBLING A TOPE!
            </h2>
            
            <div id="gacha-roulette-container" style="display: none; position: relative; margin-bottom: 30px; height: 280px; overflow: hidden; background: #1a0b2e; border: 4px solid #000; border-radius: 12px; box-shadow: inset 0px 0px 20px rgba(0,0,0,0.9);">
                
                <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 8px; background: var(--accent-yellow); z-index: 10; transform: translateX(-50%); box-shadow: 0 0 10px #000;"></div>
                
                <div id="gacha-roulette" style="display: flex; position: absolute; left: 0; top: 20px; height: 240px; align-items: center;">
                </div>
            </div>
            
            <img id="gacha-premio-img" src="${premio.img}" style="width: 100%; max-width: 600px; height: 350px; object-fit: cover; border-radius: 12px; border: 4px solid #000; margin: 0 auto 20px auto; box-shadow: 6px 6px 0px rgba(0,0,0,1); display: none;">
            
            <h3 id="gacha-premio-title" style="margin: 0 0 15px 0; font-size: 32px; display: none;">${premio.title}</h3>
            
            <div id="gacha-stonks-box" style="background: #fff; padding: 20px; border: 3px dashed #000; border-radius: 12px; margin-bottom: 30px; display: none;">
                <p style="font-size: 28px; font-weight: 900; color: ${colorStonks}; margin: 0;">${mensajeStonks}</p>
                <p style="font-size: 18px; color: #555; margin: 8px 0 0 0;">Valor en tienda: <strong>${parseFloat(premio.newPrice).toFixed(2)}€</strong></p>
            </div>
            
            <button id="btn-cerrar-gacha" class="btn-primary" style="width: 100%; font-size: 26px; padding: 20px; display: none; cursor: pointer;">ACEPTAR MI DESTINO</button>
        </div>
    `;
    
    modal.classList.remove("hidden");

    animarRuletaGacha(premio);

    document.getElementById("btn-cerrar-gacha").addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

// ==========================================
// 🎲 ANIMACIÓN DE RULETA GACHA (LA DEFINITIVA)
// ==========================================
function animarRuletaGacha(premio) {
    const rouletteContainer = document.getElementById("gacha-roulette-container");
    const roulette = document.getElementById("gacha-roulette");
    const premioImg = document.getElementById("gacha-premio-img");
    const premioTitle = document.getElementById("gacha-premio-title");
    const stonksBox = document.getElementById("gacha-stonks-box");
    const btnCerrar = document.getElementById("btn-cerrar-gacha");

    rouletteContainer.style.display = "block"; 
    roulette.innerHTML = ""; 
    roulette.style.transition = "none"; 
    roulette.style.transform = "translateX(0px)";

    const iteraciones = 40; 
    
    // --- IMÁGENES TAMAÑO CINE ---
    const itemWidth = 300; 
    const spaceBetween = 20; 
    const fullItemWidth = itemWidth + spaceBetween;
    const winnerIndex = 32; 

    for (let i = 0; i < iteraciones; i++) {
        const gameToInsert = (i === winnerIndex) ? premio : gamesDatabase[Math.floor(Math.random() * gamesDatabase.length)];
        
        const img = document.createElement("img");
        img.src = gameToInsert.img;
        
        img.style.boxSizing = "border-box"; 
        img.style.width = `${itemWidth}px`;
        img.style.height = "220px"; // Mucho más altas
        img.style.objectFit = "cover";
        img.style.marginRight = `${spaceBetween}px`;
        img.style.borderRadius = "10px";
        img.style.border = "4px solid #fff"; 
        img.style.flexShrink = "0"; 
        
        roulette.appendChild(img);
    }

    const containerWidth = rouletteContainer.clientWidth; 
    const offsetToCenter = (containerWidth / 2) - (itemWidth / 2); 
    
    const distanceToScroll = (winnerIndex * fullItemWidth) - offsetToCenter;

    setTimeout(() => {
        roulette.style.transition = "transform 5s cubic-bezier(0.15, 0.85, 0.3, 1)"; 
        roulette.style.transform = `translateX(-${distanceToScroll}px)`;
    }, 50);

    roulette.addEventListener("transitionend", () => {
        setTimeout(() => {
            rouletteContainer.style.display = "none"; 
            premioImg.style.display = "block"; 
            premioTitle.style.display = "block"; 
            stonksBox.style.display = "block"; 
            btnCerrar.style.display = "block";
        }, 600);
    }, { once: true });
}

// ==========================================
// 🟢⚪ EASTER EGG: EL CÓDIGO BETIS ⚪🟢
// ==========================================

let teclasPulsadas = "";

document.addEventListener('keydown', function(e) {
    // Solo guardamos letras normales (ignoramos Shift, Enter, etc.)
    if (e.key.length > 1) return;

    // Añadimos la tecla pulsada y la pasamos a minúscula
    teclasPulsadas += e.key.toLowerCase();

    // Solo nos interesan las últimas 5 letras ("betis" tiene 5)
    if (teclasPulsadas.length > 5) {
        teclasPulsadas = teclasPulsadas.slice(-5);
    }

    // Si coincide... ¡DESATAMOS LA LOCURA!
    if (teclasPulsadas === "betis") {
        desatarLocuraBetica();
        teclasPulsadas = ""; // Reseteamos por si lo quiere escribir otra vez
    }
});

function desatarLocuraBetica() {
    // Si ya está abierto, no hacemos nada
    if (document.getElementById("betis-modal")) return;

    // Creamos la pantalla gigante
    const modal = document.createElement("div");
    modal.id = "betis-modal";
    modal.className = "modal-overlay";
    modal.style.zIndex = "999999"; // Por encima de todo
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.background = "rgba(0, 154, 68, 0.9)"; // Fondo verde bético transparente

    modal.innerHTML = `
        <div style="text-align: center; transform: scale(0); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);" id="betis-content">
            <img src="assets/BetisMeme.jpg" alt="Logo Betis" style="width: 500betispx; filter: drop-shadow(0px 0px 30px #fff); margin-bottom: 20px;">
                 <style="width: 300px; filter: drop-shadow(0px 0px 30px #fff); margin-bottom: 20px;">
            
            <h1 style="color: #fff; font-size: 60px; text-shadow: 4px 4px 0px #000, -2px -2px 0px #000; margin: 0; font-weight: 900; text-transform: uppercase;">
                ¡Musho Betis!
            </h1>
            <p style="color: #fff; font-size: 24px; font-weight: bold; background: #000; display: inline-block; padding: 10px 20px; border-radius: 8px; margin-top: 10px;">
                Has desbloqueado el mayor tesoro de la tienda.
            </p>
            <br>
            <button id="cerrar-betis" class="btn-primary" style="margin-top: 30px; font-size: 24px; padding: 15px 40px; background: #fff; color: #009A64; border: 4px solid #000;">
                Seguir comprando (y sufriendo)
            </button>
        </div>

        <audio id="audio-betis" src="assets/himno-betis.mp3" autoplay></audio>
    `;

    document.body.appendChild(modal);

    // Pequeño truco para que haga el efecto de "explotar" hacia la pantalla
    setTimeout(() => {
        document.getElementById("betis-content").style.transform = "scale(1)";
    }, 50);

    // Botón para cerrar y apagar la música
    document.getElementById("cerrar-betis").addEventListener("click", () => {
        const audio = document.getElementById("audio-betis");
        if(audio) audio.pause(); // Apagamos el himno
        modal.remove(); // Destruimos la prueba del delito
    });
}