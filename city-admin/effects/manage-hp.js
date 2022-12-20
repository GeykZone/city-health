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

var i = 0;
var table = "";
var selectize_residents = "";
var selectize_barangay_id = "";
var selectize_barangay_id_enabled = "";
var selectize_barangay_id_disabled = "";
var update_selectize_residents = "";
var update_selectize_barangay_id = "";
var update_selectize_barangay_id_enabled = "";
var update_selectize_barangay_id_disabled = "";
var case_status = "";
var id_full_naame = "";
var id_disease = "";
var philhealth_number = "";
var select_brgy = "";
var fullname_txt = "";
var disease_txt = "";
var created_at = new Date();
var dd = String(created_at.getDate()).padStart(2, '0');
var mm = String(created_at.getMonth() + 1).padStart(2, '0');
var yyyy = created_at.getFullYear();
var hp_id_value = "";

var date_range_from = "";
var date_range_to = "";
var query_btn = "unclicked";

var active_data = "";
var active_inactive_variable = "(Active)";

var min_age;
var max_age;
var cause_of_death = "";
var other_cause = "";
var filter_status;

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    select_list()
    select_for_disease()
    select_for_Health_related_deaths()
    seletize_other_deaths()
    load_data_tables()
    enable_form()
    get_hp_table_cell_value();
    date_range();
    opentip_tooltip();
})

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

//date picker
function date_range()
{

  $("#range_from").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


    $("#range_to").datepicker({
        dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
        });

}
//date picker end

// selectize ordinary
function select_list() 
{
  $('.select_list').selectize({
    // maxItems: '1',
    sortField: 'text'
    });
}
// selectize ordinary end

// for select diseases
function select_for_disease()
{  
var selectize_diseases ;
$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select_diseases.php', 
{
}, 
function (data, textStatus, jqXHR) 
{
  selectize_diseases = data;
});

var selectize_diseases_data = selectize_diseases;
var items = selectize_diseases_data.map(function(x) 
{ 
    //remove the first words
    var one = x.substr(x.indexOf(" ") + 1);

    //remove last word
    function removeLastWord(str) 
    {
      const lastIndexOfSpace = str.lastIndexOf(' ');
    
      if (lastIndexOfSpace === -1) {
        return str;
      }
      return str.substring(0, lastIndexOfSpace);
    }

    var text_label = removeLastWord(x)
    text_label = text_label.split('_').join(' ') 

    return {
      item: one,
      field: text_label
    };
  
});

$('#add_hp_select_diseases').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$('#update_hp_Diagnosis').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")
}
// for select diseases  end

//selecttize health related deaths
function select_for_Health_related_deaths()
{
var selectize_diseases ;
$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select_diseases.php', 
{
  deaths: "set"
}, 
function (data, textStatus, jqXHR) 
{
  selectize_diseases = data;
});

var selectize_diseases_data = selectize_diseases;
var items = selectize_diseases_data.map(function(x) 
{ 
    //remove the first words
    var one = x.substr(x.indexOf(" ") + 1);

    //remove last word
    function removeLastWord(str) 
    {
      const lastIndexOfSpace = str.lastIndexOf(' ');
    
      if (lastIndexOfSpace === -1) {
        return str;
      }
      return str.substring(0, lastIndexOfSpace);
    }

    var text_label = removeLastWord(x)
    text_label = text_label.split('_').join(' ') 

    return {
      item: one,
      field: text_label
    };
  
});

$('#update_hp_select_cause_of_death').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$('#select_cause_of_death').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")

}
//selecttize health related deaths end

//selectize death_cause_by_other_list
function seletize_other_deaths()
{
var selectize_diseases ;
$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select_other_cause_of_death.php', 
{
}, 
function (data, textStatus, jqXHR) 
{
  selectize_diseases = data;
});

console.log(selectize_diseases)

