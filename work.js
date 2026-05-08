const input = document.querySelector("#city");
const button = document.querySelector("#button");
const part2 = document.querySelector("#part2");
const currentbutton = document.querySelector("#currentLocation");
const selectunit = document.querySelector("#unitchoosen")
const body = document.querySelector("#container")
const recentCities = document.querySelector("#recentcity");

let city;
let savedcoordinate = null;
let metric = "K";


let unit = "standard";
selectunit.addEventListener("change",(e)=>{
    if(selectunit.value){
        unit=selectunit.value;
    }
    if(savedcoordinate){
        if(unit=="metric"){
            metric = "C";
        }else if(unit =="imperial"){
            metric="F";
        }else{
            metric="K";
        }
        
        display(savedcoordinate);

    }else{
        alert("Please Enter Location");
        return;
    }
})

button.addEventListener("click",(e)=>{
    e.preventDefault();
    city = input.value;
    //console.log(city);

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=--`)
        .then(res=>res.json())
        .then(res=>{
            if(res.length === 0){
                alert("Invalid city name");
                return;
            }
            display(res);
            saveCity(city);
        })
        .catch(res=>{
            alert(`Error faced : ${res}`)
        })
})

//Code to save city in recent searches
function saveCity(city){

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if(!cities.includes(city)){

        cities.push(city);

        localStorage.setItem("cities", JSON.stringify(cities));
    }

    loadCities();
}

function loadCities(){

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    recentCities.innerHTML = `
        <option value="">Recent Searches</option>
    `;

    cities.forEach((city)=>{

        const option = document.createElement("option");

        option.value = city;

        option.innerText = city;

        recentCities.appendChild(option);
    })
}

recentCities.addEventListener("change",()=>{

    const selectedCity = recentCities.value;

    if(selectedCity){

        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=--`)
        .then(res => res.json())
        .then(res => {

            display(res);

        })
    }
})

// To Get user current Location
currentbutton.addEventListener("click",(e)=>{
    // Code to get current location of user

    navigator.geolocation.getCurrentPosition((position)=>{

    const lat2 = position.coords.latitude;

    const lon2 = position.coords.longitude;

    let coords = [{
        lat:lat2,
        lon:lon2
    }]

    display(coords);

})
})
// function to get lat and lon of the locationg
function display(value){

    part2.innerHTML='';

    const lat1 = value[0].lat;
    const lon1 = value[0].lon;

    savedcoordinate = value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon1}&units=${unit}&appid=--`)
    .then(res => res.json())
    .then(res => {

        for(let i=0;i<5;i++){

            const data = res.list[i * 8];

            const block1 = document.createElement("div");
            block1.classList.add("block");

            const date1 = document.createElement("h3");

            date1.innerText = data.dt_txt;

            const temp = document.createElement("p");
            temp.innerText = `Temperature : ${data.main.temp} °${metric}`;

            const humidity = document.createElement("p");
            humidity.innerText = `Humidity : ${data.main.humidity}`;

            const feels_like = document.createElement("p");
            feels_like.innerText = `Feels Like : ${data.main.feels_like}`;

            const temp_min = document.createElement("p");
            temp_min.innerText = `Minimum Temp : ${data.main.temp_min}`;

            const temp_max = document.createElement("p");
            temp_max.innerText = `Maximum Temp : ${data.main.temp_max}`;

            const description = document.createElement("p");
            description.innerText = `Description : ${data.weather[0].description}`;

            const icon = document.createElement("img");
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            block1.appendChild(date1);
            block1.appendChild(temp);
            block1.appendChild(feels_like);
            block1.appendChild(humidity);
            block1.appendChild(temp_min);
            block1.appendChild(temp_max);
            block1.appendChild(description);
            block1.appendChild(icon);

            part2.appendChild(block1);
        }
        const image = res.list[0].weather[0].main;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        if(image=="Rain"){
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1610741083757-1ae88e1a17f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        }else if(image=="Clear"){
            body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1733306531071-087c077e1502?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        }else if(image=="Clouds"){
            body.style.backgroundImage="url('https://images.unsplash.com/uploads/14122598319144c6eac10/5f8e7ade?q=80&w=1361&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        }

    });
}
loadCities();