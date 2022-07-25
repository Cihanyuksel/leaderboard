const info = document.querySelector('.info');
const errorMessage = document.querySelector('.error-message');
const firstname = document.getElementById('firstname'); /*INPUT */
const lastname = document.getElementById('lastname');   /*INPUT */
const country = document.getElementById('country');     /*INPUT */
const score = document.getElementById('score');         /*INPUT */

let currentScore;
let addFiveBtns;
let subFiveBtns;
let delBtns;

const add = document.getElementById('add');

add.addEventListener('click', e => {
    e.preventDefault();
})

startLs();

// start ls
function startLs () {
    const playersLs = JSON.parse(localStorage.getItem('players'));

    if(!playersLs) {
        localStorage.setItem('players', JSON.stringify([]));
    }
    else {
       const sortedPlayerLS = playersLs.sort((a,b) => b.score - a.score);
        sortedPlayerLS.forEach(player => {
                addPlayer(player)
        })
    }
}

// random id
function getRandomInt() {
    return Math.floor(Math.random() * 100 );
}

// input value
function getInputValue (firstname, lastname, country, score) {

    const newPlayer = {id:getRandomInt(), firstname, lastname, country, score};
    
    const playersLs = JSON.parse(localStorage.getItem('players'));

    if (firstname === "" || lastname === "" ) {
        return errorMessage.textContent = "please fill in the blanks"
    } 

    else if (score >  100) {
        return errorMessage.textContent = "the number you enter must be 100 or less."
    }

    else if (score % 5 !== 0 ) {
        return errorMessage.textContent = "the number you entered must be a multiple of 5."
    }

    else {
        playersLs.push(newPlayer);
        setTimeout(() => errorMessage.textContent = "" , 500)
    }
    
    localStorage.setItem('players', JSON.stringify(playersLs))
    addPlayer(playersLs[playersLs.length-1])    

    // window.location.reload();
}

// clear error message
setTimeout(() => errorMessage.textContent = "" , 2500)

add.addEventListener('click', () => getInputValue(firstname.value, lastname.value, country.value, +(score.value)))

// add player
function addPlayer (players) {
    currentScore = players.score
        info.innerHTML += `
        <li class='user' id='user'>
            <div class="main">
                <span class='user-id'>${players.id}</span>
                <span class='user-name'>${players.firstname } ${players.lastname}</span>
                <small class='date'>17.07.2022</small>
            </div>
            <span class='country'>${players.country}</span>
            <span class="score" id="scoreText">${currentScore}</span>

            <div class='user-update-score' id='user-update-score'>
                <button type='button' id='del'>Del</button>
                <button type='button' id="increase">+5</button>
                <button type='button' id='decrease'>-5</button>
            </div> 
        </li> `

    addFiveBtns = document.querySelectorAll('#increase');
    subFiveBtns = document.querySelectorAll('#decrease');
    delBtns = document.querySelectorAll('#del');

    addFiveBtns.forEach(increaseBtn => increaseBtn.addEventListener('click', addFive));

    subFiveBtns.forEach(decreaseBtn => decreaseBtn.addEventListener('click', subFive));

    delBtns.forEach(delBtn => delBtn.addEventListener('click', delPlayer));
}

// add point
function addFive(e) {
    let score = +(e.target.parentElement.parentElement.children[2].innerHTML);

    if(+(e.target.parentElement.parentElement.children[2].innerHTML) >= 100) {
        return
    } 

    else {
        e.target.parentElement.parentElement.children[2].innerHTML = +(e.target.parentElement.parentElement.children[2].innerHTML) + 5;
        let players = JSON.parse(localStorage.getItem('players'));

        for(let i = 0; i < players.length; i++) {

            if(players[i].score === score) {
                players[i].score += 5
                localStorage.setItem("players", JSON.stringify(players))
            }
        }
    }
}

// sub point
function subFive(e) {

    let score = +(e.target.parentElement.parentElement.children[2].innerHTML);

    if(+(e.target.parentElement.parentElement.children[2].innerHTML) <= 0) {
        return
    } 
    
    else {
        e.target.parentElement.parentElement.children[2].innerHTML -= 5
        let players = JSON.parse(localStorage.getItem('players'));
        
        for(let i = 0; i < players.length; i++) {

            if(players[i].score === score) {
                players[i].score -= 5
                localStorage.setItem("players", JSON.stringify(players))
            }
        }
    }
}

// delete player
function delPlayer(e) {
    
    const id = e.target.parentElement.parentElement.firstElementChild.children[0].innerHTML;

    const playersLs = JSON.parse(localStorage.getItem('players'));

    const deletedPlayersLS =  playersLs.filter(player => player.id != id)

    localStorage.setItem('players', JSON.stringify(deletedPlayersLS))
    // window.location.reload();
}