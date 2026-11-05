$(document).ready(function () {
    $("#placeOrder").click(function () {
        const quantities = [
            Number($("#colorQty").val()),
            Number($("#brownQty").val()),
            Number($("#milkyQty").val()),
            Number($("#blackQty").val())
        ];

        if (quantities.some(function (quantity) {
            return !Number.isInteger(quantity) || quantity < 0;
        })) {
            alert("Please enter whole-number quantities of zero or more.");
            return;
        }

        const prices = [300, 200, 250, 350];
        const total = quantities.reduce(function (sum, quantity, index) {
            return sum + quantity * prices[index];
        }, 0);

        $("#totalPrice").text("₹" + total.toLocaleString("en-IN"));
        $("#message").text(total > 0
            ? "Thank you! Your order total is ready."
            : "Choose at least one cake to place an order.");
    });
});
