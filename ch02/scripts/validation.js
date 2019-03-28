window.onload = initPage;
var httpRequest, username, register;

function initPage() {
    username = document.getElementById("username");
    register = document.getElementById("register");
    username.onblur = checkUsername;
    register.disabled = true;
}

function checkUsername() {
    httpRequest = new XMLHttpRequest();
    username.className = "thinking";
    if (!httpRequest) {
        alert("Giving up :( Cannot create an XMLHTTP instance");
		return false;
    }
    httpRequest.onreadystatechange = showUsernameStatus;
    httpRequest.open("GET", `checkName.php?username=${username.value}`)
    httpRequest.send();
}

function showUsernameStatus() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            if (httpRequest.responseText === "okay") {
                username.className = "approved";
                register.disabled = false;
            } else {
                username.className = "denied";
                username.focus();
                username.select();
                register.disabled = true;
            }
        } else {
            alert("There was a problem with the request.");                
        }
    }
}