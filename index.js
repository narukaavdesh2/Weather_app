const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3  img");
const weatherField = document.querySelector(".weather3 span");
const seachField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "delhi"

const fetchData = async (target) =>{
   try {
    const url = `https://api.weatherapi.com/v1/current.json?key=142bcc17d6254d27a78140850242008&q=${target}` 

    const response = await fetch(url);
    const data = await response.json();
    

    //destructuring of fetched data
    const {
        current:{temp_c,
            condition:{text,icon},

        },
        location:{name , localtime}
    } = data;

    updateDom(temp_c , name ,localtime, icon , text)
    // updateDom(data.current.temp_c,data.location.name);
    
   } catch (error) {
     alert("Wrong Name")
   }
}


function updateDom (temperate,city,time ,emoji , text){
    temperateField.innerText = temperate;
    cityField.innerText= city;

    const exactTime = time.split(" ")[1];
    const exactdate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactdate).getDay());

    dateField.innerText = `${exactTime} - ${exactDay} ${exactdate}`;


    weatherField.innerText = text;
    emojiField.src = emoji;
}

function getDayFullName(num){

    switch (num) {
        case 0:
            return "Sunday"
            break;

            case 1:
                return "Monday"
                break;

                case 2:
            return "Tuesday"
            break;

            case 3:
            return "Wednesday"
            break;

            case 4:
            return "Thursday"
            break;

            case 5:
            return "Friday"
            break;

            case 6:
            return "Saturday"
            break;

        default:
            return "Don't know"
            break;
    }
}


fetchData(target);

const search = (e)=>{
    e.preventDefault();

    target = seachField.value;

    fetchData(target);


}

form.addEventListener("submit",search)

