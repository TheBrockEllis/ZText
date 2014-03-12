$("document").ready(function(){

  // hover over help.. need to make when not hover it goes back
  $("#helpBtn").click(function(){
    $("#help").toggle();
  });

  // initialize variables for random number and random room
  var rand;
  var room = "";
  // loop until all items are removed from allItems
  while (allItems.length > 0) {
    // choose a random number from 0 to 3
    rand = Math.floor((Math.random()*4));
    // choose a random room based on random number
    switch (rand) {
      case 0:
        room = "kitchen";
        break;
      case 1:
        room = "garage";
        break;
      case 2:
        room = "bedroom";
        break;
      case 3:
        room = "bathroom";
        break;
    }
    // if selected room contains 6 items or less, remove last item from allItems and assign to room
    if (house[room].items.length <= 6) {
      house[room].items.push(allItems.pop());
    }
  }

  // simulate the enter key being pressed (for mobile devices mostly)
  $("#enter").click(function(){
    var e = jQuery.Event("keypress");
    e.which = 13; // # Some key code value
    e.keyCode = 13;
    $("#commands").trigger(e);
  });

  updateLocation("garage");
  clearCommands();
  $("#commands").prop("disabled", false);

  // set timer minutes and seconds, initialize variable to display timer as a string
  var timerMin = 3;
  var timerSec = 1;
  var timerOut = "";
  // update countdown clock every 1 second
  var countdown = setInterval(function(){
    // if seconds = 0, decrement minutes and set seconds to 59 (1:00 - :01 = 0:59), otherwise decrement seconds
    if (timerSec == 0) {
      timerMin--;
      timerSec = 59;
    } else {
      timerSec--;
    }
    // build timer string, insert a zero after the colon if seconds < 10 (i.e. output 1:09 rather than 1:9)
    if (timerSec < 10) {
      timerOut = timerMin + ":" + "0" + timerSec;
    } else {
      timerOut = timerMin + ":" + timerSec;
    }
    // overwrite old timer with new timer string
    $("#timer").text(timerOut);
    // if minutes and seconds are both zero, stop updating countdown and call attack function
    if (timerMin == 0 && timerSec == 0) {
      clearInterval(countdown);
      attack();
    }
  }, 1000);
});
