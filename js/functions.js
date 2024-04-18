const now = new Date();
const day = ("0" + now.getDate()).slice(-2);
const month = now.getMonth();

function fetchJsonData() {
    // Assuming your JSON file is named data.json and located in the json directory at the same level as the js directory
    $.getJSON("../json/data.json", function(data) {
        // Processing each item in the JSON array
        data.forEach(function(item) {
            if(parseInt(item.date) == 1){
                $('#kalender .kalender-inner').append("<p class='"+item.date+" active' data-date='"+item.date+"'>"+item.date+" Dezember 2024</p>");
                $('#winnernumber').append("<p class='"+item.date+" active' data-date='"+item.date+"'>"+item.value+"</p>");
            }
            else if(parseInt(item.date) < parseInt(day)){
                $('#kalender .kalender-inner').append("<p class='"+item.date+"' data-date='"+item.date+"'>"+item.date+" Dezember 2024</p>");
                $('#winnernumber').append("<p class='"+item.date+"' data-date='"+item.date+"'>"+item.value+"</p>");
            }
            else if (parseInt(item.date) == parseInt(day)){
                $('#kalender .kalender-inner').append("<p class='"+item.date+"' data-date='"+item.date+"'>"+item.date+" Dezember 2024</p>");
                $('#winnernumber').append("<p class='"+item.date+"' data-date='"+item.date+"'>"+item.value+"</p>");
            }
        else if (parseInt(item.date) > parseInt(day)){
                $('#kalender .kalender-inner').append("<p id='"+item.date+"' class='disabled'>"+item.date+" Dezember 2024</p>");
            }
        });
    }).fail(function() {
        console.error("Die Daten sind im Moment nicht verfügbar!");
    });
}
const middlePos = 32;
const totalheight = 32 * (day-2);
let i = 1;

var startScroll;
function scrollToDate(){
    i = ("0" + i).slice(-2);
    if(parseInt(i) <= parseInt(day) && parseInt(i) <= 24){
        $('#kalender .kalender-inner .active').removeClass('active');
        $('#kalender .kalender-inner p.'+i).addClass('active');
        $('#winnernumber .active').removeClass('active');
        $('#winnernumber p.'+i).addClass('active');
        $('#kalender .kalender-inner').css('top', ((parseInt(i))*-middlePos)+middlePos*2)+'px';
    }
    else{
        clearInterval(startScroll);
    } 
    i = parseInt(i) + 1; 
}

function startContent(){

}


$(document).ready(function () {
    fetchJsonData();
    setTimeout(() => {
        scrollToDate();
        startScroll = setInterval(scrollToDate, 50)
    }, 200);
    
});

var position = $(window).scrollTop(); 

// should start at 0

$('#kalender').mousewheel(function(turn, delta) {

  if (delta == 1){
    //up
    var currentDate = $('#kalender .active').data('date');
    var newDate = ("0" + (parseInt(currentDate)-1)).slice(-2);
    if(parseInt(newDate) < 1){
    }
    else{
        $('#kalender .active').removeClass('active');
        $('#kalender p.'+newDate).addClass('active');
        $('#winnernumber .active').removeClass('active');
        $('#winnernumber p.'+newDate).addClass('active');
        $('#kalender .kalender-inner').css('top', ((parseInt(newDate))*-middlePos)+middlePos*2)+'px';
    }
  }
  else{
    //down
    var currentDate = $('#kalender .active').data('date');
    var newDate = ("0" + (parseInt(currentDate)+1)).slice(-2);
    if(parseInt(newDate) > parseInt(day) || parseInt(newDate) > 24){
    }
    else{
        $('#kalender .active').removeClass('active');
        $('#kalender p.'+newDate).addClass('active');
        $('#winnernumber .active').removeClass('active');
        $('#winnernumber p.'+newDate).addClass('active');
        $('#kalender .kalender-inner').css('top', ((parseInt(newDate))*-middlePos)+middlePos*2)+'px';
    }
  }
  return false;
});
var wHeight = $(window).height();
$('.content').scroll(function(event){
   var st = $(this).scrollTop();
   if (st > wHeight*0.2){
       // downscroll code
       $('body').addClass('scrolled');
   } else {
      // topscroll code
      $('body').removeClass('scrolled');
   }
});