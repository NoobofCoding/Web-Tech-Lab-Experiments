
var app = angular.module("careerApp", ["ngRoute"]);

// Configure AngularJS routing
app.config(function($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })

        .when("/register", {
            templateUrl: "register.html",
            controller: "RegisterController"
        })

        .when("/courses", {
            templateUrl: "courses.html"
        })

        .when("/contact", {
            templateUrl: "contact.html",
            controller: "ContactController"
        })

        .otherwise({
            redirectTo: "/"
        });
});


// Registration Controller
app.controller("RegisterController", function($scope) {

    $scope.student = {};

    $scope.registrationSuccess = false;

    $scope.registerStudent = function(form) {

        if (form.$valid) {
            $scope.registrationSuccess = true;

            console.log("Student Details:", $scope.student);

            form.$setPristine();
            form.$setUntouched();
            $scope.student = {};
        }
    };

});


// Contact Controller
app.controller("ContactController", function($scope) {

    $scope.contact = {};

    $scope.messageSent = false;

    $scope.sendMessage = function(form) {

        if (form.$valid) {
            $scope.messageSent = true;

            console.log("Contact Details:", $scope.contact);

            form.$setPristine();
            form.$setUntouched();
            $scope.contact = {};
        }
    };

});
