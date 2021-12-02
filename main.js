//https://teachablemachine.withgoogle.com/models/nJA0xp5Do/model.json
//https://teachablemachine.withgoogle.com/models/HU2ELFDMk/model.json
prediction_1="";
prediction_2="";

Webcam.set({
   width:350,
   height:300,
   image_format:'png',
   png_quality:99
});

myWebcam=document.getElementById("camera");

Webcam.attach(myWebcam);



console.log(ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HU2ELFDMk/model.json", modelLoaded);

function modelLoaded(){
   console.log("model loaded");
}




function capture(){
   Webcam.snap(function(data_uri) {
       document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
   });
}

function speak() {
  var synth=window.speechSynthesis;
  var speechData_1="The first prediction is" + prediction_1;
  var speechData_2="The second prediction is" + prediction_2;
  var converted_speech=new SpeechSynthesisUtterance(speechData_1+speechData_2);
  converted_speech.lang='en-ENG';
  synth.speak(converted_speech);}


//speak();




function predict(){
        myImage=document.getElementById("captured_image");
        classifier.classify(myImage, gotResults);
        
}

function gotResults(error,results) {
   if(error) {
      console.error(error);
   }

   else {
      console.log(results);
      prediction_1=results[0].label;
      prediction_2=results[1].label;
      document.getElementById("result_emotion_name").innerHTML=prediction_1;
      document.getElementById("result_emotion_name2").innerHTML=prediction_2;
      speak();
        if(prediction_1=="happy"){
           document.getElementById("update_emoji").innerHTML="&#128512;";
        }

        else if(prediction_1=="sad"){
         document.getElementById("update_emoji").innerHTML="&#128546;";
        }

        else if(prediction_1=="angry"){
         document.getElementById("update_emoji").innerHTML="&#128544;";
        }
        if(prediction_2=="happy"){
         document.getElementById("update_emoji2").innerHTML="&#128512;";
      }

      else if(prediction_2=="sad"){
       document.getElementById("update_emoji2").innerHTML="&#128546;";
      }

      else if(prediction_2=="angry"){
       document.getElementById("update_emoji2").innerHTML="&#128544;";
      }

   }
}

