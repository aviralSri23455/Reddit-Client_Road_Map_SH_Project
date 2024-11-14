# Build a Multi-Lane Reddit Client with JavaScript and Reddit API

This project is a browser-based Reddit client that displays multiple subreddits in separate, customizable lanes. The application uses the Reddit JSON feed to fetch posts from different subreddits and displays them in a dynamic, responsive layout. Users can add and remove subreddit lanes, and the application saves custom lanes to local storage to retain them after a page reload.

![Alt text](../Reddit-Client_Road_Map_SH_Project/Image/reddit-client.png)



## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [File Structure](#file-structure)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Local Storage](#local-storage)
- [Code Explanation](#code-explanation)
- [Future Improvements](#future-improvements)


## Features

- Display multiple subreddit feeds in separate lanes
- Add lanes by entering a subreddit name
- Verify the existence of a subreddit before adding
- Display posts in each lane, showing:
  - Post title
  - Number of upvotes
- Refresh and delete lanes individually
- Save lanes to local storage for persistence
- Error handling for invalid subreddits and network issues

## Demo

You can view the [live demo here](https://roadmap.sh/projects/reddit-client) or clone the project and run it locally following the steps below. The complete tutorial for building this project can be found at [Build a Multi-Lane Reddit Client with JavaScript and Reddit API](https://roadmap.sh/projects/reddit-client).

## Technologies Used

- **HTML/CSS**: For structure and styling
- **JavaScript**: For interactivity, API integration, and state management
- **Reddit JSON Feed**: For fetching subreddit data

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aviralSri23455/Reddit-Client_Road_Map_SH_Project.git
   cd reddit-client
   ```

## Project Structure

```bash
reddit-client/
├── index.html          # Main HTML file
├── CSS/
│   └── styles.css      # Main stylesheet
├── Javascript/
│   └── script.js       # JavaScript file
└── README.md          # Documentation
```

Simply open `index.html` in your browser to run the application.

## File Structure

- `index.html`: Contains the structure of the application, including buttons and the popup for adding lanes
- `styles.css`: Provides styling for the layout, buttons, and popup modal
- `script.js`: Handles the interactivity, API calls to Reddit, and data persistence in local storage

## Usage

### Adding a New Subreddit Lane
1. Click the "+" button on the right to add a new subreddit lane
2. A popup will appear asking for the subreddit name
3. Enter a subreddit name (e.g., javascript)
4. Click "Add Subreddit" to create a new lane

### Interacting with Lanes
Each subreddit lane displays posts and has the following controls:
- **Refresh Button**: Click to reload posts for the selected subreddit
- **Delete Button**: Removes the lane from the view

## API Reference

### Reddit JSON Feed
To fetch posts from a subreddit, the app uses the following endpoint:

```
https://www.reddit.com/r/{subreddit}.json
```

Replace `{subreddit}` with the name of the subreddit you want to fetch.

Example API call in JavaScript:
```javascript
const subreddit = 'javascript';
fetch(`https://www.reddit.com/r/${subreddit}.json`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

## Error Handling

- If the subreddit does not exist, an error message will be shown in the lane (e.g., "Error loading subreddit")
- If there are network issues or API errors, an appropriate message is shown

## Local Storage

The app saves all active lanes to local storage. When you reload the page, it restores the lanes based on your previous selections.

## Code Explanation

### HTML Structure (index.html)
```html
<div class="container">
  <div class="lane-container" id="laneContainer">
    <!-- Lanes will be dynamically added here -->
  </div>
  <div class="add-lane">
    <button id="addLaneButton">+</button>
  </div>
</div>
```

- `.container`: Main container for the app
- `#laneContainer`: Where all subreddit lanes will be dynamically added
- `#addLaneButton`: Button to trigger the popup for adding new lanes

### CSS Styling (styles.css)
```css
.container {
  display: flex;
  height: 100vh;
}

.lane-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 20px;
}
```

- `.container`: Ensures the main container takes up the full viewport height
- `.lane-container`: Displays lanes horizontally and allows for scrolling if there are many lanes

### JavaScript Functionality (script.js)

#### Adding a New Lane
```javascript
function addSubredditLane(subreddit) {
  const lane = document.createElement("div");
  lane.className = "lane";
  lane.innerHTML = `<h3>/r/${subreddit}</h3>`;
  // Add posts and buttons here
  laneContainer.appendChild(lane);
}
```

- Creates a new lane with the subreddit name at the top
- Adds buttons for refreshing and deleting the lane
- Calls the Reddit API to fetch and display posts in the lane

#### Fetching Posts
```javascript
async function fetchSubredditPosts(subreddit, container) {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!response.ok) throw new Error("Subreddit not found");

    const data = await response.json();
    data.data.children.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <p class="post-title">${post.data.title}</p>
        <p class="post-votes">↑ ${post.data.ups}</p>
      `;
      container.appendChild(postElement);
    });
  } catch (error) {
    container.innerHTML = "<p>Error loading subreddit</p>";
  }
}
```

- Uses fetch to retrieve posts for a specific subreddit
- Iterates over the posts and dynamically adds them to the lane
- If an error occurs (e.g., invalid subreddit), displays an error message

#### Local Storage Persistence
```javascript
window.addEventListener("beforeunload", () => {
  const lanes = Array.from(document.querySelectorAll(".lane")).map(lane => lane.dataset.subreddit);
  localStorage.setItem("lanes", JSON.stringify(lanes));
});
```

- Saves the current list of subreddit lanes to local storage when the page is unloaded
- When the page loads again, it reads from local storage and restores the lanes

## Future Improvements

- Search Functionality: Allow users to search within the displayed posts
- Post Details: Provide additional information like comments and post date
- Dark Mode: Add a dark mode toggle for user preference
- Pagination: Add "Load More" functionality to view more posts in each lane

