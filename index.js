//--------------------------------------------------------Data Fetching Section-------------------------------------------------------------------->
const movieUrl = [
    {
        "id": 113,
        "url": "https://mkvking.online/captain-america-brave-new-world/"
    },
    {
        "id": 101,
        "url": ""
    },
    {
        "id": 102,
        "url": ""
    },
    {
        "id": 103,
        "url": "https://mkvking.online/transformers-one-2024/"
    },
    {
        "id": 104,
        "url": "https://mkvking.online/alien-romulus-2024/"
    },
    {
        "id": 105,
        "url": "https://mkvking.online/hellboy-the-crooked-man-2024/"
    },
    {
        "id": 106,
        "url": "https://mkvking.online/moana-2-2024/"
    },
    {
        "id": 107,
        "url": ""
    },
    {
        "id": 108,
        "url": "https://mkvking.online/deadpool-wolverine-2024/"
    },
    {
        "id": 109,
        "url": "https://mkvking.online/the-wild-robot-2024/"
    },
    {
        "id": 110,
        "url": "https://mkvking.online/mufasa-the-lion-king-2025/"
    },
    {
        "id": 89,
        "url": "https://mkvking.online/venom-the-last-dance-2024/"
    },
    {
        "id": 1,
        "url": "https://mkvking.online/the-shawshank-redemption-1994-1/"
    },
    {
        "id": 2,
        "url": "https://mkvking.online/the-godfather-1972-720p-1080p-2160p/"
    }
]

// let iframe = document.getElementById("iframe");
// iframe.src = movieUrl[0].url;
// console.log(iframe.src)

//initializise the global vaiable of current page and per page.
let page = 1;
const perPage = 12;

//get movie container by it's id.
let movieContainer = document.getElementById("movieContainer")
//add a loading variable before fetching the data.
movieContainer.innerHTML = "Loading.....";

//function to fetch the data.
function fetchMovies(){

    //fetch the data with pagination .
    fetch(`https://movie-hub-backend-w0l9.onrender.com/movies?_page=${page}&_perPage=${perPage}`)
    .then(res =>{
        if(!res.ok){
            console.log("somthing went wrong in fetching data")
        }
       
        return res.json()     
    })
    .then(data =>{
        //initialize variable for movies and total movies.
       const movies = data.Movies;
       const totalMovies = data.TotalMovies;
        
       movieData(movies);
       //calculate the total pages.
       pagination(Math.ceil(totalMovies/perPage));
    })
    .catch(err =>
        console.log("somthing went wrong in getting data", err)
    )
}

//function to show the movie data on browser
function movieData(movies){

    //clear the movie container before adding the data.
    movieContainer.innerHTML = "";

    //loop to iterate movie data and append to container.
    movies.forEach(movie => {

         // create a div element to store all data and add class name
        let movieContent = document.createElement("div");
        movieContent.classList.add("movieContent")
    
        // create a img element to store image and add class name
        let image = document.createElement("img");
        image.classList.add("image");
        image.src = `https://movie-hub-backend-w0l9.onrender.com${movie.image}`;
    
        //create a new element to store title and add class name
        let title = document.createElement("h2");
        title.classList.add("movieTitle");
        //add inner text to title
        title.innerText =  movie.movie

        //create movie to store rating and add class name
        let rating = document.createElement("p");
        rating.classList.add("rating");
        //add inner text to genres
        rating.innerText = `IMDb Rating: ${movie.rating}`

        //create a new element to store genre and add class name
        let genre = document.createElement("p");
        genre.classList.add("movieGenre");
        genre.innerText = `Genres: ${movie.genre}`;

        //create a new element to store button and add class name  
        let button = document.createElement("button");
        button.classList.add("button");
        //add text content to the button.
        button.textContent = "WATCH"

        button.addEventListener("click", function(){
            for(let i = 0; i < movieUrl.length; i++){
                if(movieUrl[i].id === movie.id){
                    let url = movieUrl[i].url;
                    localStorage.setItem("link", url);
                }
                // else{
                //     localStorage.removeItem("link");
                // }
            }
            window.open("movies.html");
        })
        localStorage.removeItem("link");

        movieContent.append(image, title, rating, genre, button);
        movieContainer.append(movieContent)
    });
}



