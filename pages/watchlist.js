const movieContainer = document.querySelector(".row");
let watchlist = [];
let watchlistHtml;

const getWatchlist = () => {
	watchlist = [];

	for (let i = 0; i < localStorage.length; i++) {
		watchlist.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
};

const setMovieHtml = movie => {
	const { title, plot, runtime, genre, poster, ratings } = movie;

	return `
    <div class="film-container">
        <img src="${poster}" alt="${title}">
        <section class='row__movie'>
            <div class='row__movie-headings'>
                <h2>${title}</h2>
                <p>${ratings}</p>
            </div>

            <div class='row__movie-info'>
                <p>${runtime}</p>
                <p>${genre}</p>
                <button class='btn--remove' data-movie='${title}'>Remove</button>
            </div>

            <p>${plot}</p>
        </section>
    </div>
        `;
};

const removeMoveHandler = e => {
	e.preventDefault();
	localStorage.removeItem(e.target.dataset.movie);
	getWatchlist();
	renderWatchlist();
};

const renderWatchlist = () => {
	watchlistHtml = "";
	watchlist.forEach(movie => {
		watchlistHtml += setMovieHtml(movie);
	});

	movieContainer.innerHTML = watchlistHtml;

	const removeButtons = document.querySelectorAll(".btn--remove");

	for (let btn of removeButtons) {
		btn.addEventListener("click", removeMoveHandler);
	}
};

getWatchlist();
renderWatchlist();
