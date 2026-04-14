// -------------------------
let hpplayer = 100;
let hpPC = 100;


const attackImgplayer = 'assets/images/chara2/Attack_1.png';
const shieldImgplayer = 'assets/images/chara2/Shield.png';
const idleImgplayer = 'assets/images/chara2/Idle.png';
const hurtImgplayer = 'assets/images/chara2/Hurt.png';
const deadImgplayer = 'assets/images/chara2/Dead.png';

const attackImgPC = 'assets/images/boss1/Attack_4.png';
const screamImgPC = 'assets/images/boss1/Scream.png';
const idleImgPC = 'assets/images/boss1/Idle.png';
const hurtImgPC = 'assets/images/boss1/Hurt.png';
const deadImgPC = 'assets/images/boss1/Dead.png';
// -------------------------
// Dom references
const attack = document.querySelector('.btn-attack');

const playerImg = document.querySelector('.player');
const pcImg = document.querySelector('.pc');

const playerHpBar = document.querySelector('.player-hp-fill');
const pcHpBar = document.querySelector('.pc-hp-fill');
const gameMessage = document.querySelector('.game-message');

const jornaling = document.querySelector('.jornal-log');
// -------------------------

console.log('hpPc at the beginning: '+hpPC);

function playerTurn(){
    playerImg.src = attackImgplayer;
    playerImg.classList.add('go-foward');

    setTimeout(() => {
        playerImg.src = shieldImgplayer;
        playerImg.classList.remove('go-foward');

        calculateplayerDamage();

        if(hpPC <= 0){
            victory();
        }else{
            setTimeout(()=> {
                pcTurn();
            }, 1000)
        }

    }, 500)
}

function pcTurn(){
    pcImg.src = attackImgPC;

    setTimeout(() => {
        pcImg.src = screamImgPC;

        calculatePCDamage();

        if(hpplayer <= 0){
            gameOver();
        }

    }, 500)

}
// -------------------------

// --- Logic to manage damages when player's turn ---
function calculateplayerDamage(){
    let chance = Math.random();
    let damage = 0;
    let message = "";

    console.log('chance random: '+chance);

    if(chance < 0.2){
        damage = 25;
        console.log('chance< 0.2');

        pcImg.src = hurtImgPC;
        pcImg.classList.add('hurt');
        setTimeout(() => {
            if (hpPC > 0) {
                pcImg.src = screamImgPC;
            }
        }, 500);

        message = `CRITICAL HIT! You deal ${25} damage.`;
    
    }else if(chance < 0.7){
        damage = 10;
        console.log('chance< 0.7');

        pcImg.src = hurtImgPC;
        pcImg.classList.add('hurt');
        setTimeout(() => {
            if (hpPC > 0) {
                pcImg.src = screamImgPC;
            }
        }, 500);

        message = `You strike the enemy for ${10} damage.`;
    
    }else{
        damage = 0;
        console.log('chance=0');
        message = `Your attack missed!`;
    }

    hpPC -= damage;
    console.log('hpPc after calculation: '+hpPC);

    updateHP();
    jornalLog(message, 'player-log');
}

// --- Logic to manage damages when pc aka boss' turn ---
function calculatePCDamage(){
    let chance = Math.random();
    let damage = 0;
    let message ="";

    console.log('chance random: '+chance);

    if(chance < 0.2){
        damage = 25;
        console.log('chance< 0.2');

        playerImg.src = hurtImgplayer;
        playerImg.classList.add('hurt');
        setTimeout(() => {
            if (hpplayer > 0) {
                playerImg.src = shieldImgplayer;
                playerImg.classList.remove('hurt');
            }
        }, 500);

        message = `DEVASTATING BLOW! You take ${25} damage.`;
    
    }else if(chance < 0.7){
        damage = 10;
        console.log('chance< 0.7');

        playerImg.src = hurtImgplayer;
        playerImg.classList.add('hurt');
        setTimeout(() => {
            if (hpplayer > 0) {
                playerImg.src = shieldImgplayer;
                playerImg.classList.remove('hurt');
            }
        }, 500);

        message = `The opponent hits you for ${10} damage.`;
    
    }else{
        damage = 0;
        console.log('chance=0');
        message = `The opponent's strike fell short!`;
    }

    hpplayer -= damage;
    console.log('hpplayer after calculation: '+hpplayer);

    updateHP();
    jornalLog(message, 'pc-log');
}
// -------------------------

// --- Logic to manage health points bars ---
function updateHP() {
    // Math.max(val1, val2) takes the highest between them. It ensures hp never goes under 0 for visual purposes (ex hp = -20)
    const playerPercent = Math.max(0, hpplayer);
    const pcPercent = Math.max(0, hpPC);
    
    playerHpBar.style.width = playerPercent + "%";
    pcHpBar.style.width = pcPercent + "%";
}

// -------------------------

function victory(){
    playerImg.src = idleImgplayer;

    pcImg.src = deadImgPC;
    pcImg.classList.add('deadBoss');

    setTimeout(() => {
        pcImg.style.display = "none"
    }, 500)

    gameMessage.innerText = "YOU WIN";
    gameMessage.classList.remove('hidden');
    gameMessage.classList.add('win-text');

    jornalLog('---Victory---', 'player-log');
    attack.style.display = "none";
}

function gameOver(){
    playerImg.src = deadImgplayer;
    pcImg.classList.add('boss-float');

    gameMessage.innerText = "GAME OVER";
    gameMessage.classList.remove('hidden');
    gameMessage.classList.add('lose-text');

    jornalLog('---Game Over---', 'pc-log');
    attack.style.display = "none";
}

// -------------------------

// --- Logic to manage the fighting Jornal ---
function jornalLog(text, playerTurn){
    const p = document.createElement('p');
    p.innerText = text;
    p.classList.add(playerTurn);
    jornaling.appendChild(p);

    jornaling.scrollTop = jornaling.scrollHeight;
}

// -------------------------

// --- Logic to start the game ---
attack.addEventListener('click', function(){
    if(hpplayer > 0 && hpplayer > 0){
        playerTurn();
    }
});