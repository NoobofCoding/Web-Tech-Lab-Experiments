
// CLASS AND OBJECT

class StudyTask {

    constructor(id, subject, name, duration) {
        this.id = id;
        this.subject = subject;
        this.name = name;
        this.duration = duration;
        this.completed = false;
    }

}

// ARRAY OF OBJECTS

var tasks = [];
var nextId = 1;

var activeTask = null;
var remainingTime = 0;

var timerInterval = null;
var clockInterval = null;
var messageTimeout = null;


// DATE OBJECT AND DIGITAL CLOCK

function displayClock() {

    var d = new Date();

    var hours = String(d.getHours()).padStart(2, "0");
    var minutes = String(d.getMinutes()).padStart(2, "0");
    var seconds = String(d.getSeconds()).padStart(2, "0");

    document.getElementById("clock").innerHTML =
        hours + ":" + minutes + ":" + seconds;

    var days = ["Sunday", "Monday", "Tuesday",
                "Wednesday", "Thursday", "Friday", "Saturday"];

    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    document.getElementById("date").innerHTML =
        days[d.getDay()] + " | " + date + "/" + month + "/" + year;

}

// CALL EVERY ONE SECOND

displayClock();

clockInterval = setInterval(displayClock, 1000);


// ADD STUDY TASK

document.getElementById("taskForm").addEventListener("submit", function(event) {

    event.preventDefault();

    var subject = document.getElementById("subject").value;
    var name = document.getElementById("taskName").value;
    var duration = parseInt(document.getElementById("duration").value);

    var task = new StudyTask(nextId, subject, name, duration);

    tasks.push(task);

    nextId++;

    displayTasks();
    updateStats();

    showMessage("Study task added successfully!");

    this.reset();

    document.getElementById("duration").value = 25;

});


// DISPLAY TASKS USING ARRAY

function displayTasks() {

    var list = document.getElementById("taskList");

    list.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {

        var task = tasks[i];

        var card = document.createElement("div");
        card.className = "task-card";

        if (task.completed) {
            card.classList.add("completed");
        }

        var heading = document.createElement("h3");
        heading.textContent = task.name;

        var subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        var duration = document.createElement("p");
        duration.textContent = "Duration: " + task.duration + " minutes";

        var status = document.createElement("p");
        status.textContent = task.completed ? "Completed" : "Pending";

        var button = document.createElement("button");

        button.textContent = task.completed ? "Completed" : "Start Task";
        button.disabled = task.completed;
        button.dataset.id = task.id;
        button.className = "startTask";

        card.appendChild(heading);
        card.appendChild(subject);
        card.appendChild(duration);
        card.appendChild(status);
        card.appendChild(button);

        list.appendChild(card);

    }

    if (tasks.length === 0) {
        list.innerHTML = "<p>No tasks added yet.</p>";
    }

}


// START SELECTED TASK

document.getElementById("taskList").addEventListener("click", function(event) {

    if (event.target.classList.contains("startTask")) {

        var id = Number(event.target.dataset.id);

        var task = tasks.find(function(t) {
            return t.id === id;
        });

        if (task && !task.completed) {

            clearInterval(timerInterval);

            activeTask = task;

            remainingTime = task.duration * 60;

            document.getElementById("timerStatus").innerHTML =
                "Studying: " + task.name;

            updateTimer();

            startTimer();

        }

    }

});


// TIMER FUNCTION

function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(function() {

        if (remainingTime > 0) {

            remainingTime--;

            updateTimer();

        }

        if (remainingTime === 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            if (activeTask !== null) {

                activeTask.completed = true;

                document.getElementById("timerStatus").innerHTML =
                    "Study session completed!";

                showMessage("Congratulations! Task completed.");

                activeTask = null;

                displayTasks();
                updateStats();

            }

        }

    }, 1000);

}


// DISPLAY REMAINING TIME

function updateTimer() {

    var min = Math.floor(remainingTime / 60);
    var sec = remainingTime % 60;

    document.getElementById("timer").innerHTML =
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0");

}


// PAUSE AND RESUME TIMER

document.getElementById("pauseBtn").addEventListener("click", function() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);
        timerInterval = null;

        document.getElementById("timerStatus").innerHTML = "Timer paused.";

    }

    else if (activeTask !== null && remainingTime > 0) {

        startTimer();

        document.getElementById("timerStatus").innerHTML =
            "Studying: " + activeTask.name;

    }

});


// RESET TIMER

document.getElementById("resetBtn").addEventListener("click", function() {

    clearInterval(timerInterval);
    timerInterval = null;

    if (activeTask !== null) {

        remainingTime = activeTask.duration * 60;

    }

    else {

        remainingTime = 25 * 60;

    }

    updateTimer();

    document.getElementById("timerStatus").innerHTML =
        "Timer reset.";

});


// UPDATE STUDY STATISTICS

function updateStats() {

    var completed = 0;
    var totalMinutes = 0;

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {

            completed++;

            totalMinutes += tasks[i].duration;

        }

    }

    document.getElementById("totalTasks").innerHTML = tasks.length;

    document.getElementById("completedTasks").innerHTML = completed;

    document.getElementById("totalTime").innerHTML = totalMinutes;

}


// NOTIFICATION USING setTimeout()

function showMessage(text) {

    clearTimeout(messageTimeout);

    document.getElementById("message").innerHTML = text;

    messageTimeout = setTimeout(function() {

        document.getElementById("message").innerHTML = "";

    }, 3000);

}