var selectize_diseases_data = selectize_diseases;
var items = selectize_diseases_data.map(function(x) 
{ 
    //remove the first words
    var one = x.substr(x.indexOf(" ") + 1);

    //remove last word
    function removeLastWord(str) 
    {
      const lastIndexOfSpace = str.lastIndexOf(' ');
    
      if (lastIndexOfSpace === -1) {
        return str;
      }
      return str.substring(0, lastIndexOfSpace);
    }

    var text_label = removeLastWord(x)
    text_label = text_label.split('_').join(' ') 

    return {
      item: one,
      field: text_label
    };
  
});

$('#select_other_causes').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")
}
//selectize death_cause_by_other_list end

// selectized residents
function selectized_residents_list()
{
if(selectize_barangay_id_enabled != selectize_barangay_id_disabled)
{
    $('#add_hp_select_resident').selectize()[0].selectize.destroy();
}

$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select-residents.php', 
{
    resident_names: selectize_barangay_id
}, 

function (data, textStatus, jqXHR) 
{
    selectize_residents = data;
});

var selectize_residents_data = selectize_residents;
var items = selectize_residents_data.map(function(x) 
{ 
    //remove the first words
    var one = x.substr(x.indexOf(" ") + 1);
    var two = one.substr(one.indexOf(" ") + 1);
    var three = two.substr(two.indexOf(" ") + 1);
    //remove last word

    function removeLastWord(str) 
    {
      const lastIndexOfSpace = str.lastIndexOf(' ');
    
      if (lastIndexOfSpace === -1) {
        return str;
      }
      return str.substring(0, lastIndexOfSpace);
    }

    var text_label = removeLastWord(x)
    text_label = text_label.split('_').join(' ') 

    return {
     item: three,
     field: text_label
    };
  
});

$('#add_hp_select_resident').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")

}
// selectized residents end

