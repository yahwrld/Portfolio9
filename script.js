// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Initialize scroll animations
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

// Initial setup for sections
document.querySelectorAll('section').forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.8s ease-in-out';
});

// Movie details
const movies = {
  totoro: {
    title: "Mon voisin Totoro",
    release: "1988",
    ratings: "98%",
    summary: "Deux jeunes filles découvrent des esprits magiques dans la forêt, notamment le bienveillant Totoro.",
    slides: [
      "Images/Totori_pic1.jpg",
      "Images/Totori_pic2.jpg",
      "Images/Totori_pic3.jpg",
      "Images/Totori_pic4.jpg",
      "Images/Totori_pic5.jpg",
      "Images/𝒕𝒐𝒕𝒐𝒓𝒐_pic5.jpg",
      "Images/Totori_pic6.jpg",
    ],
  },
  "spirited-away": {
    title: "Le Voyage de Chihiro",
    release: "2001",
    ratings: "97%",
    summary: "Chihiro se retrouve dans un monde magique dirigé par des esprits, où elle doit sauver ses parents transformés en cochons.",
    slides: [
      "Images/spirited away pic1.jpg",
      "Images/spirited away pic2.jpg",
      "Images/spirited away pic3.jpg",
      "Images/spirited away pic5.jpg",
      "Images/spirited away pic6.jpg",
      "Images/Spirited Away wallpaper.jpg",
      "Images/SpirtedAway_pic4.jpg",
    ],
  },
  "princess-mononoke": {
    title: "Princesse Mononoké",
    release: "1997",
    ratings: "96%",
    summary: "Dans un Japon médiéval fantastique, un jeune guerrier se retrouve au milieu d'un conflit entre l'homme et la nature.",
    slides: [
      "Images/𝐏𝐫𝐢𝐧𝐜𝐞𝐬𝐬 𝐦𝐨𝐧𝐨𝐧𝐨𝐤𝐞 𝐢𝐜𝐨𝐧 _pic1.jpg",
      "Images/PrincessMononoko_pic3.jpg",
      "Images/PrincessMononoko_pic2.jpg",
    ],
  },
  "howls-moving-castle": {
    title: "Le Château Ambulant",
    release: "2004",
    ratings: "95%",
    summary: "Sophie, une jeune fille transformée en vieille femme, cherche à briser la malédiction avec l'aide du mystérieux Howl et de son château ambulant.",
    slides: [
      "Images/spirited away pic1.jpg", // Affiche du film
      "Images/ch2.jpg", // Sophie et Howl
      "Images/ch3.jpg", // Le château ambulant
      "Images/ch5.jpg", // Scène avec Calcifer
      "Images/Chat1.jpg", // Scène finale
    ],
  },
  "the-wind-rises": {
    title: "Le Vent se Lève",
    release: "2013",
    ratings: "88%",
    summary: "L'histoire de Jiro Horikoshi, un ingénieur aéronautique japonais, et de son rêve de créer des avions magnifiques.",
    slides: [
      "Images/v4.jpg", // Affiche du film
      "Images/v2.jpg", // Jiro et Naoko
      "Images/v3.jpg", // Scène de conception d'avion
      "Images/v5.jpg", // Scène avec le vent
      "Images/v6.jpg", // Scène finale
    ],
  },
  "kikis-delivery-service": {
    title: "Kiki la petite sorcière",
    release: "1989",
    ratings: "96%",
    summary: "Kiki, une jeune sorcière, part vivre seule pour accomplir son apprentissage. Avec son chat Jiji, elle ouvre un service de livraison dans une nouvelle ville.",
    slides: [
      "Images/kik2.jpg",
      "Images/kik3.jpg",
      "Images/Kiki4.jpg",
      "Images/Kiki5.jpg",
      "hImages/Kiki7.jpg",
    ],
  },
  "the-boy-and-the-heron": {
    title: "Le Garçon et le Héron",
    release: "2023",
    ratings: "9/10",
    summary: "Un jeune garçon part à la recherche de sa mère disparue et découvre un monde fantastique peuplé de créatures magiques et de mystères.",
    slides: [
      "Images/b1.jpg",
      "Images/b3.jpg",
      "Images/b4.jpg",
      "Images/b5.jpg",
      "Images/b6.jpg",
    ],
  },
  "castle-in-the-sky": {
    title: "Le Château dans le Ciel",
    release: "1986",
    ratings: "95%",
    summary: "Pazu et Sheeta partent à la recherche de Laputa, une île flottante légendaire, tout en étant poursuivis par des pirates et des agents gouvernementaux.",
    slides: [
      "Images/C1.jpg",
      "Images/C2.jpg",
      "Images/C3.jpg",
      "Images/C4.jpg",
      "Images/C5.jpg",
    ],
  },

};

