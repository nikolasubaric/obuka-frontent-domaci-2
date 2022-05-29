const output = document.getElementById('dataOutput');
// console.log(output);
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

// VALIDACIJA FILMA PRIJE PRIKAZIVANJA

const populateTable = () => {
  let markup = ``;

  movies.forEach(movie => {
    markup += `
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
  });

  output.innerHTML = markup;

  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const parentRow = checkbox.closest('tr');
      // console.log(parentRow);
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
      // console.log(...movies);
    });
  });
  // console.log(checkboxes);
  // console.log(checkboxes[0].checked);
};

populateTable();

// const testMarkup = `
// <tr class='${movies[0].wasSeen ? 'watched' : 'notWatched'}'>
//  <td><input type='checkbox' ${movies[0].wasSeen && 'checked'} /></td>
//  <td>${movies[0].name}</td>
//  <td>${movies[0].year}</td>
//  <td>${movies[0].country || ''}</td>
//  <td>${movies[0].notice || ''}</td>
//  <td>${movies[0].actors.join(', ')}</td>
// </tr>
// `;

// output.insertAdjacentHTML('beforeend', testMarkup);
