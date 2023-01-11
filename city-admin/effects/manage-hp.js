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
var min_age;
var max_age;
var gender;


$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    select_list()
    select_for_disease()
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
        
        $("#update_date_of_diagnosis").datepicker({
          dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
          });

          $("#date_of_diagnosis").datepicker({
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

if(selectize_diseases != undefined)
{
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
}



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

if(selectize_residents != undefined)
{

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

}

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
    order: [[1,'asc']],
    
    "autoWidth": false,
      scrollCollapse: true,

    "dom": 'Brltip',      
    "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

    //disable the sorting of colomn
    "columnDefs": [ {
      "targets": 10,
      "orderable": false
      } ],

      "language": {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoFiltered":""
      },

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
        "targets": 10,
        "render": function ( data, type, row, meta ) {

          return  "<div class='text-end px-3'>"+
            "<i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-hp' id='update_hp_value "+data+"' role='button'></i> "+
            "<i onclick = 'click_value(this.id)' class='delete_resident_value shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_hp_permanently' data-coreui-toggle='modal' id='delete_hp_value "+data+"' role='button'></i>"+
            "</div>"
          
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
          columns: [0,1,2,3,4,5,6,7,8,9],
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
          columns: [0,1,2,3,4,5,6,7,8,9],
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
          columns: [0,1,2,3,4,5,6,7,8,9],
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

$('#date_of_diagnosis').val('')

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
title: 'A record has been successfully deleted.'
});
table.ajax.reload( null, false);
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

$('#date_of_diagnosis').val(yyyy + '-' + mm + '-' + dd)
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

  $('#date_of_diagnosis').val('')

  $("#philhealth").val("");
  })
//erese input fields when x button is pressed end

//submit new hp
$("#add_hp_btn").click(function () {

    created_at = $("#date_of_diagnosis").val()
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
    else if(created_at.trim().length === 0)
    {
      $("#date_of_diagnosis").addClass("is-invalid");
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

//update hp details
$("#update_hp_btn_edit").click(function () {

  var new_hp_philhealth = $("#update_philhealth").val();
  var new_diagnosis = $("#update_hp_Diagnosis").val();
  var new_diagnosis_date = $("#update_date_of_diagnosis").val();
  var hp_update_id = hp_id_value;
  var update_validator = true;

  function submit_update_hp_lists_details()
  {
      $.post("functions/update-functions/update-hp.php", {

        change_details:'set',
        hp_update_id: hp_update_id,
        new_diagnosis:new_diagnosis,
        new_diagnosis_date:new_diagnosis_date,
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
  else if(new_diagnosis_date.trim().length === 0)
  {
    $("#update_date_of_diagnosis").addClass("is-invalid");
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


    var update_diagnosis_date = new Date(col8)
    update_diagnosis_date = update_diagnosis_date.getFullYear()+"-"+String(update_diagnosis_date.getMonth() + 1).padStart(2, '0')+"-"+String(update_diagnosis_date.getDate()).padStart(2, '0');
    $("#update_date_of_diagnosis").val(update_diagnosis_date);

    var $select = $("#update_hp_Diagnosis").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search(col0).items[0].id);

    $("#update_philhealth").val(col9);
  
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
  }

})
//filter date range end

//refresh table back to current data
$("#refresh_table").click(function()
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
  var refresh_table_tooltip = $("#refresh_table")
  var myOpentip = new Opentip(refresh_table_tooltip, { showOn:"mouseover", tipJoint: "bottom", target:refresh_table_tooltip });
  myOpentip.setContent("Refresh Table"); // Updates Opentips content
  $("body").click(function()
  {
    myOpentip.hide()
  })
}
//generate a tooltip end

// cange color of date field when value is not 0
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

$("#date_of_diagnosis").change(function()
{

  if($("#date_of_diagnosis").val().trim().length === 0)
  {
    $('#date_of_diagnosis').css(
      {
        'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#date_of_diagnosis').css(
      {
          'cssText': 'color: #333 !important'
      }
      );
  }

})

$("#update_date_of_diagnosis").change(function()
{

  if($("#update_date_of_diagnosis").val().trim().length === 0)
  {
    $('#update_date_of_diagnosis').css(
      {
        'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#update_date_of_diagnosis').css(
      {
          'cssText': 'color: #333 !important'
      }
      );
  }

})
// cange color of date field when value is not 0 end

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