// Fonction pour ouvrir la modale avec navigation
function openModal(movieKey) {
  const movie = movies[movieKey];
  if (!movie) return;

  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-summary").textContent = movie.summary;
  document.getElementById("movie-release").textContent = movie.release;
  document.getElementById("movie-ratings").textContent = movie.ratings;

  const slidesContainer = document.querySelector("#movie-slides .slide-container");
  slidesContainer.innerHTML = ""; // Supprime les anciennes images

  // Ajout des images dans le conteneur
  movie.slides.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${movie.title} slide`;
    slidesContainer.appendChild(img);
  });

  // Initialisation du diaporama
  currentSlideIndex = 0;
  updateSlides();

  document.getElementById("movie-modal").style.display = "flex";
}

// Variables pour le diaporama
let currentSlideIndex = 0;

// Fonction pour mettre à jour les slides
function updateSlides() {
  const slidesContainer = document.querySelector("#movie-slides .slide-container");
  const slides = slidesContainer.querySelectorAll("img");
  const totalSlides = slides.length;

  // Calcul de la translation
  const translateX = -currentSlideIndex * slidesContainer.clientWidth;

  // Applique la transformation
  slidesContainer.style.transform = `translateX(${translateX}px)`;
}

// Gestion des flèches de navigation
document.querySelector(".left-arrow").addEventListener("click", () => {
  const slidesContainer = document.querySelector("#movie-slides .slide-container");
  const totalSlides = slidesContainer.querySelectorAll("img").length;

  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateSlides();
  }
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  const slidesContainer = document.querySelector("#movie-slides .slide-container");
  const totalSlides = slidesContainer.querySelectorAll("img").length;

  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
    updateSlides();
  }
});


// Add click event to movie elements
document.querySelectorAll(".movie").forEach((movieElement) => {
  movieElement.addEventListener("click", () => {
    const movieKey = movieElement.getAttribute("data-movie");
    openModal(movieKey);
  });
});

// Open biography modal
document.getElementById("read-more").addEventListener("click", () => {
  document.getElementById("bio-modal").style.display = "flex";
});

// Close modals
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

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const icon = darkModeToggle.querySelector('i');

  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  const icon = darkModeToggle.querySelector('i');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading Animation
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.style.display = 'none';
});

// Open Image Modal
function openImageModal(images) {
  const modal = document.getElementById('image-modal');
  const modalImages = document.getElementById('modal-images');
  modalImages.innerHTML = ''; // Clear previous images

  images.split(',').forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Additional Image';
    modalImages.appendChild(img);
  });

  modal.style.display = 'block';
}

// Close Image Modal
function closeImageModal() {
  const modal = document.getElementById('image-modal');
  modal.style.display = 'none';
}

// Add Click Event to Images
document.querySelectorAll('.clickable-image').forEach((image) => {
  image.addEventListener('click', () => {
    const images = image.getAttribute('data-images');
    openImageModal(images);
  });
});

// Close Modal on Click Outside
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeImageModal();
  });
});

// Close Modal on Close Button Click
document.querySelectorAll('.modal .close').forEach((closeButton) => {
  closeButton.addEventListener('click', closeImageModal);
});

// Open Citation Modal
function openCitationModal(images) {
  const modal = document.getElementById('citation-modal');
  const modalImages = document.getElementById('modal-images');
  modalImages.innerHTML = ''; // Clear previous images

  images.split(',').forEach((src) => {
    const img = document.createElement('img');
    img.src = src.trim();
    img.alt = 'Additional Image';
    modalImages.appendChild(img);
  });

  modal.style.display = 'block';
}

// Close Citation Modal
function closeCitationModal() {
  const modal = document.getElementById('citation-modal');
  modal.style.display = 'none';
}

// Add Click Event to Citation Cards
document.querySelectorAll('.citation-card').forEach((card) => {
  card.addEventListener('click', () => {
    const images = card.getAttribute('data-images');
    openCitationModal(images);
  });
});

// Close Modal on Click Outside
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCitationModal();
  });
});

// Close Modal on Close Button Click
document.querySelectorAll('.modal .close').forEach((closeButton) => {
  closeButton.addEventListener('click', closeCitationModal);
});

// Open CV Modal
function openCVModal(title, details) {
  const modal = document.getElementById('cv-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDetails = document.getElementById('modal-details');

  modalTitle.textContent = title;
  modalDetails.innerHTML = details;
  modal.style.display = 'block';
}

// Close CV Modal
function closeCVModal() {
  const modal = document.getElementById('cv-modal');
  modal.style.display = 'none';
}

// Add Click Event to Milestones
document.querySelectorAll('.milestone').forEach((milestone) => {
  milestone.addEventListener('click', () => {
    const title = milestone.querySelector('h3').textContent;
    const details = milestone.getAttribute('data-details');
    openCVModal(title, details);
  });
});

// Close Modal on Click Outside
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCVModal();
  });
});

// Close Modal on Close Button Click
document.querySelectorAll('.modal .close').forEach((closeButton) => {
  closeButton.addEventListener('click', closeCVModal);
});
// Initialize scroll animations for milestones
document.addEventListener('scroll', () => {
  const milestones = document.querySelectorAll('.milestone');
  const scrollPos = window.scrollY + window.innerHeight;

  milestones.forEach((milestone) => {
    if (milestone.offsetTop < scrollPos) {
      milestone.classList.add('visible');
    }
  });
});

// Initial setup for milestones
document.querySelectorAll('.milestone').forEach((milestone) => {
  milestone.style.opacity = 1; // Ensure milestones are visible by default
  milestone.style.transform = 'translateY(0)'; // Reset transform
});
// Hide loading animation when the page is fully loaded
window.addEventListener('load', () => {
  console.log('Page fully loaded!'); // Debugging
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  } else {
    console.error('Loading element not found!');
  }
});

// Fallback: Hide loading animation after a delay
setTimeout(() => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  } else {
    console.error('Loading element not found!');
  }
}, 3000); // Hide after 3 seconds (adjust as needed)

// Background Music
const music = document.getElementById('background-music');
music.volume = 0.5; // Set initial volume to 50%

// Music Toggle Button
const musicToggle = document.getElementById('music-toggle');
const volumeSlider = document.getElementById('volume-slider');

// Toggle music play/pause
if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
    } else {
      music.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>'; // Music icon
    }
  });
}

// Update volume when slider changes
if (volumeSlider) {
  volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
  });
}

// Sound Effects
const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('click-sound');

// Add hover sound to all buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    if (hoverSound) {
      hoverSound.currentTime = 0; // Reset sound to start
      hoverSound.play();
    }
  });

  button.addEventListener('click', () => {
    if (clickSound) {
      clickSound.currentTime = 0; // Reset sound to start
      clickSound.play();
    }
  });
});