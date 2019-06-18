const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#weather-report')
const messageTwo = document.querySelector('#weather-msg')
const messageThree = document.querySelector('#high-temp')
const messageFour = document.querySelector('#low-temp')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    messageThree.textContent=''
    messageFour.textContent=''

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
        messageThree.textContent='Today\'s Highest: '+data.high
        messageFour.textContent='Today\'s Lowest: '+data.low
    })
})


})