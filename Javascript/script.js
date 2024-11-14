document.addEventListener("DOMContentLoaded", function () {
  const addLaneButton = document.getElementById("addLaneButton");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  const addSubredditButton = document.getElementById("addSubreddit");
  const subredditInput = document.getElementById("subredditInput");
  const laneContainer = document.getElementById("laneContainer");

  // Show popup to add new subreddit
  addLaneButton.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    subredditInput.value = "";
  });

  // Add new subreddit lane
  addSubredditButton.addEventListener("click", () => {
    const subreddit = subredditInput.value.trim();
    if (subreddit) {
      addSubredditLane(subreddit);
      subredditInput.value = "";
      popup.style.display = "none";
    }
  });

  // Add subreddit lane to the interface
  function addSubredditLane(subreddit) {
    const lane = document.createElement("div");
    lane.className = "lane";

    const laneHeader = document.createElement("h3");
    laneHeader.textContent = `/r/${subreddit}`;
    lane.appendChild(laneHeader);

    const postsContainer = document.createElement("div");
    postsContainer.className = "posts-container";
    lane.appendChild(postsContainer);

    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh";
    refreshButton.onclick = () => fetchSubredditPosts(subreddit, postsContainer);
    lane.appendChild(refreshButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => lane.remove();
    lane.appendChild(deleteButton);

    laneContainer.appendChild(lane);
    fetchSubredditPosts(subreddit, postsContainer);
  }

  // Fetch posts from subreddit
  async function fetchSubredditPosts(subreddit, container) {
    container.innerHTML = "<p>Loading...</p>";
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      if (!response.ok) throw new Error("Subreddit not found");

      const data = await response.json();
      container.innerHTML = ""; // Clear loading state
      data.data.children.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post";

        const title = document.createElement("p");
        title.className = "post-title";
        title.textContent = post.data.title;

        const votes = document.createElement("p");
        votes.className = "post-votes";
        votes.textContent = `↑ ${post.data.ups}`;

        postElement.appendChild(votes);
        postElement.appendChild(title);
        container.appendChild(postElement);
      });
    } catch (error) {
      container.innerHTML = "<p>Error loading subreddit</p>";
    }
  }
});
