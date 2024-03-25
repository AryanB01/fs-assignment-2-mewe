function checkPassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;
    let pwMsg = document.getElementById('pwMsg');

    if (password !== confirmPassword) {
        pwMsg.innerText = "Passwords do not match";
        pwMsg.className = "text-danger";
        return false;
    }
    else {
        pwMsg.innerText = "";
        pwMsg.className = "";
        return true;
    }
}

function showHide() {
    // toggle password input type and show/hide icon
    let password = document.getElementById('password');
    let image = document.getElementById('imgShowHide');

    if (password.type == 'password') {
        password.type = 'text';
        image.src = '/images/hide.png';
    }
    else {
        password.type = 'password';
        image.src = '/images/show.png';
    }
}

function showHideConfirm(){
     // toggle password input type and show/hide icon
     let confirmpassword = document.getElementById('confirmpassword');
     let image = document.getElementById('imgShowHide2');
 
     if (confirmpassword.type == 'password') {
        confirmpassword.type = 'text';
         image.src = '/images/hide.png';
     }
     else {
         confirmpassword.type = 'password';
         image.src = '/images/show.png';
     }
}