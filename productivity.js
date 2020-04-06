var modal = document.getElementById("myModal") //modal stuff
var btn = document.getElementById("addButton")
var span = document.getElementsByClassName("close")[0];
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

function displayTime(endTime){
  var countDownDate = new Date(endTime).getTime();
  var  timer = document.createElement("P");
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

    timer.innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    document.body.appendChild(timer);


    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      timer.innerHTML = "EXPIRED";
    }
  }, 1000);

}

function addEvent(){ //adds an event to the table
  var eventText = document.getElementById("eventInput").value;
  var startText = document.getElementById("startInput").value;
  var endText = document.getElementById("endInput").value;
  var table = document.getElementById("eventTable");
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
  setTimeout(function(){displayTime(endTime)},Math.abs(startTime-dt));
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
