if ( window.history.replaceState ){window.history.replaceState( null, null, window.location.href );} // stop resubmission

//set do some stuff when confiramtion variable is changed
var confirmation = {
aInternal: 10,
aListener: function(val) {},
set a(val) {
this.aInternal = val;
this.aListener(val);
},
get a() {
return this.aInternal;
},
registerListener: function(listener) {
this.aListener = listener;
}
}

confirmation.registerListener(function(val) {
alert_message();

});
//set do some stuff when confiramtion variable is changed end


//submiting
$( "#login_btn" ).click(function() {

var username = $("#username").val();
var password = $("#password").val();
var checkbox = $("#checkbox").is(':checked');
var checkbox_is_checked = "false";

if(checkbox)
{
checkbox_is_checked = "true";
}

if (username.trim().length === 0) //check if value is empty
{
$("#username").addClass("is-invalid");
$("#username").val("");
}
else if (password == "")
{
$("#invalid_password").text("Please don't leave this area empty.");
$("#password").addClass("is-invalid");
$("#password").val("");

}
else if (password.trim().length === 0)
{
$("#invalid_password").text("Please don't use blank space only.");
$("#password").addClass("is-invalid");
$("#password").val("");

}
else
{
$.post("login.php",
{
    checkbox_is_checked: checkbox_is_checked,
    username: username,
    password: password
},
function(data, status){
confirmation.a = data;

});
}
});
//submiting end

//change color of input when focus
$('input:text').bind('focus blur', function() {
$(this).removeClass("is-invalid");
});
$('input:password').bind('focus blur', function() {
$(this).removeClass("is-invalid");
});
//change color of input when focus end

//trigger error messages
function alert_message()
{
var toastMixin = Swal.mixin({
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

if(confirmation.a == 1)
{
window.location.replace("city-admin/index.php");
}
else if(confirmation.a == 2)
{
window.location.replace("barangay-admin/index.php");
}
else
{
toastMixin.fire({
animation: true,
title: 'The username or password is not identified.',
icon: 'error'
});
setTimeout(function(){
},3000);
}
}
//trigger error messages