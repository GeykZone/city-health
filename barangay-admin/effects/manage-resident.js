var $resident_age = "";
var i = 0;
var table = "";
var chart = "";

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
var update_resident_age = "";

var x_value = "";
var y_value = "";
var xValues = "";
var yValues = "";
var largets_total = "";
var myColors=[];

var sort = "names";

var myChart ="";
var res_id_value ="";

var date_range_from = "";
var date_range_to = "";
var query_btn = "unclicked";
var min_age;
var max_age;
var gender;

//phone number validation
function allCharactersSame(s)
{
let n = s.length;
for (let i = 1; i < n; i++)
if (s[i] != s[0])
    return false;

return true;
}

function line1(s)
{
let n = s.length;
for (let i = 2; i < n; i++)
if (s[i] != s[1])
    return false;

return true;
}

function line2(s)
{
let n = s.length;
for (let i = 3; i < n; i++)
if (s[i] != s[2])
    return false;

return true;
}

function line3(s)
{
let n = s.length;
for (let i = 4; i < n; i++)
if (s[i] != s[3])
    return false;

return true;
}

function line4(s)
{
let n = s.length;
for (let i = 5; i < n; i++)
if (s[i] != s[4])
    return false;

return true;
}

function line5(s)
{
let n = s.length;
for (let i = 6; i < n; i++)
if (s[i] != s[5])
    return false;

return true;
}

function line6(s)
{
let n = s.length;
for (let i = 7; i < n; i++)
if (s[i] != s[6])
    return false;

return true;
}
//phone number validation end


$(document).ready(function () {
$(document).attr("title", "HPCS | Manage Residents"); 
select_with_search_box()
generate_age()
get_resident_table_cell_value()

load_data_tables()
opentip_tooltip()

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
$(".selectize-control").removeClass("form-control barangay-form")
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


toastMixin.fire({
animation: true,
title: 'A new resident has been added in the list.'
});

table.ajax.reload( null, false);
update_chart();
}
else if(confirmation.a == 2)
{
toastMixin.fire({
animation: true,
title: 'An admin is already assigned in the barangay.',
icon: 'error'
});
}
else if(confirmation.a == 3)
{
$('#update-barangay-resident').modal('toggle');

$("#update_firstname").val("");
$("#update_middlename").val("");
$("#update_lastname").val("");
$("#update_gender").val("");
$select = $('#update_gender').selectize();
control = $select[0].selectize;
control.clear();
$( "#update_birthdate" ).val("0000-00-00");
$("#update_contact").val("");
$("#update_email").val("");
$("#update_civil_status").val("");
$select = $('#update_civil_status').selectize();
control = $select[0].selectize;
control.clear();


toastMixin.fire({
animation: true,
title: 'A resident record has been updated.'
});

table.ajax.reload( null, false);
update_chart();
}
else if(confirmation.a == 4)
{  
toastMixin.fire({
animation: true,
title: 'A resident record has been deleted.'
});
table.ajax.reload( null, false);
update_chart();
}
}
//trigger error messages end

//get the id of resident
function click_value(this_value)
{
res_id_value = this_value.substr(this_value.indexOf(" ") + 1);
}
//get the id of resident end

