

document.getElementById("getCookie").addEventListener("click", getCookie)
document.getElementById("addClick").addEventListener("click", upgradeClick)
document.getElementById("addGrandma").addEventListener("click", getGrandma)
document.getElementById("addBakery").addEventListener("click", getbakery)
document.getElementById("addFactory").addEventListener("click", getFactory)


let addClickCost = document.getElementById("addClickCost").innerHTML

let cookieCount = 0
let allTimeCookieCount = 0

let clickModifier = 1

let grandmaCost = 50
let bakeryCost = 300
let factoryCost = 1000

let totalGrandmas = 0
let totalBakeries = 0
let totalFactories = 0

    
//cookies for testing/demonstration purposes
document.getElementById("devButton").addEventListener("click", dev)
function dev(){
    cookieCount += 100000
    //console.log(allTimeCookieCount)
    //console.log(stats())
}
    
    
function getCookie(){
    cookieCount += clickModifier
    allTimeCookieCount += clickModifier
    document.getElementById("totalCookies").innerHTML = cookieCount
}
    
function upgradeClick(){  
    if (cookieCount >= addClickCost){
        clickModifier += 1, cookieCount -= addClickCost, addClickCost *= 2
        let images = document.createElement("div");
        images.innerHTML = `<img src="resources/PngItem_113733.png" height="200">`
        images.setAttribute('class','swatch')
    clickerPhotos.appendChild(images)}
        else {alert("Not Enough Cookies, keep clicking")}
        document.getElementById("addClick").innerHTML = clickModifier
        document.getElementById("addClickCost").innerHTML = addClickCost
        document.getElementById("totalCookies").innerHTML = cookieCount
}
        
        
                                   //automation//
        //grandmas
        
function grandmaCostInc(){
    grandmaCost *= 1.1
    grandmaCost = Math.round(grandmaCost)
    document.getElementById("grandmaCost").innerHTML = grandmaCost
}
function getGrandma(){
    if (cookieCount >= grandmaCost && totalGrandmas === 0){
        totalGrandmas += 1,cookieCount -= grandmaCost , grandmaCostInc(), alert("You just bought a Grandma! IDK if that is even legal but they make really good cookies")
        let images = document.createElement("div");
        images.innerHTML = `<img src="resources/not-grandma-tshirt_large.webp" height="200">`
        images.setAttribute('class','swatch')
    grannyPhotos.appendChild(images)}
    else if (cookieCount >= grandmaCost){
        totalGrandmas += 1,cookieCount -= grandmaCost , grandmaCostInc()
        let images = document.createElement("div");
        images.innerHTML = `<img src="resources/not-grandma-tshirt_large.webp" height="200">`
        images.setAttribute('class','swatch')
    grannyPhotos.appendChild(images)}
    else{alert("Not Enough Cookies, keep clicking")}
    document.getElementById("addGrandma").innerHTML = totalGrandmas
    document.getElementById("totalCookies").innerHTML = cookieCount
}
    window.setInterval(function(){
        cookieCount += totalGrandmas
        allTimeCookieCount += totalGrandmas
            document.getElementById("totalCookies").innerHTML = cookieCount
        }, 3100)
                
                
                //Bakery

function bakeryCostInc(){
    bakeryCost *= 1.1
    bakeryCost = Math.round(bakeryCost)
    document.getElementById("bakeryCost").innerHTML = bakeryCost
}
function getbakery(){
    if (cookieCount >= bakeryCost && totalBakeries === 0){
        totalBakeries += 1,cookieCount -= bakeryCost , bakeryCostInc(), alert("Congrats, you just opened a bakery. Everyone loves your cookies.")
        let images = document.createElement("div");
            images.innerHTML = `<img src="resources/playmobil-christmas.gif" height="200">`
            images.setAttribute('class','swatch')
        bakeryPhotos.appendChild(images)}
    else if (cookieCount >= bakeryCost){
        totalBakeries += 1,cookieCount -= bakeryCost , bakeryCostInc()
        let images = document.createElement("div");
            images.innerHTML = `<img src="resources/playmobil-christmas.gif" height="200">`
            images.setAttribute('class','swatch')
        bakeryPhotos.appendChild(images)}
    else{alert("Not Enough Cookies, keep clicking")}
        document.getElementById("addBakery").innerHTML = totalBakeries
        document.getElementById("totalCookies").innerHTML = cookieCount
}
    window.setInterval(function(){
        cookieCount += totalBakeries
        allTimeCookieCount += totalBakeries
        document.getElementById("totalCookies").innerHTML = cookieCount
}, 2000)
                        
                        //factory
                        
function factoryCostInc(){
    factoryCost *= 1.1
    factoryCost = Math.round(factoryCost)
        document.getElementById("factoryCost").innerHTML = factoryCost
}
function getFactory(){
    if (cookieCount >= factoryCost && totalFactories === 0){
        totalFactories += 1,cookieCount -= factoryCost , factoryCostInc(), alert("Who knew the cookie industry was so hot?")
        let images = document.createElement("div");
            images.innerHTML = `<img src="resources/biscuit-machine.gif" height="200">`
            images.setAttribute('class','swatch')
        factoryPhotos.appendChild(images)}
    else if (cookieCount >= factoryCost){
        totalFactories += 1,cookieCount -= factoryCost , factoryCostInc()
        let images = document.createElement("div");
        images.innerHTML = `<img src="resources/biscuit-machine.gif" height="200">`
        images.setAttribute('class','swatch')
    factoryPhotos.appendChild(images)}
    else{alert("Not Enough Cookies, keep clicking")}
document.getElementById("addFactory").innerHTML = totalFactories
document.getElementById("totalCookies").innerHTML = cookieCount

}
    window.setInterval(function(){
        cookieCount += totalFactories
        allTimeCookieCount += totalFactories
        document.getElementById("totalCookies").innerHTML = cookieCount
    }, 500)



//scoreboard


    function deletestat(i){
        axios.delete(`http://localhost:4000/api/playerStats/${i}`).then((res) => {
            writeScoreBoard(res.data)
        })}
        
const postStats = (e) => {
    e.preventDefault();
    let playerName = document.getElementById("playerName").value;
    let stats = {
        name: playerName,
        allTimeCookies: allTimeCookieCount,
        cookiesPerClick: clickModifier,
        grandmas: totalGrandmas,
        bakeries: totalBakeries,
        factories: totalFactories
}
    axios.post("http://localhost:4000/api/playerStats",{ stats }).then((res) => {   
        writeScoreBoard(res.data)})
}                      
        
function writeScoreBoard(scoreBoardData){
        const statsVar = Array.from(document.getElementsByClassName("playerStats"))
        statsVar.forEach(item => {
        item.remove()});
    for(i=0; scoreBoardData.length > i; i++){
        let index = JSON.stringify(scoreBoardData[i])
        let scoreBoard = document.createElement("div");
        scoreBoard.innerHTML = `${index} <button onclick="deletestat(${i})">delete</button>`
            scoreBoard.setAttribute('class','playerStats')
            scoreBoard.setAttribute('id', `playerID${i}`)

statsSection.appendChild(scoreBoard)
}}


statsForm.addEventListener("submit", postStats)
statsForm.addEventListener("see", getStats)