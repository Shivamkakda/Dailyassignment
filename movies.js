// api key === 6e21d40af18a934f0f7f9a3c5452f5a4
    async function moviesSearch(){
    let title = document.getElementById("searrch").value;
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=6e21d40af18a934f0f7f9a3c5452f5a4${"&query="}${title}`);
    let apiData = await res.json();
    console.log(apiData);
    moviesData = apiData.results;
    if(apiData.results.length > 0)
        showMoviesList(apiData.results);
    else{
        let parrent = document.getElementById("moviesList");
        parrent.innerHTML = null;
        parrent.style.display = "flex";
        let div = document.createElement("div");
        div.setAttribute("id", "errorBox");
        let img = document.createElement("img");
        img.src = "./gif/200w.webp";
        div.append(img);
        parrent.append(div);
        alert("no resut found, please check title");
    }
}
// login signup page
function signIn(){
    window.location.href = "login.html";
}

function signUp(){
    window.location.href = "signup.html";
}
// to get top 20 popular movies
async function moviesDataAPI(){
    let res = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6e21d40af18a934f0f7f9a3c5452f5a4");
    let apiData = await res.json();
    showMoviesList(apiData.results);
    moviesData = apiData.results;
}

moviesDataAPI();

// Video api link
async function videoApi(id){
    let r = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=6e21d40af18a934f0f7f9a3c5452f5a4&append_to_response=videos`);
    var dp = await r.json();
       
    return (dp.results[0].key);
        
}

// Body popular movies list
async function showMoviesList(data){
    let parrent = document.getElementById("moviesList");
    parrent.innerHTML = "";
    parrent.style.display = "grid";

    data.forEach(function(moviee){
        // Calling video api function

        videoApiID(moviee);

        async function videoApiID(moviee){
            let video_id= await videoApi(moviee.id);


            let div = document.createElement("div");
            div.setAttribute("class", "moviBox")

            let img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500"+moviee.poster_path;

            let rating = document.createElement("p");
            rating.textContent = "imbd rating: " + moviee.vote_average;

            let language = document.createElement("p");
            language.textContent = "Language: " + moviee.original_language;

            let year = document.createElement("p");
            year.textContent = moviee.release_date;

            let name = document.createElement("p");
            name.setAttribute("class", "moviName");
            name.textContent = moviee.title;

            if(Number(moviee.vote_average) > 8.5){
                div.append(img, rating, language, year, name);
            }
            else
                div.append(img, rating, language, year, name);

            parrent.append(div);

        } 
    })
}
// ------------- Debounce ----------------------