//-----------------------------------------------------------------Paginatiion Section------------------------------------------------------------->

//function to paginate the movie on browser.
function pagination(pages){
    
    //get the paginated container by it's id.
    let paginated = document.getElementById("paginated");
    paginated.innerHTML = "";

    //for loop to set pagination.
    for(let i = 1; i <= pages; i++){

        //initialize the pagination button.
        let li = document.createElement("li");
        li.textContent = i

        //change the button background color if button and page are same.
        if(i === page){
            li.classList.add("active");
        }

        //add click event to button
        li.addEventListener("click", () =>{
            page = i;
            fetchMovies()
        })

        //add the pagination button to paginated container.
        paginated.append(li);
    }
}



//--------------------------------------------------------------------Search Data Section-----------------=---------------------------------------->

//get the form by it's id and add submit event.
document.getElementById("form").addEventListener("submit", (event) =>{
    //prevent the browser to refresh.
    event.preventDefault()

    //fetch the the data.
    fetch("https://movie-hub-backend-w0l9.onrender.com/movies")
    .then(res =>{
        if(!res.ok){
            throw new Error("something went wrong in getting response!");
        }
        return res.json();
    })
    .then(data =>{
        searchedMovie(data.Movies)
    })

    //function to iterate movie data.
    searchedMovie = (movies) =>{

        //get the movie container by it's id.
        let movieContainer = document.getElementById("movieContainer")

        //clear the movie container before append the data.
        movieContainer.innerHTML = "";

        //set the paginated container display as none.
        document.getElementById("paginated").style.display = "none";

        //get the search input by it's id and get it's value.
        let searchInput = document.getElementById("searchInput").value;
        
        //filter the movie by search input and store in the array. 
        const searchedMovies = movies.filter(movie => movie.movie.toLowerCase().includes(searchInput.toLowerCase()))

        if(searchedMovies.length === 0){
            movieContainer.innerHTML = "No match found!"
            return
        }



//--------------------------------------------------------------------Data Filter Section---------------------------------------------------------->

        //loop to iterate over filterd array to append the movie data on the browser.
        searchedMovies.forEach(movie =>{

            //get searched movie container by it's id and add class name.
            let searchedMovieContainer = document.createElement("div");
            searchedMovieContainer.classList.add("movieContent");

            // create a img element to store image and add class name
            let image = document.createElement("img");
            image.classList.add("image");
            image.src = `https://movie-hub-backend-w0l9.onrender.com${movie.image}`;
        
            //create a new element to store title and add class name
            let title = document.createElement("h2");
            title.classList.add("movieTitle");
            //add inner text to title
            title.innerText =  movie.movie

            //create movie to store rating and add class name
            let rating = document.createElement("p");
            rating.classList.add("rating");
            //add inner text to genres
            rating.innerText = `IMDb Rating: ${movie.rating}`

            //create a new element to store genre and add class name
            let genre = document.createElement("p");
            genre.classList.add("movieGenre");
            genre.innerText = `Genres: ${movie.genre}`;

            //create a new element to store button and add class name  
            let button = document.createElement("button");
            button.classList.add("button");
            //add text content to the button.
            button.textContent = "WATCH"

            button.addEventListener("click", function(){

            })

            //append the all data to searched movie container.
            searchedMovieContainer.append(image, title, rating, genre, button);

            //append the searched movie container to it's parent container.
            movieContainer.append(searchedMovieContainer);

        })
    }
})
fetchMovies()


//--------------------------------------------------------Filter by Genres Section----------------------------------------------------------------->


// Mouseover Section----->


//get genre element by it's id.
let genre = document.getElementById("genre");

//add mouse over event listner to genre element.
genre.addEventListener("mouseover", () =>{

    //get genreContainer element by it's id when mouseover.
    let genreContainer = document.getElementById("genreContainer");

    //set display flex when mouseover.
    genreContainer.style.display = "flex"
    genreContainer.style.justifyContent = "space-between"
    
})