//show data tables
function load_data_tables() {
  var ajax_url = "functions/display-functions/show-resident.php";

if ( ! $.fn.DataTable.isDataTable( '#resident_table' ) ) { // check if data table is already exist

table = $('#resident_table').DataTable({

// "processing": true,
"deferRender": true,
"serverSide": true,
"ajax": {
  url: ajax_url,
  data: {
    gender:gender,
    date_range_from:date_range_from,
    date_range_to:date_range_to,
    query_btn:query_btn,
    min_age:min_age,
    max_age:max_age
  },
  "dataSrc": function ( json ) {
    //Make your callback here.
   // console.log(json)
    return json.data;
}      

},  
"autoWidth": false,
scrollCollapse: true,
"dom": 'Brltip',     
"lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

//disable the sorting of colomn
"columnDefs": [ {
  "targets": 9,
  "orderable": false
  } ],

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
  {
    targets: 9,
    render: function(data)
    {
      return "<div class='text-end px-3'> <i onclick = 'click_value(this.id)' class='update_resident_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-barangay-resident' id='update_resident_value "+data+"' role='button'></i> "+
      "<i onclick = 'click_value(this.id)' class='delete_resident_value shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_resident' data-coreui-toggle='modal' id='delete_resident_value "+data+"' role='button'></i>"+
      "</div>"
    }

  }
],

"buttons": [
{
    extend: 'copy',
    text: ' COPY',

    title: 'Health Profile Clustering System',

    messageTop: 'List of Residents in '+'Barangay '+my_barangay_name,
    //className: 'fa fa-solid fa-clipboard',
    

    exportOptions: {
    modifier: {
        page: 'current'
    },
      //columns: [0, 1] //r.broj kolone koja se stampa u PDF
      columns: [0,1,2,3,4,5,6,7,8],
      // optional space between columns
      columnGap: 1
    }

},
{ 
    extend: 'excel',
    text: ' EXCEL',

    title: 'Health Profile Clustering System',

    messageTop: 'List of Residents in '+'Barangay '+my_barangay_name,
    //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
    

    exportOptions: {
    modifier: {
        page: 'current'
    },
      //columns: [0, 1] //r.broj kolone koja se stampa u PDF
      columns: [0,1,2,3,4,5,6,7,8],
      // optional space between columns
      columnGap: 1
    }

},
{
    extend: 'print',
    text: ' PDF',

    title: 'Health Profile Clustering System',

    messageTop: 'List of Residents in '+'Barangay '+my_barangay_name,
    //className: 'fa fa-print',
    

    exportOptions: {
    modifier: {
        page: 'current'
    },
      //columns: [0, 1] //r.broj kolone koja se stampa u PDF
      columns: [0,1,2,3,4,5,6,7,8],
      // optional space between columns
      columnGap: 1
    },

    customize: function ( doc ) {
      $(doc.document.body).find('h1').css('font-size', '15pt');
      $(doc.document.body).find('h1').css('text-align', 'center'); 
      $(doc.document.body).find('table').addClass("table-bordered")
      $(doc.document.body).find('table').css('font-size', '15pt');
      $(doc.document.body).find('table').css('width', '100%');
      $(doc.document.body).css('text-align', 'center')
    }
}],
});
table.buttons().container().appendTo('#resident_table_wrapper .col-md-6:eq(0)');

$('#resident_table #th_1 td').each(function () {
var title = this.id;

if(title === "settings" )
{

  $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-1"><span class="fa-solid me-2"></span>Settings</span></div>');
}
else
{
  $(this).html('<input type="text" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
}

});

table.columns().every(function () {
var table = this;
$('input', this.footer()).on('keyup change', function () {
    if (table.search() !== this.value) {
        table.search(this.value).draw();
    }
});
});

}
//to align the data table buttons
$("#resident_table_wrapper").addClass("row");

$(".dt-buttons").detach().appendTo('#buttons') 
$(".dt-buttons").addClass("col-lg-2 text-center col-md-12 mb-3"); 
$(".dt-buttons").removeClass("flex-wrap");

$(".dataTables_length").detach().appendTo('#buttons')
$(".dataTables_length").addClass("col-lg-10 text-lg-end text-center text-md-center text-sm-center col-md-12 mb-3");

$(".dataTables_info").detach().appendTo('#table_page')
$(".dataTables_info").addClass("col-lg-6 col-md-12 text-lg-start text-center text-md-center text-sm-center")

$(".dataTables_paginate ").detach().appendTo('#table_page')
$(".dataTables_paginate ").addClass("col-lg-6 d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center ")


$(".buttons-print").addClass("shadow-sm border-2 "); 
$(".buttons-excel").addClass("shadow-sm border-2 "); 
$(".buttons-copy").addClass("shadow-sm border-2 "); 

$(".form-control").addClass("shadow-sm");
$(".form-select").addClass("shadow-sm");


};
//show data tables end

//create date picker
function generate_age()
{
//adding (first add)
$("#birthdate").datepicker({
dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
});

$("#range_from").datepicker({
dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
});

$("#range_to").datepicker({
dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
});

//updating
$("#update_birthdate").datepicker({
dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
});
}
//create date picker end

