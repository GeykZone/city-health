var i = 0;
var table = "";
var selectize_residents = "";
var selectize_barangay_id = "";
var selectize_barangay_id_enabled = "";
var selectize_barangay_id_disabled = "";
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

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    select_with_search_box()
    load_data_tables()
    $("#hp_table_wrapper").addClass("d-none");
    enable_form()
    load_progress_bar();

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


//progress bar
function load_progress_bar()
{
  setInterval(move());
  setTimeout( function()
  {
    $("#myBar").text("Table Loaded Successfully!");
    setTimeout(function(){
      $("#myProgress").addClass("d-none");
      $("#hp_table").removeClass("d-none");
      $("#hp_table_wrapper").removeClass("d-none");
      $("#add_hp").removeClass("d-none"); 
      $(".hide_first_load").removeClass("d-none"); 
      $(".remove_rounded").removeClass("rounded-5");
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

// for select
function select_with_search_box()
{
$('select').selectize({
// maxItems: '1',
});
$(".selectize-control").removeClass("form-control barangay-form")
}
// for select  end

// selectized residents
function selectized_residents_list()
{
if(selectize_barangay_id_enabled != selectize_barangay_id_disabled)
{
    $('#add_hp_select_resident').selectize()[0].selectize.destroy();
}

$.ajaxSetup({async:false});
$.getJSON('functions/select-residents.php', 
{
    resident_names: selectize_barangay_id
}, 

function (data, textStatus, jqXHR) 
{
    selectize_residents = data;
});

var selectize_residents_data = selectize_residents;
var items = selectize_residents_data.map(function(x) { 
    //remove the first words
    var one = x.substr(x.indexOf(" ") + 1);
    var two = one.substr(one.indexOf(" ") + 1);
    var three = two.substr(two.indexOf(" ") + 1);
    //remove last word
    function removeLastWord(str) {
        const lastIndexOfSpace = str.lastIndexOf(' ');
      
        if (lastIndexOfSpace === -1) {
          return str;
        }
        return str.substring(0, lastIndexOfSpace);
      }
      var text_label = removeLastWord(x)
    return {
     item: three,
     field: text_label
    }; });
$('#add_hp_select_resident').selectize({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});
$(".selectize-control").removeClass("form-control barangay-form")
}
// selectized residents end

//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#hp_table' ) ) { // check if data table is already exist

  table = $('#hp_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "ajax": "functions/show-hp.php",   
    "autoWidth": false,
    scrollCollapse: true,
    "dom": 'lfBrtip',      
    "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

    //disable the sorting of colomn
    "columnDefs": [ {
      "targets": 11,
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
      null,
      null,
      {
        "defaultContent": "<i class='shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-barangay-resident' id='update_resident_value' role='button'></i> "+
        "<i class='shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_resident' data-coreui-toggle='modal' id='delete_resident_value' role='button'></i>"+
        "<i class='align-middle barangay_table_is_loading loader_icn fas fa-sync fa-spin d-none' style='color:#3b7ddd;'  id='barangay_table_is_loading' role='button' disable></i>"
      }
    ],

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
          columns: [0,1,2,3,4,5,6,7,9,10,11],
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
          columns: [0,1,2,3,4,5,6,7,9,10,11],
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
          columns: [0,1,2,3,4,5,6,7,9,10,11],
          // optional space between columns
          columnGap: 1
        },

        customize: function (win) {
            $(win.document.body)
                .css('text-align', 'center')

            $(win.document.body).find('table')
                .css('font-size', '12pt');

                $(win.document.body).find('table').addClass("table-bordered")
        }
    }],
  });
  table.buttons().container().appendTo('#resident_table_wrapper .col-md-6:eq(0)');
    
  }

  //to align the data table buttons
  $("#hp_table_wrapper").addClass("row");
  $("#hp_table_length").addClass("col-sm-6");
  $("#hp_table_length").addClass("mb-3");
  $("#hp_table_filter").addClass("col-sm-6");
  $("#hp_table_filter").addClass("mb-3");
  $(".dt-buttons").addClass("col-sm-2 mb-3"); 
  $(".dt-buttons").removeClass("flex-wrap ");
  $(".buttons-print").addClass("shadow-sm border-2"); 
  $(".buttons-excel").addClass("shadow-sm border-2"); 
  $(".buttons-copy").addClass("shadow-sm border-2"); 
  $(".form-control").addClass("shadow-sm");
  $(".form-select").addClass("shadow-sm");

  };
  //show data tables end

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
$('#add-hp').modal('toggle');

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

$(".barangay_table_is_loading").removeClass("d-none");
$(".edit_barangay_value").addClass("d-none");
$("#hp_table_paginate").addClass("d-none");
$("#hp_table_table_info").addClass("d-none");
setInterval(move())
$("#myProgress").addClass("mt-3");
$("#myProgress").removeClass("d-none");

toastMixin.fire({
animation: true,
title: 'A new health profile has been added in the list.'
});

setTimeout(function(){  

$("#myBar").text("Table Updated Successfully!");
setTimeout(function(){
table.ajax.reload( null, false);
$("#hp_table_paginate").removeClass("d-none");
$("#hp_table_info").removeClass("d-none");
$("#myProgress").addClass("d-none");
$("#myProgress").removeClass("mt-3");
$(".barangay_table_is_loading").addClass("d-none"); 
$(".edit_barangay_value").removeClass("d-none");
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
$('#fieldset1').removeAttr("disabled");
$('#add_hp_select_resident')[0].selectize.enable();
$('#add_hp_select_diseases')[0].selectize.enable();  
selectize_barangay_id = brgy_list_value;
selectize_barangay_id_enabled = selectize_barangay_id;
selectized_residents_list();


}
else
{
$('#fieldset1').attr("disabled", true);
$('#add_hp_select_resident')[0].selectize.disable();
$('#add_hp_select_diseases')[0].selectize.disable();
selectize_barangay_id_disabled = selectize_barangay_id_enabled;

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
        $.post("functions/add-hp.php", {
            created_at: created_at,
            id_full_naame: id_full_naame,
            id_disease: id_disease,
            philhealth_number: philhealth_number

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
            submit_new_hp_lists()
        }
        else
        {
            $("#philhealth").addClass("is-invalid");
        }
    }


  
});
//submit new hp end


