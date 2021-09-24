function startClassification() {
    navigator.mediaDevices.getUserMedia({
        audio:true
    });
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/YuM675F_L/model.json', modelReady);
}

function modelReady() {
    classifier.classify(gotResults);
}

function gotResults(error,results) {
    console.log("Got Result!");
    
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        randomNumber_r = Math.floor(Math.random() * 255) + 1;
        randomNumber_g = Math.floor(Math.random() * 255) + 1;
        randomNumber_b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("result_label").innerHTML = "I can hear - " + results[0].label;
        document.getElementById("result_confidence").innerHTML = "Accuracy - " + (results[0].confidence * 100).toFixed(2) + "%";
        document.getElementById("result_label").style.color = "rgb(" +randomNumber_r+ "," +randomNumber_g+ "," +randomNumber_b+ ")";
        document.getElementById("result_confidence").style.color = "rgb(" +randomNumber_r+ "," +randomNumber_g+ "," +randomNumber_b+ ")";

        img = document.getElementById('cat.jpeg' + 'cow.jpeg' + 'dog.jpeg' + 'ear.jpeg' + 'lion.jpeg');
        
        if (results[0].label == "Barking") {
            img.src = 'dog.jpeg';
        } else if (results[0].label == "Meowing") {
            img.src = 'cat.jpeg';
        } else if (results[0].label == "Roaring") {
            img.src = 'lion.jpeg';
        } else if (results[0].label == "Mooing") {
            img.src = 'cow.jpeg';
        } else {
            img.src = 'ear.jpeg';

        }
    }
}