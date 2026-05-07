const input = document.querySelector("#city");
const button = document.querySelector("#button");
const part2 = document.querySelector("#part2");

// Taking input for city
let city;

button.addEventListener("click",(e)=>{
    e.preventDefault();
    city = input.value;
    //console.log(city);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=dd8b9eb569c7f48a6f5662f3b137ea65`)
        .then(res=>res.json())
        .then(res=>{
            display(res);
        })
})
// function to get lat and lon of the locationg
function display(value){
    const lat1 = value[0].lat;
    const lon1 = value[0].lon;
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
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat1}&lon=${lon1}&exclude=minutely,hourly&appid=dd8b9eb569c7f48a6f5662f3b137ea65`)
        .then(res=>res.json())
        .then(res=> {
            const temp = document.createElement("p");
            temp.innerText = res.daily[i].temp.day;
            const humidity = document.createElement("p");
            humidity.innerText = res.daily[i].humidity;
            const feels_like = document.createElement("p");
            feels_like.innerText = res.daily[i].feels_like.day;
            const clouds = document.createElement("p");
            clouds.innerText = res.daily[i].clouds;
            const description = document.createElement("p");
            description.innerText = res.daily[i].weather[0].description;
            
            block1.appendChild(temp);
            block1.appendChild(feels_like);
            block1.appendChild(humidity);
            block1.appendChild(clouds);
            block1.appendChild(description);
        })
        part2.appendChild(block1);
    }
    
}
