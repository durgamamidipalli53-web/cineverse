// --- DATA ---
const movies = [
    {
        id: 1,
        title: "Shyam Singha Roy",
        desc: "In a dystopian future, a lone hacker discovers a conspiracy that threatens the very fabric of reality.",
        banner: "https://picfiles.alphacoders.com/576/576497.jpg",
        poster: "https://picfiles.alphacoders.com/576/576497.jpg",
        category: "Trending Now",
        videoId: "QliDRYaknmI"

    },
    {
        id: 2,
        title: "They Call Him OG",
        desc: "An explorer unearths an ancient civilization hidden deep within the Amazon rainforest.",
        banner: "https://cdn.123telugu.com/content/wp-content/uploads/2025/09/OG-Pawan-Kalyan.webp",
        poster: "https://cdn.123telugu.com/content/wp-content/uploads/2025/09/OG-Pawan-Kalyan.webp",
        category: "Trending Now",
        trailer: "https://www.youtube.com/watch?v=5PSNL1qE6VY" // URL
    },
    {
        id: 3,
        title: "Akhanda 2",
        desc: "High-octane street racing action where the stakes are life and death.",
        banner: "https://assets-in.bmscdn.com/discovery-catalog/events/et00416621-ngjpzfawdm-landscape.jpg",
        poster: "https://assets-in.bmscdn.com/discovery-catalog/events/et00416621-ngjpzfawdm-landscape.jpg",
        category: "Trending Now",
        trailer: "https://www.youtube.com/watch?v=u3F9n_smGWY"
    },
    {
        id: 4,
        title: "Stranger Things",
        desc: "A psychological thriller about a detective who can hear the thoughts of the dead.",
        banner: "https://4kwallpapers.com/images/wallpapers/stranger-things-2560x1440-18568.jpg",
        poster: "https://4kwallpapers.com/images/wallpapers/stranger-things-2560x1440-18568.jpg",
        category: "Top Rated",
        trailer: ""
    }
];

// --- STATE ---
let activeMovie = movies[0];

// --- DOM ---
const heroEl = document.getElementById("hero");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const navbar = document.getElementById("navbar");
const rowsContainer = document.getElementById("rows-container");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const iframe = document.getElementById("trailer-player");
const urlInput = document.getElementById("youtube-url");
const errorMsg = document.getElementById("error-message");

// --- INIT ---
document.addEventListener("DOMContentLoaded", init);

function init() {
    updateHero(activeMovie);
    renderRows();

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// --- HERO ---
function updateHero(movie) {
    heroEl.style.backgroundImage = `url('${movie.banner}')`;
    heroTitle.textContent = movie.title;
    heroDesc.textContent = movie.desc;
    activeMovie = movie;
}

// --- ROWS ---
function renderRows() {
    const categories = [...new Set(movies.map(m => m.category))];

    categories.forEach(cat => {
        const row = document.createElement("div");

        const title = document.createElement("h3");
        title.className = "row-title";
        title.textContent = cat;

        const scroller = document.createElement("div");
        scroller.className = "row-scroller";

        movies
            .filter(m => m.category === cat)
            .forEach(movie => {
                const card = document.createElement("div");
                card.className = "movie-card";
                card.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}">
                    <div class="card-info">
                        <h4>${movie.title}</h4>
                        <p>Click to Play</p>
                    </div>
                `;

                card.addEventListener("mouseenter", () => updateHero(movie));
                card.addEventListener("click", () => openModalWithMovie(movie));

                scroller.appendChild(card);
            });

        row.appendChild(title);
        row.appendChild(scroller);
        rowsContainer.appendChild(row);
    });
}

// --- MODAL ---
function openModalWithMovie(movie) {
    modalTitle.innerText = movie.title;

    const videoId = extractVideoID(movie.videoId);

    if (videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
        urlInput.value = `https://www.youtube.com/watch?v=${videoId}`;
        errorMsg.style.display = "none";
    } else {
        iframe.src = "";
        urlInput.value = "";
        errorMsg.style.display = "block";
    }

    modal.classList.add("active");
}


function closeModal() {
    modal.classList.remove("active");
    iframe.src = "";
}

modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

// --- CUSTOM URL LOAD ---
function loadCustomTrailer() {
    const url = urlInput.value.trim();
    const videoId = extractVideoID(url);

    if (videoId) {
        errorMsg.style.display = "none";
        loadVideoById(videoId);
    } else {
        errorMsg.style.display = "block";
    }
}

// --- YOUTUBE HELPERS ---
function extractVideoID(input) {
    if (!input) return null;

    // If only ID given
    if (input.length === 11 && !input.includes("http")) {
        return input;
    }

    const regExp =
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = input.match(regExp);
    return match ? match[1] : null;
}


function loadVideoById(id) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
}
