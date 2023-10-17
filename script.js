const BASE_URL = "http://127.0.0.1:8000"

fetch(BASE_URL + "/api/fighters/")
.then(res => res.json())
.then(fighters => {
    init(fighters)
})

function init(players) {
    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");
    loadPlayerDOM(player1, players[0])
    loadPlayerDOM(player2, players[1])

    fightSimulation(players[0], players[1])
}

function loadPlayerDOM(player, playerStats) {
    let image = document.createElement("div");

    image.style.backgroundImage = `url(${BASE_URL + playerStats.image})`
    
    /*let img = document.createElement("img");
    img.src = `${BASE_URL}${playerStats.image}`
    img.width = "128"
    img.height = "128"*/

    image.classList.add("player-image")
    image.innerHTML = playerStats.name
    image.innerHTML += "<br>"

    //image.appendChild(img)
    player.appendChild(image)

    let stats = ["agility", "dexterity", "endurance", "intelligence", "strength"]
    stats.forEach(stat => {
        let statDom = document.createElement('div')
        statDom.classList.add("stat")
        statDom.innerHTML += `<span>${stat}</span>`
        statDom.innerHTML += `<span> ${playerStats[stat]}</span>`
        player.appendChild(statDom)
    });
}

function fightSimulation(player1, player2) {
    let fightField = document.getElementById("fight")

    let player1Round = true;
    let player1HP = player1.endurance * 20;
    let player2HP = player2.endurance * 20;

    let intervalID = setInterval(() => {
        let fightMove = document.createElement("div");

        let attacker = player1Round ? player1 : player2
        let defender = player1Round ? player2 : player1

        let damage = Math.floor(Math.random()*attacker.strength)
        player1Round ? player1HP -= damage : player2HP -= damage

        fightMove.innerText = `${attacker.name} nekiront ${defender.name}-nek és ${damage} sebzést okoz! ${defender.name} élete: ${player1Round ? player1HP : player2HP}`
        fightField.appendChild(fightMove)
        player1Round = !player1Round

        if (player1HP <= 0 || player2HP <= 0) {
            clearInterval(intervalID)
        }
    }, 500)
}