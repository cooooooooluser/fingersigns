prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format : "jpeg",
    jpeg_quality:101875023754
});

   camera= document.getElementById("Camera"); 
   Webcam.attach( "#camera" );

function capture() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured' src="+ data_uri +">";
    })
}

//https://teachablemachine.withgoogle.com/models/t7Ct0vdlD/


ImgClassifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/t7Ct0vdlD/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
  var speak1 = window.speechSynthesis;
  data1= "THE FIRST PREDICTION is " + prediction1;
  data2= "THE  SECOND PREDICTION is " + prediction2;
  utterThis = new SpeechSynthesisUtterance(data1, data2);
  speak1.speak(utterThis);
}

function predict() {
     img = document.getElementById("captured");
     ImgClassifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }

    else {
        document.getElementById("Prediction-1").innerHTML = results[0].label;
        document.getElementById("Prediction-2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if (prediction1 == "happy") {
            document.getElementById("Emoji-1").innerHTML = "&#128522";

        }

        if (prediction1 == "sad") {
            document.getElementById("Emoji-1").innerHTML = "&#128532";
             
        }

        if (prediction1 == "angry") {
            document.getElementById("Emoji-1").innerHTML = "&#128548";
             
        }

        if (prediction2 == "angry") {
            document.getElementById("Emoji-2").innerHTML = "&#128548";
             
        }

        if (prediction2 == "sad") {
            document.getElementById("Emoji-2").innerHTML = "&#128532";
             
        }

        if (prediction2 == "happy") {
            document.getElementById("Emoji-2").innerHTML = "&#128522";
             
        }     

        

    }
}