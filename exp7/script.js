$(document).ready(function () {
    $("#evaluate").click(function () {
        const amount = Number($("#amount").val());
        const percentages = [
            Number($("#rent").val()),
            Number($("#accessories").val()),
            Number($("#emergency").val()),
            Number($("#savings").val())
        ];

        if (!Number.isFinite(amount) || amount <= 0 ||
            percentages.some(function (value) {
                return !Number.isFinite(value) || value < 0 || value > 100;
            })) {
            alert("Please enter a valid amount and percentages between 0 and 100.");
            return;
        }

        const totalPercent = percentages.reduce(function (total, value) {
            return total + value;
        }, 0);

        if (Math.abs(totalPercent - 100) > 0.000001) {
            alert("The percentages must add up to exactly 100%.");
            return;
        }

        const resultIds = ["#rentResult", "#accessoriesResult", "#emergencyResult", "#savingsResult"];
        percentages.forEach(function (percentage, index) {
            $(resultIds[index]).text("₹" + (amount * percentage / 100).toFixed(2));
        });

        $("#message").text("Budget evaluated successfully!").css("color", "#2764a5");
    });
});
