let icons = document.querySelectorAll(".label-icon");
let inputs = document.querySelectorAll(".app-form div input")
let eyeShow = document.querySelector(".eye-show");
let eyeHide = document.querySelector(".eye-hide");
let passwordInput = document.querySelector("#password");
let inputToggle = document.querySelector(".eye-icon-toggle");
let form = document.querySelector(".app-form");
let mainForm = document.querySelector(".form-sign-up")
let gender = document.querySelector("gender");
let success = document.querySelector(".success");
let submit2 = document.querySelector(".submit2");
let successAlert = document.querySelector(".success-alert")
let name = document.getElementById("fn");



// ========================================== easing the div validation ==========================================//

inputs.forEach(element => {
   
    element.addEventListener('focus', (e) => {
        img = e.target.previousElementSibling;


    })

    element.addEventListener('focusout', (e) => {
        img = e.target.previousElementSibling;
        img.classList.remove("label-icon-anim");
        if (e.target.type == 'tel') {
            e.target.value = phoneFormat(e.target.value);
            console.log(phoneFormat(e.target.value));
        }



    })



 

    element.addEventListener('input', function(e) {
        let type = e.target;
        if (type.type == "radio") {
            if (e.target.className == "male") {
                e.target.parentElement.style.borderColor = " rgb(19, 175, 232)";
                e.target.parentElement.style.borderWidth = "2px";
                document.querySelector('.female').parentElement.style.borderColor = "#b41f0b"
            } else {
                e.target.parentElement.style.borderColor = " rgb(19, 175, 232)";
                e.target.parentElement.style.borderWidth = "2px";
                document.querySelector('.male').parentElement.style.borderColor = "#b41f0b"
            }

            if (!e.target.checked) e.target.parentElement.style.borderColor = "#b41f0b";
            return;
        }
        parentElement = e.target.parentElement;
        toolipMain = parentElement.querySelector(".toolip");
        checkValidity = validOption(type, e.target.value);

        showOrHideTollip(toolipMain, "toolip-ease", checkValidity);
        if (checkValidity) {
            e.target.style.borderColor = " rgb(19, 175, 232)";
            e.target.style.borderWidth = "2px";
        } else {
            e.target.style.borderColor = "#b41f0b"; 
            e.target.style.borderWidth = "1px";
            
        };

    })
})




form.onsubmit = submit;
let check

function submit(e) {
    let check = true;
    inputs.forEach(element => {
        if (element.type != 'radio') {
            check = check && validOption(element, element.value);
            check = ValidateDOB();
            check = validatePassword();
            
        }
    })
    e.preventDefault();
    console.log(check);
    if (check) {
        name = (fn.value).split(" ");
        alert("SUCCESSFULLY REGISTERED!");
        resetForm(inputs);
    } else {
        alert("FAILED TO REGISTER!");
        inputs.forEach(element => {
            if (element.value == "") {
                toolipMain = element.parentElement.querySelector(".toolip");
                showOrHideTollip(toolipMain, "toolip-ease", false);
                  
                
            }
        })
    }

    return check;
}






function showHideSection(toShow, toHide) {
    if (toHide.style.display = "none") toShow.style.display = "block";
}


function resetForm(array) {
    array.forEach(element => {
        element.value = "";
        element.style.borderWidth = "1px";
        element.style.borderColor = "#b41f0b";
        if (element.type == "radio") {
            element.checked = false
            element.parentElement.style.borderWidth = "1px";
            element.parentElement.style.borderColor = "#b41f0b";
        }
    });
}





function hideShow(toShow, toHide) {
    toHide.style.display = "none";
    toShow.style.display = "unset";
    alert("Failed to register!");

}

function unHideUnSet(unHide) {
    if (unHide.type == "text") {
        unHide.type = "password";
    } else {
        unHide.type = "text";
    }
}



//======================================Rejex Validation==================================//

function validOption(type, checkType) {
    if (type.className == "password") return validatePassword(checkType);
    if (type.type == 'text') return validateName(checkType);
    if (type.type == 'email') return validateEmail(checkType);
    if (type.type == 'tel') {
        return validatePhone(phoneFormat(checkType));
    }
   
   
}

function validateName(name) {
    return /[A-Za-z]+\s[A-Za-z]+/.test(name);
}

function validateEmail(email) {
    return /^[A-Za-z]*(\d*)?[@]\w+[.]\w{2,}[\.\w]*$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*).{8,}$/.test(password);
}

function validatePhone(phone) {
    return /^[+]?[\d]+([\-][\d]+)*\d$/.test(phone);
}

function phoneFormat(phone) {
    return phone.replace(/^\d*(\D{1,})\s*(\d{3})\s*(\d{3})\s*(\d{4})\s*$/, "(+$1) $2 $3 $4");
}
function validateBirthdate(name){
    return  /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/.text(name);
}



   




function showOrHideTollip(toolipMain, toolip, checkValidity) {
    if (checkValidity) toolipMain.classList.remove(toolip)
    else toolipMain.classList.add(toolip)
}











// BDATE


    function ValidateDOB() {
        var lblError = document.getElementById("lblError");
        var lblbox = document.getElementById("txtDate");
        //Get the date from the TextBox.
        var dateString = document.getElementById("txtDate").value;
        var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
 
        //Check whether valid dd/MM/yyyy Date Format.
        if (regex.test(dateString)) {
            var parts = dateString.split("/");
            var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
            var dtCurrent = new Date();
            lblError.innerHTML = "Eligibility 18 years ONLY."
            lblbox.style.borderColor="red";
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
                return false;
            }
 
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {
                
                //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
                if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                    lblbox.style.borderColor="rgb(19, 175, 232)";
                    return false;
                }
                if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                    lblbox.style.borderColor="rgb(19, 175, 232)";
                    //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                    if (dtCurrent.getDate() < dtDOB.getDate()) {
                        lblbox.style.borderColor="rgb(19, 175, 232)";
                        return false;
                    }
                }
            }
            lblError.innerHTML = "";
            lblbox.style.borderColor="rgb(19, 175, 232)";
            
            return true;
        } else {
            lblError.innerHTML = "Enter date in dd/MM/yyyy format ONLY."
            lblbox.style.borderColor="red";
            return false;
        }



    }