//show data tables
function load_data_tables(){
  var ajax_url = "functions/display-functions/show-hp.php";

  if ( ! $.fn.DataTable.isDataTable( '#hp_table' ) ) { // check if data table is already exist

  table = $('#hp_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "aoColumns": [ 
      { "sName": "death_cause", "bVisible": true }
    ],
    "ajax": {
        url: ajax_url,
        data: {
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          query_btn:query_btn,
          min_age:min_age,
          max_age:max_age,
          filter_status:filter_status,
          cause_of_death:cause_of_death,
          other_cause:other_cause
        },
        "dataSrc": function ( json ) {
          //Make your callback here.
         // console.log(json)
          return json.data;
      }      
      
    },
    order: [[10,'asc']],
    
    "autoWidth": false,
      scrollCollapse: true,

    "dom": 'Brltip',      
    "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

    //disable the sorting of colomn
    "columnDefs": [ {
      "targets": 11,
      "orderable": false
      } ],

    "columns": [
      {
        "targets": 9,
        "render": function(data)
        {
          if(filter_status === "Inactive (Dead)")
          {
            return "Dead Individual"
          }
          else
          {
            return data+getOrdinal(data)+" Occurrence"
          }
          
        }
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
        "targets": 9,
        "render": function(data)
        {
          return data
        }
      },
      {
        "targets": 10,
        "render": function(data)
        {

          if(data === "(Active)")
          {active_data = data;

            return data
            
          }
          else
          {active_data = data;

            return data
          }
         
        }
      },
      {
        "targets": 11,
        "render": function ( data, type, row, meta ) {

          if(active_data === "(Active)")
          {

            return  "<div class='text-end px-3'>"+
            "<i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-hp' id='update_hp_value "+data+"' role='button'></i> "+
            "<i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update deact_btn fas fa-server' data-coreui-toggle='modal' href='#detail_resident_hp' id='update_hp_value "+data+"' role='button'></i>"+
            "</div>"

          }
          else
          {
            return  "<div class='text-end px-3'> "+
            "<i onclick = 'click_value(this.id)' class='activate_hp shadow-sm align-middle edit_barangay_value filter_btn fa-solid fa-circle-question' data-coreui-toggle='modal' href='#active_hp' id='update_hp_value "+data+"' role='button'></i> "+
            "<i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update deact_btn fas fa-server' data-coreui-toggle='modal' href='#detail_resident_hp' id='update_hp_value "+data+"' role='button'></i>"+
            "</div>"
          }
          
        },
        
      }
    ],

  "buttons": [
    {
        extend: 'copy',
        text: ' COPY',

        title: 'Health Profile Clustering System',

        messageTop: 'Health Profiles',
        //className: 'fa fa-solid fa-clipboard',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,8,9,10],
          // optional space between columns
          columnGap: 1
        }

    },
    { 
        extend: 'excel',
        text: ' EXCEL',

        title: 'Health Profile Clustering System',

        messageTop: 'Health Profiles',
        //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,8,9,10],
          // optional space between columns
          columnGap: 1
        }

    },
    {
        extend: 'print',
        text: ' PDF',

        title: 'Health Profile Clustering System',

        messageTop: 'Health Profiles',
        //className: 'fa fa-print',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,8,9,10],
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
  table.buttons().container().appendTo('#hp_table_wrapper .col-md-6:eq(0)');

    $('#hp_table #th_1 td').each(function () {
      var title = this.id;

      if(title === "settings" )
      {
      
        $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid me-2"></span>Settings</span></div>');
      }
      else if(title === "status" )
      {
      
        $(this).html('<div class="text-end pe-3"><span style="font-size:15px; color:#9eaaad; font-size:13px;" class=" me-2">Status</div>');
      }
      else if (title === "Occurrence" && filter_status === "Inactive (Dead)")
      {
        $(this).html('<div class="text-end pe-3"><span style="font-size:15px; color:#9eaaad; font-size:13px;" class=" me-3">Individual Satus</div>');
      }
      else if (title === "Diagnosis" && filter_status === "Inactive (Dead)")
      {
        $(this).html('<input type="text" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="Cause of Death" aria-controls="hp_table">');
      }
      else if (title === "Date of Diagnosis" && filter_status === "Inactive (Dead)")
      {
        $(this).html('<input type="text" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="Date of Death" aria-controls="hp_table">');
      }
      else if (title === "Date of Diagnosis" && filter_status === "Inactive (Recovered)")
      {
        $(this).html('<input type="text" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="Date of Recovery" aria-controls="hp_table">');
      }
      else if (title === "Date of Diagnosis" && filter_status === "Inactive (All)")
      {
        $(this).html('<input type="text" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="Date of Inactivity" aria-controls="hp_table">');
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
  $("#hp_table_wrapper").addClass("row");

  $(".dt-buttons").detach().appendTo('#buttons') 
  $(".dt-buttons").addClass("col-lg-2 col-md-12 mb-3"); 
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

//get the id of health profile
function click_value(this_value)
{
  hp_id_value = this_value.substr(this_value.indexOf(" ") + 1);
}
//get the id of health profile end

//trigger error messages
function alert_message()
{
if(confirmation.a == 1)
{

if($('#add-hp').is(":visible") ){
  $('#add-hp').modal('toggle');
}

var $select = $('#add_hp_select_barangay').selectize();
var control = $select[0].selectize;
control.clear();

 $select = $('#add_hp_select_resident').selectize();
 control = $select[0].selectize;
control.clear();

 $select = $('#add_hp_select_diseases').selectize();
 control = $select[0].selectize;
control.clear();

$("#philhealth").val("");

toastMixin.fire({
animation: true,
title: 'A new health profile has been added in the list.'
});

table.ajax.reload( null, false);

}
else if(confirmation.a == 2)
{
toastMixin.fire({
animation: true,
title: 'Something went wrong please try again.',
icon: 'error'
});
}
else if(confirmation.a == 3)
{ 
if($('#update-hp').is(":visible") ){
  $('#update-hp').modal('toggle');
}


toastMixin.fire({
animation: true,
title: 'A health profile has been updated.'
});

table.ajax.reload( null, false);
}
else if(confirmation.a == 4)
{

toastMixin.fire({
animation: true,
title: 'A record has been added into list of inactive health profiles.'
});
table.ajax.reload( null, false);

}
else if(confirmation.a == 5)
{ 

toastMixin.fire({
animation: true,
title: 'A record has been added into list of active health profiles.'
});
table.ajax.reload( null, false);

}
else if(confirmation.a == 6)
{
  $('#add-hp').modal('toggle'); 
  $('#occurence').modal('toggle');
}
else if(confirmation.a == 7)
{
toastMixin.fire({
animation: true,
title: 'It is not possible to create a new health profile for a deceased individual.',
icon: 'error'
});
}
else if(confirmation.a == 8)
{ 
toastMixin.fire({
animation: true,
title: 'A record has been successfully deleted.'
});
table.ajax.reload( null, false);
}
else if(confirmation.a == 9)
{
toastMixin.fire({
animation: true,
title: 'You are trying to duplicate a health profile that is still active.',
icon: 'error'
});
}
else if(confirmation.a == 10)
{
toastMixin.fire({
animation: true,
title: 'It is not possible to reactivate a health profile whose occurrence number is not the most recent.',
icon: 'error'
});
}
else if(confirmation.a == 11)
{
toastMixin.fire({
animation: true,
title: "It is not possible to add a reoccurrence on the same date as the person's recovery date.",
icon: 'error'
});
}
else if(confirmation.a == 12)
{
  $('#update-hp').modal('toggle'); 
  $('#update_occurence').modal('toggle');
}
else if(confirmation.a == 13)
{
toastMixin.fire({
animation: true,
title: 'It is not possible to delete a health profile whose occurrence number is not the most recent.',
icon: 'error'
});
}
}
//trigger error messages end

//enable the form when a barangay is picked
function enable_form()
{
// adding (first time)
$("#add_hp_select_barangay").change(function(){ 
var barangay_name = $("#add_hp_select_barangay").text();

if(barangay_name.trim().length != 0)
{
var brgy_list_value = $("#add_hp_select_barangay").val();
selectize_barangay_id = brgy_list_value;
selectize_barangay_id_enabled = selectize_barangay_id;
selectized_residents_list();
$('#fieldset1').removeAttr("disabled");
$('#add_hp_select_resident')[0].selectize.enable();
$('#add_hp_select_diseases')[0].selectize.enable();  
}
else
{
selectize_barangay_id_disabled = selectize_barangay_id_enabled;
$('#fieldset1').attr("disabled", true);
$('#add_hp_select_resident')[0].selectize.disable();
$('#add_hp_select_diseases')[0].selectize.disable();
}
});
}
//enable the form when a barangay is picked end 

//erese input fields when x button is pressed
  $("#close_add_hp").click(function()
  {

  var $select = $('#add_hp_select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();

   $select = $('#add_hp_select_resident').selectize();
   control = $select[0].selectize;
  control.clear();

   $select = $('#add_hp_select_diseases').selectize();
   control = $select[0].selectize;
  control.clear();

  $("#philhealth").val("");
  })
//erese input fields when x button is pressed end

//submit new hp
$("#add_hp_btn").click(function () {

    created_at = yyyy + '-' + mm + '-' + dd;
    id_full_naame = $("#add_hp_select_resident").val();
    id_disease = $("#add_hp_select_diseases").val();
    philhealth_number = $("#philhealth").val();
    select_brgy = $("#add_hp_select_barangay").text();
    fullname_txt = $("#add_hp_select_resident").text();
    disease_txt = $("#add_hp_select_diseases").text();

    function submit_new_hp_lists()
    {
        $.post("functions/add-functions/add-hp.php", {
            created_at: created_at,
            id_full_naame: id_full_naame,
            id_disease: id_disease,
            philhealth_number: philhealth_number,
            new_hp:'set'

          },
          function (data, status) {
           
            confirmation.a = data;
    
          });
    }
    

    if (select_brgy.trim().length === 0) //check if value is empty
    {
      $("#add_hp_select_barangay").addClass("is-invalid");
      $("#add_hp_select_brg_list .selectize-control").addClass("is-invalid");
    }
    else if (fullname_txt.trim().length === 0) //check if value is empty
    {
      $("#add_hp_select_resident").addClass("is-invalid");
      $("#add_hp_select_resident_list .selectize-control").addClass("is-invalid");
    }
    else if (disease_txt.trim().length === 0) //check if value is empty
    {
      $("#add_hp_select_diseases").addClass("is-invalid");
      $("#add_hp_select_diseases_list .selectize-control").addClass("is-invalid");
    }
    else 
    {
        if (philhealth_number.trim().length != 0 && philhealth_number.length === 12)
        {
            submit_new_hp_lists()
        }
        else if (philhealth_number.trim().length === 0)
        {
            philhealth_number = "N/A"
            submit_new_hp_lists()
        }
        else
        {
            $("#philhealth").addClass("is-invalid");
        }
    }


  
});
//submit new hp end

//occurrence
$("#accept").click(function()
{

  $.post("functions/add-functions/add-hp.php", {
    created_at: created_at,
    id_full_naame: id_full_naame,
    id_disease: id_disease,
    philhealth_number: philhealth_number,
    occurrence:'set'

  },
  function (data, status) {
   
    confirmation.a = data;

  });

})
//occurrence end

//update_occurrence
$("#update_occurence_yes").click(function()
{
  created_at = yyyy + '-' + mm + '-' + dd;
  var new_hp_philhealth = $("#update_philhealth").val();
  var new_diagnosis = $("#update_hp_Diagnosis").val();
  var hp_update_id = hp_id_value;

  $.post("functions/update-functions/update-hp.php", {
    created_at: created_at,
    hp_update_id: hp_update_id,
    new_diagnosis: new_diagnosis,
    new_hp_philhealth: new_hp_philhealth,
    occurrence:'set'
  },
  function (data, status) {
   
    confirmation.a = data;

  });

})
//update_occurrence end

//update hp status
$("#update_hp_btn_status").click(function () {

  var hp_update_id = hp_id_value;
  created_at = yyyy + '-' + mm + '-' + dd;
  var update_validator = true;
  var update_hp_select_new_stats =  $("#update_hp_select_new_stats").val();
  var update_hp_select_cause_of_death = $("#update_hp_select_cause_of_death").val();
  var update_hp_select_other = $("#update_hp_select_other").val();

  function submit_update_hp_lists()
  {
      $.post("functions/update-functions/update-hp.php", {

        change_status:'set',
        hp_update_id: hp_update_id,
        status:update_hp_select_new_stats,
        death:update_hp_select_cause_of_death,
        other_death:update_hp_select_other,
        created_at:created_at
        },
        function (data, status) {
         confirmation.a = data;
        });
  }

  if (update_hp_select_new_stats.trim().length === 0) //check if value is empty
  {
    $("#update_hp_select_new_stats").addClass("is-invalid");
    $("#s_t .selectize-control").addClass("is-invalid");
    update_validator = false;
  }
  else if (update_hp_select_new_stats === "Inactive (Dead)" && update_hp_select_cause_of_death.trim().length === 0) //check if value is empty
  {
    $("#update_hp_select_cause_of_death").addClass("is-invalid");
    $("#co_l .selectize-control").addClass("is-invalid");
    update_validator = false;
  }
  else if (update_hp_select_cause_of_death === "Other" && update_hp_select_other.trim().length === 0) //check if value is empty
  {
    $("#update_hp_select_other").addClass("is-invalid");
    update_validator = false;
  }

  if(update_validator === true)
  {
    submit_update_hp_lists()
  }

});
//update hp status end

//update hp details
$("#update_hp_btn_edit").click(function () {

  var new_hp_philhealth = $("#update_philhealth").val();
  var new_diagnosis = $("#update_hp_Diagnosis").val();
  var hp_update_id = hp_id_value;
  var update_validator = true;

  function submit_update_hp_lists_details()
  {
      $.post("functions/update-functions/update-hp.php", {

        change_details:'set',
        hp_update_id: hp_update_id,
        new_diagnosis:new_diagnosis,
        new_hp_philhealth: new_hp_philhealth,
        },
        function (data, status) {
         confirmation.a = data;
        });
  }

  if(new_diagnosis.trim().length === 0)
  {
    $("#update_hp_Diagnosis").addClass("is-invalid");
    $("#u_p_d .selectize-control").addClass("is-invalid");
    update_validator = false;
  }
  else if (new_hp_philhealth.trim().length != 0 && new_hp_philhealth.length === 12)
  {
    update_validator = true;
  }
  else if (new_hp_philhealth.trim().length === 0)
  {
    new_hp_philhealth = "N/A";
    update_validator = true;
  }
  else
  {
      $("#update_philhealth").addClass("is-invalid");
      update_validator = false;
  }


  if(update_validator === true)
  {
    submit_update_hp_lists_details()
  }

});
//update hp details end

//active hp
$("#active_hp_btn").click(function()
{
  $.post("functions/update-functions/active-hp.php", {
    hp_id: hp_id_value,
  },
  function (data, status) {
  confirmation.a = data;

  });
})
//active hp end

// delete final
$("#delete_hp_btn_final").click(function()
{
  $.post("functions/update-functions/update-hp.php", {
    hp_id: hp_id_value,
    delete:'set'
    },
    function (data, status) {
      confirmation.a = data;
    });
})
// delete final end

// update delete
$("#update_hp_btn_delete").click(function()
{
  $('#update-hp').modal('toggle'); 
  $('#delete_hp_permanently').modal('toggle');
})
// update delete end

//turn 123 into 1st 2nd 3rd
function getOrdinal(n) {
  let ord = 'th';

  if (n % 10 == 1 && n % 100 != 11)
  {
    ord = 'st';
  }
  else if (n % 10 == 2 && n % 100 != 12)
  {
    ord = 'nd';
  }
  else if (n % 10 == 3 && n % 100 != 13)
  {
    ord = 'rd';
  }

  return ord;
}
//turn 123 into 1st 2nd 3rd end

//get cell value when selected
function get_hp_table_cell_value()
{
  //update
  $("#hp_table").on('click','.update_hp_value',function(){
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
    var col10=currentRow.find("td:eq(10)").text().trim($(this).text()); // get current row 1st TD value

    fullname_txt = col2 + " " + col3+ " " +col4;
    disease_txt = col0;
    select_brgy = col5;

    
    var $select = $("#select_options").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search("Update health profile details").items[0].id);


  
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      recover_date:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      let dateStr = data;
      let dateObj = new Date(dateStr);
      let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}); 
      $("#update_hp_recover_date").text(readableDate);

    });

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      death_date:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      let dateStr = data;
      let dateObj = new Date(dateStr);
      let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
      $("#update_hp_death_date").text(readableDate);
    });

    
  
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      occurrence:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      $("#update_hp_occurrence").text(data+getOrdinal(data)+" Occurrence");

    });

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      recovery:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      $("#update_hp_recovery").text(data);
    });


    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      cause_of_death:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      $("#update_hp_death").text(data);

    });

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      philnum:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      $("#philNum").text(data);
      $("#update_philhealth").val(data); 

    });

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      date_created:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      let dateStr = data;
      let dateObj = new Date(dateStr);
      let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
      $("#date_created").text(readableDate);

    });

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_hp_dates.php', 
    {
      hp_id_value:hp_id_value,
      diagnosis:"set"
    }, 
    function (data, textStatus, jqXHR) 
    {
      $("#update_hp_diagnosis").text(data);
    });


    $("#update_hp_select_barangay").text(select_brgy);
    $("#update_hp_select_resident").text(fullname_txt);
    $("#update_hp_select_contact").text(col8); 
    $("#update_hp_status").text(col10);
    $("#update_hp_age").text(col7);
    $("#update_hp_gender").text(col6);
  
    var $select = $("#update_hp_select_new_stats").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search("Active").items[0].id);

    var $select = $("#update_hp_Diagnosis").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search(col1).items[0].id);

    $("#info_rec").text("Receiving treatment with medication")
    $("#i_i").removeClass("d-none")

    if($("#update_hp_recover_date").text() != "Invalid Date")
    {
        $("#d_r").removeClass("d-none") 
        $("#r_o").removeClass("d-none") 
        $("#info_rec").text("")
        $("#i_i").addClass("d-none")
    }
    else
    {
      $("#d_r").addClass("d-none") 
      $("#r_o").addClass("d-none")
    }

    if($("#update_hp_death_date").text() != "Invalid Date")
    {
        $("#d_d").removeClass("d-none")
        $("#c_d").removeClass("d-none")
        $("#info_rec").text("This health profile is no longer active because the individual has passed away")
        $("#i_i").removeClass("d-none")
    }
    else
    {
      $("#d_d").addClass("d-none")
      $("#c_d").addClass("d-none")
    }

    if(filter_status === "Inactive (Dead)")
    {
      $("#d_c").addClass("d-none")
      $("#diag_title").addClass("d-none")
      $("#i_i").addClass("d-none")
      $("#occurr").addClass("d-none")
    }
    else
    {
      $("#d_c").removeClass("d-none")
      $("#diag_title").removeClass("d-none")
      $("#occurr").removeClass("d-none")
    }
  
    });
}
//get cell value when selected end


