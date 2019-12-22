console.log("Deep Shah");

const weatherForm = document.querySelector("form");
const address = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const serach = address.value;
    messageTwo.textContent = "";
    messageOne.textContent = "Loading...";
    if(!address){
        return messageOne.textContent = "Type address to see result.";
    }
    fetch(`http://localhost:3000/weather?address=${serach}`).then((response) =>{
        response.json().then((data) => {
        if(data.error){
            return messageOne.textContent = data.error;
        }

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
    })
})
})
