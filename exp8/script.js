angular.module("ExperimentApp", [])
    .controller("ExperimentController", function ($scope) {
        $scope.comments = [];
        $scope.newComment = "";

        $scope.addComment = function () {
            var comment = ($scope.newComment || "").trim();

            if (comment) {
                $scope.comments.push(comment);
                $scope.newComment = "";
            }
        };

        $scope.removeComment = function (index) {
            $scope.comments.splice(index, 1);
        };

        $scope.a = 0;
        $scope.b = 0;
        $scope.operator = "+";

        $scope.calculate = function () {
            var a = Number($scope.a) || 0;
            var b = Number($scope.b) || 0;

            if ($scope.operator === "+") {
                return a + b;
            }

            if ($scope.operator === "-") {
                return a - b;
            }

            if ($scope.operator === "*") {
                return a * b;
            }

            if ($scope.operator === "/") {
                return b === 0 ? "Cannot divide by zero" : a / b;
            }

            return "Choose an operation";
        };

        $scope.clear = function () {
            $scope.a = 0;
            $scope.b = 0;
            $scope.operator = "+";
        };

        $scope.tasks = [];
        $scope.newTask = "";

        $scope.addTask = function () {
            var task = ($scope.newTask || "").trim();

            if (task) {
                $scope.tasks.push(task);
                $scope.newTask = "";
            }
        };

        $scope.removeTask = function (index) {
            $scope.tasks.splice(index, 1);
        };
    });
