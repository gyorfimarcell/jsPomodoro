const playButton = document.getElementById("play-button");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const marker = document.getElementById("marker");

let totalTime = 20;
let remainingTime = totalTime;
let running = false;

let interval = null;

function SetTime() {
    minutes.innerText = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    seconds.innerText = String(remainingTime % 60).padStart(2, "0");
}

function ResetTimer() {
    remainingTime = totalTime;
    SetTime();
    marker.style.transition = "none";
    marker.style.rotate = "0deg";
    marker.offsetHeight; // Flush css
    marker.style.transition = "";
}

function StopTimer() {
    running = false;
    playButton.innerText = "▶";
    clearInterval(interval);
}

function Tick(params) {
    remainingTime -= 1;
    if (remainingTime <= 0) {
        setTimeout(() => {
            ResetTimer();
        }, 1000);
        StopTimer();
    }

    SetTime();
    marker.style.rotate = (totalTime - remainingTime) * 360 / totalTime + "deg";
}

function ChangeTime(text, max, formula) {
    if (!running) {
        time = parseInt(prompt(text));
        if (!isNaN(time) && time >= 0 && time < max) {
            totalTime = formula(time);
            remainingTime = totalTime;
            ResetTimer();
        }
    }
}

SetTime();
playButton.addEventListener("click", () => {
    running = !running;
    if (running) {
        playButton.innerText = "||";
        Tick();
        interval = setInterval(Tick, 1000);
    } else {
        StopTimer();
    }
});

minutes.addEventListener("click", () => ChangeTime("Minutes:", 100, time => time * 60 + (totalTime % 60)));
seconds.addEventListener("click", () => ChangeTime("Seconds:", 60, time => Math.floor(totalTime / 60) * 60 + time));
