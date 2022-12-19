var old_pass 
var new_pass 
var re_new_pass
var admin_id
var pass_confirmation
var new_user

function showPassword(pass, lbl, txt) {
  var x = document.getElementById(pass);
  var x_lbl = document.getElementById(lbl);
  var x_txt = document.getElementById(txt);

  if (x.type === "password") {
    x.type = "text";
    x_lbl.classList.remove("opacity-50")
    x_txt.innerHTML = "Hide Password";
  } else {
    x.type = "password";
    x_lbl.classList.add("opacity-50")
    x_txt.innerHTML = "Show Password";
  }
}

//submit new password
$("#update_pass_btn").click(function () {

     old_pass = $("#old_pass").val()
     new_pass = $("#new_pass").val() 
     re_new_pass = $("#re_new_pass").val()
     admin_id = Cookies.get('id')
     var pass_validator = true;
  
    if (old_pass.trim().length === 0) //check if value is empty
    {
      $(".old").text("Invalid Password")
      $("#old_pass").addClass("is-invalid");
      $("#old_pass").val("");
    

      pass_validator = false;
    } 
    else if(new_pass.trim().length === 0) //check if value is empty
    {
      $(".new").text("Invalid Password")
      $("#new_pass").addClass("is-invalid");
      $("#new_pass").val("");
      

      pass_validator = false;
    } 
    else if(re_new_pass.trim().length === 0) //check if value is empty
    {
      $(".re").text("Invalid Password")
      $("#re_new_pass").addClass("is-invalid");
      $("#re_new_pass").val("");
      

      pass_validator = false;
    }


    if (re_new_pass != new_pass) //check if value is empty
    {
      $(".re").text("Re-entered password does not match.")
      $("#re_new_pass").addClass("is-invalid");
      $("#re_new_pass").val("");
     

      pass_validator = false;
    }
  

    if (pass_validator === true)
    {
        $.post("functions/update-functions/update-password.php", {
            
            admin_id:admin_id,
            old_pass:old_pass,
            new_pass:new_pass,
        },
        function (data, status) {
          pass_alert_message(data)
        });
    }
  });
  //submit new password end


//submit new username
$("#update_user_btn").click(function()
{

  old_pass = $("#update_username_old_pass").val()
  new_user = $("#new_user").val()
  admin_id = Cookies.get('id');
  var user_validator = true;

  if (old_pass.trim().length === 0) //check if value is empty
  {
    $(".user_old").text("Invalid Password")
    $("#update_username_old_pass").addClass("is-invalid");
    $("#update_username_old_pass").val("");
    user_validator = false;
  } 
  else if (new_user.trim().length === 0) //check if value is empty
  {
    $(".user").text("Invalid Input")
    $("#new_user").addClass("is-invalid");
    $("#new_user").val("");
    user_validator = false;
  }

  if (user_validator === true)
  {
      $.post("functions/update-functions/update-username.php", {
          
          admin_id:admin_id,
          old_pass:old_pass,
          new_user:new_user,
      },
      function (data, status) {
        pass_alert_message(data)
      });
  }


})
//submit new username end


//trigger error messages
function pass_alert_message(data)
{
  var pass_toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

if(data == 1)
{
  $('#update_password').modal('toggle');

  pass_toastMixin.fire({
    animation: true,
    title: "The Barangay Administrator's password has been updated."
  });

}
else if(data == 3)
{
    pass_toastMixin.fire({
    animation: true,
    title: 'You cannot use a current password as a new password.',
    icon: 'error'
  });
}
else if(data == 4)
{
    pass_toastMixin.fire({
    animation: true,
    title: 'You have entered an invalid password.',
    icon: 'error'
  });
}
else if(data == 5)
{
  $('#update_username').modal('toggle');

  pass_toastMixin.fire({
    animation: true,
    title: "The Barangay Administrator's username has been updated."
  });

}
else if(data == 6)
{
    pass_toastMixin.fire({
    animation: true,
    title: 'You cannot use a current username as a new username.',
    icon: 'error'
  });
}
else
{
    pass_toastMixin.fire({
    animation: true,
    title: 'Something went wrong.',
    icon: 'error'

   
  });
  alert(data)
}
}
//trigger error messages

//clear fields when close
$("#close_update_pass").click(function()
{
  $("#old_pass").val("")
  $("#new_pass").val("")
  $("#re_new_pass").val("")

  if (!$("#old_pass_lbl").hasClass("opacity-50")) {
    $("#old_pass_lbl").addClass("opacity-50")
  }
  if (!$("#new_pass_lbl").hasClass("opacity-50")) {
    $("#new_pass_lbl").addClass("opacity-50")
  } 
  if (!$("#re_new_pass_lbl").hasClass("opacity-50")) {
    $("#re_new_pass_lbl").addClass("opacity-50")
  } 

  $("#old_pass_span").text("Show Password")
  $("#new_pass_span").text("Show Password")
  $("#re_new_pass_span").text("Show Password")

  $("#old_pass_checkbox").prop("checked", false);
  $("#new_pass_checkbox").prop("checked", false);
  $("#re_new_pass_checkbox").prop("checked", false);

  $('#old_pass').attr('type', 'password');
  $('#new_pass').attr('type', 'password');
  $('#re_new_pass').attr('type', 'password');
})


$("#close_update_username").click(function()
{ update_username_old_pass

  $("#update_username_old_pass").val("")
  if (!$("#update_username_old_pass_lbl").hasClass("opacity-50")) {
    $("#update_username_old_pass_lbl").addClass("opacity-50")
  }
  $("#update_username_old_pass_span").text("Show Password")
  $("#update_username_old_pass_checkbox").prop("checked", false);
  $('#update_username_old_pass').attr('type', 'password');

  $("#new_user").val("")
})
//clear fields when close end