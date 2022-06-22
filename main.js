var music1 = "";
var music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWrist = 0;
song1 = "";
song2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;



function preload()
{
	music1 = loadSound("music.mp3");
	music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FFD580");
    stroke("black");
    song1 = music1.isPlaying();
    song2 = music2.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(song1 ==false){
            music1.play();
            document.getElementById("song-name").innerHTML="Song Name: Harry Potter theme song"
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if(song2 ==false){
            music2.play();
            document.getElementById("song-name").innerHTML="Song Name: Peter Pan song";
        }
    }
}


