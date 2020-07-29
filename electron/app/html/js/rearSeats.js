document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
    getFilms();
}

getFilms = () => {
    fetch('http://localhost:3000/getFilms')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            updateFilmList(data)
        })
        .catch(function(error) {
            console.log(error);
        });
}

updateFilmList = (films) => {
    var filmArray = films.movies
    var film = []
    for(i=0;i<filmArray.length;i++) {
        var filmDetails = {}
        filmDetails.name = films.movies[i].label;
        filmDetails.file = films.movies[i].file;
        filmDetails.image = "http://192.168.1.1/image/" + encodeURIComponent(films.movies[i].art.poster);
        film.push(filmDetails)
    }
    const filmList = `${film.map(f => `
        <div class="film" data-file="${f.file}">
            <img src="${f.image}" height="300vw">
            <div class="nameContainer">
            <p class="filmName">${f.name}</p>
            </div>
            
         </div>
    `)}`;

    document.getElementById('filmContainer').innerHTML = filmList;
    var elements = document.getElementsByClassName("film");

    var myFunction = function() {
        var attribute = this.getAttribute("data-file");
        playMovie(attribute);
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', myFunction, false);
    }
}

playMovie = (file) => {
    fetch("http://localhost:3000/play", {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            film: file
        })
    })
        .then((response) => {
            console.log(response.status)
        })
}
