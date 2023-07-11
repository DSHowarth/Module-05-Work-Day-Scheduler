// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  //When the corresponding button is clicked, the events/content of that time block
  //is saved locally. The key is the ID of the time block.
  $('.time-block').on('click', '.saveBtn', function(){
    localStorage.setItem($(this).parent().attr('id'), $(this).siblings('.description').val());
  })

  // Updates the color code of all timeslots when page loads, based on local time
  $(".time-block").each(function(){
    //Take the number off the id tag, and store the current hour of the day. Convert both to numbers
    //to prevent 9 evaluating as greater than (hour) 17. No, I'm not 100% sure why that works.
    var slotHour = parseInt($(this).attr("id").slice(5));
    var realHour = parseInt(dayjs().format("HH"));
    
    if (slotHour === realHour){
      $(this).removeClass("past");
      $(this).addClass("present");
    }
    else if (slotHour > realHour){
      console.log(realHour)
      $(this).removeClass("past");
      $(this).addClass("future");
    }
    else{
      return;
    }
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  $(".description").each(function(){
    $(this).text(localStorage.getItem($(this).attr("id")));

  })

  //Function that adds current date & day of the week to the page on load
  $("#currentDay").text(dayjs().format("dddd, MMM DD YYYY"));
});
