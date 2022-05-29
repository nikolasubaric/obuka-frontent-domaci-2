const output = document.getElementById('dataOutput');
console.log(output);
const movies = [
  {
    wasSeen: false,
    name: "Dark Knights' Return VII: The Return of the Dark Knight",
    year: 2004,
    country: 'United States of America',
    notice: 'Cointains graphic scenes, drug use, gambling',
    actors: [
      'Danny Devito',
      'Mads Mikkelsen',
      'Anne Hathaway',
      'Aaron Paul',
      'Jesse Plemons',
    ],
  },
  {
    wasSeen: false,
    name: 'The Chipmunks 5: Escape from Alcatraz',
    year: 2021,
    country: 'Canary Islands',
    notice: 'Contains nudity, drug use, gambling',
    actors: [
      'Anna Gunn',
      'RJ Mitte',
      'Bryan Cranston',
      'Giancarlo Esposito',
      'Dean Norris',
    ],
  },
  {
    wasSeen: false,
    name: 'Truckmonster 5: Revved Up!',
    year: 2004,
    country: 'Tunisia',
    notice: 'Cointains graphic scenes, drug use, gambling',
    actors: ['Owen Wilson', 'Paul Newman', 'George Carlin', 'Justin Long'],
  },
];

// VALIDACIJA FILMA PRIJE PRIKAZIVANJA

const populateTable = () => {
  let markup = ``;

  movies.forEach(movie => {
    markup += `
           <tr class='${movie.wasSeen ? 'watched' : 'notWatched'}'>
            <td><input type='checkbox' ${movie.wasSeen && 'checked'} /></td>
            <td>${movie.name}</td>
            <td>${movie.year}</td>
            <td>${movie.country || ''}</td>
            <td>${movie.notice || ''}</td>
            <td>${movie.actors.join(', ')}</td>
          </tr>
    `;
  });

  output.innerHTML = markup;
};

populateTable();
