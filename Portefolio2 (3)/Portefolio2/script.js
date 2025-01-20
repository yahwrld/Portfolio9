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
    ],
  },
  "spirited-away": {
    title: "Le Voyage de Chihiro",
    release: "2001",
    ratings: "97%",
    summary: "Chihiro se retrouve dans un monde magique dirigé par des esprits, où elle doit sauver ses parents transformés en cochons.",
    slides: [
      "Images/PrincessMononoko_pic2.jpg",
      "Images/spirited away pic2.jpg",
      "Images/spirited away pic3.jpg",
    ],
  },
  "princess-mononoke": {
    title: "Princesse Mononoké",
    release: "1997",
    ratings: "96%",
    summary: "Dans un Japon médiéval fantastique, un jeune guerrier se retrouve au milieu d'un conflit entre l'homme et la nature.",
    slides: [
      "Images/𝐏𝐫𝐢𝐧𝐜𝐞𝐬𝐬 𝐦𝐨𝐧𝐨𝐧𝐨𝐤𝐞 𝐢𝐜𝐨𝐧 _pic1.jpg",
      "Images/Princess Mononoke.jpg",
      "Images/PrincessMononoko_pic2.jpg",
    ],
  },
};

// Open movie modal
function openModal(movieKey) {
  const movie = movies[movieKey];
  if (!movie) return;

  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-summary").textContent = movie.summary;
  document.getElementById("movie-release").textContent = movie.release;
  document.getElementById("movie-ratings").textContent = movie.ratings;

  const slidesContainer = document.getElementById("movie-slides");
  slidesContainer.innerHTML = ""; // Clear previous slides
  movie.slides.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${movie.title} slide`;
    slidesContainer.appendChild(img);
  });

  document.getElementById("movie-modal").style.display = "flex";
}

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