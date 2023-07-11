// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  //When the corresponding button is clicked, the events/content of that time block
  //is saved locally. The key is the ID of the time block.
  $('.time-block').on('click', '.saveBtn', function(){
    localStorage.setItem($(this).parent().attr('id'), $(this).siblings('.description').val());

    //Lets user know the event has been saved successfully  
    $('#confirmation').text($(this).siblings('.hour').text() + ' Event Saved.');
  })

  // Updates the color code of all time blocks when page loads, based on local time
  $(".time-block").each(function(){
    //Take the number off the id tag, and store the current hour of the day. Convert both to numbers
    //to prevent 9 evaluating as greater than (hour) 17. No, I'm not 100% sure why that works.
    var blockHour = parseInt($(this).attr("id").slice(5));
    var realHour = parseInt(dayjs().format("HH"));
    
    if (blockHour === realHour){
      $(this).removeClass("past");
      $(this).addClass("present");
    }
    else if (blockHour > realHour){
      $(this).removeClass("past");
      $(this).addClass("future");
    }
    else{
      return;
    }
  });

  //On page load, fill in stored events, if any.
  $(".description").each(function(){

    $(this).text(localStorage.getItem($(this).parent().attr("id")));
    console.log(localStorage.getItem($(this).parent().attr("id")));
  })

  //On page load, write the current date and day of the week to the header
  $("#currentDay").text(dayjs().format("dddd, MMM DD YYYY"));
});
