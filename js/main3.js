function start() {
    var divHeight;
    var divWidth;

    divWidth = $(window).width();
    divHeight = $(window).height();

    $("#mainContentDiv").attr({ width: divWidth, height: divHeight });
    $("#coverVid").attr({ width: divWidth, height: divHeight });

    // setting up active and inactive nav elements
    var navElements = document.getElementsByTagName("i");
    navElements[0].className = "fa fa-dot-circle-o active-element";
    for (var i = 1; i < navElements.length; i++) {
        navElements[i].className = "fa fa-circle-thin";
    }

    barsAnimation("purple", "65", "60", "55", 3000);

    // make non globe vid covers display nothing initially 
    $("#coverVidHolo").css("display", "none");

    // make globe vid cover display class
    $("#coverVid").addClass("displaying");

    resize();
}

function resize() {
    var divHeight;
    var divWidth;

    divWidth = $(window).width();
    divHeight = $(window).height();

    $("#mainContentDiv").attr({ width: divWidth, height: divHeight });
    $("#coverVid").attr({ width: divWidth, height: divHeight });
}

// fades out fadeElement and fades in displayElementID
// makes newActiveElementID the new active element and hides currentActiveElement
function fadeTransition(displayElementID, newActiveElementID) {
    var fadeElement = $(".displaying");
    var displayElement = $("#" + displayElementID);
    var newActiveElement = $("#" + newActiveElementID);
    var currentActiveElement = $(".active-element");

    // remove i2 animations
    if (newActiveElementID != "i1") {
        $("#rows").css("display", "none");
    }

    fadeElement.removeClass("displaying");
    displayElement.addClass("displaying");

    newActiveElement.removeClass("fa fa-circle-thin inactive-element");
    newActiveElement.addClass("fa fa-dot-circle-o active-element");

    currentActiveElement.removeClass("fa fa-dot-circle-o active-element");
    currentActiveElement.addClass("fa fa-circle-thin inactive-element");

    fadeElement.fadeOut("slow");
    displayElement.fadeIn("slow");

    if (newActiveElementID == "i1") {
        barsAnimation("purple", "65", "60", "55", 2000);
    }
}

// creates animation out of rows to slide out to the left
function barsAnimation(color, width1, width2, width3, milliseconds) {
    var rows = document.getElementsByClassName("row");
    $("#rows").css("display", "block");
    
    $(".row").css("background-color", color);

    setTimeout(function () {
        // display new options/info
        $(rows[0]).animate({
            width: width1+"%",
            opacity: 1
        });
        setTimeout(function () {
            $(rows[1]).animate({
                width: width2+"%",
                opacity: 1
            });
            setTimeout(function () {
                $(rows[2]).animate({
                    width: width3+"%",
                    opacity: 1
                });
            }, milliseconds/4);
        }, milliseconds/4);
    }, milliseconds);
}


// a test function
function myFunction() {
    alert("Test Complete");
}
