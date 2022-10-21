function packageData(){
    var JSONData = new Object();
    var age = document.getElementById("patAge").value
    var height = document.getElementById("patHeight").value
    var weight = document.getElementById("patWeight").value
    var systolic = document.getElementById("patSys").value
    var diastolic = document.getElementById("patDia").value 
    var diabetes = document.getElementById("patDiaH").checked 
    var cancer = document.getElementById("patCancerH").checked 
    var alzheimers = document.getElementById("patAlzH").checked 
    alert("Your Age: " + age + "\n" +
        "Your Height: " + height + "\n" +
        "Your Weight: " + weight +  "\n" +
        "Your Systolic Blood Pressure: " + systolic +  "\n" +
        "Your Diastolic Blood Pressure: " + diastolic +  "\n" +
        "Do you have diabetes? " + diabetes +  "\n" +
        "Do you have cancer? " + cancer +  "\n" +
        "Do you have alzheimers?  " + alzheimers +  "\n")
    JSONData = {"age" : age, "height": height, "weight": weight, "systolic" : systolic, "diastolic": diastolic, "diabetes": diabetes, "cancer": cancer, "alzheimers": alzheimers}
    return JSON.stringify(JSONData)
}

function validate() {
    return [
        document.getElementById("patAge"),
        document.getElementById("patHeight"),
        document.getElementById("patWeight"),
        document.getElementById("patSys"),
        document.getElementById("patDia")
    ].every(validateInput)
}

function validateInput(input){
    var trimmedValue = input.value.trim()
    if(trimmedValue == ""){
        alert("Please enter a value for all input fields.")
        input.focus();
        return false;
    }
    if (trimmedValue != ""){
        if (! (/^\d*(?:\.\d{0,2})?$/.test(input.value))){
            alert("Please enter a valid number without special characters.")
            input.focus();
            return false;
        }
    }
    var heightCheck = document.getElementById("patHeight").value;
    if (heightCheck < 24){
        alert("You cannot have a height less than 2 feet (24 inches).")
        document.getElementById("patHeight").focus();
        return false;
    }
    return true; 
}

async function grabData() {
    fetch('http://localhost:3000/calculate')
        .then(res => res.text())
        .then(text => document.getElementById("display-result").innerHTML = `<h2 class="text-center">${text}</h2>`) //here we will put the verdict 
}

async function sendData() {
    if (validate()){
        var data = packageData()
    }

    try {
        await fetch('http://localhost:3000/calculate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
            },
            body: data,
        })
            .then(response => console.log(''))
            .catch(err => console.log(err));
    } catch (error) {
        console.log(error)
    }
    grabData()
}