//add mouse out event listner to genre element.
genre.addEventListener("mouseout", () =>{

    //get genreContainer element by it's id when mouseout.
    let genreContainer = document.getElementById("genreContainer");
    
    //set display none when mouseout.
    genreContainer.style.display = "none"
})

//get genreContainer element by it's id.
let genreContainer = document.getElementById("genreContainer");

//add mouse over event listner to genreContainer element.
genreContainer.addEventListener("mouseover", () =>{

    //set display none when mouseover.
    genreContainer.style.display = "flex"

})

//add mouse out event listner to genreContainer element.
genreContainer.addEventListener("mouseout", () =>{
    
    //set display none when mouse out.
    genreContainer.style.display = "none";
})


//filter section------>


let genreBox = document.querySelectorAll(".genrebox");

genreBox.forEach(genre =>{

    genre.addEventListener("click", () =>{
        
        fetch("https://movie-hub-backend-w0l9.onrender.com/movies")
        .then(res =>{
            if(!res.ok){
                throw new Error("error in getting response!");
            }
            return res.json()
        })
        .then(data =>{
            genreMovies(data.Movies);
        })
        .catch(err =>{
            console.log("somthing went wrong in getting data!", err);
        })


        genreMovies = (movies) =>{
    
            document.getElementById("paginated").style.display = "none";

            let movieContainer = document.getElementById("movieContainer");
            movieContainer.innerHTML = "";

            const genreArray = movies.filter(movie => {

                if(movie.genre){
                    return movie.genre.toLowerCase().includes(genre.innerText.toLowerCase())
                }
                return false;
            })
            
            let perPage = 12;
        
            function filterByGenre(){            
                function genrePaginated(genreArray, page, perPage){
                    const firstPage = (page - 1) * perPage;
                    const lastPage = (firstPage + perPage);
                    return genreArray.slice(firstPage, lastPage)
                }
                
                const array = genreArray;

                genrePaginated(array, page, perPage).forEach(movie =>{

                    //get searched movie container by it's id and add class name.
                    let genreMovieContainer = document.createElement("div");
                    genreMovieContainer.classList.add("movieContent");

                    // create a img element to store image and add class name
                    let image = document.createElement("img");
                    image.classList.add("image");
                    image.src = `https://movie-hub-backend-w0l9.onrender.com${movie.image}`;
                
                    //create a new element to store title and add class name
                    let title = document.createElement("h2");
                    title.classList.add("movieTitle");
                    //add inner text to title
                    title.innerText =  movie.movie

                    //create movie to store rating and add class name
                    let rating = document.createElement("p");
                    rating.classList.add("rating");
                    //add inner text to genres
                    rating.innerText = `IMDb Rating: ${movie.rating}`

                    //create a new element to store genre and add class name
                    let genre = document.createElement("p");
                    genre.classList.add("movieGenre");
                    genre.innerText = `Genres: ${movie.genre}`;

                    //create a new element to store button and add class name  
                    let button = document.createElement("button");
                    button.classList.add("button");
                    //add text content to the button.
                    button.textContent = "WATCH"

                    button.addEventListener("click", function(){

                    })


                    //append the all data to searched movie container.
                    genreMovieContainer.append(image, title, rating, genre, button);

                    //append the searched movie container to it's parent container.
                    movieContainer.append(genreMovieContainer);

                })
                const genrepaginate = document.getElementById("genrePaginate");
                genrepaginate.innerHTML = "";

                if(page * perPage < array.length){ 
                    const more = document.createElement("button");
                    more.innerText = "More";
                    more.classList.add("more-btn")
                    more.addEventListener("click", () => {
                        page++;
                        filterByGenre()
                        console.log(page)
                    })
                    genrepaginate.append(more);
                }
                else{
                    page = 1;
                }
            }
        
            filterByGenre()
        }
    })
})



// <------------------------------------------------------------------Streaming Section--------------------------------------------------------->
