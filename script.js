const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");
const loadBtn = document.getElementById("loadBtn");
const loadingContainer = document.getElementById("loadingContainer");



async function fetchCharacter() {

    try {

        loadingContainer.style.display = "block";
        characterImage.style.display = "none";
        characterName.textContent = "";

        const response = await fetch(
            "https://api.disneyapi.dev/character"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch character");
        }

        const data = await response.json();

        const randomIndex = Math.floor(
            Math.random() * data.data.length
        );

        const character = data.data[randomIndex];

        displayCharacter(character);

    } catch (error) {
        loadingContainer.textContent = error.message;
    }
}

function displayCharacter(character) {

    characterImage.src =
        character.imageUrl ||
        "https://via.placeholder.com/400x500?text=No+Image";

    characterName.textContent = character.name;

    characterImage.onload = () => {
        loadingContainer.style.display = "none";
        characterImage.style.display = "block";
    };
}

loadBtn.addEventListener("click", fetchCharacter);

fetchCharacter();