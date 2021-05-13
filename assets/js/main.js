const Card = personaje => {

  const { id, name, status, species, image, } = personaje



  return `
    <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile">
        <a class="handleOpenModal" data-id="${id}"><div class="card"> <!-- CARD -->
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="${image}" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content" id="cContainer">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="${image}" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4 name">${name}</p>
                <p class="subtitle is-6 species">${species}</p>
              </div>
            </div>
            <div class="content">
              <p class="status">${status}</p>
            </div>
          </div>
        </div></a>
      </div>
    `



}

const Modal = personaje => {

  const { id, name, status, species, image, episodesData } = personaje

  let episodesLi = ''
  episodesData.forEach(({ name }) => {
    episodesLi += `<li>${name}</li>`
  })

  console.log(episodesLi)

  return `
  <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="${image}" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${name}</strong>
          <br>
          Here ya got a list of all the episodes ${name} appears in.
        </p>
        <h3>Episodes</h3>
        <ul>${episodesLi}</ul>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div> 
    `



}


const appendElements = (characters, nullGrid = false) => {

  const $grid = document.querySelector('.grid')
  // if (nullGrid) {
    $grid.innerHTML = null;
  // }
  characters.forEach(character => {

    const cardItem = Card(character)
    $grid.innerHTML += cardItem;

  });

  const $modalOpenArr = document.querySelectorAll('.handleOpenModal');
  const $modal = document.querySelector('.modal');
  const $modalContent = document.querySelector('.modal-content');
  const $modalClose = document.querySelector('.modal-close');

  $modalClose.addEventListener('click', () => {
    $modal.classList.remove('is-active');
  })

  $modalOpenArr.forEach(($card) => {
    $card.addEventListener('click', () => {
      const id = $card.dataset.id;
      const character = characters[id - 1]; //Nos da la posicion del personaje en el array de characters
      const { episode } = character
      const getEpisodesData = async () => {
        return Promise.all(episode.map(item => getEpisode(item))) //Resuelvo cada una de las promesas (fetchs de episodes)
      }
      getEpisodesData().then(episodesData => {
        const characterWithEpisodes = { ...character, episodesData } //Junto los datos que tenia del character + sus episodes
        $modalContent.innerHTML = Modal(characterWithEpisodes) //Le mando todo junto a modal
        $modal.classList.add('is-active'); //Activo el modal
      })
    })
  })



}

const getCharacters = async (baseURL, from, to) => {

  const charactersRange = Array.from({ length: to - from + 1 }, (_, index) => index + 1).join(', ');

  console.log(charactersRange)

  const url = `${baseURL}character/${charactersRange}`
  const response = await fetch(url);
  const characters = await response.json();

  return characters;

}

const getCharacter = async (baseURL, id) => {

  const url = `${baseURL}character/${id}`
  const response = await fetch(url);
  const character = await response.json();

  return character;

}

const getEpisode = async (baseURL,) => {

  const url = `${baseURL}`
  const response = await fetch(url);
  const episode = await response.json();
  return episode;

}


const getCharactersByQuery = async (baseURL, searchValue) => {

  const url = `${baseURL}character/?name=${searchValue}`
  const response = await fetch(url);
  const characters = await response.json();
  return characters;

}



const main = async () => {

  const baseURL = 'https://rickandmortyapi.com/api/';
  const characters = await getCharacters(baseURL, 1, 20)
  const $npcs = document.querySelector('#tabC')
  const $locs = document.querySelector('#tabL')
  const $eps = document.querySelector('#tabE')
  const $searchBar = document.querySelector('#search_bar')
  $searchBar.classList.remove('searchNone')
  $npcs.classList.add('is-active')
  $locs.classList.remove('is-active')
  $eps.classList.remove('is-active')
  appendElements(characters)
  console.log(characters)

  const $search = document.querySelector('.handle_search');
  $search.addEventListener('click', async (event) => {

    console.log('CLICKED');
    event.preventDefault();
    const $input = document.querySelector('.input_search');
    const value = $input.value;
    const charactersByQuery = await getCharactersByQuery(baseURL, value)
    const characters = charactersByQuery.results;
    appendElements(characters, true)
    console.log(value)

  })

  const $locations = document.querySelector('#tabL');
  $locations.addEventListener('click', async (event) => {

    mainLocation();

  })

  const $episodes = document.querySelector('#tabE');
  $episodes.addEventListener('click', async (event) => {

    mainEpisode();
    
  })


}

