const input = document.querySelector("#city");
const button = document.querySelector("#button");
const part2 = document.querySelector("#part2");
const currentbutton = document.querySelector("#currentLocation");
const selectunit = document.querySelector("#unitchoosen")

let city;
let savedcoordinate = null;

let unit = "standard";
selectunit.addEventListener("change",(e)=>{
    if(selectunit.value){
        unit=selectunit.value;
    }
    if(savedcoordinate){
        display(savedcoordinate)
    }else{
        alert("Please Enter Location");
        return;
    }
})

button.addEventListener("click",(e)=>{
    e.preventDefault();
    city = input.value;
    //console.log(city);

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=dd8b9eb569c7f48a6f5662f3b137ea65`)
        .then(res=>res.json())
        .then(res=>{
            if(res.length === 0){
                alert("Invalid city name");
                return;
            }
            display(res);
        })
        .catch(res=>{
            alert(`Error faced : ${res}`)
        })
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
    // store value in savedcoordinates
    savedcoordinate = value;
    for(let i=0;i<5;i++){
        //console.log(value[i].lat);
        //console.log(value[i].lon);

        const block1 = document.createElement("div");
        block1.classList.add("block");
        const date1 = document.createElement("h3")
        
        let date = new Date();

        date.setDate(date.getDate() + i);

        let day = String(date.getDate()).padStart(2,'0');
        let month = String(date.getMonth() + 1).padStart(2,'0');
        let year = date.getFullYear();

        date1.innerText = `${day}/${month}/${year}`;
        block1.appendChild(date1);

        //generating dt value
        //let dt1 = Math.floor(Date.now()/1000) + (86400 * i);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&units=${unit}&appid=dd8b9eb569c7f48a6f5662f3b137ea65`)
        .then(res=>res.json())
        .then(res=> {
            const temp = document.createElement("p");
            temp.innerText = `Temperature : ${res.main.temp}`;
            const humidity = document.createElement("p");
            humidity.innerText = `Humidity : ${res.main.humidity}`;
            const feels_like = document.createElement("p");
            feels_like.innerText = `Fells Like : ${res.main.feels_like}`;
            const temp_min = document.createElement("p");
            temp_min.innerText = `Minimum Temp : ${res.main.temp_min}`;
            const temp_max = document.createElement("p");
            temp_max.innerText = `Maximum Temp : ${res.main.temp_max}`;
            const description = document.createElement("p");
            description.innerText = `Description : ${res.weather[0].description}`;
            
            block1.appendChild(temp);
            block1.appendChild(feels_like);
            block1.appendChild(humidity);
            block1.appendChild(temp_min);
            block1.appendChild(temp_max);
            block1.appendChild(description);
        })
        part2.appendChild(block1);
    }
    
}