//submit new barangay
$("#add_resident_btn").click(function () {

var barangay_id = my_barangay_id;
var firstname = $("#firstname").val();
var middlename = $("#middlename").val();
var lastname = $("#lastname").val();
var gender = $("#gender").val();

var birthdate = $('#birthdate').val();
dob = birthdate;
dob = new Date(dob);
today = new Date();
age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
age = age.toString()
resident_age = age;

var contact = $("#contact").val();
var thisemail = $("#email").val();
var civil_status = $("#civil_status").val();

if (firstname.trim().length === 0) //check if value is empty
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
else if (birthdate.trim().length === 0) //check if value is empty
{
$("#birthdate").addClass("is-invalid");
}
else if (gender.trim().length === 0) //check if value is empty
{
$("#gender").addClass("is-invalid");
$("#select_gender_list .selectize-control").addClass("is-invalid");
}
else if (civil_status.trim().length === 0) //check if value is empty
{
$("#civil_status").addClass("is-invalid");
$("#select_status_list .selectize-control").addClass("is-invalid");
}
else if (contact.trim().length === 0) //check if value is empty
{
$("#contact").addClass("is-invalid");
$("#phno_validator_label").text("Invalid input.")
}
else
{

function submit_new_resident()
{ 
    if(contact.charAt(0) === "9" && contact.length === 10 && allCharactersSame(contact) != true && line1(contact) != true && line2(contact) != true
    && line3(contact) != true && line4(contact) != true && line5(contact) != true  && line6(contact) != true) 
    {
      contact = "+63"+contact;
      $.post("functions/add-functions/add-resident.php", {

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
      $("#phno_validator_label").text("Invalid phone number; please type a valid 10-digit Philippine phone number (e.g. 9123456789).");
    }

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
  thisemail = 'N/A';
  submit_new_resident();
}

}

});
//submit new barangay end

//delete resident
$("#delete_resident_record").click(function()
{
$.post("functions/delete-functions/delete-resident.php", {
  resident_id: res_id_value

},
function (data, status) {
confirmation.a = data;

});
})
//delete resident end

//update-resident
$("#update_resident_btn").click(function()
{ 
  var new_barangay_name = my_barangay_id;
  var new_firstname = $("#update_firstname").val();
  var new_middlename = $("#update_middlename").val();
  var new_lastname = $("#update_lastname").val();
  var new_gender = $('#update_gender').val();

  var new_birthdate = $("#update_birthdate").val();
  dob = new_birthdate;
  dob = new Date(dob);
  today = new Date();
  upadateage = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
  upadateage = upadateage.toString()
  update_resident_age = upadateage;

  var new_age = update_resident_age;

  var new_civil = $('#update_civil_status').val();
  var new_contact = $("#update_contact").val();
  var new_email = $("#update_email").val();

  if (new_firstname.trim().length === 0) //check if value is empty
  {
  $("#update_firstname").addClass("is-invalid");
  }
  else if (new_middlename.trim().length === 0) //check if value is empty
  {
  $("#update_middlename").addClass("is-invalid");
  }
  else if (new_lastname.trim().length === 0) //check if value is empty
  {
  $("#update_lastname").addClass("is-invalid");
  }
  else if (new_birthdate.trim().length === 0) //check if value is empty
  {
  $("#update_birthdate").addClass("is-invalid");
  }
  else if (new_gender.trim().length === 0) //check if value is empty
  {
  $("#update_gender").addClass("is-invalid");
  $("#update_select_gender .selectize-control").addClass("is-invalid");
  }
  else if (new_civil.trim().length === 0) //check if value is empty
  {
  $("#update_civil_status").addClass("is-invalid");
  $("#update_select_status .selectize-control").addClass("is-invalid");
  }
  else if (new_contact.trim().length === 0) //check if value is empty
  {
  $("#update_contact").addClass("is-invalid");
  $("#update_phno_validator_label").text("Invalid input.")
  }
  else
  {

    function update_resident()
    {

        if(new_contact.charAt(0) === "9" && new_contact.length === 10 && allCharactersSame(new_contact) != true && line1(new_contact) != true && line2(new_contact) != true
        && line3(new_contact) != true && line4(new_contact) != true && line5(new_contact) != true  && line6(new_contact) != true) 
        {
          new_contact = "+63"+new_contact; //639276003238

          $.post("functions/update-functions/update-resident.php", {
            resident_id: res_id_value,
    
            new_barangay_name: new_barangay_name,
            new_firstname: new_firstname,
            new_middlename: new_middlename,
            new_lastname: new_lastname,
            new_age: new_age,
            new_gender: new_gender,
            new_birthdate: new_birthdate,
            new_civil: new_civil,
            new_contact: new_contact,
            new_email: new_email
            
            },
            function (data, status) {
            confirmation.a = data;
        
            });

        }
        else
        {
          $("#update_contact").addClass("is-invalid");
          $("#update_phno_validator_label").text("Invalid phone number; please type a valid 10-digit Philippine phone number (e.g. 9123456789).");
        }
      

    }


    if (new_email.trim().length != 0) //check if value is empty
    {
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        if( !isEmail(new_email)) { 
            $("#update_email").addClass("is-invalid");
        }
        else
        {
          update_resident()
        }
    }
    else
    {
      new_email = 'N/A';
      update_resident()
    }

  }


})
//update-resident end

//erese input fields when x button is pressed
$("#close_add_resident").click(function()
{
$("#firstname").val("");
$("#middlename").val("");
$("#lastname").val("");
$("#gender").val("");
$select = $('#gender').selectize();
control = $select[0].selectize;
control.clear();
$( "#birthdate" ).val("0000-00-00");
$('.birthdate').css(
{
  'cssText': 'color:#818a99 !important'
}
);
$("#contact").val("");
$("#email").val("");
$("#civil_status").val("");
$select = $('#civil_status').selectize();
control = $select[0].selectize;
control.clear();
})
//erese input fields when x button is pressed end

//get the table cell value when selected
function get_resident_table_cell_value()
{

//update
$("#resident_table").on('click','.update_resident_value',function(){
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


$("#update_firstname").val(col0);
$("#update_middlename").val(col1);
$("#update_lastname").val(col2);
update_resident_age = col3;
$('#update_gender').data('selectize').setValue(col4);

var update_birthdate = new Date(col5)
update_birthdate = update_birthdate.getFullYear()+"-"+String(update_birthdate.getMonth() + 1).padStart(2, '0')+"-"+String(update_birthdate.getDate()).padStart(2, '0');
console.log(update_birthdate)
$("#update_birthdate").val(update_birthdate);
if($("#update_birthdate").val().trim().length === 0)
{
$('#update_birthdate').css(
{
  'cssText': 'color:#818a99 !important'
}
);
}
else
{
$('#update_birthdate').css(
{
    'cssText': 'color: #333 !important'
}
);
}

$('#update_civil_status').data('selectize').setValue(col6);

$("#update_contact").val(col7.substring(3));

if(col8 === "N/A")
{
col8 = ""
}
$("#update_email").val(col8);

});

}
//get the table cell value when selected end


//refresh table back to current data
$("#refresh_resident_table").click(function(e)
{
  $("#range_from").val("");
  $("#range_to").val("");
  $("#range_from").val("");
  $("#range_to").val("");
  $("#age_min").val("");
  $("#age_max").val("");
  var $select = $('#select_gender').selectize();
  var control = $select[0].selectize;
  control.clear();
  $("#search_result").html("")
  $("#search_result").addClass("d-none")
  query_btn = "unclicked";

swal.close();

table.destroy()
$(".dataTables_length").remove();
$(".dataTables_info").remove();
$(".dataTables_paginate ").remove();

load_data_tables()
})
//refresh table back to current data end

//generate a tooltip
function opentip_tooltip()
{
var refresh_table_tooltip = $("#refresh_resident_table")
var myOpentip = new Opentip(refresh_table_tooltip, { showOn:"mouseover", tipJoint: "bottom", target:refresh_table_tooltip });
myOpentip.setContent("Refresh Table"); // Updates Opentips content
}
//generate a tooltip end

// cange color of birthdate field when value is not 0
$("#birthdate").change(function()
{

if($("#birthdate").val().trim().length === 0)
{
$('#birthdate').css(
  {
      'cssText': 'color:#818a99 !important'
  }
  );
}
else
{
$('#birthdate').css(
  {
      'cssText': 'color: #333 !important'
  }
);

}

})

$("#update_birthdate").change(function()
{

if($("#update_birthdate").val().trim().length === 0)
{
$('#update_birthdate').css(
  {
    'cssText': 'color:#818a99 !important'
  }
  );
}
else
{
$('#update_birthdate').css(
  {
      'cssText': 'color: #333 !important'
  }
  );
}

})

$("#range_from").change(function()
{

if($("#range_from").val().trim().length === 0)
{
$('#range_from').css(
  {
      'cssText': 'color:#818a99 !important'
  }
  );
}
else
{
$('#range_from').css(
  {
      'cssText': 'color: #333 !important'
  }
);

}

})

$("#range_to").change(function()
{

if($("#range_to").val().trim().length === 0)
{
$('#range_to').css(
  {
    'cssText': 'color:#818a99 !important'
  }
  );
}
else
{
$('#range_to').css(
  {
      'cssText': 'color: #333 !important'
  }
  );
}

})
// cange color of birthdate field when value is not 0 end

//go to filter button
$("#filter_this_table").click(function()
{
if($("#range_from").val().trim().length === 0)
{
$('#range_from').css(
{
  'cssText': 'color:#818a99 !important'
}
);
}
else
{
$('#range_from').css(
{
  'cssText': 'color: #333 !important'
}
);

}
if($("#range_to").val().trim().length === 0)
{
$('#range_to').css(
{
'cssText': 'color:#818a99 !important'
}
);
}
else
{
$('#range_to').css(
{
  'cssText': 'color: #333 !important'
}
);
}
})
// go to filter button end

//filter date range
$("#date_range_btn").click(function()
{
var from_input = $("#range_from").val()
var to_input = $("#range_to").val()
var click_min_age = $("#age_min").val();
var click_max_age = $("#age_max").val();
var filter_gender = $("#select_gender").val();

var d_from = new Date(from_input)
var d_to = new  Date(to_input)
var validator = true


click_min_age = parseInt(click_min_age);
click_max_age = parseInt(click_max_age);

if(d_from > d_to)
{
$("#range_to").addClass("is-invalid");
$("#range_to").val("");
validator =false
}

if(!isNaN(click_max_age) && click_min_age > click_max_age)
{
$("#age_max").addClass("is-invalid");
$("#age_max").val("");
validator =false
}


if(validator === true)
{
    date_range_from = from_input;
    date_range_to = to_input;
    min_age = click_min_age;
    max_age = click_max_age;
    gender = filter_gender;
    query_btn = "clicked";
    
    table.destroy()
    $(".dataTables_length").remove();
    $(".dataTables_info").remove();
    $(".dataTables_paginate ").remove();

    load_data_tables()
    $("#filter_table").modal("toggle");

    var result_tittle = "Filtered results for: "
    var results =  [];
    let a = 0

    if(gender != "")
    {
      results[a] = "  Gender: "+gender+""
      a+=1
    }

    if(!isNaN(click_min_age))
    {
      results[a] = "  Min Age: "+min_age+""
      a+=1
    }
    if(!isNaN(click_max_age))
    {
      results[a] = "  Max Age: "+max_age+""
      a+=1
    }

    if(date_range_from != "")
    {
      let dateStr = date_range_from;
      let dateObj = new Date(dateStr);
      let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
      results[a]  = "  Min Date: "+readableDate+""
      a+=1
    }
    if(date_range_to != "")
    {
      let dateStr = date_range_to;
      let dateObj = new Date(dateStr);
      let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
      results[a] = "  Max Date: "+readableDate+""
      a+=1
    }

    if (results.length > 0) 
    {
      $("#search_result").html("<a><span class='me-2 fw-semibold' >"+result_tittle+"</span><span>"+results+"</span></a>")
      $("#search_result").removeClass("d-none")
    }
    else
    {
      $("#search_result").html("")
      $("#search_result").addClass("d-none")
    }

    update_chart()
}

})
//filter date range end


