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

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    select_with_search_box()
    load_data_tables()
    enable_form()
    get_hp_table_cell_value();
    date_range();
    opentip_tooltip();
    active_inactive();
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

//selectized resident update area
function update_selectize_resident()
{
  //updating
if(update_selectize_barangay_id_enabled != update_selectize_barangay_id_disabled)
{
    $('#update_hp_select_resident').selectize()[0].selectize.destroy();
}

$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select-residents.php', 
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
function load_data_tables(){
  var ajax_url = "functions/display-functions/show-hp.php";

  if ( ! $.fn.DataTable.isDataTable( '#hp_table' ) ) { // check if data table is already exist

  table = $('#hp_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "ajax": {
        url: ajax_url,
        data: {
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          query_btn:query_btn
        }
    },
    
       
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

            return  "<div class='text-end px-3'> <i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-hp' id='update_hp_value "+data+"' role='button'></i> "+
            "<i onclick = 'click_value(this.id)' class='shadow-sm align-middle edit_barangay_value remove_btn fa-solid fa-head-side-cough-slash' href='#delete_hp' data-coreui-toggle='modal' id='delete_resident_value "+data+"' role='button'></i>"+
            "</div>"

          }
          else
          {
            return  "<div class='text-end px-3'> <i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-hp' id='update_hp_value "+data+"' role='button'></i> "+
            "<i onclick = 'click_value(this.id)' class='shadow-sm align-middle edit_barangay_value active_hp_btn fa-solid fa-head-side-cough' href='#active_hp' data-coreui-toggle='modal' id='delete_resident_value "+data+"' role='button'></i>"+
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
          columns: [0,1,2,3,4,5,6,7,9,10],
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
          columns: [0,1,2,3,4,5,6,7,9,10],
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
          columns: [0,1,2,3,4,5,6,7,9,10],
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
      
        $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid fa-magnifying-glass me-2"></span>Search Area</span></div>');
      }
      else if(title === "status" )
      {
      
        $(this).html('<div class="text-end pe-3"><span style="font-size:15px; color:#9eaaad; font-size:13px;" class=" me-2">Status</div>');
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
$('#update-hp').modal('toggle');

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
            philhealth_number = "No PhilHealth"
            submit_new_hp_lists()
        }
        else
        {
            $("#philhealth").addClass("is-invalid");
        }
    }


  
});
//submit new hp end

//update hp
$("#update_hp_btn").click(function () {



  var new_hp_brgy = $("#update_hp_select_barangay").val();
  var new_hp_name = $("#update_hp_select_resident").val();
  var new_hp_diseases =  $("#update_hp_select_diseases").val();
  var new_hp_philhealth = $("#update_philhealth").val();
  var hp_update_id = hp_id_value;

  function submit_update_hp_lists()
  {
      $.post("functions/update-functions/update-hp.php", {
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
        new_hp_philhealth = "No PhilHealth";
        submit_update_hp_lists()
      }
      else
      {
          $("#update_philhealth").addClass("is-invalid");
      }
  }



});
//update hp end

//inactive hp
$("#delete_hp_btn").click(function()
{
  $.post("functions/update-functions/inactive-hp.php", {
    hp_id: hp_id_value,
  
  },
  function (data, status) {
  confirmation.a = data;

  });
})
//inactive hp end

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

//filter date range
$("#date_range_btn").click(function()
{
  var $select = $("#update_hp_select_barangay").selectize();
  var selectize = $select[0].selectize;
  selectize.setValue(selectize.search("").items[0].id);

  var from_input = $("#range_from").val()
  var to_input = $("#range_to").val()

  if(from_input.trim().length === 0)
  {
      $("#range_from").addClass("is-invalid");
  }
  else if(to_input.trim().length === 0)
  {
      $("#range_to").addClass("is-invalid");
  }
  else
  {
        date_range_from = from_input;
        date_range_to = to_input;
        query_btn = "clicked";

        table.destroy()
        $(".dataTables_length").remove();
        $(".dataTables_info").remove();
        $(".dataTables_paginate ").remove();

        load_data_tables()
        active_inactive()
  }

})
//filter date range end

//refresh table back to current data
$("#refresh_table").click(function()
{

  var $select = $("#update_hp_select_barangay").selectize();
  var selectize = $select[0].selectize;
  selectize.setValue(selectize.search("").items[0].id);

  $("#range_from").val("")
  $("#range_to").val("")

  query_btn = "unclicked";
  if(active_inactive_variable == "(Inactive)")
  {
    $("#show_active").removeClass("d-none")
    $("#show_inactive").addClass("d-none")
  }
  else
  {
    $("#show_inactive").removeClass("d-none")
    $("#show_active").addClass("d-none")
  }

  swal.close();

  table.destroy()
  $(".dataTables_length").remove();
  $(".dataTables_info").remove();
  $(".dataTables_paginate ").remove();

  load_data_tables()
  active_inactive()
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

//table draw active and inactive
function active_inactive()
{
  if(active_inactive_variable !== "(Inactive)")
  {
    table.search("(Active)").draw();
  }
  else
  {
    table.search("(Inactive)").draw();
  }
}
//table draw active and inactive

//show inacttive list
$("#show_inactive").click(function()
{
  active_inactive_variable = "(Inactive)";

  $("#show_active").removeClass("d-none")
  $("#show_inactive").addClass("d-none")
  swal.close();
  active_inactive()
})
//show inactive list end

//show active list
$("#show_active").click(function()
{
  active_inactive_variable = "(Active)";

  $("#show_inactive").removeClass("d-none")
  $("#show_active").addClass("d-none")
  swal.close();
  active_inactive()
})
//show inactive list end





