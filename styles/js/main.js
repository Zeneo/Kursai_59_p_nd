
let space_v =   60;     // Moving container height
let space_h =   930;    // Moving container width:
// ({width}[1000px]-{animal picture size}[70px])

//Stats
let alive = true;
let hunger = 100;
let health = 100;
let food = 30;          // How much food single feed gives
let consumption = 5;     // Consumed food per second

let anim_time = 200;
let anim_speed = 10;    // Animation speed
let cp_top = 50;        // Initial position of sprite top
let cp_left = 400;      // Initial position of sprite left
let img_sprite_h = -70;  // Horizontal sprite changes each %px
let img_sprite_v = -74;  // Vertical sprite changes each %px
let sprite = document.getElementById('js-sprite');
let walking;
move();
sprite.onmouseenter = function(){
    if(alive) {
        clearInterval(walking);
        sprite.style.backgroundPositionY = img_sprite_v+'px';
        sprite.style.backgroundPositionX = img_sprite_h+'px';
    }
}
sprite.onclick = function() {
    if(alive) {
        feed();
    }
}
sprite.onmouseleave = function(){
    if(alive) {
        setTimeout(function () {
            move();
        }, 400);
    }
}
// Consumption
let living = setInterval(function() {
    if(alive) {
        if (hunger - consumption < 0) {
            hunger = 0;
            if (health - 10 < 0) {
                die();
            } else {
                health -= 10;
            }
        } else {
            hunger -= consumption;
        }
        updateBars();
    }
}, 2000);

function updateBars() {
    document.querySelector('#js-healthCnt .quantity_cnt .quantity').style.height = health+'%';
    document.querySelector('#js-hungerCnt .quantity_cnt .quantity').style.height = hunger+'%';
}

function die() {
    clearInterval(living);
    clearInterval(walking);
    alive = false;
    let died = document.createElement("div");
    died.classList.add('died');
    document.querySelector('.main-width').append(died);
    let msg = document.createElement("div");
    msg.classList.add('msg-cnt');
    msg.innerHTML = '<h1>Your pet has died :(</h1>'
    document.querySelector('.main-width').append(msg);
}

/**
 * Move
 * cp - current position
 * np - new position
 */
function move() {
    clearInterval(walking);
    if(alive) {
        let np = 0; // New position
        let target = rndBetween(1, 4); //1-Goes top, 2-goes right, 3-goes bottom, 4-goes left
        let walkingPos = 0;
        if (target === 1) {
            np = rndBetween(0, cp_top);
            walking = setInterval(function () {
                if (cp_top >= np) {
                    if (walkingPos > 7) {
                        walkingPos = 0;
                    } else {
                        walkingPos++;
                    }
                    cp_top -= anim_speed;
                    sprite.style.backgroundPositionY = img_sprite_v * 2 + 'px';
                    sprite.style.backgroundPositionX = walkingPos !== 0 ? img_sprite_h * walkingPos + 'px' : null;
                    sprite.style.top = cp_top + 'px';
                } else {
                    sprite.classList.remove('smooth');
                    clearInterval(walking);
                    move();
                }
            }, anim_time)
        } else if (target === 2) {
            np = rndBetween(cp_left, space_h);
            walking = setInterval(function () {
                if (cp_left <= np) {
                    if (walkingPos > 6) {
                        walkingPos = 0;
                    } else {
                        walkingPos++;
                    }
                    cp_left += anim_speed;
                    sprite.classList.remove('spire_inv');
                    sprite.classList.add('smooth');
                    sprite.style.backgroundPositionY = '0';
                    sprite.style.backgroundPositionX = walkingPos !== 0 ? img_sprite_h * walkingPos + 'px' : walkingPos + 'px';
                    sprite.style.left = cp_left + 'px';
                } else {
                    sprite.classList.remove('smooth');
                    clearInterval(walking);
                    move();
                }
            }, anim_time)
        } else if (target === 3) {
            np = rndBetween(cp_top, space_v);
            walking = setInterval(function () {
                if (cp_top <= np) {
                    if (walkingPos > 7) {
                        walkingPos = 0;
                    } else {
                        walkingPos++;
                    }
                    cp_top += anim_speed;
                    sprite.style.backgroundPositionY = img_sprite_v + 'px';
                    sprite.style.backgroundPositionX = img_sprite_h * walkingPos + 'px';
                    sprite.style.top = cp_top + 'px';
                } else {
                    sprite.classList.remove('smooth');
                    clearInterval(walking);
                    move();
                }
            }, anim_time)
        } else {
            np = rndBetween(0, cp_left);
            sprite.classList.add('spire_inv');
            walking = setInterval(function () {
                if (cp_left >= np) {
                    if (walkingPos > 6) {
                        walkingPos = 0;
                    } else {
                        walkingPos++;
                    }
                    cp_left -= anim_speed;
                    sprite.style.backgroundPositionY = '0';
                    sprite.style.backgroundPositionX = img_sprite_h * walkingPos + 'px';
                    sprite.style.left = cp_left + 'px';
                } else {
                    sprite.classList.remove('smooth');
                    clearInterval(walking);
                    move();
                }
            }, anim_time)
        }
    }
}

function feed() {
    if(alive) {
        if (hunger + food > 100) {
            hunger = 100;
        } else {
            hunger += food;
        }
        updateBars();
    }
}

function rndBetween(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}