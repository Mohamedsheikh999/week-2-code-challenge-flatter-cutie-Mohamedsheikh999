document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const nameEl = document.getElementById('name');
  const imageEl = document.getElementById('image');
  const voteCountEl = document.getElementById('vote-count');
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');

  let allCharacters = [];
  let currentCharacter = null;

  // Fetch characters from the server
  function fetchCharacters() {
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(characters => {
        allCharacters = characters;
        displayCharacters(characters);
      })
      .catch(error => console.error('Error fetching characters:', error));
  }

  // Display characters in the character bar
  function displayCharacters(characters) {
    characterBar.innerHTML = '';

    characters.forEach(character => {
      const span = document.createElement('span');
      span.textContent = character.name || 'Unnamed Character'; 
      span.dataset.id = character.id;

      span.addEventListener('click', () => {
        displayCharacterDetails(character);
      });

      characterBar.appendChild(span);
    });
  }

  // Display character details
  function displayCharacterDetails(character) {
    currentCharacter = character;

    nameEl.textContent = character.name;
    const imageUrl = character.image ? character.image : 'default-image-url.jpg';
    console.log(`Displaying image for ${character.name}: ${imageUrl}`); 
    if (!character.image) {
      console.warn(`Image URL missing for ${character.name}, using default image.`);
    }
    imageEl.src = imageUrl;
    imageEl.alt = character.name;
    voteCountEl.textContent = character.votes;
  }

  // Handle votes form submission
  votesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value);

    if (currentCharacter && !isNaN(votes)) {
      currentCharacter.votes += votes;
      voteCountEl.textContent = currentCharacter.votes;
      votesForm.reset();
    }
  });

  // Handle reset votes button click
  resetBtn.addEventListener('click', () => {
    if (currentCharacter) {
      currentCharacter.votes = 0;
      voteCountEl.textContent = '0';
    }
  });

  // Initial fetch of characters
  fetchCharacters();
});
