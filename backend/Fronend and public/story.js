const API_URL = "http://localhost:3000/api/stories";

// Get story ID from URL
const params = new URLSearchParams(window.location.search);
const storyId = params.get("id");

async function loadStory() {
  if (!storyId) {
    document.body.innerHTML = "<p>Story not found.</p>";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${storyId}`);
    const story = await res.json();

    document.getElementById("storyTitle").innerText = story.title;
    document.getElementById("storyContent").innerText = story.content;
  } catch (err) {
    document.body.innerHTML = "<p>Error loading story.</p>";
  }
}

loadStory();
