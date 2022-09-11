$(document).ready(function () {
$(document).attr("title", "HPCS | Manage Residents"); 
select_with_search_box(); 
enable_form();  
});

// for select
function select_with_search_box()
{
$('select').selectize({
// maxItems: '1',
sortField: 'text'
});
}
// for select  end

//enable the form when a barangay is picked
function enable_form()
{
    $("#select_barangay").change(function(){ 
    var barangay_name = $("#select_barangay").text();
    barangay_name = barangay_name.replace(/ /g,"_");
    barangay_name = barangay_name.toLowerCase();

if(barangay_name.trim().length != 0)
{
    $('fieldset').removeAttr("disabled");
    $('#gender')[0].selectize.enable(); 
    $('#civil_status')[0].selectize.enable(); 
    $('.birthdate').css(
        {
            'cssText': 'color: #333 !important'
        }
    );
}
else
{
    $('.birthdate').css(
        {
            'cssText': 'color:#818a99 !important'
        }
    );
    $('fieldset').attr("disabled", true);
    $('#gender')[0].selectize.disable(); 
    $('#civil_status')[0].selectize.disable(); 
}

});
}
//enable the form when a barangay is picked end 

//submit new barangay
$("#add_barangay_admin_btn").click(function () {

    var barangay_id = $("#select_barangay").val();
    var firstname = $("#firstname").val();
    var middlename = $("#middlename").val();
    var lastname = $("#lastname").val();
    var age = $("#age").val();
    var gender = $("#gender").val();

    var birthdate = new Date($('#birthdate').val());
    day = birthdate.getDate();
    month = birthdate.getMonth() + 1;
    year = birthdate.getFullYear();
    birthdate = [day, month, year].join('/');

    var contact = $("#contact").val();
    var thisemail = $("#email").val();
    var civil_status = $("#civil_status").val();

    if (barangay_id.trim().length === 0) //check if value is empty
    {
      $("#select_barangay").addClass("is-invalid");
    }
    else if (firstname.trim().length === 0) //check if value is empty
    {
      $("#firstname").addClass("is-invalid");
    }
    else if (middlename.trim().length === 0) //check if value is empty
    {
      $("#middlename").addClass("is-invalid");
    }
    else if (lastname.trim().length === 0) //check if value is empty
    {
      $("#lastname").addClass("is-invalid");
    }
    else if (age.trim().length === 0) //check if value is empty
    {
      $("#age").addClass("is-invalid");
    }
    else if (gender.trim().length === 0) //check if value is empty
    {
      $("#gender").addClass("is-invalid");
    }
    else if (birthdate === "NaN/NaN/NaN") //check if value is empty
    {
      $("#birthdate").addClass("is-invalid");
    }
    else if (contact.trim().length === 0) //check if value is empty
    {
      $("#contact").addClass("is-invalid");
    }
    else
    {
        if (thisemail.trim().length != 0) //check if value is empty
        {
            function isEmail(email) {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return regex.test(email);
            }

            if( !isEmail(thisemail)) { 
                $("#email").addClass("is-invalid");
            }
            else
            {
                alert("Ok");
            }
        }
        else
        {
            alert("Ok");
        }
  
    }



  });
  //submit new barangay end