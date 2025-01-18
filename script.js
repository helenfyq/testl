const celebrityElement = document.getElementById('celebrity');
const refreshButton = document.getElementById('refresh');

async function getCelebrity() {
  try {
    // Get today's date
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // Fetch data from Wikipedia API
    const response = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    
    // Select a random celebrity
    if (data.births && data.births.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.births.length);
      const celebrity = data.births[randomIndex];
      return `${celebrity.text} (${celebrity.year})`;
    } else {
      return 'No notable birthdays found for today';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Failed to load celebrity data';
  }
}

async function updateCelebrity() {
  celebrityElement.textContent = 'Loading...';
  const celebrity = await getCelebrity();
  celebrityElement.textContent = celebrity;
}

// Initial load
updateCelebrity();

// Refresh button click
refreshButton.addEventListener('click', updateCelebrity);
