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

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    select_with_search_box()
    load_data_tables()
    enable_form()
    get_hp_table_cell_value();


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

//selectized resident update area
function update_selectize_resident()
{
  //updating
if(update_selectize_barangay_id_enabled != update_selectize_barangay_id_disabled)
{
    $('#update_hp_select_resident').selectize()[0].selectize.destroy();
}

$.ajaxSetup({async:false});
$.getJSON('functions/select-residents.php', 
{
    resident_names: update_selectize_barangay_id
}, 

function (data, textStatus, jqXHR) 
{
    update_selectize_residents = data;
});

var update_selectize_residents_data = update_selectize_residents;
var items = update_selectize_residents_data.map(function(x) { 
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
$('#update_hp_select_resident').selectize({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});
$(".selectize-control").removeClass("form-control barangay-form")
}
//selectize resident update area

//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#hp_table' ) ) { // check if data table is already exist

  table = $('#hp_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "ajax": "functions/show-inactive-hp.php",   
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
        "targets": 11,
        "render": function ( data, type, row, meta ) {

          return  "<i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-hp' id='update_hp_value "+data+"' role='button'></i> "+
          "<i onclick = 'click_value(this.id)' class='shadow-sm align-middle edit_barangay_value active_hp_btn fa-solid fa-circle-arrow-left' href='#active_hp' data-coreui-toggle='modal' id='delete_resident_value "+data+"' role='button'></i>"+
          "<i class='align-middle barangay_table_is_loading loader_icn fas fa-sync fa-spin d-none' style='color:#3b7ddd;'  id='barangay_table_is_loading' role='button' disable></i>"
          
        },
        
      }
    ],

  "buttons": [
    {
        extend: 'copy',
        text: ' COPY',

        title: 'Health Profile Clustering System',

        messageTop: 'List of Inactive Health Cases',
        //className: 'fa fa-solid fa-clipboard',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,9,10],
          // optional space between columns
          columnGap: 1
        }

    },
    { 
        extend: 'excel',
        text: ' EXCEL',

        title: 'Health Profile Clustering System',

        messageTop: 'List of Inactive Health Cases',
        //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,9,10],
          // optional space between columns
          columnGap: 1
        }

    },
    {
        extend: 'print',
        text: ' PDF',

        title: 'Health Profile Clustering System',

        messageTop: 'List of Inactive Health Cases',
        //className: 'fa fa-print',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,9,10],
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

//get the id of health profile
function click_value(this_value)
{
  hp_id_value = this_value.substr(this_value.indexOf(" ") + 1);
}
//get the id of health profile end

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

if(confirmation.a == 2)
{
toastMixin.fire({
animation: true,
title: 'Something went wrong please try again.',
icon: 'error'
});
setTimeout(function(){
},3000);
}
else if(confirmation.a == 3)
  {  
    $('#update-hp').modal('toggle');
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#hp_table_paginate").addClass("d-none");
  $("#hp_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  $("#myProgress").addClass("mt-3");
  toastMixin.fire({
  animation: true,
  title: 'A health profile has been updated.'
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
else if(confirmation.a == 5)
  {  
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#hp_table_paginate").addClass("d-none");
  $("#hp_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  $("#myProgress").addClass("mt-3");
  toastMixin.fire({
  animation: true,
  title: 'A record has been added into list of active health profiles.'
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
}
//trigger error messages end

//enable the form when a barangay is picked
function enable_form()
{
// updating
$("#update_hp_select_barangay").change(function(){ 
  var update_barangay_name = $("#update_hp_select_barangay").text();
  
  if(update_barangay_name.trim().length != 0)
  {
  var update_brgy_list_value = $("#update_hp_select_barangay").val();
  $('#fieldset2').removeAttr("disabled");
  $('#update_hp_select_resident')[0].selectize.enable();
  $('#update_hp_select_diseases')[0].selectize.enable();  
  update_selectize_barangay_id = update_brgy_list_value;
  update_selectize_barangay_id_enabled = update_selectize_barangay_id;
  update_selectize_resident();
  
  
  }
  else
  {
  $('#fieldset2').attr("disabled", true);
  $('#update_hp_select_resident')[0].selectize.disable();
  $('#update_hp_select_diseases')[0].selectize.disable();
  update_selectize_barangay_id_disabled = update_selectize_barangay_id_enabled;
  
  }
  });
}
//enable the form when a barangay is picked end 

//update hp
$("#update_hp_btn").click(function () {



  var new_hp_brgy = $("#update_hp_select_barangay").val();
  var new_hp_name = $("#update_hp_select_resident").val();
  var new_hp_diseases =  $("#update_hp_select_diseases").val();
  var new_hp_philhealth = $("#update_philhealth").val();
  var hp_update_id = hp_id_value;

  function submit_update_hp_lists()
  {
      $.post("functions/update-hp.php", {
        hp_update_id: hp_update_id,
        new_hp_name: new_hp_name,
        new_hp_diseases: new_hp_diseases,
        new_hp_philhealth: new_hp_philhealth

        },
        function (data, status) {
         
        confirmation.a = data;
  
        });
  }
  

  if (new_hp_brgy.trim().length === 0) //check if value is empty
  {
    $("#update_hp_select_barangay").addClass("is-invalid");
    $("#update_hp_select_brg_list .selectize-control").addClass("is-invalid");
  }
  else if (new_hp_name.trim().length === 0) //check if value is empty
  {
    $("#update_hp_select_resident").addClass("is-invalid");
    $("#update_hp_select_resident_list .selectize-control").addClass("is-invalid");
  }
  else if (new_hp_diseases.trim().length === 0) //check if value is empty
  {
    $("#update_hp_select_diseases").addClass("is-invalid");
    $("#update_hp_select_diseases_list .selectize-control").addClass("is-invalid");
  }
  else 
  {
      if (new_hp_philhealth.trim().length != 0 && new_hp_philhealth.length === 12)
      {
        submit_update_hp_lists()
      }
      else if (new_hp_philhealth.trim().length === 0)
      {
        submit_update_hp_lists()
      }
      else
      {
          $("#update_philhealth").addClass("is-invalid");
      }
  }



});
//update hp end

//active hp
$("#active_hp_btn").click(function()
{
  $.post("functions/active-hp.php", {
    hp_id: hp_id_value,
  },
  function (data, status) {
  confirmation.a = data;

  });
})
//active hp end

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
    var col7=currentRow.find("td:eq(7)").text().trim($(this).text()); // get current row 1st TD value

    fullname_txt = col1 + " " + col2 + " " +col3;
    disease_txt = col0;
    select_brgy = col4;
    philhealth_number = col7;


    var $select = $("#update_hp_select_barangay").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search(select_brgy).items[0].id);

    var $select = $("#update_hp_select_resident").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search(fullname_txt).items[0].id);
    
    var $select = $("#update_hp_select_diseases").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search(disease_txt).items[0].id);

    $("#update_philhealth").val(philhealth_number);


    
    });
}
//get cell value when selected end


