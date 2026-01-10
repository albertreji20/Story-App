const API_URL = "https://storyapp-backend-jv1y.onrender.com/api/stories";

let allStories = [];
let currentGenre = "all";

// Fetch stories
async function fetchStories() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allStories = data;
    applyFilters();
  } catch (err) {
    console.error("Failed to fetch stories", err);
  }
}

// Render stories
function displayStories(stories) {
  const storyList = document.getElementById("storyList");
  const template = document.getElementById("storyCardTemplate");

  storyList.innerHTML = "";

  if (stories.length === 0) {
    storyList.textContent = "No stories found.";
    return;
  }

  stories.forEach(story => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".story-title").textContent = story.title;
    clone.querySelector(".story-genre").innerHTML =
      `<b>Genre:</b> ${story.genre}`;
    clone.querySelector(".story-desc").textContent =
      story.description;

    clone.querySelector(".story-card").onclick = () => {
      window.location.href = `story.html?id=${story._id}`;
    };

    storyList.appendChild(clone);
  });
}

// Genre filter
document.querySelectorAll(".genre-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentGenre = btn.dataset.genre;
    applyFilters();
  });
});

// Search filter
document.getElementById("searchInput")
  .addEventListener("input", applyFilters);

// Apply filters
function applyFilters() {
  let filtered = [...allStories];

  if (currentGenre !== "all") {
    filtered = filtered.filter(
      story => story.genre === currentGenre
    );
  }

  const searchText =
    document.getElementById("searchInput").value.toLowerCase();

  if (searchText) {
    filtered = filtered.filter(story =>
      story.title.toLowerCase().includes(searchText) ||
      story.description.toLowerCase().includes(searchText)
    );
  }

  displayStories(filtered);
}

// Initial load
fetchStories();


async function wakeServer() {
  try {
    await fetch(API_URL);
  } catch (err) {
    console.log("Waking server...");
  } finally {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
  }
}

wakeServer();
