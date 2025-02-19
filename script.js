// Skeleton for stats starts
function Skeleton(){
  const pokemonImage = document.querySelector("#pokemonImage");
  const pokemonId = document.querySelector("#pokemonId");
  const pokemonName = document.querySelector("#pokemonName");
  const pokemonImageBackground = document.querySelector("#pokemonImageBackground");
  // pokemonImageBackground.style.backgroundColor = "transparent";
// Image /tag / name
function showLoader() {
  const loader = document.getElementById('pokemon-loader');
  loader.classList.remove('hidden'); 
}
showLoader();
// Image /tag / name

  // #id
  pokemonId.style.display = 'block';
  pokemonId.style.transition = 'display 1s';
  pokemonId.textContent = `#?`;
  // name0
  pokemonName.style.display = 'block';
  pokemonName.style.transition = 'display 1s';
  pokemonName.style.textTransform = 'capitalize';
  !userInputPokemon ? pokemonName.textContent = `Who's That Pokemon?` :
  pokemonName.textContent = `Who's That Pokemon?`;
 // Image /tag / name

  // Type
  const pokemonType = document.querySelector("#pokemonType");
  pokemonType.innerHTML = "";
    pokemonType.innerHTML +=
    `<p class="bg-zinc-500 text-white font-bold rounded-xl py-[0.2rem] w-[5rem] text-center">?</p>
    ` 
  // Type

  // Weight
  const weightDiv = document.querySelector("#pokemonWeight");
  const heightDiv = document.querySelector("#pokemonHeight");
  weightDiv.textContent = `? KG`;
  heightDiv.textContent = `? M`;

  // weight
const statContainer = document.querySelector(".Stat__Container");
const rangeHPSlider = document.querySelector("#rangeHP");
const rangeHPValue = document.querySelector("#rangeHPValue");
const skeleTOnData = [
  {name:"hp"},
  {name:"Attack "},
  {name:"Defense "},
  {name:" Special Attack"},
  {name:" Special Defense"},
  {name:" Speed "}
];
 statContainer.innerHTML = "";
 // console.log(sd.stats[statsData[index]].stat.name);
  skeleTOnData.forEach((skeleton,index) => {
    statContainer.innerHTML += `
      <div class="flex items-center justify-between w-[100%] font-Nunito">
        <div class="flex items-center justify-between w-[100%] gap-[0.5rem]">
          <p class="text-white font-bold text-[0.8rem] text-nowrap capitalize">${skeleton.name}</p>
          <input type="range" id="rangeHP" min="0" max="100" class="bg-zinc-900">
        </div>
      </div>`;
  });
}
Skeleton();
  // Skeleton For Stats

const inputForm = document.querySelector("form");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchPokemonData();
// Hide Loader
function hideLoader() {
  const loader = document.getElementById('pokemon-loader');
  loader.classList.add('hidden'); 
}
hideLoader();
});

/*---------------MAIN ASYNC CODE---------------*/

async function fetchPokemonData() {
  try {
    const userInputPokemon = document.querySelector("#userInputPokemon").value;
    const fetchedData = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInputPokemon.toLowerCase()}`);
    
    if(!fetchedData.ok){
    alert(`No Pokemon of Name ${userInputPokemon} Found !`)
    showLoader();
    // throw new Error("Could Not Fetch Data");
    }
    const data = await fetchedData.json();
    
    const pokemonId = document.querySelector("#pokemonId");
    const pokemonName = document.querySelector("#pokemonName");
    const pokemonType = document.querySelector("#pokemonType");
    const weightDiv = document.querySelector("#pokemonWeight");
    const heightDiv = document.querySelector("#pokemonHeight");
    // Sprite
    const pokemonImage = document.querySelector("#pokemonImage");
    pokemonImage.style.display = 'block';
    const pokeSprite = `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;
    const pokemonImageBackground = document.querySelector("#pokemonImageBackground");
    pokemonImage.src = pokeSprite;
    // Sprite / Image
    pokemonImage.onerror = function () {
      this.src = "STATIC/noImage.svg"; // Fallback image
    };
    // #id
    pokemonId.style.display = 'block';
    !data.id ? pokemonId.textContent = `#?` :
    pokemonId.textContent = `#${data.id}`;
    // name0
    pokemonName.style.display = 'block';
    pokemonName.style.textTransform = 'capitalize';
    pokemonName.textContent = data.name;
    //type
    const typeColorMap = {
  fire: "F08030",
  water: "6890F0",
  grass: "78C850",
  electric: "F8D030",
  ice: "98D8D8",
  fighting: "C03028",
  poison: "A040A0",
  ground: "E0C068",
  flying: "A890F0",
  psychic: "F85888",
  bug: "A8B820",
  rock: "B8A038",
  ghost: "705898",
  dragon: "7038F8",
  dark: "705848",
  steel: "B8B8D0",
  fairy: "EE99AC",
  normal: "A8A878"
};

// Set type & background
pokemonType.innerHTML = data.types.map(typ => {
  const typeName = typ.type.name.toLowerCase();
  const color = typeColorMap[typeName] || "A8A878";
  return `<p class="bg-[#${color}] text-white font-bold rounded-xl py-[0.1rem] w-[5rem] text-center">${typeName}</p>`;
}).join("");

const typeColors = data.types.map(typ => `#${typeColorMap[typ.type.name.toLowerCase()] || "A8A878"}`);
pokemonImageBackground.style.transition = "background 0.5s ease-in-out";
pokemonImageBackground.style.background = `linear-gradient(to right, black, ${typeColors.join(",")}, black)`;



    // console.log(typeColor)
    
    // weight /height
    weightDiv.textContent = `${data.weight} KG`;
    heightDiv.textContent = `${data.height} M`;

    // console.log(`${data.stats} is ${data.stats[0]}`);
    // console.log(`Hp is ${data.stats.base_stats}`);
    const statContainer = document.querySelector(".Stat__Container");
    const rangeHPSlider = document.querySelector("#rangeHP");
    const rangeHPValue = document.querySelector("#rangeHPValue");
    const statsData = data.stats;
    const statDT = ["red","yellow","blue","cyan","purple","green"];
     statContainer.innerHTML = "";
      statsData.forEach((sd,index) => {
        statContainer.innerHTML += `
          <div class="flex items-center justify-between w-[100%] font-Nunito">
            <div class="flex items-center justify-between w-[100%] gap-[0.5rem]">
              <p class="text-white font-bold text-[0.8rem] text-nowrap capitalize">${sd.stat.name}</p>
              <input type="range" id="rangeHP" min="0" max="100" class="appearance transition-all duration-500 ease-in-out bg-linear-to-r from-${statDT[index]}-500 from-${sd.base_stat}% to-zinc-900 to-${100 - sd.base_stat}%">
            </div>
          </div>`;
      });
    // console.log(data);
    // console.log(data.types[0].type.name);
    // console.log(data.types.length > 0 ? data.types[1].type.name : "No Type");
    // console.log(data.types.length > 0 ? data.types[2].type.name : "No Type");

    return(data);
  } catch (err) {
    console.log(err);
    throw new Error("No pokemon Available");
  }
}

