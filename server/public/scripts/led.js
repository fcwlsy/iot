$(function(){ 
　  $.ajax({
         type : "GET",
         async : true,
         url:"/led",
         success: function(status){
            if(status){
                $("#led").attr("checked",status[0].status);
                if (status[0].status){
                  $("#status_label").html("<font color=#f00>(已开！)</font>");
                }else{
                  $("#status_label").html("<font color=#0f0>(已关！)</font>");
                } 
            }
         }
    });  
   $("#led").click(function() {
       $.ajax({
         type : "PUT",
         async : true,
         url:"/led",
         data:{status:$('#led').is(':checked')},
         success: function(status){
                if (status[0].status){
                  $("#status_label").html("<font color=#f00>(已开！)</font>");
                }else{
                  $("#status_label").html("<font color=#0f0>(已关！)</font>");
                } 
         }
    });  
 }); 　          
})

