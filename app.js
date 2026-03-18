// Base de datos de juegos
const gamesDatabase = [
  // PC
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

  // PlayStation
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

  // Xbox
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

  // Nintendo (Usando imágenes adaptadas)
  {
    id: 20,
    title: "Zelda: Tears of the Kingdom",
    platform: "Nintendo",
    oldPrice: 69.99,
    newPrice: 55.0,
    img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000063714/b0b5e90d3d57fdfb15802d3ee8a4d79435b6c3be568aa688b13ff7eaae3d1ba3",
  },
  {
    id: 21,
    title: "Mario Kart 8 Deluxe",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.99,
    img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000125/8626605e55cd7820a4d0485a3a7f8ee88e7a0364d93f7702bf929aa1f868d4a5",
  },
  {
    id: 22,
    title: "Super Smash Bros Ultimate",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 48.5,
    img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9",
  },
  {
    id: 23,
    title: "Animal Crossing: New Horizons",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.9,
    img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a",
  },
  {
    id: 24,
    title: "Super Mario Odyssey",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 35.0,
    img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
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

// Referencias al DOM (los elementos de la página)
const gameGrid = document.getElementById("game-grid");
const checkboxes = document.querySelectorAll(".filter-platform");
const priceSlider = document.getElementById("price-filter");
const priceDisplay = document.getElementById("price-display");
const searchBar = document.getElementById("search-bar");

// Función para calcular el porcentaje de descuento
function calculateDiscount(oldPrice, newPrice) {
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return Math.round(discount); // Redondeamos para que no tenga decimales
}

// Función principal que dibuja los juegos en la pantalla
function renderGames(gamesToRender) {
  // 1. Limpiamos la cuadrícula
  gameGrid.innerHTML = "";

  // 2. Si no hay juegos, mostramos un mensaje
  if (gamesToRender.length === 0) {
    gameGrid.innerHTML =
      '<h3 style="grid-column: 1/-1; text-align: center; padding: 40px;">No hemos encontrado juegos de risa con esos filtros 😢</h3>';
    return;
  }

  // 3. Recorremos la lista y creamos el HTML para cada juego
  gamesToRender.forEach((game) => {
    const discountPercentage = calculateDiscount(game.oldPrice, game.newPrice);

    // Asignamos una clase de color según la plataforma
    let tagClass = "tag-pc";
    let iconClass = "fas fa-desktop";

    if (game.platform === "PlayStation") {
      tagClass = "tag-playstation";
      iconClass = "fab fa-playstation";
    }
    if (game.platform === "Xbox") {
      tagClass = "tag-xbox";
      iconClass = "fab fa-xbox";
    }
    if (game.platform === "Nintendo") {
      tagClass = "tag-nintendo";
      iconClass = "fas fa-gamepad";
    }

    // Creamos la tarjeta
    const cardHTML = `
            <div class="card scroll-anim">
                <div class="card-img" style="background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5)), url('${game.img}');">
                    <span class="platform-tag ${tagClass}"><i class="${iconClass}"></i> ${game.platform}</span>
                    <span class="discount-badge">-${discountPercentage}%</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${game.title}</h3>
                    <div class="card-footer">
                        <div class="price-box">
                            <span class="old-price">${game.oldPrice.toFixed(2)}€</span>
                            <span class="new-price">${game.newPrice.toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

    gameGrid.insertAdjacentHTML("beforeend", cardHTML);
  });

  // 4. Reactivamos la animación de scroll para las nuevas tarjetas
  animateCards();
}

// Lógica de Filtros
function applyFilters() {
  // A) Saber qué plataformas están marcadas
  const selectedPlatforms = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // B) Saber el precio máximo
  const maxPrice = parseFloat(priceSlider.value);

  // C) Saber qué han escrito en el buscador
  const searchTerm = searchBar.value.toLowerCase();

  // D) Filtrar la base de datos
  const filteredGames = gamesDatabase.filter((game) => {
    const matchesPlatform = selectedPlatforms.includes(game.platform);
    const matchesPrice = game.newPrice <= maxPrice;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm);

    return matchesPlatform && matchesPrice && matchesSearch;
  });

  // E) Dibujar los juegos filtrados
  renderGames(filteredGames);
}

// Animación de aparición suave
function animateCards() {
  const cards = document.querySelectorAll(".scroll-anim");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Pequeño retraso para que aparezcan en cascada
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 50);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  cards.forEach((card) => observer.observe(card));
}

// --- EVENTOS (Escuchar cuando el usuario toca algo) ---

// Cuando cambia una casilla de plataforma
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

// Cuando se mueve el deslizador de precio
priceSlider.addEventListener("input", (e) => {
  priceDisplay.textContent = e.target.value + "€";
  applyFilters();
});

// Cuando se escribe en el buscador
searchBar.addEventListener("keyup", applyFilters);

// --- INICIO ---
// Dibujar todos los juegos la primera vez que carga la página
document.addEventListener("DOMContentLoaded", () => {
  renderGames(gamesDatabase);
});
