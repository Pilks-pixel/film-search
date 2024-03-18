const searchButton = document.querySelector(".btn--search");
const searchQuery = document.querySelector("#movie-input");
const movieContainer = document.querySelector(".row");
let currentMovie

const getMovies = async movie => {
	try {
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=4b0e847f&t=${movie}`
		);
		const data = await response.json();

		if (data.Response !== "True") {
			console.log(data.Error);
		} else {
			showMovieData(data);
		}
	} catch (error) {
		console.log(error.message);
	}
};

/**
 * Accepts a movie object from the API and renders to the DOM.
 * @param {object} movie 
 */
const showMovieData = movie => {
    currentMovie = {
        title: movie.Title,
        plot: movie.Plot,
        runtime: movie.Runtime,
        genre: movie.Genre,
        poster: movie.Poster,
        ratings: movie.Ratings[0].Value
    }
	const { title, plot, runtime, genre, poster, ratings} = currentMovie;

	movieContainer.innerHTML = `
    <img src="${poster}" alt="${title}">
    <section class='row__movie'>
        <div class='row__movie-headings'>
            <h2>${title}</h2>
            <p>${ratings}</p>
        </div>

        <div class='row__movie-info'>
            <p>${runtime}</p>
            <p>${genre}</p>
            <button class='btn--watchlist'>Watchlist</button>
        </div>

        <p>${plot}</p>
    </section>`;

    const watchlistButton = document.querySelector(".btn--watchlist");
    watchlistButton.addEventListener("click", handleWatchlistBtn);
};

// Event handlers 
const handleSearchBtn = e => {
	e.preventDefault();
	const queryString = searchQuery.value.trim().replace(/\s/g, "+");
	getMovies(queryString);
};

const handleWatchlistBtn = e => {
	e.preventDefault();
    const movie = JSON.stringify(currentMovie);
    localStorage.setItem(currentMovie.title, movie);
    console.log(localStorage.getItem(currentMovie.title));
};

searchButton.addEventListener("click", handleSearchBtn);
