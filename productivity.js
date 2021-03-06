var modal = document.getElementById("myModal"); //modal stuff
var btn = document.getElementById("addButton");
var span = document.getElementsByClassName("close")[0];
var timerCount = 1;
btn.onclick = function(){
  modal.style.display = "block";
}
span.onclick = function(){
  modal.style.display = "none";
}
window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none";
  }
}



function displayTime(endTime,timerId,eventText,displayLabel,timeLeftLabel,timerGroup){//fills out p elements for time and labels
  timerGroup.setAttribute("class", "timerGroup");
  displayLabel.innerHTML = eventText;

  var countDownDate = new Date(endTime).getTime();
  timeLeftLabel.innerHTML = "Time Left";

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"



    var timerOn = document.getElementById(timerId);


    var displayHours = hours;
    var displayMins = minutes;
    var displaySeconds = seconds;
    if(hours < 10){
      displayHours = "0" + hours.toString();
    }
    if(minutes < 10){
      displayMins = "0" + minutes.toString();
    }
    if(seconds < 10){
      displaySeconds = "0" + seconds.toString();
    }

    if(days>0){
      timerOn.innerHTML = days + ":" + displayHours + ":" + displayMins + ":" + displaySeconds;
    } else if(hours > 0){
        timerOn.innerHTML = displayHours + ":" + displayMins + ":" + displaySeconds;
    } else if(minutes > 0){
        timerOn.innerHTML = displayMins + ":" + displaySeconds;
    } else if(seconds > 0){
      timerOn.innerHTML = "00:" + displaySeconds;
    }


    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      timerOn.innerHTML = "EXPIRED";
    }
  }, 1000);

}



function addEvent(){ //adds an event to the table
  var eventText = document.getElementById("eventInput").value;
  var startText = document.getElementById("startInput").value;
  var endText = document.getElementById("endInput").value;
  var table = document.getElementById("eventTable");

  var eventBlock = document.createElement("DIV");
  eventBlock.setAttribute("id",eventText);
  eventBlock.setAttribute("class","inputtedEvent");
  makeBlock(eventText,startText,endText);
  eventBlock.innerHTML = eventText;
  document.getElementById("mainCal").appendChild(eventBlock);


  var row = table.insertRow(1);
  var eventForTable = row.insertCell(0);
  var startTable = row.insertCell(1);
  var endTable = row.insertCell(2);
  var startTime = toTime(startText);
  var endTime = toTime(endText);
  eventForTable.innerHTML = eventText;
  startTable.innerHTML = startTime;
  endTable.innerHTML = endTime;
  document.getElementById("eventInput").value = '';
  document.getElementById("startInput").value = '';
  document.getElementById("endInput").value = '';
  modal.style.display = "none";
  sortTable();
  var dt = new Date();
  var timerGroup = document.createElement("DIV");


  var label = document.createElement("H2");
  var  timer = document.createElement("H1");
  document.getElementById("timerSide").appendChild(timerGroup);
  timerGroup.appendChild(label);
  timerGroup.appendChild(timer);
  var timerId = "timer" + timerCount;
  timer.setAttribute("id", timerId);
  var timeLeftLabel = document.createElement("H2");
  timerGroup.appendChild(timeLeftLabel);

  setTimeout(function(){displayTime(endTime,timerId,eventText,label,timeLeftLabel,timerGroup)},Math.abs(startTime-dt));
  timerCount++;
}

function toTime(time){ //converts HH:MM TT to date type
  var dt = new Date();
  var timePeriod = time.split(' ')[1];
  time = time.split(' ')[0];
  var hour = Number(time.split(':')[0]);
  var minutes = Number(time.split(':')[1]);

  if (hour === 12) {//converts hours
    hour = hour - 12;
  }
  if(timePeriod === 'PM'){
    hour = 12 + hour
  }


  dt.setHours(hour);
  dt.setMinutes(minutes);
  dt.setSeconds(0);
  return dt;

}

function sortTable(){
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("eventTable");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      // Check if the two rows should switch place:
      if (x.innerHTML > y.innerHTML) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }


}

function moveCurrentTimeIndicatorLoop(){
  moveCurrentTimeIndicator();
  var now = new Date();
  var topMin = new Date();
  topMin.setSeconds(0);
  topMin.setMilliseconds(0);
  topMin.setMinutes(topMin.getMinutes()+1);
  setTimeout(setInterval(moveCurrentTimeIndicator(),60000),topMin-now);

}

function moveCurrentTimeIndicator(){
  var now = new Date();
  var twelveAm = new Date();
  twelveAm.setHours(0);
  twelveAm.setMinutes(0);
  twelveAm.setSeconds(0);
  twelveAm.setMilliseconds(0);
  var differenceInMilliseconds = now - twelveAm;
  var differenceInHours  = millToHrs(differenceInMilliseconds);
  var placeInPixels  = differenceInHours*100 + 100;

  $(function(){
    $("#currentTime").css("top",placeInPixels)
  });
}

function millToHrs(mills){
  return mills/3600000;
}

function makeBlock(name,start,end){
  var startTime = toTime(start);
  var endTime = toTime(end);
  var twelveAm = new Date();
  twelveAm.setHours(0);
  twelveAm.setMinutes(0);
  twelveAm.setSeconds(0);
  twelveAm.setMilliseconds(0);

  var height = millToHrs(endTime-startTime) * 100;
  var top = millToHrs(startTime-twelveAm) * 100 + 100;

  $(function(){
    $("#"+name).css("top",top)
    $("#"+name).css("height",height)
  });



}
