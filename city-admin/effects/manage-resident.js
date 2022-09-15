var $resident_age = "";
var validation_link = "https://phonevalidation.abstractapi.com/v1/";
var mobile_number_validation_api_key = "1adfab67d9d3468f932b8af2d70efbc9";
var phone_number_is_valid = "";
var i = 0;
var table = "";

var barangay_name = "";
var first_name = "";
var middle_name = "";
var last_name = "";
var age = "";
var gender = "";
var birthdate = "";
var civil = "";
var contact = "";
var email = "";

$(document).ready(function () {
$(document).attr("title", "HPCS | Manage Residents"); 
select_with_search_box(); 
enable_form();  
generate_age();
get_resident_table_cell_value()
load_data_tables();
$("#resident_table_wrapper").addClass("d-none");
load_progress_bar();
});

//add a delay in loading the material icon
function modal_open()
{
setTimeout(function(){
  $('.material-icons').css('opacity','1');

  },500);
}
//add a delay in loading the material icon

//progress bar
function load_progress_bar()
{
  setInterval(move())
  setTimeout( function()
  {
    $("#myBar").text("Table Loaded Successfully!");
    setTimeout(function(){
      $("#myProgress").addClass("d-none");
      $("#resident_table").removeClass("d-none");
      $("#resident_table_wrapper").removeClass("d-none");
      $("#add_resident").removeClass("d-none");
      $("#residents_chart_row").removeClass("d-none");
    },800);
  },3000)
}

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML ="Loading " + width  + "%";
      }
    }
  }
}
//progress bar end

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
  $("#resident_table_paginate").addClass("d-none");
  $("#resident_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");

  toastMixin.fire({
    animation: true,
    title: 'A new resident has been added in the list.'
  });

  setTimeout(function(){  
    
    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload();
      $("#resident_table_paginate").removeClass("d-none");
      $("#resident_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
    },600);

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
else if(confirmation.a == 4)
{  
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#resident_table_paginate").addClass("d-none");
  $("#resident_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");

  toastMixin.fire({
    animation: true,
    title: 'A resident record has been deleted.'
  });

  setTimeout(function(){  

    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload();
      $("#resident_table_paginate").removeClass("d-none");
      $("#resident_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
    },600);

  },3000);
}
}
//trigger error messages

//destroy data table
function destroy_resident_table()
{
 table.destroy();

}
//destroy data table


//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#resident_table' ) ) { // check if data table is already exist
    
     table = $('#resident_table').DataTable({
       // "processing": true,
        "deferRender": true,
        "serverSide": true,
        "ajax": "functions/show-resident.php",   
         scrollCollapse: true,
        "columns": [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "defaultContent": "<i class='edit_barangay_value update btn_icon fas fa-edit' data-coreui-toggle='modal' href='#update-barangay' id='edit_barangay_value' role='button' onclick='modal_open();'></i> "+
            "<i class='edit_barangay_value btn_icon fas fa-trash' href='#delete_resident' data-coreui-toggle='modal' id='delete_resident_value' role='button' onclick='modal_open();'></i>"+
            "<i class='barangay_table_is_loading spinner-border spinner-border-sm mt-2 d-none' style='color:#3b7ddd;'  id='barangay_table_is_loading' role='button' disable></i>"
            
          }

        ],
      
        "dom": 'lfBrtip',      

        "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],


      //disable the sorting of colomn
      "columnDefs": [ {
        "targets": 10,
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
              columns: [0,1,2,3,4,5,6,7,9],
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
             columns: [0,1,2,3,4,5,6,7,9],
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
             columns: [0,1,2,3,4,5,6,7,9],
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

    //to align the data table buttons
  $("#resident_table_wrapper").addClass("row");
  $("#resident_table_length").addClass("col-sm-6");
  $("#resident_table_length").addClass("mb-3");
  $("#resident_table_filter").addClass("col-sm-6");
  $("#resident_table_filter").addClass("mb-3");
  $(".dt-buttons").addClass("col-sm-1");      
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
$("#add_resident_btn").click(function () {

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

  //delete resident
  $("#delete_resident_record").click(function()
  {
    $.post("functions/delete-resident.php", {
      barangay_name: barangay_name,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      age: age,
      gender: gender,
      birthdate: birthdate,
      civil: civil,
      contact: contact,
      email: email
      
    },
    function (data, status) {
      confirmation.a = data;

    });
  })
  //delete resident end

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

//get the table cell value when selected
function get_resident_table_cell_value()
{
  //updating
    $("#resident_table").on('click','#update_barangay_value',function(){

      // get the current row
      var currentRow=$(this).closest("tr");

      var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value


  });

//deleting
 $("#resident_table").on('click','#delete_resident_value',function(){
      // get the current row
      var currentRow=$(this).closest("tr");

      var col0=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value
      var col1=currentRow.find("td:eq(1)").text().trim($(this).text()); // get current row 1st TD value
      var col2=currentRow.find("td:eq(2)").text().trim($(this).text()); // get current row 1st TD value
      var col3=currentRow.find("td:eq(3)").text().trim($(this).text()); // get current row 1st TD value
      var col4=currentRow.find("td:eq(4)").text().trim($(this).text()); // get current row 1st TD value
      var col5=currentRow.find("td:eq(5)").text().trim($(this).text()); // get current row 1st TD value
      var col6=currentRow.find("td:eq(6)").text().trim($(this).text()); // get current row 1st TD value
      var col7=currentRow.find("td:eq(7)").text().trim($(this).text()); // get current row 1st TD value
      var col8=currentRow.find("td:eq(8)").text().trim($(this).text()); // get current row 1st TD value
      var col9=currentRow.find("td:eq(9)").text().trim($(this).text()); // get current row 1st TD value

       barangay_name = col0;
       first_name = col1;
       middle_name = col2;
       last_name = col3;
       age = col4;
       gender = col5;
       birthdate = col6;
       civil = col7;
       contact = col8;
       email = col9;
  });

}
//get the table cell value when selected end