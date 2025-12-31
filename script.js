const stories = [
  {
    title: "The Laughing Robot",
    genre: "fun",
    description: "A robot who learns humor in a strange way."
  },
  {
    title: "Jungle Treasure",
    genre: "adventure",
    description: "A risky journey through the deep jungle."
  },
  {
    title: "Office Pranks",
    genre: "fun",
    description: "A series of harmless but hilarious pranks."
  },
  {
    title: "Lost Island",
    genre: "adventure",
    description: "Surviving on a mysterious island."
  }
];

const storyList = document.getElementById("storyList");
const searchInput = document.getElementById("searchInput");
const genreButtons = document.querySelectorAll(".genre-btn");

let selectedGenre = "all";

// Render stories
function renderStories() {
  storyList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  const filteredStories = stories.filter(story => {
    const matchesGenre =
      selectedGenre === "all" || story.genre === selectedGenre;

    const matchesSearch =
      story.title.toLowerCase().includes(searchText);

    return matchesGenre && matchesSearch;
  });

  filteredStories.forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";

    card.innerHTML = `
      <h3>${story.title}</h3>
      <p>${story.description}</p>
    `;

    storyList.appendChild(card);
  });
}

// Search event
searchInput.addEventListener("input", renderStories);

// Genre button events
genreButtons.forEach(button => {
  button.addEventListener("click", () => {
    genreButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    selectedGenre = button.dataset.genre;
    renderStories();
  });
});

// Initial render (show all stories)
renderStories();
