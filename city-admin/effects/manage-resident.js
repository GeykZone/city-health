var $resident_age = "";
var validation_link = "https://phonevalidation.abstractapi.com/v1/";
var mobile_number_validation_api_key = "1adfab67d9d3468f932b8af2d70efbc9";
var phone_number_is_valid = "";

$(document).ready(function () {
$(document).attr("title", "HPCS | Manage Residents"); 
select_with_search_box(); 
enable_form();  
generate_age();
load_table_resident();
});

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

// for select
function select_with_search_box()
{
$('select').selectize({
// maxItems: '1',
sortField: 'text'
});
}
// for select  end


//show the barangay resident table ajax
function load_table_resident()
{
  $("#barangay_resident_table").load("functions/show-resident.php", {
  });
}
//show the barangay resident table ajax

//destroy data table
function destroy_resident_table()
{
  $('#resident_table').dataTable().fnDestroy();
}
//destroy data table


//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#resident_table' ) ) { // check if data table is already exist

    var table = $('#resident_table').DataTable({

     
      
      //"dom": 'Blfrtip',      

      "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],

      //disable the sorting of colomn
      "columnDefs": [ {
        "targets": 8,
        "orderable": false
        } ],
  
      "buttons": [
        {
            extend: 'copy',
            text: ' COPY',
  
            title: 'Health Profile Clustering System',
  
            messageTop: 'List of Residents in Oroquieta City',
            //className: 'fa fa-solid fa-clipboard',
            
  
            exportOptions: {
            modifier: {
               page: 'current'
            },
             //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0,1,2,3,4,5,6,7],
              // optional space between columns
              columnGap: 1
            }
  
        },
        { 
            extend: 'excel',
            text: ' EXCEL',
  
            title: 'Health Profile Clustering System',
  
            messageTop: 'List of Residents in Oroquieta City',
            //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
            
  
            exportOptions: {
            modifier: {
               page: 'current'
            },
             //columns: [0, 1] //r.broj kolone koja se stampa u PDF
             columns: [0,1,2,3,4,5,6,7],
              // optional space between columns
              columnGap: 1
            }
  
        },
        {
            extend: 'print',
            text: ' PDF',
  
            title: 'Health Profile Clustering System',
  
            messageTop: 'List of Residents in Oroquieta City',
            //className: 'fa fa-print',
            
  
            exportOptions: {
            modifier: {
               page: 'current'
            },
             //columns: [0, 1] //r.broj kolone koja se stampa u PDF
             columns: [0,1,2,3,4,5,6,7],
              // optional space between columns
              columnGap: 1
            },
  
            customize: function (win) {
               $(win.document.body)
                   .css('text-align', 'center')
  
               $(win.document.body).find('table')
                   .css('font-size', '12pt');
           }
        }],
    });
    table.buttons().container().appendTo('#resident_table_wrapper .col-md-6:eq(0)');

  }

  
};
//show data tables end

//enable the form when a barangay is picked
function enable_form()
{
    $("#select_barangay").change(function(){ 
    var barangay_name = $("#select_barangay").text();

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

//generate an age base on the birthdate
function generate_age()
{
  $("#birthdate").datepicker({
    onSelect: function(value, ui) {
        var today = new Date(),
            age = today.getFullYear() - ui.selectedYear;
            resident_age = age;
    },
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
  });
  $( "#birthdate" ).val("0000-00-00");
}
//generate an age base on the birthdate

//submit new barangay
$("#add_barangay_admin_btn").click(function () {

    var barangay_id = $("#select_barangay").val();
    var firstname = $("#firstname").val();
    var middlename = $("#middlename").val();
    var lastname = $("#lastname").val();
    var gender = $("#gender").val();

    var birthdate = $('#birthdate').val();

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
    else if (birthdate === "0000-00-00") //check if value is empty
    {
      $("#birthdate").addClass("is-invalid");
    }
    else if (gender.trim().length === 0) //check if value is empty
    {
      $("#gender").addClass("is-invalid");
    }
    else if (civil_status.trim().length === 0) //check if value is empty
    {
      $("#civil_status").addClass("is-invalid");
    }
    else if (contact.trim().length === 0) //check if value is empty
    {
      $("#contact").addClass("is-invalid");
      $("#phno_validator_label").text("Please don't leave this area empty.")
    }
    else
    {

        function submit_new_resident()
        {
          contact = "63"+contact;
          $.getJSON(validation_link+"?api_key="+mobile_number_validation_api_key+"&phone="+contact, function(data) {
            phone_number_is_valid = data.valid;

            if(phone_number_is_valid)
            {
              $.post("functions/add-resident.php", {

                barangay_id: barangay_id,
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                age: resident_age,
                gender: gender,
                birthdate: birthdate,
                contact: contact,
                thisemail: thisemail,
                civil_status: civil_status
    
              },
              function (data, status) {
                confirmation.a = data;
        
              });
            }
            else
            {
              $("#contact").addClass("is-invalid");
              $("#phno_validator_label").text("Invalid phone number, please enter a 10-digit phone number and the phone number must start with a 9 (e.g. 9123456789).");
            }
          })

        }

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
             submit_new_resident();
            }
        }
        else
        {
         submit_new_resident();
        }
  
    }

  });
  //submit new barangay end

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
  $('#add-barangay-resident').modal('toggle');

  $("#select_barangay").val("");
  var $select = $('#select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
  $("#firstname").val("");
  $("#middlename").val("");
  $("#lastname").val("");
  $("#gender").val("");
  $select = $('#gender').selectize();
  control = $select[0].selectize;
  control.clear();
  $( "#birthdate" ).val("0000-00-00");
  $("#contact").val("");
  $("#email").val("");
  $("#civil_status").val("");
  $select = $('#civil_status').selectize();
  control = $select[0].selectize;
  control.clear();

  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A new resident has been added in the list.'
  });
  setTimeout(function(){  
    $("#resident_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_resident_table();
    load_table_resident();

  },3000);
}
else if(confirmation.a == 2)
{
  toastMixin.fire({
    animation: true,
    title: 'An admin is already assigned in the barangay.',
    icon: 'error'
  });
  setTimeout(function(){
  },3000);
}
}
//trigger error messages

//erese input fields when x button is pressed
//add resident
$("#close_add_resident").click(function()
{
    $("#select_barangay").val("");
    var $select = $('#select_barangay').selectize();
    var control = $select[0].selectize;
    control.clear();
    $("#firstname").val("");
    $("#middlename").val("");
    $("#lastname").val("");
    $("#gender").val("");
    $select = $('#gender').selectize();
    control = $select[0].selectize;
    control.clear();
    $( "#birthdate" ).val("0000-00-00");
    $("#contact").val("");
    $("#email").val("");
    $("#civil_status").val("");
    $select = $('#civil_status').selectize();
    control = $select[0].selectize;
    control.clear();
})
//erese input fields when x button is pressed