//filter date range
$("#date_range_btn").click(function()
{
  var from_input = $("#range_from").val()
  var to_input = $("#range_to").val()
  var click_min_age = $("#age_min").val();
  var click_max_age = $("#age_max").val();
  var click_filter_status = $("#filter_status").val(); 
  var filter_cause_of_death = $("#select_cause_of_death").val();
  var filter_cause_of_death_search_title = $("#select_cause_of_death").text();
  var filter_other_cause = $("#select_other_causes").text();

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
        min_age = click_min_age
        max_age = click_max_age
        filter_status = click_filter_status
        cause_of_death = filter_cause_of_death;
        other_cause = filter_other_cause;
        query_btn = "clicked";

        $(".th_occurrence").text("Occurrence") 
        $(".th_date").text("Date of Diagnosis")
        $(".th_diag").text("Diagnosis")

        if(filter_status === "Inactive (Dead)")
        {
          $(".th_occurrence").text("Individual Satus")
          $(".th_date").text("Date of Death")
          $(".th_diag").text("Cause of Death")
        }
        else if(filter_status === "Inactive (Recovered)")
        {
          $(".th_date").text("Date of Recovery")
        }
        else if(filter_status === "Inactive (All)")
        {
          $(".th_date").text("Date of Inactivity")
        }

        
        table.destroy()
        $(".dataTables_length").remove();
        $(".dataTables_info").remove();
        $(".dataTables_paginate ").remove();

        load_data_tables()
        $("#filter_table").modal("toggle");

        var result_tittle = "Filtered results for: "
        var results =  [];
        let a = 0
        if(filter_status != "")
        {
          results[a] = " Status: "+filter_status+""
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
        if(cause_of_death != "")
        {
          if (cause_of_death === "Other") {
            if(other_cause != "")
            {
              results[a] = "  Cause of Death: Other ("+other_cause+")"
            }
            else
            {
              results[a] = "  Cause of Death: Other (All)"
            }
          }
          else
          {
            results[a] = "  Cause of Death: "+filter_cause_of_death_search_title+""
          }
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
        }
        else
        {
          $("#search_result").html("")
        }

  }

})
//filter date range end

