const baseRoute = `https://pokeapi.co/api/v2`;

const populate = (pokemon) => {
  const content = document.getElementById("content");

  const holder = document.createElement("div");

  const img = document.createElement("div");

  const info = document.createElement("div");

  holder.classList = "holder";

  const name = document.createElement("h3");
  name.textContent = pokemon.name.toUpperCase();

  fetch(pokemon.url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      img.style.backgroundImage = `url(${data.sprites.front_default})`;
    });

  img.classList = "pokeImg";

  holder.appendChild(img);
  holder.appendChild(info);
  info.appendChild(name);
  content.appendChild(holder);
};

const fetchPokemon = () => {
  console.log("running");
  // the route is the only major change
  fetch(baseRoute + `/pokemon`)
    .then((results) => {

      return results.json();
    })
    .then((data) => {
      // data.results is an array of poky mans

      for (let i = 0, dr = data.results; i < dr.length; i++) {
        populate(dr[i]);
      }
    })
    .catch((err) => {
      console.log("oops: ", err);
    });
};

fetchPokemon();
