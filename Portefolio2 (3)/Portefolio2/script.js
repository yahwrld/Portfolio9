// Initialisation des animations de défilement
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + window.innerHeight;

  sections.forEach((section) => {
    if (section.offsetTop < scrollPos) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
});

// Configuration initiale des sections pour l'animation
document.querySelectorAll('section').forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.8s ease-in-out';
});

// Liste des films avec leurs détails
const movies = {
  totoro: {
    title: "Mon voisin Totoro",
    release: "1988",
    ratings: "98%",
    summary: "Deux jeunes filles découvrent des esprits magiques dans la forêt, notamment le bienveillant Totoro.",
    slides: [
      "Images\Totori_pic1.jpg",
      "Images\Totori_pic2.jpg",
      "Images\Totori_pic3.jpg",
    ],
  },
  "spirited-away": {
    title: "Le Voyage de Chihiro",
    release: "2001",
    ratings: "97%",
    summary: "Chihiro se retrouve dans un monde magique dirigé par des esprits, où elle doit sauver ses parents transformés en cochons.",
    slides: [
      "Images\PrincessMononoko_pic2.jpg",
      "Images\spirited away pic2.jpg",
      "Images\spirited away pic3.jpg",
    ],
  },
  "princess-mononoke": {
    title: "Princesse Mononoké",
    release: "1997",
    ratings: "96%",
    summary: "Dans un Japon médiéval fantastique, un jeune guerrier se retrouve au milieu d'un conflit entre l'homme et la nature.",
    slides: [
      "Images\𝐏𝐫𝐢𝐧𝐜𝐞𝐬𝐬 𝐦𝐨𝐧𝐨𝐧𝐨𝐤𝐞 𝐢𝐜𝐨𝐧 _pic1.jpg",
      "Images\Princess Mononoke.jpg",
      "Images\PrincessMononoko_pic2.jpg",
    ],
  },
};

// Fonction pour ouvrir une modale de film
function openModal(movieKey) {
  const movie = movies[movieKey];
  if (!movie) return;

  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-summary").textContent = movie.summary;
  document.getElementById("movie-release").textContent = movie.release;
  document.getElementById("movie-ratings").textContent = movie.ratings;

  const slidesContainer = document.getElementById("movie-slides");
  slidesContainer.innerHTML = ""; // Vider les anciennes images
  movie.slides.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${movie.title} slide`;
    slidesContainer.appendChild(img);
  });

  document.getElementById("movie-modal").style.display = "flex";
}

// Gestion des clics sur les éléments de film
document.querySelectorAll(".movie").forEach((movieElement) => {
  movieElement.addEventListener("click", () => {
    const movieKey = movieElement.getAttribute("data-movie");
    openModal(movieKey);
  });
});

// Gestion de la modale "Lire plus"
document.getElementById("read-more").addEventListener("click", () => {
  document.getElementById("bio-modal").style.display = "flex";
});

// Gestion des fermetures de modales
function closeModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
  });
}

document.querySelectorAll(".modal .close").forEach((closeButton) => {
  closeButton.addEventListener("click", closeModals);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModals();
  });
});
