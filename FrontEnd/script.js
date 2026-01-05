const API_URL = "https://storyapp-backend-jv1y.onrender.com/api/stories";


let allStories = [];
let currentGenre = "all";

// Fetch stories from backend
async function fetchStories() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allStories = data;
    displayStories(allStories);
  } catch (err) {
    console.error("Failed to fetch stories", err);
  }
}

// Display stories
function displayStories(stories) {
  const storyList = document.getElementById("storyList");
  storyList.innerHTML = "";

  if (stories.length === 0) {
    storyList.innerHTML = "<p>No stories found.</p>";
    return;
  }

  stories.forEach((story) => {
    const div = document.createElement("div");
div.className = "story-card";
div.style.cursor = "pointer";

div.onclick = () => {
  window.location.href = `story.html?id=${story._id}`;
};


    div.innerHTML = `
      <h3>${story.title}</h3>
      <p><b>Genre:</b> ${story.genre}</p>
      <p>${story.description}</p>
    `;

    storyList.appendChild(div);
  });
}

// Genre buttons
document.querySelectorAll(".genre-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentGenre = btn.dataset.genre;
    applyFilters();
  });
});

// Search input
document.getElementById("searchInput").addEventListener("input", applyFilters);

// Apply search + genre filters
function applyFilters() {
  let filtered = allStories;

  if (currentGenre !== "all") {
    filtered = filtered.filter(
      story => story.genre === currentGenre
    );
  }

  const text = document
    .getElementById("searchInput")
    .value.toLowerCase();

  if (text) {
    filtered = filtered.filter(
      story =>
        story.title.toLowerCase().includes(text) ||
        story.description.toLowerCase().includes(text)
    );
  }

  displayStories(filtered);
}

// Initial load
fetchStories();