main();

/* ---- LOCATIONS ---- */

const CardLocation = locacion => {

  const { id, name, type, dimension } = locacion



  return `
    <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile">
        <a class="handleOpenModal" data-id="${id}"><div class="card" id="cardsLocations"> <!-- CARD -->
        <!---- <div class="card-image">
        <figure class="image is-4by3">
          <img src="" alt="">
        </figure>
      </div>
      <div class="card-content" id="cContainer">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="" alt="">
            </figure>
          </div> ---->
          <div class="media">
                <div class="media-content">
                <p class="title is-4 name">${name}</p>
                <p class="subtitle is-6 type">${type}</p>
              </div>
            </div>
            <div class="content">
              <p class="dimension">${dimension}</p>
            </div>
          </div>
        </div></a>
      </div>
    `



}

const ModalLocation = location => {

  const { id, name, residents } = location
  
  let charactersLi = ''
  residents.forEach(resident => {
    charactersLi+= `<li>${resident}</li>`
  })

  console.log(location)

  return `
  <div class="box">
  <article class="media">
    <div class="media-left">
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${name}</strong>
          <br>
          Here ya got a list of all the residents ${name} has.
        </p>
        <h3>Characters</h3>
        <ul>${charactersLi}</ul>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div> 
    `



}

const getLocations = async (baseURL, from, to) => {

  const locationsRange = Array.from({ length: to - from + 1 }, (_, index) => index + 1).join(', ');

  console.log(locationsRange)

  const url = `${baseURL}location/${locationsRange}`
  const response = await fetch(url);
  const locations = await response.json();

  return locations;

}

const getLocation = async (baseURL, id) => {

  const url = `${baseURL}location/${id}`
  const response = await fetch(url);
  const location = await response.json();

  return location;

}

const getCharactersInLocation = async (baseURL,) => {

  const url = `${baseURL}`
  const response = await fetch(url);
  const episode = await response.json();
  return episode;

}

const appendLocations = (locations, nullGrid = false) => {

  const $grid = document.querySelector('.grid')
  // if (nullGrid) {
  $grid.innerHTML = null;
  // }
  locations.forEach(location => {

    const cardItem = CardLocation(location)
    $grid.innerHTML += cardItem;

  });

    const $modalOpenArr = document.querySelectorAll('.handleOpenModal');
    const $modal = document.querySelector('.modal');
    const $modalContent = document.querySelector('.modal-content');
    const $modalClose = document.querySelector('.modal-close');

    $modalClose.addEventListener('click', ()=>{
      $modal.classList.remove('is-active');
  })

    $modalOpenArr.forEach(($card) => {
      $card.addEventListener('click', () => {
          const id = $card.dataset.id;
          const location = locations[id - 1]; //Nos da la posicion del personaje en el array de characters
          const { residents } = location
          const getCharactersData = async () => {
              return Promise.all(residents.map(item => getCharactersInLocation(item))) //Resuelvo cada una de las promesas (fetchs de episodes)
          }
          getCharactersData().then(charactersData => {
              const locationsWithCharacters = { ...location, charactersData } //Junto los datos que tenia del character + sus episodes
              $modalContent.innerHTML = ModalLocation(locationsWithCharacters) //Le mando todo junto a modal
              $modal.classList.add('is-active'); //Activo el modal
          })
      })
  })



}

const mainLocation = async () => {

  const baseURL = 'https://rickandmortyapi.com/api/';
  const locations = await getLocations(baseURL, 1, 20)
  const $npcs = document.querySelector('#tabC')
  const $locs = document.querySelector('#tabL')
  const $eps = document.querySelector('#tabE')
  const $search = document.querySelector('#search_bar')
  $search.classList.add('searchNone')
  $npcs.classList.remove('is-active')
  $locs.classList.add('is-active')
  $eps.classList.remove('is-active')
  appendLocations(locations)
  console.log(locations)

  const $tabCharacters = document.querySelector('#tabC');
  $tabCharacters.addEventListener('click', async (event) => {

    main();

  })

  const $tabEpisodes = document.querySelector('#tabE');
  $tabEpisodes.addEventListener('click', async (event) => {

    mainEpisode();

  })

}


