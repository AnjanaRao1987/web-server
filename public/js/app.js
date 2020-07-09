console.log('Client side java script loaded')



const weatherForm = document.querySelector('form');
const serachTerm = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = serachTerm.value;
    const link = 'http://localhost:3000/weather?address='+location
    message1.textContent = 'Loading.....'
    fetch(link).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error;
            //console.log(data.error);
            return;
        }
        console.log(data)
        message1.textContent = data.location;
        message2.textContent = data.Temperature;
        //console.log(data);
    })
})
})
