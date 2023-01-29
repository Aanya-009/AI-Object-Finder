video = "";
flag = "";
object = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(flag != ""){
        objectDetector.detect(video, gotResult);
        object_name = document.getElementById("input_box").value;
        if(object.length > 0){
            console.log("test");
            for(i = 0; 1 < object.length; i++){
                console.log(object[i].label);
                if(object[i].label == object_name){
                    document.getElementById("status").innerHTML = "Status: Object Detected";
                    document.getElementById("number_of_objects").innerHTML = "Total number of objects detected are: " + object.length;
    
                    fill("#eb3b4f");
                    percent = floor(object[i].confidence * 100);
                    text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
                    noFill();
                    stroke("#eb3b4f");
                    rect(object[i].x, object[i].y, object[i].width, object[i].height);
                }
                else{
                    document.getElementById("status").innerHTML = "Status: Object not Detected";
                    document.getElementById("number_of_objects").innerHTML = "Total number of objects detected are: " + object.length;
    
                }
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model is loaded");
    flag = "true";
    video.speed(1);
    video.volume(0);
    video.loop();
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        onject = result;
    }
}