let movies_div = document.getElementById("movies");
      let timerId;

      async function searchMovies(movie_name){
          try{
              let res = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=6e21d40af18a934f0f7f9a3c5452f5a4${"&query="}${movie_name}`);
              let data = await res.json(); 
              return data;
          }
          catch(e){
              console.log("Error: ", e);
          }
      }

      function appendMovie(movie){
          if(movie === undefined){
              return false;
          }
          movies_div.style.display = "inline";
          movies_div.innerHTML = null;

          movie.forEach(element => {
            let div = document.createElement("div")
            div.setAttribute("class","box")
                let div1= document.createElement("div")
              let name = document.createElement("p");
              name.setAttribute("class", "srch");
              name.innerText =  element.title;
              let year = document.createElement("p")
              year.innerText = element.release_date;

              div1.append(name,year)
              let div2 = document.createElement("div")
              let photo = document.createElement("img");
              photo.setAttribute("class", "phot")
            photo.src = "https://image.tmdb.org/t/p/w500"+ element.poster_path;
              div2.append(photo)
              div.append(div1,div2)
              div.onclick = function(){
                showMovieDatas(element);
              }
              movies_div.append(div);
          });
      }

    //   After search result 
      function showMovieDatas(moviee){

        videoApiID(moviee);
        async function videoApiID(moviee){

            let video_id= await videoApi(moviee.id);

            movies_div.innerHTML = null;
            movies_div.style.display = "none";

            let parrent = document.getElementById("moviesList");
            parrent.innerHTML = null;

            let div = document.createElement("div");
            div.setAttribute("class", "moviBox")

            let div2 = document.createElement("div");
            div2.setAttribute("class","des")

            let rating = document.createElement("p");
            rating.textContent = "imbd rating  : " + moviee.vote_average;

            let language = document.createElement("p");
            language.textContent = "Language  : " + moviee.original_language;

            let year = document.createElement("p");
            year.textContent = moviee.release_date;

            let discription = document.createElement("p");
            discription.textContent = "ABOUT : " + moviee.overview;

            div2.append( rating, language, year,discription);

            let img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500"+moviee.poster_path;

            let name = document.createElement("p");
            name.setAttribute("class", "moviName");
            name.textContent = moviee.title;

            let ide = document.createElement("p")
            ide.textContent = "Popularity : " + moviee.popularity

            if(Number(moviee.vote_average) > 8.5){
                div.append(img,name,ide);
            }
            else
                div.append(img,name,ide);

            parrent.append(div, div2);
        }
      }
      

      async function main(){
          let name = document.getElementById("searrch").value;

          if(name.length < 3){
            movies_div.innerHTML = null;
            movies_div.style.display = "none";
              return false;
          }
          let res = await searchMovies(name);
          let movie_data = res.results;
          
          appendMovie(movie_data);

          console.log("res", movie_data);
      }

    //   clear previous api call if new request came
      function debounce(func, delay){

        if(timerId){
            clearTimeout(timerId);
        }

        timerId = setTimeout(function(){
            func();
        }, delay)
      }

      // signup
      function Signup(e){

        e.preventDefault()

        let form = document.getElementById("signup-form")
        let sigData = document.getElementById("signup-form");

        let name = sigData.name.value;
        let email = sigData.email.value;
        let password = sigData.password.value;
        if (localStorage.getItem('user')=== null){
        localStorage.setItem("user", JSON.stringify([]));
        }
        let user ={
            name:name,
            email: email,
            password:password,
        };
            let users = JSON.parse(localStorage.getItem("user"))
        
            users.push(user);
        
            localStorage.setItem("user", JSON.stringify(users))


        let user_data ={
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            username: form.username.value,
            mobile: form.mobile.value,
            description: form.description.value,

        };


        user_data = JSON.stringify(user_data);

        fetch( "https://masai-api-mocker.herokuapp.com/auth/register",{


            method: "POST",

            body: user_data,

            headers:{
                "Content-Type":"application/json",
            },

        })
            .then ((res) =>{
                return res.json()
            })
            .then((res) =>{
                console.log("res:", res);
                alert(res.message)
                location.href = "login.html"
                
            })
            .catch((err) => {
                console.log("err:",err)
            })
    }
    // login
    
    function Login(e){
        var acc = document.getElementById("log")

        e.preventDefault()

        let form = document.getElementById("Lform")

        let user_data ={

            username: form.user.value,

            password: form.pass.value,
     

        };


        let data_to_send = JSON.stringify(user_data);

        fetch( "https://masai-api-mocker.herokuapp.com/auth/login",{


            method: "POST",

            body: data_to_send,

            headers:{
                "Content-Type":"application/json",
            },

        })
            .then ((res) =>{
                return res.json()
            })
            .then((res) =>{

                fetchmyData (user_data.username, res.token)
            })
            .catch((err) => {
                console.log("err:",err)
                alert("Username or Password is not match")
            })


    }

    function fetchmyData (username, token){
        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
            headers: {
                "Content-Type":"application/json",
                
                Authorization: `Bearer ${token}`,
            },
        })
        .then ((res) =>{
                return res.json()
            })
            .then((res) =>{
                console.log("res:", res);
                location.href ="Movies.html"

            })
            .catch((err) => {
                console.log("err:",err)
                
            })

    }
