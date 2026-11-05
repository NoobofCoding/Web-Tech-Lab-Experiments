
// Access HTML elements using DOM
var form = document.getElementById("studentForm");
var message = document.getElementById("message");
var result = document.getElementById("output");

// Demonstrate getElementsByTagName()
var headings = document.getElementsByTagName("h1");
console.log("Heading:", headings[0].innerHTML);

// Demonstrate getElementsByClassName()
var skills = document.getElementsByClassName("skill");
console.log("Total skills:", skills.length);

// Demonstrate querySelectorAll()
var inputs = document.querySelectorAll("input");
console.log("Total input elements:", inputs.length);

// Keyup event
document.getElementById("name").addEventListener("keyup", function() {
    message.innerHTML = "Entering student details...";
});

// Focus event
document.getElementById("email").addEventListener("focus", function() {
    this.style.backgroundColor = "#eaf2f8";
});

// Change event
document.getElementById("department").addEventListener("change", function() {
    message.innerHTML = "Department selected: " + this.value;
});

// Mouseover event
document.getElementById("submitBtn").addEventListener("mouseover", function() {
    message.innerHTML = "Click to register the student.";
});

// Submit event
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values using getElementById()
    var name = document.getElementById("name").value;
    var regno = document.getElementById("regno").value;
    var email = document.getElementById("email").value;
    var department = document.getElementById("department").value;
    var year = document.getElementById("year").value;

    // Get selected gender
    var gender = document.querySelector(
        'input[name="gender"]:checked'
    ).value;

    // Get selected skills
    var selectedSkills = [];

    for (var i = 0; i < skills.length; i++) {
        if (skills[i].checked) {
            selectedSkills.push(skills[i].value);
        }
    }

    // Display student details using DOM
    result.innerHTML =
        "Name: " + name + "<br>" +
        "Register Number: " + regno + "<br>" +
        "Email: " + email + "<br>" +
        "Department: " + department + "<br>" +
        "Year: " + year + "<br>" +
        "Gender: " + gender + "<br>" +
        "Skills: " + selectedSkills.join(", ");

    message.innerHTML = "Student registered successfully!";

});

// Reset event
form.addEventListener("reset", function() {

    result.innerHTML = "No student registered yet.";
    message.innerHTML = "Form cleared successfully.";

});
