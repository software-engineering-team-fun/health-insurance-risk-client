function packageData(){
    var JSONData = new Object();
    var age = document.getElementById("patAge").value
    var height = document.getElementById("patHeight").value
    var weight = document.getElementById("patWeight").value
    var systolic = document.getElementById("patSys").value
    var diastolic = document.getElementById("patDia").value 
    JSONData = {"age" : age, "height": height, "weight": weight, "systolic" : systolic, "diastolic": diastolic}
    return JSON.stringify(JSONData)
}

async function grabData() {
    fetch('http://localhost:3000/calculate')
        .then(res => res.text())
        .then(text => document.getElementById("display-result").innerHTML = `<h2 class="text-center">${text}</h2>`) //here we will put the verdict 
}

async function sendData() {
    var data = packageData()
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
