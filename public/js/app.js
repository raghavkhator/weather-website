const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#weather-report')
const messageTwo = document.querySelector('#weather-msg')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    if(!search.value){
        return messageOne.textContent='Please provide a location'
    }
    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return messageOne.textContent=data.error
        }
        messageOne.textContent=data.location//+'\n'+data.location+"\n"+data.address
        messageTwo.textContent=data.forecastData
    })
})


})