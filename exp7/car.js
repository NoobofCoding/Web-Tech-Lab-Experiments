$(document).ready(function () {
    let tintIndex = 0;
    let tyreSize = 54;
    const tints = ["#a8e5f7", "#7aa5c2", "#42536b", "#d9f0ff"];

    $("#carColor").on("input change", function () {
        const color = $(this).val();
        $("#car .roof, #car .body").css("background-color", color);
        $("#status").text("Car color updated!");
    });

    $("#tint").click(function () {
        tintIndex = (tintIndex + 1) % tints.length;
        $("#car .window").css("background-color", tints[tintIndex]);
        $("#status").text("Glass tint changed.");
    });

    $("#bigger").click(function () {
        tyreSize = Math.min(78, tyreSize + 6);
        $(".wheel").css({ width: tyreSize + "px", height: tyreSize + "px" });
        $("#status").text("Tyres made larger.");
    });

    $("#smaller").click(function () {
        tyreSize = Math.max(36, tyreSize - 6);
        $(".wheel").css({ width: tyreSize + "px", height: tyreSize + "px" });
        $("#status").text("Tyres made smaller.");
    });

    $("#reset").click(function () {
        tintIndex = 0;
        tyreSize = 54;
        $("#carColor").val("#287252");
        $("#car .roof, #car .body").css("background-color", "#287252");
        $("#car .window").css("background-color", tints[0]);
        $(".wheel").css({ width: "54px", height: "54px" });
        $("#status").text("Car restored to its original style.");
    });
});
