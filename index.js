const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";

const URL_DETAIL = `https://cs-steam-game-api.herokuapp.com/single-game/`;

let errorMsg;

async function getAllGames() {
  try {
    const response = await fetch(`${BASE_URL}/games`);
    if (response.ok) {
      const data = await response.json();
      const allGames = data.data;
      return allGames;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getGenresList() {
  try {
    const response = await fetch(`${BASE_URL}/genres`);
    if (response.ok) {
      const data = await response.json();
      const genresList = data.data;
      return genresList;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getAllGenresList(genres) {
  try {
    const response = await fetch(`${BASE_URL}/games?genres=${genres}`);
    if (response.ok) {
      const data = await response.json();
      const genresList = data.data;
      return genresList;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getTagsList() {
  try {
    const response = await fetch(`${BASE_URL}/steamspy-tags`);
    if (response.ok) {
      const data = await response.json();
      const tagsList = data.data;
      return tagsList;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getSingleGameDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/single-game/${id}`);
    if (response.ok) {
      const data = await response.json();
      const gameDetail = data.data;
      return gameDetail;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getSearch(name) {
  try {
    const response = await fetch(`${BASE_URL}/games?q=${name}`);
    if (response.ok) {
      const data = await response.json();
      const genresList = data.data;
      return genresList;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function platform_tags(type, key) {
  try {
    const response = await fetch(`${BASE_URL}/games?${type}=${key}`);
    if (response.ok) {
      const data = await response.json();
      const genresList = data.data;
      return genresList;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

const genresListElement = document.querySelector(".button");
const genresList = async () => {
  const genres = await getGenresList();
  genres.forEach((code) => {
    const button = document.createElement("button");
    button.classList.add("category");
    button.textContent = code.name;
    genresListElement.appendChild(button);
  });
};
genresList();

function create(code) {
  const game = document.createElement("div");
  game.id = "gametest";
  game.classList.add("game");
  game.classList.add(code.appid);
  allGamesElement.appendChild(game);

  const image = document.createElement("img");
  image.src = code.header_image;
  image.classList.add("game-pic");
  image.classList.add(code.appid);
  game.appendChild(image);

  const description = document.createElement("div");
  description.classList.add("box-description");
  description.classList.add(code.appid);
  game.appendChild(description);

  const gameName = document.createElement("span");
  gameName.textContent = code.name;
  gameName.classList.add("gameName");
  gameName.classList.add(code.appid);
  description.appendChild(gameName);

  const gamePrice = document.createElement("span");
  if (code.price === 0) {
    gamePrice.textContent = "Free to play";
  } else {
    gamePrice.textContent = `${code.price} $`;
  }
  gamePrice.classList.add("gamePrice");
  gamePrice.classList.add(code.appid);
  description.appendChild(gamePrice);
}

const allGamesElement = document.querySelector("#allgames");
const btnCategory = document.querySelector(".tool-category");
const divGenres = document.querySelector("#allGenres");
const divGameList = document.querySelector(".gameList");
const divdetailGame = document.querySelector(".detailGame");
const input = document.querySelector(".search");
const btn = document.querySelector(".btn-search");
const home = document.querySelector(".home");
const gameGenresText = document.querySelector(".gameGenresText");
let appid;

const allgames = async () => {
  const gamesList = await getAllGames();
  gamesList.forEach((code) => {
    create(code);
  });
};
allgames();

const allGenresGames = async (genres) => {
  const gamesList = await getAllGenresList(genres);
  gamesList.forEach((code) => {
    create(code);
  });
};

const allSearch = async (name) => {
  const gamesList = await getSearch(name);
  gamesList.forEach((code) => {
    create(code);
  });
};

btnCategory.addEventListener("click", (e) => {
  allGamesElement.innerHTML = "";
  divdetailGame.innerHTML = "";
  let element = e.target;
  allGamesElement.style.display = "flex";
  divdetailGame.style.display = "none";
  allGenresGames(element.textContent);
  gameGenresText.textContent = element.textContent;
});

divGameList.addEventListener("click", (e) => {
  allGamesElement.style.display = "none";
  divdetailGame.style.display = "flex";
  // divGenres.innerHTML = "";
  // allGamesElement.innerHTML = "";
  let element = e.target;
  appid = parseFloat(element.classList[1]);
  divdetailGame.style.display = "flex";
  gameGenresText.textContent = "DETAIL";
  gameDetail();
});

const gameDetail = async () => {
  const detailList = await getSingleGameDetail(appid);

  const divDetail = document.createElement("div");
  divDetail.classList.add("gameDetail");
  divdetailGame.appendChild(divDetail);

  const image = document.createElement("img");
  image.src = detailList.header_image;
  image.classList.add("game-pic-detail");
  divDetail.appendChild(image);

  const description = document.createElement("div");
  description.classList.add("box-description-detail");
  divDetail.appendChild(description);

  const gameName = document.createElement("span");
  gameName.textContent = detailList.name;
  gameName.classList.add("gameName");
  description.appendChild(gameName);

  const gamePrice = document.createElement("span");
  if (detailList.price === 0) {
    gamePrice.textContent = "Free to play";
  } else {
    gamePrice.textContent = `${detailList.price} $`;
  }
  gamePrice.classList.add("gamePrice");
  description.appendChild(gamePrice);

  const gameDescription = document.createElement("div");
  gameDescription.classList.add("description");
  gameDescription.textContent = `Description: ${detailList.description}`;
  divDetail.appendChild(gameDescription);

  const age = document.createElement("div");
  age.classList.add("age");
  age.textContent = `Required age: ${detailList.required_age}`;
  divDetail.appendChild(age);

  const platforms = document.createElement("div");
  platforms.classList.add("platformsList");
  // platforms.textContent = `Platforms: ${(detailList.platforms).join(', ')}`
  platforms.textContent = "Platforms: ";
  divDetail.appendChild(platforms);

  detailList.platforms.forEach((code) => {
    const allPlatforms = document.createElement("button");
    allPlatforms.classList.add("platforms");
    allPlatforms.textContent = code;
    platforms.appendChild(allPlatforms);
  });

  const tagsList = document.createElement("div");
  tagsList.classList.add("tagsList");
  tagsList.textContent = "Tags: ";
  divDetail.appendChild(tagsList);

  detailList.steamspy_tags.forEach((code) => {
    const allTags = document.createElement("button");
    allTags.classList.add("tags");
    allTags.textContent = code;
    tagsList.appendChild(allTags);
  });
};

btn.addEventListener("click", (e) => {
  console.log(input.value);
  allGamesElement.innerHTML = "";
  divdetailGame.innerHTML = "";
  allGamesElement.style.display = "flex";
  divdetailGame.style.display = "none";
  allSearch(input.value);
  gameGenresText.textContent = "SEARCH";
});

home.addEventListener("click", (e) => {
  allGamesElement.innerHTML = "";
  divdetailGame.innerHTML = "";
  allGamesElement.style.display = "flex";
  divdetailGame.style.display = "none";
  allgames();
  gameGenresText.textContent = "ALL GAME";
  console.log(platformsList);
});

const getplatforms_tags = async (type, key) => {
  const gamesList = await platform_tags(type, key);
  gamesList.forEach((code) => {
    create(code);
  });
};

const platformsList = document.querySelector(".detailGame");
platformsList.addEventListener("click", (e) => {
  allGamesElement.innerHTML = "";
  divdetailGame.innerHTML = "";
  allGamesElement.style.display = "flex";
  divdetailGame.style.display = "none";

  let element = e.target;
  if (element.classList[0] === "platforms") {
    getplatforms_tags(element.classList[0], element.textContent);
    // allSearch(element.textContent);
  } else if (element.classList[0] === "tags") {
    // allSearch(element.textContent);
    getplatforms_tags("steamspy_tags", element.textContent);
  }
});
