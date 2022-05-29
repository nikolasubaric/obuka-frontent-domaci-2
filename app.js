const output = document.getElementById('dataOutput');

const inputForm = document.getElementById('inputForm');
const inputMovieName = document.getElementById('inputMovieName');
const inputMovieYear = document.getElementById('inputMovieYear');
const inputCountryName = document.getElementById('inputCountry');
const inputWatched = document.getElementById('inputWatched');
const inputActors = document.getElementById('inputActors');
const inputNotice = document.getElementById('inputNotice');

const myModal = new bootstrap.Modal('#exampleModal', {
  keyboard: false,
});

const movies = [
  {
    wasSeen: false,
    name: 'The Northman',
    year: 2022,
    country: 'United States',
    notice: 'R (Strong Bloody Violence|Some Sexual Content|Nudity)',
    actors: [
      'Alexander Skarsgård',
      'Nicole Kidman',
      'Claes Bang',
      'Ethan Hawke',
      'Anya Taylor-Joy',
    ],
  },
  {
    wasSeen: false,
    name: 'Top Gun',
    year: 1986,
    country: 'United States',
    notice: 'PG',
    actors: [
      'Tom Cruise',
      'Kelly McGillis',
      'Anthony Edwards',
      'Val Kilmer',
      'Tom Skerritt',
    ],
  },
  {
    wasSeen: false,
    name: 'Pirates of the Carribean: The Curse of the Black Pearl',
    year: 2003,
    country: 'United States',
    notice: 'PG-13 (Adventure Violence|Action/Violence)',
    actors: [
      'Johnny Depp',
      'Geoffrey Rush',
      'Orlando Bloom',
      'Keira Knightley',
    ],
  },
];
///////////////////////////////////////
// PRIKAZIVANJE FILMOVA IZ ARRAYA
//////////////////////////////////////
const populateTable = () => {
  let markup = ``;

  movies.forEach(movie => {
    markup += `
           <tr class='${movie.wasSeen ? 'watched' : 'notWatched'}'>
            <td><input type='checkbox' ${
              movie.wasSeen && 'checked'
            } data-movie='${movie.name}' class='checkbox' /></td>
            <td>${movie.name}</td>
            <td>${movie.year}</td>
            <td>${movie.country || ''}</td>
            <td>${movie.notice || ''}</td>
            <td>${movie.actors.join(', ')}</td>
          </tr>
    `;
  });

  output.innerHTML = markup;

  ///////////////////////////////////////
  // DODAVANJE HANDLERA SVIM CHECKBOXOVIMA
  //////////////////////////////////////

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(checkbox => addCheckboxHandler(checkbox));
};

function containsNumber(str) {
  return /[0-9]/.test(str);
}

///////////////////////////////////////
// VALIDACIJA SVIH INPUTA NA SUBMIT FORME
//////////////////////////////////////

inputForm.addEventListener('submit', event => {
  event.preventDefault();
  let ok = true;
  let errorMessage = '\n';

  if (containsNumber(inputCountryName.value)) {
    errorMessage += 'Country names cannot contain numbers';
    ok = false;
  }

  if (containsNumber(inputActors.value)) {
    errorMessage += 'Actor names cannot contain numbers';
    ok = false;
  }

  if (!ok) {
    alert(errorMessage);
    return;
  }

  const wasSeen = inputWatched.checked;
  const name = inputMovieName.value;
  const year = parseInt(inputMovieYear.value);
  const notice = inputNotice.value;
  const country = inputCountryName.value;
  const actors = inputActors.value.split(',').map(actor => actor.trim());

  const newMovie = { wasSeen, name, actors, country, notice, year };
  movies.push(newMovie);

  addMovie(newMovie);
});

///////////////////////////////////////
// DODAVANJE FILMA U TABELU
//////////////////////////////////////

const addMovie = movie => {
  let markup = `
           <tr class='${movie.wasSeen ? 'watched' : 'notWatched'}'>
            <td><input type='checkbox' ${
              movie.wasSeen && 'checked'
            } data-movie='${movie.name}' /></td>
            <td>${movie.name}</td>
            <td>${movie.year}</td>
            <td>${movie.country || ''}</td>
            <td>${movie.notice || ''}</td>
            <td>${movie.actors.join(', ')}</td>
          </tr>
    `;
  output.insertAdjacentHTML('beforeend', markup);
  const checkbox = document.querySelector(`input[data-movie='${movie.name}']`);
  addCheckboxHandler(checkbox);
  clearModal();
  myModal.toggle();
};

///////////////////////////////////////
// METODA ZA DODAVANJE HANDLERA
//////////////////////////////////////

const addCheckboxHandler = checkbox => {
  checkbox.addEventListener('change', () => {
    const parentRow = checkbox.closest('tr');
    if (checkbox.checked) {
      parentRow.classList.remove('notWatched');
      parentRow.classList.add('watched');

      movies.forEach(movie => {
        if (movie.name === checkbox.dataset.movie) {
          movie.wasSeen = true;
          console.log(movie);
        }
      });
    } else {
      parentRow.classList.remove('watched');
      parentRow.classList.add('notWatched');

      movies.forEach(movie => {
        if (movie.name === checkbox.dataset.movie) {
          movie.wasSeen = false;
          console.log(movie);
        }
      });
    }
  });
};

const clearModal = () => {
  inputActors.value = '';
  inputCountryName.value = '';
  inputMovieName.value = '';
  inputMovieYear.value = null;
  inputNotice.value = '';
  inputWatched.checked = false;
};

populateTable();