//refresh table back to current data
$("#refresh_table").click(function()
{

  var $select = $("#update_hp_select_new_stats").selectize();
  var selectize = $select[0].selectize;
  selectize.setValue(selectize.search("").items[0].id);

  $(".th_occurrence").text("Occurrence") 
  $(".th_date").text("Date of Diagnosis")
  $(".th_diag").text("Diagnosis")

  filter_status = "";

  $("#range_from").val("")
  $("#range_to").val("")
  $("#range_from").val("")
  $("#range_to").val("")
  $("#age_min").val("");
  $("#age_max").val("");
  $("#search_result").html("")

  var $select = $('#select_cause_of_death').selectize();
  var control = $select[0].selectize;
  control.clear();

  var $select = $('#select_other_causes').selectize();
  var control = $select[0].selectize;
  control.clear();

  var $select = $('#filter_status').selectize();
  var control = $select[0].selectize;
  control.clear();

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
  var refresh_table_tooltip = $("#refresh_table")
  var myOpentip = new Opentip(refresh_table_tooltip, { showOn:"mouseover", tipJoint: "bottom", target:refresh_table_tooltip });
  myOpentip.setContent("Refresh Table"); // Updates Opentips content
}
//generate a tooltip end


//permanently delete hp
$("#delete_hp_btn_permanently").click(function()
{  
  $('#delete_hp_permanently').modal('toggle');
})

//show cause of death field
$("#update_hp_select_new_stats").on('change', function(){

  if($("#update_hp_select_new_stats").val() === "Inactive (Dead)")
  {
    $("#co_l").removeClass("d-none")
  }
  else
  {
    $("#co_l").addClass("d-none")
    $("#o_c_d").addClass("d-none")

    var $select = $('#update_hp_select_cause_of_death').selectize();
    var control = $select[0].selectize;
    control.clear();
  }
  
});

//show cause of death field
$("#update_hp_select_cause_of_death").on('change', function(){

  if($("#update_hp_select_cause_of_death").val() === "Other")
  {
    $("#o_c_d").removeClass("d-none")
  }
  else
  {
    $("#o_c_d").addClass("d-none")

    var $select = $('#update_hp_select_other').selectize();
    var control = $select[0].selectize;
    control.clear();
  }
  
});

//change recoveries to cause of death if the status is death
$("#filter_status").change(function()
{
   if($(this).val() === "Inactive (Dead)")
   {
       $("#d_t").addClass("d-none")
       $("#co_d").removeClass("d-none")
       
   }
   else
   {
       $("#d_t").removeClass("d-none")
       $("#co_d").addClass("d-none")
       
       var $select = $('#select_cause_of_death').selectize();
       var control = $select[0].selectize;
       control.clear();

   }
})
//change recoveries to cause of death if the status is death end

//change recoveries to cause of death if the status is death
$("#select_cause_of_death").change(function()
{
   if($(this).val() === "Other")
   {
       $("#o_co_d").removeClass("d-none")
   }
   else
   {
       $("#o_co_d").addClass("d-none")

       var $select = $('#select_other_causes').selectize();
       var control = $select[0].selectize;
       control.clear();
   }
})
//change recoveries to cause of death if the status is death end

//update options
$("#select_options").change(function()
{
  var option_selector = $('#select_options').val();

  if(option_selector === "Status")
  {
    $("#fieldset_edit").addClass("d-none")
    $("#fieldset_status").removeClass("d-none")

    $("#update_hp_btn_status").removeClass("d-none")
    $("#update_hp_btn_edit").addClass("d-none")
    $("#update_hp_btn_delete").addClass("d-none")
  }
  else if (option_selector === "Details")
  {
    $("#fieldset_edit").removeClass("d-none")
    $("#fieldset_status").addClass("d-none")

    $("#update_hp_btn_status").addClass("d-none")
    $("#update_hp_btn_edit").removeClass("d-none")
    $("#update_hp_btn_delete").addClass("d-none")
  }
  else if (option_selector === "Delete")
  {
    $("#fieldset_edit").addClass("d-none")
    $("#fieldset_status").addClass("d-none")

    $("#update_hp_btn_status").addClass("d-none")
    $("#update_hp_btn_edit").addClass("d-none")
    $("#update_hp_btn_delete").removeClass("d-none")
  }
})
//update options end









