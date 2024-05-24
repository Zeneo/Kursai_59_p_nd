let username:string;

// Regular user login button || Admin user login button
let RULB = document.getElementById('regularLogin');
let AULB = document.getElementById('regularLogin');
if (RULB !== null) {
    RULB.addEventListener('click', function() {
        login();
    });
}
if (AULB !== null) {
    AULB.addEventListener('click', function() {
        login('admin');
    });
}

/**
 * Login
 * @param username
 */
function login(username = 'regular') {
    if (username === 'admin') {

    } else {

    }
}
