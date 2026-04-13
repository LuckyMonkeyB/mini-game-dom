let pvUser = 100;
let pvPC = 100;


const attackImgUser = 'assets/images/chara2/Attack_1.png';
const idleImgUser = 'assets/images/chara2/Idle.png';
const deadImgUser = 'assets/images/chara2/Dead.png';

const attackImgPC = 'assets/images/boss1/Attack_4.png';
const idleImgPC = 'assets/images/boss1/Scream.png';
const deadImgPC = 'assets/images/boss1/Dead.png';

const attack = document.querySelector('.btn-attack');

const userImg = document.querySelector('.user');
const pcImg = document.querySelector('.pc');

const jornaling = document.querySelector('.jornal-log');

console.log('pvPc at the beginning: '+pvPC);

function userTurn(){
    userImg.src = attackImgUser;

    setTimeout(() => {
        userImg.src = idleImgUser;

        calculateUserDamage();

        if(pvPC <= 0){
            victory();
        }else{

        }

    }, 500)
}


function pcTurn(){
    pcImg.src = attackImgPC;

    setTimeout(() => {
        pcImg.src = idleImgPC;

        calculateUserDamage();

        if(pvUser <= 0){
            gameOver();
        }

    }, 500)

}

function calculateUserDamage(){
    let chance = Math.random();
    let damage = 0;

    console.log('chance random: '+chance);

    if(chance < 0.2){
        damage = 25;
        console.log('chance< 0.2');
    }else if(chance < 0.7){
        damage = 10;
        console.log('chance< 0.7');
    }else{
        damage = 0;
        console.log('chance=0');
    }

    pvPC -= damage;
    console.log('pvPc after calculation: '+pvPC);
}

function victory(){
    pcImg.src = deadImgPC;
    attack.disabled = true;
}

function gameOver(){
    userImg.src = deadImgUser;
    attack.disabled = true;
}

function jornalLog(){

}

attack.addEventListener('click', function(){
    if(pvUser > 0 && pvUser > 0){
        userTurn();
    }
});