/* ---- EPISODES ---- */

const CardEpisode = episodeTab => {

  const { id, name, air_date, episode } = episodeTab



  return `
    <div class="column is-one-quarter-desktop is-half-tablet is-full-mobile">
        <a class="handleOpenModal" data-id="${id}"><div class="card" id="cardsEpisodes"> <!-- CARD -->
        <!---- <div class="card-image">
        <figure class="image is-4by3">
          <img src="" alt="">
        </figure>
      </div>
      <div class="card-content" id="cContainer">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="" alt="">
            </figure>
          </div> ---->
          <div class="media">
                <div class="media-content">
                <p class="title is-4 name">${name}</p>
                <p class="subtitle is-6 type">${air_date}</p>
              </div>
            </div>
            <div class="content">
              <p class="dimension">${episode}</p>
            </div>
          </div>
        </div></a>
      </div>
    `



}

const ModalEpisode = episode => {

  const { id, name, characters} = episode
  
  let charactersLi = ''
  characters.forEach(character => {
    charactersLi+= `<li>${character}</li>`
  })

  console.log(location)

  return `
  <div class="box">
  <article class="media">
    <div class="media-left">
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${name}</strong>
          <br>
          Here ya got a list of all the residents ${name} has.
        </p>
        <h3>Characters</h3>
        <ul>${charactersLi}</ul>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div> 
    `



}

const getEpisodesTab = async (baseURL, from, to) => {

  const episodesRange = Array.from({ length: to - from + 1 }, (_, index) => index + 1).join(', ');

  console.log(episodesRange)

  const url = `${baseURL}episode/${episodesRange}`
  const response = await fetch(url);
  const locations = await response.json();

  return locations;

}

const getEpisodeTab = async (baseURL, id) => {

  const url = `${baseURL}episode/${id}`
  const response = await fetch(url);
  const location = await response.json();

  return location;

}

const appendEpisodes = (episodes, nullGrid = false) => {

  const $grid = document.querySelector('.grid')
  // if (nullGrid) {
  $grid.innerHTML = null;
  // }
  episodes.forEach(episode => {

    const cardItem = CardEpisode(episode)
    $grid.innerHTML += cardItem;

  });

  const $modalOpenArr = document.querySelectorAll('.handleOpenModal');
    const $modal = document.querySelector('.modal');
    const $modalContent = document.querySelector('.modal-content');
    const $modalClose = document.querySelector('.modal-close');

    $modalClose.addEventListener('click', ()=>{
      $modal.classList.remove('is-active');
  })

    $modalOpenArr.forEach(($card) => {
      $card.addEventListener('click', () => {
          const id = $card.dataset.id;
          const episode = episodes[id - 1]; //Nos da la posicion del personaje en el array de characters
          const { characters } = episode
          const getCharactersData = async () => {
              return Promise.all(characters.map(item => getCharactersInLocation(item))) //Resuelvo cada una de las promesas (fetchs de episodes)
          }
          getCharactersData().then(charactersData => {
              const locationsWithCharacters = { ...episode, charactersData } //Junto los datos que tenia del character + sus episodes
              $modalContent.innerHTML = ModalEpisode(locationsWithCharacters) //Le mando todo junto a modal
              $modal.classList.add('is-active'); //Activo el modal
          })
      })
  })


}

const mainEpisode = async () => {

  const baseURL = 'https://rickandmortyapi.com/api/';
  const locations = await getEpisodesTab(baseURL, 1, 20)
  const $npcs = document.querySelector('#tabC')
  const $locs = document.querySelector('#tabL')
  const $eps = document.querySelector('#tabE')
  const $search = document.querySelector('#search_bar')
  $search.classList.add('.searchNone')
  $npcs.classList.remove('is-active')
  $locs.classList.remove('is-active')
  $eps.classList.add('is-active')
  appendEpisodes(locations)
  console.log(episodes)

  const $tabCharacters = document.querySelector('#tabC');
  $tabCharacters.addEventListener('click', async (event) => {

    main();

  })

  const $locations = document.querySelector('#tabL');
  $locations.addEventListener('click', async (event) => {

    mainLocation();

  })


}