const searchButton = document.querySelector(".btn--search");
const searchQuery = document.querySelector("#movie-input");

const getMovies = async movie => {
	try {
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=4b0e847f&t=${movie}`
		);
		const data = await response.json();

        if (data.Response !== "True") {
		console.log(data.Error);
        } else {
            console.log(data);
        }

	} catch (error) {
		console.log(error.message);   
	}
};

const handleSearchBtn = e => {
	e.preventDefault();
	const queryString = searchQuery.value.trim().replace(/\s/g, "+");
	getMovies(queryString);
};

console.log(searchButton);
searchButton.addEventListener("click", handleSearchBtn);
