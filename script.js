const exercises = [
    { name: "Plank mit wechselndem Beinheben", duration: 90 },
    { name: "High Plank", duration: 60 },
    { name: "Seitenplank mit Knieheben rechts", duration: 30 },
    { name: "Seitenplank mit Knieheben links", duration: 30 },
    { name: "Mountain Climber", duration: 60 },
    { name: "Planks mit Drehung rechts", duration: 30 },
    { name: "Planks mit Drehung links", duration: 30 },
    { name: "High Plank", duration: 60 }
];

let currentExerciseIndex = 0;
let currentDuration = 0;
let isBreak = true;
let timer = null;
let isPaused = false;

function startWorkout() {
    document.getElementById("startWorkoutBtn").style.display = "none";
    document.getElementById("pauseContinueBtn").style.display = "inline-block";
    document.getElementById("endWorkoutBtn").style.display = "inline-block";
    startBreak();
}

function endWorkout() {
    clearInterval(timer);
    document.getElementById("exerciseName").innerText = "";
    document.getElementById("activeState").innerText = "";
    document.getElementById("timer").innerText = "";
    document.getElementById("pauseContinueBtn").style.display = "none";
    document.getElementById("endWorkoutBtn").style.display = "none";
    document.getElementById("startWorkoutBtn").style.display = "inline-block";
    currentExerciseIndex = 0;
    updateActiveExerciseInSidebar();
}

function togglePause() {
    if (isPaused) {
        isPaused = false;
        document.getElementById("pauseContinueBtn").innerText = "Pause Workout";
        startTimer(currentDuration);
    } else {
        isPaused = true;
        clearInterval(timer);
        document.getElementById("pauseContinueBtn").innerText = "Continue Workout";
    }
}

function startBreak() {
    isBreak = true;
    currentDuration = 15;
    displayExercise();
    startTimer(currentDuration);
}

function startExercise() {
    isBreak = false;
    currentDuration = exercises[currentExerciseIndex].duration;
    displayExercise();
    startTimer(currentDuration);
}

function displayExercise() {
    const exerciseNameElement = document.getElementById("exerciseName");
    const activeStateElement = document.getElementById("activeState");

    if (isBreak) {
        if (currentExerciseIndex < exercises.length) {
            exerciseNameElement.innerText = "Next Exercise: " + exercises[currentExerciseIndex].name;
            activeStateElement.style.color = "black";
            activeStateElement.innerText = "Break";
        } else {
            exerciseNameElement.innerText = "Workout completed!";
            activeStateElement.innerText = "";
        }
    } else {
        exerciseNameElement.innerText = exercises[currentExerciseIndex].name;
        activeStateElement.style.color = "green";
        activeStateElement.innerText = "Active";
    }
    updateActiveExerciseInSidebar();
}

function switchToExercise(index) {
    clearInterval(timer);
    currentExerciseIndex = index;
    startBreak();
}

function updateActiveExerciseInSidebar() {
    for (let i = 0; i < exercises.length; i++) {
        let btn = document.getElementById(`exerciseBtn${i}`);
        if (i === currentExerciseIndex && !isBreak) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        } else {
            btn.style.backgroundColor = "#e0e0e0";
            btn.style.color = "black";
        }
    }
}

function startTimer(duration) {
    const timerElement = document.getElementById("timer");
    timerElement.innerText = duration + "s";

    timer = setInterval(() => {
        if (!isPaused) {
            duration--;

            if (duration < 0) {
                clearInterval(timer);

                if (isBreak) {
                    startExercise();
                } else {
                    currentExerciseIndex++;
                    if (currentExerciseIndex < exercises.length) {
                        startBreak();
                    } else {
                        endWorkout();
                    }
                }

            } else {
                timerElement.innerText = duration + "s";
            }
        }
    }, 1000);
}

