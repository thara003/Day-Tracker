$(document).ready(function(){

    $("form").on("submit", function(){
  
        var item = $('form input');
        var todo = {item: item.val()};
        console.log('submit');
  
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            // location.reload();
            console.log('submit');
          }
        });
        // e.preventDefault();
        return false;
  
    });
  
    $('li').on('click', function(){ 
      var item = $('#item');
      var item = $(this).parent().data();
      console.log("fff", item);
        // var item = item.replace(/ /g, "-");
        console.log('deleted');
        $.ajax({
          type: 'DELETE',
          url: '/todo',
          success: function(data){
            //do something with the data via front-end framework
            // var item = $(this).text().replace(/ /g, "-");
            // location.reload();
            console.log('deleted');
          }
        });
    });
  
  });