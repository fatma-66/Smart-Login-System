var nameInput = document.getElementById("input1");
var passwordInput = document.getElementById("input3");
var logedEmail = document.getElementById("input4");
var logedpassword = document.getElementById("input5");
var myButton = document.getElementById("mybutton");
var myAnchor = document.querySelector(".register");
var myAnchor2 = document.querySelector(".login");
var myAnchor3 = document.querySelector(".logging");
var myAnchor4 = document.querySelector(".logedout");
var emailInput = document.querySelector("#input2");

var usersContainer = JSON.parse(localStorage.getItem("users")) || [];
var regex = {
  input1: /^[a-zA-Z0-9 ]{3,}$/,
  input2: /[^@\s]+@[^@\s]+\.[^@\s]+/,
  input3: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  input4: /[^@\s]+@[^@\s]+\.[^@\s]+/,
  input5: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
};

function validateRegister(element) {
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function registerUser() {
  if (
    nameInput.classList.contains("is-valid") &&
    emailInput.classList.contains("is-valid") &&
    passwordInput.classList.contains("is-valid")
  ) {
    if (checkUserMail()) {
      document.querySelector(".exist").classList.remove("d-none");
      return;
    } else {
      usersContainer = usersContainer || [];

      var signedUPUser = {
        name: nameInput.value,
        email: emailInput.value,
        passcode: passwordInput.value,
      };

      usersContainer.push(signedUPUser);
      localStorage.setItem("users", JSON.stringify(usersContainer));

      // window.location.href = 'login.html';
      myAnchor.addEventListener("click", function (event) {
        myAnchor.setAttribute("href", "login.html");
      });
    }
  } else if (
    emailInput.value === "" ||
    nameInput.value === "" ||
    passwordInput.value === ""
  ) {
    document.querySelector(".pop").classList.remove("d-none");
  }

  clearForm();
  // document.querySelector('.exist').classList.remove( "d-none" );
}

function checkUserMail() {
  for (let i = 0; i < usersContainer.length; i++) {
    if (emailInput.value === usersContainer[i].email) {
      return true;
    }
  }
  return false;
}

function checkUserLogInMail() {
  mail = logedEmail;
  pass = logedpassword;
  for (let i = 0; i < usersContainer.length; i++) {
    if (
      logedEmail.value === usersContainer[i].email &&
      logedpassword.value === usersContainer[i].passcode
    ) {
      return true;
    }
  }
  return false;
}

function loginUser() {
  if (checkUserLogInMail()) {
    myAnchor3.setAttribute("href", "Home.html");
  } else if (logedEmail.value === "" || logedpassword.value === "") {
    document.querySelector(".empty").classList.remove("d-none");
    document.querySelector(".logged").classList.add("d-none");
  } else {
    document.querySelector(".logged").classList.remove("d-none");
  }

  logedEmail.classList.replace("is-valid", "is-invalid");
  logedpassword.classList.replace("is-valid", "is-invalid");
}

function logout() {
  myAnchor4.setAttribute("href", "login.html");
}

function welcomeUser() {
  var loggedUsers = [];

  for (i = 0; i < usersContainer.length; i++) {
    item = usersContainer[i].name;
    loggedUsers.push(item);
  }

  sessionStorage.setItem("userName", JSON.stringify(loggedUsers));
  var user = JSON.parse(sessionStorage.getItem("userName"));
  var usersArray = JSON.parse(localStorage.getItem("users")) || [];
  for (x = 0; x < usersArray.length; x++) {
    log = usersArray[x].name;
    for (j = 0; j < user.length; j++) {
      if (log === user[j]) {
        document.getElementById("welcome").innerHTML = `Welcome ${user[j]}`;
      } else {
        document.getElementById("welcome").innerHTML =
          "Please Login to Continue";
      }
    }
  }
}

welcomeUser();


// function loginUser() {
//   if (
//     logedEmail.classList.contains("is-valid") &&
//     logedpassword.classList.contains("is-valid")
//   ) {
//     if (checkUserLogInMail()) {
//       myAnchor3.setAttribute("href", "Home.html");
//     } else {
//       document.querySelector(".logged").classList.remove("d-none");
//     }
//   } else if (logedEmail.value === "" || logedpassword.value === "") {
//     document.querySelector(".empty").classList.remove("d-none");
//   }

//   logedEmail.classList.replace("is-valid", "is-invalid");
//   logedpassword.classList.replace("is-valid", "is-invalid");
//   clearForm() ;
// }

// function clearForm() {
//   nameInput.value = "";
//   emailInput.value = "";
//   logedEmail.value = "";

// }
