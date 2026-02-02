// TV Shows Data
const tvShows = [
    { title: "Stranger Things", desc: "A group of kids uncover supernatural mysteries.", img: "https://images.hdqwalls.com/download/stranger-things-fanmade-poster-5k-w6-1280x2120.jpg", trailer: "https://www.youtube.com/embed/mnd7sFt5c3A" },
    { title: "Money Heist", desc: "A criminal mastermind plans the biggest heist.", img: "https://wallpapercave.com/wp/wp7241850.jpg", trailer: "https://www.youtube.com/embed/_InqQJRqGW4" },
    { title: "The Witcher", desc: "A mutated monster hunter struggles to find his place.", img: "https://picsum.photos/seed/witcher/300/170", trailer: "https://www.youtube.com/embed/ndl1W4ltcmg" },
    { title: "Breaking Bad", desc: "A chemistry teacher turns to making meth.", img: "https://picsum.photos/seed/breakingbad/300/170", trailer: "https://www.youtube.com/embed/HhesaQXLuRY" },
    { title: "The Crown", desc: "The reign of Queen Elizabeth II.", img: "https://picsum.photos/seed/thecrown/300/170", trailer: "https://www.youtube.com/embed/JbPz5K1PzpY" }
];

// Display Banner (pick first TV show as banner)
function displayBanner() {
    const banner = document.getElementById("banner");
    const title = document.getElementById("banner-title");
    const desc = document.getElementById("banner-desc");

    const featured = tvShows[0]; // first show as featured
    banner.style.backgroundImage = `url('${featured.img}')`;
    title.textContent = featured.title;
    desc.textContent = featured.desc;

    window.openBannerModal = () => {
        openModal(featured.trailer, featured.title);
    };
}

// Display Horizontal Row
function displayTVShowsRow() {
    const container = document.getElementById("tvshows-container");
    container.innerHTML = "";

    tvShows.forEach(show => {
        const card = document.createElement("div");
        card.className = "show-card";
        card.innerHTML = `
            <img src="${show.img}" alt="${show.title}">
            <div class="show-info">
                <h3>${show.title}</h3>
                <p>${show.desc}</p>
                <button class="btn btn-play" onclick="openModal('${show.trailer}','${show.title}')">▶ Play</button>
                <button class="btn btn-info" onclick="openModal('${show.trailer}','${show.title}')">ℹ More Info</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize
window.onload = () => {
    displayBanner();
    displayTVShowsRow();
};
